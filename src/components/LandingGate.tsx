import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ──────────────────────────────────────────────
   LandingGate — 첫 진입 시 표시되는 전환 최적화 랜딩 페이지
   - CTA 클릭 → /dashboard 로 이동
   - Phase 5: 외부 트래픽 전환 & CTR 측정용
   - Phase 5.2: EN/KR 언어 토글 + 자동 감지 + localStorage 저장
   ────────────────────────────────────────────── */

/* ── 다국어 텍스트 상수 ── */
const TEXT = {
    ko: {
        heroTitle1: "미루는 습관을",
        heroHighlight: "시스템",
        heroTitle2: "으로 해결하세요.",
        heroSub1: "의지력에 의존하지 마세요.",
        heroSub2: "하루를 플레이하게 만드는 완벽한 시스템입니다.",
        problem1: "오늘도 적어만 놓고 끝내지 못했나요?",
        problem2: "할 일 목록이 오히려 ",
        problemBold: "스트레스",
        problem3: "인가요?",
        value1: "뇌 빼고 실행만",
        value2: "게임 같은 성취감",
        value3: "데이터 안전 백업 (추후)",
        cta: "내 하루 플레이 시작하기 (무료)",
        footer: "회원가입 없이 바로 시작 · 데이터는 내 기기에만 저장",
    },
    en: {
        heroTitle1: "Stop procrastinating.",
        heroHighlight: "System",
        heroTitle2: "-powered productivity.",
        heroSub1: "Don't rely on willpower.",
        heroSub2: "A perfect system that makes your day playable.",
        problem1: "Another day of writing tasks but never finishing?",
        problem2: "Is your to-do list more ",
        problemBold: "stressful",
        problem3: " than helpful?",
        value1: "Zero thinking, just do it",
        value2: "Game-like achievements",
        value3: "Secure data backup (coming soon)",
        cta: "Start playing my day (free)",
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

    /* CTA 클릭 시 대시보드로 이동 */
    const handleCTA = () => {
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
