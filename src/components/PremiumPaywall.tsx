import React from "react";

type Props = {
    // 기존에 props가 있었다면 유지해도 되지만,
    // 이번 Phase 4-1에서는 Paywall UI만 업그레이드한다.
};

export const PremiumPaywall: React.FC<Props> = (_props) => {
    const handlePrimary = () => {
        alert("결제 연결은 다음 단계에서 진행합니다.");
    };

    const handleSecondary = () => {
        alert("좋아요! 지금은 무료로 계속 사용하실 수 있어요 🙂");
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
                            주간 리포트 + 꾸미기 + 백업으로, “꾸준함”이 덜 힘들어집니다.
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

                {/* C. 혜택 카드 3개 */}
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
        </section>
    );
};

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
