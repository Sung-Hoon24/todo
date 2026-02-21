import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ──────────────────────────────────────────────
   LandingGate — 첫 진입 시 표시되는 전환 최적화 랜딩 페이지
   - CTA 클릭 → /dashboard 로 이동
   - Phase 5: 외부 트래픽 전환 & CTR 측정용
   - Phase 5.2: EN/KR 언어 토글 + 자동 감지 + localStorage 저장
   - Phase 7: AI-First 카피 + CTA 클릭 CTR 레이더
   ────────────────────────────────────────────── */

/* ── 다국어 텍스트 상수 ── */
const TEXT = {
    ko: {
        heroTitle1: "당신의 생산성 데이터는",
        heroHighlight: "분석",
        heroTitle2: "받아야 합니다.",
        heroSub1: "추측하지 마세요. 측정하세요.",
        heroSub2: "하루의 결과를 구조화된 인사이트로 바꾸세요.",
        problem1: "할 일을 적어놓고 피하고 있진 않나요?",
        problem2: "동기가 부족한 게 아닙니다. ",
        problemBold: "피드백",
        problem3: "이 없는 겁니다.",
        value1: "AI 기반 생산성 분석",
        value2: "구조화된 데일리 인사이트",
        value3: "데이터 안전 백업 (추후)",
        cta: "내 하루 분석 시작하기 (무료)",
        footer: "회원가입 없이 바로 시작 · 데이터는 내 기기에만 저장",
    },
    en: {
        heroTitle1: "Your Productivity Data Deserves",
        heroHighlight: "Analysis",
        heroTitle2: ".",
        heroSub1: "Stop guessing. Start measuring.",
        heroSub2: "Turn your daily output into structured insight.",
        problem1: "Still writing tasks and avoiding them?",
        problem2: "You don't lack motivation. You lack ",
        problemBold: "feedback",
        problem3: ".",
        value1: "AI-powered productivity analysis",
        value2: "Structured daily insights",
        value3: "Secure data backup (coming soon)",
        cta: "Analyze My Day (Free)",
        footer: "No sign-up needed · Data stays on your device only",
    },
} as const;

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
        navigate("/dashboard");
    };

    /* 현재 언어의 텍스트 */
    const t = TEXT[lang];

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
                {t.heroTitle1}<br />
                <span className="text-amber-400">{t.heroHighlight}</span>{t.heroTitle2}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-md">
                {t.heroSub1}<br />
                {t.heroSub2}
            </p>

            {/* ── B. Problem 섹션 ── */}
            <div className="mt-10 w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
                <p className="text-sm text-zinc-400 leading-relaxed">
                    {t.problem1}<br />
                    {t.problem2}<strong className="text-zinc-200">{t.problemBold}</strong>{t.problem3}
                </p>
            </div>

            {/* ── C. Value 체크리스트 3개 ── */}
            <ul className="mt-8 flex flex-col gap-3 text-left w-full max-w-xs">
                <ValueItem text={t.value1} />
                <ValueItem text={t.value2} />
                <ValueItem text={t.value3} />
            </ul>

            {/* ── D. Primary CTA 버튼 ── */}
            <button
                onClick={handleCTA}
                className="mt-10 w-full max-w-xs rounded-xl bg-amber-500 px-6 py-4 text-base font-bold text-zinc-950 hover:bg-amber-400 active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
                {t.cta}
            </button>

            {/* ── 하단 보조 문구 ── */}
            <p className="mt-4 text-xs text-zinc-600">
                {t.footer}
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
