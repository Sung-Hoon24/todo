import { useEffect, useMemo, useState } from "react";
import { ThemeToggle } from "../components/ThemeToggle";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; // PayPal SDK 컴포넌트 임포트
import { useTasks } from "../context/TaskContext"; // 프리미엄 상태를 위해 useTasks 임포트

export const Settings = () => {
    const { isPremium, upgradeToPremium } = useTasks(); // 프리미엄 상태 및 업그레이드 함수 가져오기
    const STORAGE_KEY = "taskflow_push_enabled";

    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [pushMessage, setPushMessage] = useState<string>("");

    const permission = useMemo(() => {
        if (!("Notification" in window)) return "unsupported";
        return Notification.permission;
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY) === "true";

        if (permission === "denied" || permission === "unsupported") {
            setNotificationsEnabled(false);
            localStorage.setItem(STORAGE_KEY, "false");
            setPushMessage(
                permission === "unsupported"
                    ? "This browser does not support notifications."
                    : "Notifications are blocked in browser settings."
            );
            return;
        }

        setNotificationsEnabled(saved);

        if (saved && permission === "default") {
            setPushMessage("Permission required. Please allow notifications.");
        } else {
            setPushMessage("");
        }
    }, [permission]);

    const handleTogglePush = async () => {
        if (!notificationsEnabled) {
            if (!("Notification" in window)) {
                setNotificationsEnabled(false);
                localStorage.setItem(STORAGE_KEY, "false");
                setPushMessage("This browser does not support notifications.");
                return;
            }

            const result = await Notification.requestPermission();

            if (result === "granted") {
                setNotificationsEnabled(true);
                localStorage.setItem(STORAGE_KEY, "true");
                setPushMessage("");
            } else {
                setNotificationsEnabled(false);
                localStorage.setItem(STORAGE_KEY, "false");
                setPushMessage("Permission required. Please allow notifications.");
            }
            return;
        }

        setNotificationsEnabled(false);
        localStorage.setItem(STORAGE_KEY, "false");
        setPushMessage("");
    };

    const canTest =
        "Notification" in window &&
        Notification.permission === "granted" &&
        notificationsEnabled;

    const handleTestNotification = () => {
        if (!canTest) return;
        new Notification("TaskFlow", {
            body: "Push notifications are enabled."
        });
    };

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
                            <div className="p-4 flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                                            <span className="material-symbols-outlined">notifications</span>
                                        </div>
                                        <div>
                                            <p className="font-medium dark:text-white">Push Notifications</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Receive alerts for deadlines</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={handleTestNotification}
                                            disabled={!canTest}
                                            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all duration-150 active:scale-95
                                                ${canTest
                                                    ? "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                                                    : "border-slate-200/60 dark:border-slate-700/60 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                                                }`}
                                        >
                                            Test
                                        </button>

                                        <span className="text-xs text-slate-400">
                                            {!("Notification" in window)
                                                ? "Unsupported"
                                                : Notification.permission === "granted"
                                                    ? "Ready"
                                                    : Notification.permission === "denied"
                                                        ? "Blocked"
                                                        : "Not granted"}
                                        </span>

                                        <label className="relative inline-flex items-center cursor-pointer transition-transform duration-150 active:scale-95">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={notificationsEnabled}
                                                onChange={handleTogglePush}
                                            />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>

                                {pushMessage && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {pushMessage}
                                    </p>
                                )}
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
                                    {isPremium ? (
                                        <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs font-bold rounded">PRO PLAN</span>
                                    ) : (
                                        <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 text-xs font-bold rounded">FREE PLAN</span>
                                    )}
                                </div>
                            </div>

                            {/* 프리미엄이 아닐 때만 PayPal 결제 버튼 표시 */}
                            {!isPremium && (
                                <div className="mt-6 mb-6">
                                    <p className="text-sm font-bold mb-3 dark:text-white text-center">Upgrade to PRO for Unlimited Tasks!</p>
                                    <PayPalScriptProvider options={{ clientId: "AcDkdW0hjkRgG6-TMmmccxAQZq_GQ0eTUXY2PbvF7me3OjjOvr7s_qK_UCrJ1snDf0Wd8zehzQ_zQK4h", currency: "USD" }}>
                                        <PayPalButtons
                                            style={{ layout: "vertical", height: 40 }}
                                            createOrder={(_data, actions) => {
                                                return actions.order.create({
                                                    intent: "CAPTURE",
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                value: "9.99",
                                                                currency_code: "USD"
                                                                // @ts-ignore - amount needs currency_code
                                                            },
                                                        },
                                                    ],
                                                });
                                            }}
                                            onApprove={async (_data, actions) => {
                                                if (actions.order) {
                                                    const details = await actions.order.capture();
                                                    console.log("Transaction completed by " + details.payer?.name?.given_name);
                                                    upgradeToPremium(); // 결제 성공 시 프리미엄 권한 부여
                                                    alert("축하합니다! 프리미엄 기능이 활성화되었습니다. 이제 무제한으로 할 일을 저장할 수 있습니다.");
                                                }
                                            }}
                                            onError={(err) => {
                                                console.error("PayPal Checkout onError", err);
                                                alert("결제 중 오류가 발생했습니다. 다시 시도해 주세요.");
                                            }}
                                        />
                                    </PayPalScriptProvider>
                                    {/* 테스트를 위한 즉시 업그레이드 버튼 (개발용) */}
                                    <button
                                        onClick={() => {
                                            upgradeToPremium();
                                            alert("테스트: 프리미엄으로 업그레이드되었습니다.");
                                        }}
                                        className="w-full mt-2 py-2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                    >
                                        (Admin) Instantly Unlock Premium
                                    </button>
                                </div>
                            )}

                            {isPremium && (
                                <button className="w-full py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    Manage Subscription
                                </button>
                            )}
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
