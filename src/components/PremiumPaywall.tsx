import React from 'react';

export const PremiumPaywall: React.FC = () => {
    return (
        <div className="relative overflow-hidden w-full bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-900 border border-amber-200 dark:border-amber-700/50 rounded-2xl p-6 mt-8 mb-4 shadow-sm group cursor-pointer transition-all hover:shadow-md">
            {/* 배경 은은한 효과장식 (Dark mode 대응) */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full blur-3xl opacity-20 dark:opacity-10 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
                {/* 자물쇠(Lock) 아이콘 */}
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-[28px]">lock</span>
                </div>

                {/* 타이틀 및 혜택 설명 */}
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                    Unlock Premium Autopilot
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 max-w-sm">
                    Let AI organize your day. Get natural language task creation, smart auto-scheduling, and unlimited storage.
                </p>

                {/* 업그레이드 유도 버튼 */}
                <button className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-sm hover:shadow-md active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    Upgrade via PayPal
                </button>
            </div>
        </div>
    );
};
