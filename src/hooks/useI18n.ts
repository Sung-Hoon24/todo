import { ko } from "../i18n/ko";

// ─── 현재 활성 언어 사전 (MVP: ko 고정, 추후 언어 전환 지원) ───
const dict: Record<string, string> = ko;

/**
 * i18n 문구 조회 훅.
 *
 * @example
 *   const { t } = useI18n();
 *   t("upgrade.body", { limit: 10 })
 *   // → "무료 버전은 최대 10개까지 저장할 수 있습니다."
 */
export function useI18n() {
    /**
     * key에 해당하는 문구를 반환한다.
     * - 없으면 key 그대로 반환 (개발 중 누락 감지).
     * - params의 {token}을 실제 값으로 치환한다.
     */
    function t(key: string, params?: Record<string, string | number>): string {
        let text = dict[key] ?? key;

        if (params) {
            for (const [token, value] of Object.entries(params)) {
                text = text.replaceAll(`{${token}}`, String(value));
            }
        }

        return text;
    }

    return { t };
}
