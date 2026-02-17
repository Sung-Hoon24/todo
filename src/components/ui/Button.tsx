import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

// Note: I need to install class-variance-authority or just code it manually. 
// I didn't install cva yet. I will install it or just write standard string manipulation for now to save time/dependencies 
// but cva is cleaner. I'll stick to manual clx for now to avoid extra install if not requested, 
// OR I can just install it. The prompt didn't strictly forbid it.
// Actually, I'll use standard props for now.

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
    size?: "sm" | "md" | "lg" | "icon";
    isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95";

        const variants = {
            primary: "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20",
            secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
            ghost: "text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800",
            danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20",
            outline: "border border-slate-200 text-slate-900 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-800"
        };

        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 text-sm",
            lg: "h-12 px-6 text-base",
            icon: "h-10 w-10 p-0"
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading ? (
                    <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = "Button";
