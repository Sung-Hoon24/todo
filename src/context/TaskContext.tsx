import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Task } from '../components/TaskItem';

interface TaskContextType {
    tasks: Task[];
    isPremium: boolean; // 프리미엄 여부 상태 추가
    addTask: (task: Omit<Task, 'id'>) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    upgradeToPremium: () => void; // 무제한 프리미엄 전환 함수 추가
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};

// Dummy initial data - used only if localStorage is empty
const INITIAL_TASKS: Task[] = [
    {
        id: "1",
        title: "Prepare project proposal",
        completed: true,
        priority: "high",
        dueDate: "2023-10-25T17:00:00",
        category: "Work",
    },
    {
        id: "2",
        title: "Email the design team",
        completed: false,
        priority: "medium",
        category: "Work",
    },
    {
        id: "3",
        title: "Buy groceries",
        completed: false,
        priority: "low",
        category: "Personal",
    },
    {
        id: "4",
        title: "Schedule dentist appointment",
        completed: true,
        priority: "medium",
        category: "Health",
    },
    {
        id: "5",
        title: "Review quarterly goals",
        completed: false,
        priority: "low",
        dueDate: "2023-10-26T10:00:00",
        category: "Work",
    },
    {
        id: "6",
        title: "Submit tax documents",
        completed: false,
        priority: "high",
        dueDate: "2023-10-28T09:00:00",
        category: "Finance",
    },
];

const FREE_TASK_LIMIT = 10; // 무료 사용자 할 일 저장 한도

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    // 프리미엄 상태 초기화 (localStorage에서 읽어옴)
    const [isPremium, setIsPremium] = useState<boolean>(() => {
        return localStorage.getItem('isPremium') === 'true';
    });

    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem('tasks');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse tasks from localStorage", e);
                return INITIAL_TASKS;
            }
        }
        return INITIAL_TASKS;
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // 프리미엄 상태 변경 시 localStorage 동기화
    useEffect(() => {
        localStorage.setItem('isPremium', isPremium.toString());
    }, [isPremium]);

    const upgradeToPremium = () => {
        setIsPremium(true);
        console.log("Premium unlocked: Unlimited todo saving enabled.");
    };

    const addTask = (newTask: Omit<Task, 'id'>) => {
        // 프리미엄이 아니고 저장 한도에 도달했을 경우 추가 방지
        if (!isPremium && tasks.length >= FREE_TASK_LIMIT) {
            alert(`무료 버전은 최대 ${FREE_TASK_LIMIT}개까지만 저장할 수 있습니다. 프리미엄으로 업그레이드하고 무제한으로 사용하세요!`);
            return;
        }

        const task: Task = {
            ...newTask,
            id: Math.random().toString(36).substr(2, 9),
        };
        setTasks((prev) => [task, ...prev]);
    };

    const toggleTask = (id: string) => {
        setTasks((prev) => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter(t => t.id !== id));
    };

    const updateTask = (id: string, updates: Partial<Task>) => {
        setTasks((prev) => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            isPremium,
            addTask,
            toggleTask,
            deleteTask,
            updateTask,
            upgradeToPremium
        }}>
            {children}
        </TaskContext.Provider>
    );
};
