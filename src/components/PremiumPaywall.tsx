import React, { useState } from "react";
import { sendRadar } from "../utils/sendRadar";

type Props = {
    // 기존에 props가 있었다면 유지해도 되지만,
    // 이번 Phase 4-1에서는 Paywall UI만 업그레이드한다.
};

/* ──────────────────────────────────────────────
   Fake Door 가설 데이터 (Phase 4-3)
   - 3가지 가설을 카드로 표시하고 클릭 시 설문 모달을 띄운다.
   - 설문 결과는 localStorage에 저장한다.
   ────────────────────────────────────────────── */
const FAKE_DOOR_HYPOTHESES = [
    {
        key: "fakeDoor_pet",           // localStorage 키
        icon: "🐣",
        title: "펫 키우기 & 한정판 스킨",
        desc: "할 일을 완료하며 귀여운 펫을 성장시키세요!",
    },
    {
        key: "fakeDoor_ai",
        icon: "🤖",
        title: "AI 딥 리포트",
        desc: "나만의 생산성 패턴을 AI가 분석해 드려요.",
    },
    {
        key: "fakeDoor_trainer",
        icon: "🧨",
        title: "독한 트레이너 모드",
        desc: "미루기 방지! 강력한 알림과 동기부여.",
    },
] as const;

/* 설문 선택지 3개 (결제 의향 확인) */
const SURVEY_OPTIONS = [
    { label: "네, 결제할 의향 있어요!", value: "yes" },
    { label: "고민해볼게요 🤔", value: "maybe" },
    { label: "아니요, 괜찮아요", value: "no" },
] as const;

