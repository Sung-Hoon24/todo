import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
import type { Task, StorageSchema } from '../types/storage';
import { CURRENT_SCHEMA_VERSION } from '../types/storage';
import { loadStorage, saveStorage } from '../services/storage';
import { UpgradeModal } from '../components/UpgradeModal';
import { useI18n } from '../hooks/useI18n';

// ─── Re-export Task for downstream consumers ───────────────────────
export type { Task };

interface TaskContextType {
    tasks: Task[];
    isPremium: boolean;
    addTask: (task: Omit<Task, 'id'>) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    upgradeToPremium: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};

const FREE_TASK_LIMIT = 10; // 무료 사용자 할 일 저장 한도
const MAX_TITLE_LENGTH = 200; // 할 일 제목 최대 길이

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    // ── 초기 로드: storage 서비스에서 데이터 + 메타 수신
    const [storageReady, setStorageReady] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const { t } = useI18n();

    const [isPremium, setIsPremium] = useState<boolean>(false);
    const [tasks, setTasks] = useState<Task[]>([]);

    // 초기화 시 한 번만 loadStorage 호출
    const initialized = useRef(false);
    // 외부 탭 변경으로 인한 setState인지 구분 (무한 루프 방지)
    const externalUpdate = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const { data, meta } = loadStorage();

        if (meta.repaired) {
            console.warn('[storage] 데이터 복구됨 (repaired)');
        }
        if (meta.backedUpCorrupt) {
            console.warn('[storage] 손상 원본 백업 완료');
        }
        if (meta.futureVersion) {
            console.warn('[storage] 앱보다 높은 schemaVersion 감지 — 데이터 보존');
        }

        setTasks(data.tasks);
        setIsPremium(data.isPremium);
        setStorageReady(true);
    }, []);

    // ── 다중 탭 동기화: 다른 탭에서 todo_data 변경 시 state 갱신
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key !== 'todo_data') return;

            console.warn('[storage] 외부 탭 변경 감지 — 동기화');
            const { data } = loadStorage();
            externalUpdate.current = true;
            setTasks(data.tasks);
            setIsPremium(data.isPremium);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // ── 저장: tasks 또는 isPremium 변경 시 storage 서비스로 위임
    useEffect(() => {
        if (!storageReady) return; // 초기 로드 전에는 저장하지 않음

        // 외부 탭 동기화로 인한 setState면 저장 스킵 (이미 저장된 데이터)
        if (externalUpdate.current) {
            externalUpdate.current = false;
            return;
        }

        const schema: StorageSchema = {
            schemaVersion: CURRENT_SCHEMA_VERSION,
            tasks,
            isPremium,
        };
        const result = saveStorage(schema);

        if (!result.ok) {
            console.warn(`[storage] 저장 실패: ${result.reason}`);
            // TODO(Phase 3): i18n 토스트 알림
        }
    }, [tasks, isPremium, storageReady]);

    const upgradeToPremium = () => {
        setIsPremium(true);
        console.log("Premium unlocked: Unlimited todo saving enabled.");
    };

    const addTask = (newTask: Omit<Task, 'id'>) => {
        // ── 제목 빈 값 방어
        const trimmedTitle = newTask.title.trim();
        if (!trimmedTitle) {
            alert(t('errors.emptyTitle'));
            return;
        }

        // ── 제목 길이 제한
        if (trimmedTitle.length > MAX_TITLE_LENGTH) {
            alert(t('errors.titleTooLong', { max: MAX_TITLE_LENGTH }));
            return;
        }

        // 프리미엄이 아니고 저장 한도에 도달했을 경우 추가 방지
        if (!isPremium && tasks.length >= FREE_TASK_LIMIT) {
            setShowUpgradeModal(true);
            return;
        }

        const task: Task = {
            ...newTask,
            title: trimmedTitle,
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
            <UpgradeModal
                open={showUpgradeModal}
                limit={FREE_TASK_LIMIT}
                onClose={() => setShowUpgradeModal(false)}
                onUpgrade={() => {
                    upgradeToPremium();
                    setShowUpgradeModal(false);
                }}
            />
        </TaskContext.Provider>
    );
};
