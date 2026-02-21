import React from 'react';

export const PremiumPaywall: React.FC = () => {
    // 결제 연결 동작 (추후 구현)
    const handleAction = () => {
        alert("결제 연결은 다음 단계에서 진행합니다.");
    };

    return (
        <div className="relative overflow-hidden w-full bg-white dark:bg-slate-800 border-2 border-amber-400/50 dark:border-amber-500/30 rounded-2xl p-6 sm:p-8 mt-8 mb-4 shadow-lg transition-all">
            {/* 배경 은은한 효과장식 (Dark mode 대응) */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full blur-3xl opacity-20 dark:opacity-10 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
                {/* A. 헤드라인 */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white mb-3">
                    프리미엄으로 더 귀엽고 더 강력하게 ✨
                </h2>

                {/* B. 서브카피 */}
                <p className="text-base text-slate-600 dark:text-slate-300 mb-8 max-w-md">
                    주간 리포트 + 테마 + 백업으로 꾸준함이 쉬워집니다.
                </p>

                {/* C. 혜택 카드 3개 */}
                <div className="w-full flex flex-col sm:flex-row gap-4 mb-8">
                    {/* 혜택 1 */}
                    <div className="flex-1 bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 text-left flex flex-col items-start transition-colors hover:border-amber-200 dark:hover:border-amber-700">
                        <span className="material-symbols-outlined text-amber-500 text-3xl mb-2">insert_chart</span>
                        <h4 className="font-bold text-slate-800 dark:text-white mb-1">주간/월간 리포트</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">통계와 리포트로 성장을 확인하세요.</p>
                    </div>
                    {/* 혜택 2 */}
                    <div className="flex-1 bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 text-left flex flex-col items-start transition-colors hover:border-amber-200 dark:hover:border-amber-700">
                        <span className="material-symbols-outlined text-amber-500 text-3xl mb-2">palette</span>
                        <h4 className="font-bold text-slate-800 dark:text-white mb-1">취향저격 꾸미기</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">다양한 테마와 감성 스티커팩 제공.</p>
                    </div>
                    {/* 혜택 3 */}
                    <div className="flex-1 bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 text-left flex flex-col items-start transition-colors hover:border-amber-200 dark:hover:border-amber-700">
                        <span className="material-symbols-outlined text-amber-500 text-3xl mb-2">cloud_sync</span>
                        <h4 className="font-bold text-slate-800 dark:text-white mb-1">안전한 데이터 백업</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">언제든 데이터를 내보내고 안전하게 보관.</p>
                    </div>
                </div>

                {/* D. 가격/플랜 영역 */}
                <div className="mb-6 flex flex-col items-center">
                    <div className="text-3xl font-extrabold text-slate-800 dark:text-white mb-1">
                        ₩6,900 <span className="text-lg font-medium text-slate-500 dark:text-slate-400">/ 월</span>
                    </div>
                    <p className="text-sm text-amber-600 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full mt-1">
                        언제든 해지 가능
                    </p>
                </div>

                {/* E. CTA 버튼 2개 */}
                <div className="flex flex-col gap-3 w-full sm:w-auto min-w-[240px]">
                    <button
                        onClick={handleAction}
                        className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-md transform transition-transform active:scale-95 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                    >
                        <span className="material-symbols-outlined text-xl">star</span>
                        프리미엄 시작하기
                    </button>
                    <button
                        onClick={handleAction}
                        className="w-full py-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
                    >
                        나중에 할게요
                    </button>
                </div>

                {/* F. 신뢰 요소 2개 */}
                <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-400 dark:text-slate-500">
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">verified_user</span>
                        <span>안전한 결제</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">lock</span>
                        <span>데이터는 내 기기/계정에만</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
