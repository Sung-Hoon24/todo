import React from 'react';
import { useTasks } from '../context/TaskContext';

export const ProgressStats: React.FC = () => {
    const { tasks } = useTasks();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;

    const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return (
        <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 mb-6 shadow-sm">
            {/* 진행률 텍스트 영역 */}
            <div className="flex justify-between items-end mb-3">
                <div>
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                        Today's Progress
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {completedTasks} of {totalTasks} tasks completed
                    </p>
                </div>
                <div className="text-2xl font-bold text-primary">
                    {progressPercentage}%
                </div>
            </div>

            {/* 진행률 바 (Progress Bar) 영역 */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                <div
                    className="bg-primary h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
            {/* 긍정적 메시지 (Guilt-Free Philosophy) */}
            <div className="mt-3 text-xs text-slate-400 dark:text-slate-500 text-right">
                {progressPercentage === 100 && totalTasks > 0 ? '🎉 All done for today! Great job!' : 'Every step counts. Keep it up!'}
            </div>
        </div>
    );
};
