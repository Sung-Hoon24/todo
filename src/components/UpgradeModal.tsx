import { cn } from "../lib/utils";
import { useI18n } from "../hooks/useI18n";

interface UpgradeModalProps {
    open: boolean;
    limit: number;
    onClose: () => void;
    onUpgrade: () => void;
}

export const UpgradeModal = ({ open, limit, onClose, onUpgrade }: UpgradeModalProps) => {
    const { t } = useI18n();

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className={cn(
                "relative z-10 w-full max-w-md mx-4 p-6 rounded-2xl shadow-2xl",
                "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800",
                "animate-in fade-in zoom-in-95"
            )}>
                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="size-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                        <span className="material-symbols-outlined text-white text-[32px]">
                            workspace_premium
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
                    {t("upgrade.title")}
                </h2>

                {/* Body */}
                <p className="text-center text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                    {t("upgrade.body", { limit })}<br />
                    {t("upgrade.note")}
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className={cn(
                            "flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-all",
                            "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300",
                            "hover:bg-slate-200 dark:hover:bg-slate-700",
                            "active:scale-[0.98]"
                        )}
                    >
                        {t("common.close")}
                    </button>
                    <button
                        onClick={onUpgrade}
                        className={cn(
                            "flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-all",
                            "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
                            "hover:from-amber-600 hover:to-orange-600",
                            "shadow-lg shadow-orange-500/25",
                            "active:scale-[0.98]"
                        )}
                    >
                        {t("common.upgrade")}
                    </button>
                </div>
            </div>
        </div>
    );
};
