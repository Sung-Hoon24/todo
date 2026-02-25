import React, { useState } from "react";
import { sendRadar } from "../utils/sendRadar";
import { useI18n } from "../hooks/useI18n";

type Props = {
    // 기존에 props가 있었다면 유지해도 되지만,
    // 이번 Phase 4-1에서는 Paywall UI만 업그레이드한다.
};

/* ──────────────────────────────────────────────
   Fake Door 가설 데이터 (Phase 4-3)
   - 3가지 가설을 카드로 표시하고 클릭 시 설문 모달을 띄운다.
   - 설문 결과는 localStorage에 저장한다.
   ────────────────────────────────────────────── */

export const PremiumPaywall: React.FC<Props> = (_props) => {
    const { t } = useI18n();

    const FAKE_DOOR_HYPOTHESES = [
        {
            key: "fakeDoor_pet",           // localStorage 키
            icon: "🐣",
            title: t("paywall.lab.pet.title"),
            desc: t("paywall.lab.pet.desc"),
        },
        {
            key: "fakeDoor_ai",
            icon: "🤖",
            title: t("paywall.lab.ai.title"),
            desc: t("paywall.lab.ai.desc"),
        },
        {
            key: "fakeDoor_trainer",
            icon: "🧨",
            title: t("paywall.lab.trainer.title"),
            desc: t("paywall.lab.trainer.desc"),
        },
    ] as const;

    /* 설문 선택지 3개 (결제 의향 확인) */
    const SURVEY_OPTIONS = [
        { label: t("paywall.survey.yes"), value: "yes" },
        { label: t("paywall.survey.maybe"), value: "maybe" },
        { label: t("paywall.survey.no"), value: "no" },
    ] as const;

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
                            {t("paywall.headline")}
                        </h3>

                        {/* B. 서브카피 */}
                        <p className="mt-1 text-sm text-zinc-400">
                            {t("paywall.subcopy")}
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
                        title={t("paywall.benefit.report.title")}
                        desc={t("paywall.benefit.report.desc")}
                    />
                    <BenefitCard
                        icon="🎀"
                        title={t("paywall.benefit.theme.title")}
                        desc={t("paywall.benefit.theme.desc")}
                    />
                    <BenefitCard
                        icon="☁️"
                        title={t("paywall.benefit.backup.title")}
                        desc={t("paywall.benefit.backup.desc")}
                    />
                </div>

                {/* ═══════════════════════════════════════════
                    G. Fake Door 가설 카드 3개 (Phase 4-3)
                    - 클릭 시 설문 모달을 띄워 결제 의향 확인
                   ═══════════════════════════════════════════ */}
                <div className="mt-6">
                    <p className="text-xs text-zinc-500 mb-3">
                        {t("paywall.lab.desc")}
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
                                    {t("paywall.lab.cta")}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* D. 가격/플랜 */}
                <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <div className="text-sm text-zinc-400">{t("paywall.plan.title")}</div>
                            <div className="mt-1 flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-zinc-50">{t("paywall.plan.price")}</span>
                                <span className="text-sm text-zinc-400">{t("paywall.plan.period")}</span>
                            </div>
                            <div className="mt-1 text-xs text-zinc-500">
                                {t("paywall.plan.note")}
                            </div>
                        </div>

                        {/* E. CTA 버튼 2개 */}
                        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                            <button
                                onClick={handlePrimary}
                                className="w-full rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-amber-400 active:bg-amber-500 sm:w-auto"
                            >
                                {t("paywall.cta.primary")}
                            </button>

                            <button
                                onClick={handleSecondary}
                                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm font-medium text-zinc-200 hover:bg-zinc-900 sm:w-auto"
                            >
                                {t("paywall.cta.secondary")}
                            </button>
                        </div>
                    </div>
                </div>

                {/* F. 신뢰 요소 2개 */}
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-500">
                    <TrustPill text={t("paywall.trust.secure")} />
                    <TrustPill text={t("paywall.trust.next")} />
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
                            {t("paywall.survey.title")}
                        </h4>
                        <p className="text-sm text-zinc-400 mb-5">
                            <strong className="text-amber-400">{surveyTitle}</strong> {t("paywall.survey.body", { target: "" }).replace("  ", " ")}
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
                            {t("common.close")}
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

/* ── 하위 컴포넌트 (기존 유지) ── */

function BenefitCard(props: { icon: string; title: string; desc: string }) {
    const { t } = useI18n();
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center gap-2">
                <span className="text-lg">{props.icon}</span>
                <div className="text-sm font-semibold text-zinc-100">{props.title}</div>
            </div>
            <p className="mt-2 text-sm text-zinc-400">{props.desc}</p>
            <div className="mt-3 text-xs text-zinc-600">
                {t("paywall.previewOnly")}
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
