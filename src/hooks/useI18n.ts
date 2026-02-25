import { ko } from '../i18n/ko';
import { en } from '../i18n/en';
import { useState, useCallback, useMemo } from 'react';

type Lang = 'ko' | 'en';
const dictionaries: Record<Lang, Record<string, string>> = { ko, en };

/**
 * useI18n Hook
 * - 다국어 번역 함수(t)를 제공한다.
 * - Phase 3-4: 개발 모드(DEV)에서 키 누락 시 엄격하게 검사(Strict Mode).
 */
export function useI18n() {
    // 현재는 'ko'를 기본값으로 사용 (추후 전역 상태나 localStorage 연동 가능)
    const [lang] = useState<Lang>('ko');

    const dict = useMemo(() => dictionaries[lang], [lang]);

    /**
     * t (Translate) 함수
     * @param key 번역 키 (예: 'common.add')
     * @param params 치환할 파라미터 객체 (예: { max: 10 })
     */
    const t = useCallback((key: string, params?: Record<string, string | number>): string => {
        let text = dict[key];

        // ── 엄격 모드 (Strict Mode) 체크 ──
        if (!text) {
            if (import.meta.env.DEV) {
                // 개발 모드: 콘솔 에러 출력 및 명시적 미싱 표시
                console.error(`[I18N_MISSING_KEY] lang=${lang}, key=${key}`);
                return `[MISSING: ${key}]`;
            }
            // 프로덕션: 키 그대로 반환 (안전한 fallback)
            return key;
        }

        // ── 매개변수 치환 로직 (token substitution) ──
        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                text = text.replace(new RegExp(`{${k}}`, 'g'), String(v));
            });
        }

        return text;
    }, [dict, lang]);

    return { t, lang };
}
