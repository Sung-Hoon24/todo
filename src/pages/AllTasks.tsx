import { useState, useRef } from "react";
import { TaskItem } from "../components/TaskItem";
import { useTasks } from "../context/TaskContext";

type FilterType = "all" | "active" | "completed";
type SortType = "date" | "priority" | "title";

export const AllTasks = () => {
    const { tasks, addTask, toggleTask, deleteTask, updateTask } = useTasks();
    const [filter, setFilter] = useState<FilterType>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortType>("date");
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleAddTask = () => {
        if (inputValue.trim() === "") return;
        addTask({
            title: inputValue.trim(),
            completed: false,
            priority: "medium",
            category: "Inbox",
            dueDate: undefined
        });
        setInputValue("");
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleAddTask();
        }
    };

    const taskPriorityValue = (priority: string) => {
        switch (priority) {
            case "high": return 3;
            case "medium": return 2;
            case "low": return 1;
            default: return 0;
        }
    };

    const filteredTasks = tasks
        .filter(task => {
            if (filter === "active") return !task.completed;
            if (filter === "completed") return task.completed;
            return true;
        })
        .filter(task => {
            if (searchQuery.trim() === "") return true;
            return task.title.toLowerCase().includes(searchQuery.toLowerCase());
        })
        .sort((a, b) => {
            if (sortBy === "priority") {
                return taskPriorityValue(b.priority) - taskPriorityValue(a.priority);
            }
            if (sortBy === "title") {
                return a.title.localeCompare(b.title);
            }
            // Date sort (fallback to creation order if no date, or string compare)
            // For now, simpler string compare on ID as proxy for creation, or explicit Date if available
            if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate);
            if (a.dueDate) return -1;
            if (b.dueDate) return 1;
            return 0;
        });

    return (
        <div className="flex flex-col h-full relative">
            <div className="sticky top-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur z-10 px-4 pt-8 pb-4 border-b border-white/0">
                <div className="w-full max-w-[640px] mx-auto flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-black tracking-tight dark:text-white">All Tasks</h1>
                        <span className="text-slate-500 dark:text-slate-400 font-medium">
                            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
                        </span>
                    </div>

                    {/* Search & Sort Controls */}
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900 outline-none transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <select
                            className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900 outline-none cursor-pointer"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortType)}
                        >
                            <option value="date">Date</option>
                            <option value="priority">Priority</option>
                            <option value="title">A-Z</option>
                        </select>
                    </div>

                    <div className="flex gap-2 pb-1">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${filter === 'all' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter("active")}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${filter === 'active' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setFilter("completed")}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${filter === 'completed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
                        >
                            Completed
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-32">
                <div className="w-full max-w-[640px] mx-auto flex flex-col gap-3 mt-4">
                    {filteredTasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                            onEdit={(id, newTitle) => updateTask(id, { title: newTitle })}
                        />
                    ))}

                    {filteredTasks.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center gap-2">
                            <div className="text-slate-300 dark:text-slate-700">
                                <span className="material-symbols-outlined text-[48px]">inbox</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                {searchQuery ? "No matching tasks found" : "No tasks in this list"}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Entry */}
            <div className="fixed bottom-8 left-0 right-0 px-4 flex justify-center z-20">
                <div className="w-full max-w-[640px] flex gap-2">
                    <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg flex items-center px-4 py-3 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                        <span className="material-symbols-outlined text-slate-400 mr-3">add_circle</span>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Add a new task..."
                            className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <button
                        onClick={handleAddTask}
                        className="bg-primary hover:bg-primary-dark text-white rounded-2xl w-14 h-14 flex items-center justify-center shadow-lg shadow-primary/25 transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                    >
                        <span className="material-symbols-outlined text-[28px]">add</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
