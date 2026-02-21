import { useState, useRef } from "react";
import { useTasks } from "../context/TaskContext";
import { MainTodo } from "../components/MainTodo";
import { ProgressStats } from "../components/ProgressStats";
import { PremiumPaywall } from "../components/PremiumPaywall";

export const Dashboard = () => {
    const { tasks, addTask } = useTasks();
    const [inputValue, setInputValue] = useState("");
    const [activeTab, setActiveTab] = useState<'all' | 'important' | 'completed'>('all');
    const inputRef = useRef<HTMLInputElement>(null);

    const remainingTasks = tasks.filter(t => !t.completed).length;

    // Dynamic Date
    const today = new Date();
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', dateOptions);

    const handleAddTask = () => {
        const val = inputValue.trim();
        if (val) {
            addTask({
                title: val,
                completed: false,
                priority: 'medium',
                category: 'Inbox',
                dueDate: new Date().toISOString()
            });
            setInputValue("");
            inputRef.current?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    };

    return (
        <div className="flex flex-col h-full relative">
            {/* Filters Header */}
            <div className="sticky top-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur z-10 px-4 pt-8 pb-4 border-b border-white/0">
                <div className="w-full max-w-[640px] mx-auto flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <h1 className="text-4xl font-black tracking-tight dark:text-white">{formattedDate}</h1>
                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">{remainingTasks} Remaining</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-lg">Your focus for today.</p>
                    </div>

                    <div className="flex gap-2 pb-1">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${activeTab === 'all' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
                        >
                            All Tasks
                        </button>
                        <button
                            onClick={() => setActiveTab('important')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${activeTab === 'important' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
                        >
                            Important
                        </button>
                        <button
                            onClick={() => setActiveTab('completed')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${activeTab === 'completed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
                        >
                            Completed
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-32">
                <div className="w-full max-w-[640px] mx-auto flex flex-col gap-2 mt-4">
                    <ProgressStats />
                    <MainTodo filter={activeTab} />
                    <PremiumPaywall />
                </div>
            </div>

            {/* Quick Entry */}
            <div className="fixed bottom-8 left-0 right-0 px-4 flex justify-center z-20 pointer-events-none">
                <div className="w-full max-w-[640px] pointer-events-auto">
                    <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-2 rounded-2xl shadow-2xl flex items-center gap-2 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                        <button
                            onClick={handleAddTask}
                            className="size-10 flex shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                        >
                            <span className="material-symbols-outlined">add</span>
                        </button>
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 font-medium py-2 px-1 outline-none"
                            placeholder="Type a new task and press Enter..."
                        />
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-400 border border-slate-200 dark:border-slate-700">
                            <span>⏎ ENTER TO ADD</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