export const PremiumPaywall: React.FC<Props> = (_props) => {
    /* 설문 모달 상태 관리 */
    const [surveyTarget, setSurveyTarget] = useState<string | null>(null);
    const [surveyTitle, setSurveyTitle] = useState("");

    const handlePrimary = () => {
        alert("결제 연결은 다음 단계에서 진행합니다.");
    };

    const handleSecondary = () => {
        alert("좋아요! 지금은 무료로 계속 사용하실 수 있어요 🙂");
    };

    /* Fake Door 카드 클릭 → 클릭 수 +1 저장 + 설문 모달 열기 */
    const handleFakeDoorClick = (key: string, title: string) => {
        try {
            // 클릭 카운트 증가 (localStorage)
            const currentCount = parseInt(localStorage.getItem(key) || "0", 10);
            localStorage.setItem(key, String(currentCount + 1));
        } catch (e) {
            console.error("[FakeDoor] localStorage 저장 실패:", e);
        }
        // 설문 모달 열기
        setSurveyTarget(key);
        setSurveyTitle(title);
        // 디스코드 레이더 전송 (fire-and-forget)
        sendRadar(`[FakeDoor] key=${key} title=${title} path=${window.location.pathname} time=${new Date().toISOString()}`);
    };

    /* 설문 응답 저장 + 모달 닫기 */
    const handleSurveyAnswer = (answer: string) => {
        if (!surveyTarget) return;
        try {
            // 예: fakeDoor_pet_survey → { yes: 2, maybe: 1, no: 0 }
            const surveyKey = `${surveyTarget}_survey`;
            const raw = localStorage.getItem(surveyKey);
            const data = raw ? JSON.parse(raw) : { yes: 0, maybe: 0, no: 0 };
            data[answer] = (data[answer] || 0) + 1;
            localStorage.setItem(surveyKey, JSON.stringify(data));
        } catch (e) {
            console.error("[FakeDoor] 설문 결과 저장 실패:", e);
        }
        // 모달 닫기
        setSurveyTarget(null);
        setSurveyTitle("");
        // 디스코드 레이더 전송 (fire-and-forget)
        sendRadar(`[FakeDoor Survey] key=${surveyTarget} answer=${answer} path=${window.location.pathname} time=${new Date().toISOString()}`);
    };

    return (
        <section className="w-full">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6">
                {/* A. 헤드라인 */}
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-zinc-50">
                            프리미엄으로 더 귀엽고 더 강력하게 ✨
                        </h3>

                        {/* B. 서브카피 */}
                        <p className="mt-1 text-sm text-zinc-400">
                            주간 리포트 + 꾸미기 + 백업으로, "꾸준함"이 덜 힘들어집니다.
                        </p>
                    </div>

                    {/* 잠금 아이콘 */}
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10"
                        aria-label="Premium Lock"
                        title="Premium"
                    >
                        <span className="text-xl">🔒</span>
                    </div>
                </div>

                {/* C. 혜택 카드 3개 (기존) */}
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <BenefitCard
                        icon="📊"
                        title="주간 리포트"
                        desc="완료율과 패턴을 한눈에 확인"
                    />
                    <BenefitCard
                        icon="🎀"
                        title="꾸미기"
                        desc="감성 테마와 스티커팩 미리보기"
                    />
                    <BenefitCard icon="☁️" title="백업" desc="기기 바꿔도 안전하게 보관" />
                </div>

                {/* ═══════════════════════════════════════════
                    G. Fake Door 가설 카드 3개 (Phase 4-3)
                    - 클릭 시 설문 모달을 띄워 결제 의향 확인
                   ═══════════════════════════════════════════ */}
                <div className="mt-6">
                    <p className="text-xs text-zinc-500 mb-3">
                        🧪 어떤 기능이 가장 기대되나요? 관심 있는 카드를 눌러주세요!
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {FAKE_DOOR_HYPOTHESES.map((h) => (
                            <button
                                key={h.key}
                                onClick={() => handleFakeDoorClick(h.key, h.title)}
                                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-left transition-colors hover:border-amber-500/50 hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{h.icon}</span>
                                    <div className="text-sm font-semibold text-zinc-100">
                                        {h.title}
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-zinc-400">{h.desc}</p>
                                <div className="mt-3 text-xs text-amber-500/70">
                                    관심 있으면 터치! 👆
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* D. 가격/플랜 */}
                <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <div className="text-sm text-zinc-400">프리미엄 플랜</div>
                            <div className="mt-1 flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-zinc-50">$5</span>
                                <span className="text-sm text-zinc-400">/ month</span>
                            </div>
                            <div className="mt-1 text-xs text-zinc-500">
                                언제든 해지 가능 · 다음 단계에서 결제 연결
                            </div>
                        </div>

                        {/* E. CTA 버튼 2개 */}
                        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                            <button
                                onClick={handlePrimary}
                                className="w-full rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-amber-400 active:bg-amber-500 sm:w-auto"
                            >
                                프리미엄 시작하기
                            </button>

                            <button
                                onClick={handleSecondary}
                                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm font-medium text-zinc-200 hover:bg-zinc-900 sm:w-auto"
                            >
                                나중에 할게요
                            </button>
                        </div>
                    </div>
                </div>

                {/* F. 신뢰 요소 2개 */}
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-500">
                    <TrustPill text="🔐 안전한 결제 환경" />
                    <TrustPill text="🧾 결제 전환은 다음 단계에서" />
                </div>
            </div>

            {/* ═══════════════════════════════════════════
                설문 모달 (Fake Door 카드 클릭 시 표시)
                - 결제 의향을 3단계로 수집
                - 결과는 localStorage에 JSON으로 저장
               ═══════════════════════════════════════════ */}
            {surveyTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-sm rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-xl">
                        <h4 className="text-base font-semibold text-zinc-50 mb-2">
                            💬 잠깐! 의견을 들려주세요
                        </h4>
                        <p className="text-sm text-zinc-400 mb-5">
                            <strong className="text-amber-400">{surveyTitle}</strong> 기능이 있다면
                            <br />월 $5 결제 의향이 있으신가요?
                        </p>

                        <div className="flex flex-col gap-2">
                            {SURVEY_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => handleSurveyAnswer(opt.value)}
                                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-200 hover:border-amber-500/50 hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>

                        {/* 닫기 버튼 (설문 무시) */}
                        <button
                            onClick={() => { setSurveyTarget(null); setSurveyTitle(""); }}
                            className="mt-4 w-full text-center text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

/* ── 하위 컴포넌트 (기존 유지) ── */

function BenefitCard(props: { icon: string; title: string; desc: string }) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center gap-2">
                <span className="text-lg">{props.icon}</span>
                <div className="text-sm font-semibold text-zinc-100">{props.title}</div>
            </div>
            <p className="mt-2 text-sm text-zinc-400">{props.desc}</p>
            <div className="mt-3 text-xs text-zinc-600">
                미리보기만 제공됩니다
            </div>
        </div>
    );
}

function TrustPill(props: { text: string }) {
    return (
        <span className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1">
            {props.text}
        </span>
    );
}
