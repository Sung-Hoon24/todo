import React from 'react';
import { TaskItem } from './TaskItem';
import { useTasks } from '../context/TaskContext';

interface MainTodoProps {
    filter: 'all' | 'important' | 'completed';
}

export const MainTodo: React.FC<MainTodoProps> = ({ filter }) => {
    const { tasks, toggleTask, deleteTask, updateTask } = useTasks();

    const dashboardTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'important') return task.priority === 'high';
        if (filter === 'completed') return task.completed;
        return true;
    });

    return (
        <div className="w-full flex flex-col gap-3">
            {dashboardTasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={(id, newTitle) => updateTask(id, { title: newTitle })}
                />
            ))}

            {dashboardTasks.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                    <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 shadow-inner">
                        <span className="material-symbols-outlined text-[40px]">spa</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold dark:text-white">Your day is clear</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Start by adding a task below.</p>
                    </div>
                </div>
            )}
        </div>
    );
};
