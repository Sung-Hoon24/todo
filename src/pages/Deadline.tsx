import { TaskItem } from "../components/TaskItem";
import { useTasks } from "../context/TaskContext";

export const Deadline = () => {
    const { tasks, toggleTask, deleteTask, updateTask } = useTasks();

    // Filter for tasks with deadlines (simplified logic for now)
    // In a real app, we'd compare dates. Here we just show tasks that have a dueDate property.
    const deadlineTasks = tasks.filter(t => t.dueDate && !t.completed);

    return (
        <div className="flex flex-col h-full relative">
            <div className="sticky top-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur z-10 px-4 pt-8 pb-4 border-b border-white/0">
                <div className="w-full max-w-[640px] mx-auto flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-black tracking-tight dark:text-white">Upcoming Deadlines</h1>
                        <span className="text-slate-500 dark:text-slate-400 font-medium">
                            {deadlineTasks.length} {deadlineTasks.length === 1 ? 'deadline' : 'deadlines'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-32">
                <div className="w-full max-w-[640px] mx-auto flex flex-col gap-3 mt-4">
                    {/* Grouping could happen here, but keeping it simple for now */}
                    {deadlineTasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                            onEdit={(id, newTitle) => updateTask(id, { title: newTitle })}
                        />
                    ))}

                    {deadlineTasks.length === 0 && (
                        <div className="py-20 text-center text-slate-400">
                            No upcoming deadlines.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
