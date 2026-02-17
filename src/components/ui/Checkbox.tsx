import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> { }

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, ...props }, ref) => {
        return (
            <input
                type="checkbox"
                ref={ref}
                className={cn(
                    "w-5 h-5 rounded-md border-2 border-slate-300 dark:border-slate-600 text-primary focus:ring-primary focus:ring-offset-0 bg-transparent transition-all duration-150 active:scale-95 cursor-pointer checked:bg-primary checked:border-primary",
                    className
                )}
                {...props}
            />
        );
    }
);

Checkbox.displayName = "Checkbox";
