
import { cn } from "../lib/utils";
import { Checkbox } from "./ui/Checkbox";

export interface Task {
    id: string;
    title: string;
    completed: boolean;
    priority: "low" | "medium" | "high";
    dueDate?: string;
    category?: string;
}

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newTitle: string) => void;
}

export const TaskItem = ({ task, onToggle, onDelete, onEdit }: TaskItemProps) => {
    const priorityColors = {
        low: "text-slate-400 bg-slate-400/10",
        medium: "text-amber-500 bg-amber-500/10",
        high: "text-emerald-500 bg-emerald-500/10", // Design shows emerald for high in one, red in another. Using emerald from "Today Dashboard".
    };

    const handleEdit = () => {
        const newTitle = window.prompt("Edit task title:", task.title);
        if (newTitle && newTitle.trim() !== "") {
            onEdit(task.id, newTitle.trim());
        }
    };

    const priorityIcons = {
        low: "stat_minus_1",
        medium: "stat_1",
        high: "priority_high",
    };

    return (
        <div className="group flex items-center justify-between bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 rounded-xl hover:border-primary/50 dark:hover:border-primary/50 transition-all shadow-sm">
            <div className="flex items-center gap-4 flex-1">
                <div className="flex shrink-0">
                    <Checkbox
                        checked={task.completed}
                        onChange={() => onToggle(task.id)}
                    />
                </div>
                <div className="flex flex-col">
                    <span
                        className={cn(
                            "text-slate-900 dark:text-slate-100 font-semibold transition-all",
                            task.completed && "line-through opacity-50"
                        )}
                    >
                        {task.title}
                    </span>
                    <div className="flex items-center gap-3 mt-1">
                        <span
                            className={cn(
                                "flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded uppercase",
                                priorityColors[task.priority]
                            )}
                        >
                            <span className="material-symbols-outlined text-[12px] fill-1">
                                {priorityIcons[task.priority]}
                            </span>
                            {task.priority}
                        </span>
                        {task.dueDate && (
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">
                                    schedule
                                </span>
                                {task.dueDate}
                            </span>
                        )}
                        {task.category && (
                            <span className="text-xs text-slate-400">{task.category}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                <button
                    onClick={handleEdit}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded-lg"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        edit_note
                    </span>
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded-lg"
                >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
            </div>
        </div>
    );
};
