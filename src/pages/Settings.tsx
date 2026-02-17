import { useState } from "react";
import { ThemeToggle } from "../components/ThemeToggle";

export const Settings = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    return (
        <div className="flex flex-col h-full relative">
            <div className="sticky top-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur z-10 px-4 pt-8 pb-4 border-b border-white/0">
                <div className="w-full max-w-[640px] mx-auto flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-black tracking-tight dark:text-white">Settings</h1>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-32">
                <div className="w-full max-w-[640px] mx-auto flex flex-col gap-8 mt-4">

                    {/* Appearance Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold dark:text-white">Appearance</h2>
                        <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                    <span className="material-symbols-outlined">dark_mode</span>
                                </div>
                                <div>
                                    <p className="font-medium dark:text-white">Theme</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Customize your interface theme</p>
                                </div>
                            </div>
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Notifications Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold dark:text-white">Notifications</h2>
                        <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                                        <span className="material-symbols-outlined">notifications</span>
                                    </div>
                                    <div>
                                        <p className="font-medium dark:text-white">Push Notifications</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Receive alerts for deadlines</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer transition-transform duration-150 active:scale-95">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={notificationsEnabled}
                                        onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                    <div>
                                        <p className="font-medium dark:text-white">Email Digest</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Daily summary of tasks</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer transition-transform duration-150 active:scale-95">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Account Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold dark:text-white">Account</h2>
                        <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-800 p-4">
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    alt="Avatar"
                                    className="w-16 h-16 rounded-full border border-slate-200 dark:border-slate-700"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd_6_VUY53qpw0XCSkFzj2gNS-gXfKqyQmrl2PWYLfgoOtRgUPkmI8M9TuYGgug-F9jEZXCmRNaqdrnFgVlrHXOBx0gwJM3su77XMBHI9Njm3F5H9OqirFLZxL3Yr3qCH9m9JZRt5SNG6HUdDYorxZ5IQs_LSvFwxlMFnPANMwXz3Rf0jDN21S6KB4XGk-I2WyNlgzjjRRVs4XryB97UL1K8wx0A6pwv3kmVearfn4co16Kq8wsPMUgfeqB6PTfFa6es2B4OAC_es"
                                />
                                <div>
                                    <h3 className="text-lg font-bold dark:text-white">Alex Rivera</h3>
                                    <p className="text-slate-500 dark:text-slate-400">alex.rivera@example.com</p>
                                    <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs font-bold rounded">PRO PLAN</span>
                                </div>
                            </div>
                            <button className="w-full py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                Manage Subscription
                            </button>
                            <button className="w-full mt-3 py-2.5 rounded-lg text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                                Log Out
                            </button>
                        </div>
                        <div className="text-center text-xs text-slate-400 pb-8">
                            TaskFlow v1.0.0 (Build 20231024)
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
