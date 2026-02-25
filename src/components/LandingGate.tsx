import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendRadar } from "../utils/sendRadar";
import { useI18n } from "../hooks/useI18n";

/* ──────────────────────────────────────────────
   LandingGate — 첫 진입 시 표시되는 전환 최적화 랜딩 페이지
   - CTA 클릭 → /dashboard 로 이동
   - Phase 5: 외부 트래픽 전환 & CTR 측정용
   - Phase 5.2: EN/KR 언어 토글 + 자동 감지 + localStorage 저장
   - Phase 7: AI-First 카피 + CTA 클릭 CTR 레이더
   - Phase 8: Discord Webhook 외부 레이더
   ────────────────────────────────────────────── */

/* 언어 타입 */
type Lang = "en" | "ko";

/* 브라우저 언어 자동 감지 함수 */
function detectLang(): Lang {
    try {
        // localStorage에 저장된 언어가 있으면 우선
        const saved = localStorage.getItem("landing_lang");
        if (saved === "en" || saved === "ko") return saved;
    } catch (e) {
        console.error("[LandingGate] localStorage 읽기 실패:", e);
    }
    // 브라우저 언어로 감지 (ko로 시작하면 한국어, 그 외 영어)
    const browserLang = navigator.languages?.[0] || navigator.language || "en";
    return browserLang.startsWith("ko") ? "ko" : "en";
}

export const LandingGate: React.FC = () => {
    const navigate = useNavigate();
    const [lang, setLang] = useState<Lang>(detectLang);
    const { t } = useI18n();

    /* 언어 변경 핸들러 — localStorage에도 저장 */
    const switchLang = (newLang: Lang) => {
        setLang(newLang);
        try {
            localStorage.setItem("landing_lang", newLang);
        } catch (e) {
            console.error("[LandingGate] localStorage 저장 실패:", e);
        }
    };

    /* CTA 클릭 시 클릭 카운트 저장 + 대시보드로 이동 */
    const handleCTA = () => {
        try {
            // CTR 레이더: 클릭 수 localStorage에 기록
            const current = parseInt(localStorage.getItem("landing_cta_click") || "0", 10);
            localStorage.setItem("landing_cta_click", String(current + 1));
        } catch (e) {
            console.error("[LandingGate] CTR 저장 실패:", e);
        }
        // 디스코드 레이더 전송 (fire-and-forget)
        sendRadar(`[Landing CTA] lang=${lang} path=${window.location.pathname} time=${new Date().toISOString()}`);
        navigate("/dashboard");
    };

    return (
        <div className="relative min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-5 py-12 text-center">

            {/* ── 언어 토글 (우측 상단, 미니멀 pill) ── */}
            <div className="absolute top-4 right-4 flex rounded-full border border-zinc-700 bg-zinc-900/80 p-0.5">
                <button
                    onClick={() => switchLang("en")}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${lang === "en"
                        ? "bg-amber-500 text-zinc-950"
                        : "text-zinc-400 hover:text-zinc-200"
                        }`}
                >
                    EN
                </button>
                <button
                    onClick={() => switchLang("ko")}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${lang === "ko"
                        ? "bg-amber-500 text-zinc-950"
                        : "text-zinc-400 hover:text-zinc-200"
                        }`}
                >
                    KR
                </button>
            </div>

            {/* ── A. Hero 섹션 ── */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-50 leading-tight max-w-2xl">
                {t("landing.heroTitle1")}<br />
                <span className="text-amber-400">{t("landing.heroHighlight")}</span>{t("landing.heroTitle2")}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-md">
                {t("landing.heroSub1")}<br />
                {t("landing.heroSub2")}
            </p>

            {/* ── B. Problem 섹션 ── */}
            <div className="mt-10 w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
                <p className="text-sm text-zinc-400 leading-relaxed">
                    {t("landing.problem1")}<br />
                    {t("landing.problem2")}<strong className="text-zinc-200">{t("landing.problemBold")}</strong>{t("landing.problem3")}
                </p>
            </div>

            {/* ── C. Value 체크리스트 3개 ── */}
            <ul className="mt-8 flex flex-col gap-3 text-left w-full max-w-xs">
                <ValueItem text={t("landing.value1")} />
                <ValueItem text={t("landing.value2")} />
                <ValueItem text={t("landing.value3")} />
            </ul>

            {/* ── D. Primary CTA 버튼 ── */}
            <button
                onClick={handleCTA}
                className="mt-10 w-full max-w-xs rounded-xl bg-amber-500 px-6 py-4 text-base font-bold text-zinc-950 hover:bg-amber-400 active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
                {t("landing.cta")}
            </button>

            {/* ── 하단 보조 문구 ── */}
            <p className="mt-4 text-xs text-zinc-600">
                {t("landing.footer")}
            </p>
        </div>
    );
};

/* ── 체크리스트 아이템 하위 컴포넌트 ── */
function ValueItem(props: { text: string }) {
    return (
        <li className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/15 text-amber-400 text-sm">
                ✓
            </span>
            <span className="text-sm font-medium text-zinc-200">{props.text}</span>
        </li>
    );
}
