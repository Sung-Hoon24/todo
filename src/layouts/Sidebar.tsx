
import { NavLink } from "react-router-dom";
import { cn } from "../lib/utils";
import { ThemeToggle } from "../components/ThemeToggle";

export const Sidebar = () => {
    const navItems = [
        { icon: "dashboard", label: "Dashboard", path: "/" },
        { icon: "list", label: "All Tasks", path: "/all-tasks" },
        { icon: "schedule", label: "Due", path: "/deadline" },
        { icon: "settings", label: "Settings", path: "/settings" },
    ];

    return (
        <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111a22] hidden md:flex flex-col transition-colors duration-200">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-primary rounded-lg p-1.5 flex items-center justify-center text-white">
                        <span className="material-symbols-outlined">bolt</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold leading-none dark:text-white">TaskFlow</h1>
                        <p className="text-xs text-slate-500 dark:text-[#92adc9]">Productivity Simplified</p>
                    </div>
                </div>

                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#233648]"
                                )
                            }
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="text-sm">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800">
                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                            isActive
                                ? "bg-primary/10 text-primary"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#233648]"
                        )
                    }
                >
                    <span className="material-symbols-outlined">settings</span>
                    <span className="text-sm">Settings</span>
                </NavLink>

                <div className="mt-4 flex items-center justify-between px-3">
                    <div className="flex items-center gap-3">
                        <img
                            alt="Avatar"
                            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd_6_VUY53qpw0XCSkFzj2gNS-gXfKqyQmrl2PWYLfgoOtRgUPkmI8M9TuYGgug-F9jEZXCmRNaqdrnFgVlrHXOBx0gwJM3su77XMBHI9Njm3F5H9OqirFLZxL3Yr3qCH9m9JZRt5SNG6HUdDYorxZ5IQs_LSvFwxlMFnPANMwXz3Rf0jDN21S6KB4XGk-I2WyNlgzjjRRVs4XryB97UL1K8wx0A6pwv3kmVearfn4co16Kq8wsPMUgfeqB6PTfFa6es2B4OAC_es"
                        />
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate dark:text-white">Alex Rivera</p>
                            <p className="text-xs text-slate-500 dark:text-[#92adc9] truncate">Pro Plan</p>
                        </div>
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </aside>
    );
};
