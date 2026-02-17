
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const MainLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-200">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                <Outlet />
                {/* Mobile FAB can go here if global */}
            </main>
        </div>
    );
};
