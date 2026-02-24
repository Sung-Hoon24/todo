// ─── Storage Schema & Constants ─────────────────────────────────────
// 모든 localStorage 데이터의 단일 진실 공급원 (SSOT)

export const CURRENT_SCHEMA_VERSION = 1;
export const STORAGE_KEY = "todo_data";

// ─── Task ───────────────────────────────────────────────────────────

export interface Task {
    id: string;
    title: string;
    completed: boolean;
    priority: "low" | "medium" | "high";
    dueDate?: string;
    category?: string;
}

// ─── Persistence Types ──────────────────────────────────────────────

export interface StorageSchema {
    schemaVersion: number;
    tasks: Task[];
    isPremium: boolean;
}

/** loadStorage()가 반환하는 메타 정보 */
export interface LoadMeta {
    /** JSON 파싱 실패 후 빈 데이터로 복구되었는지 */
    repaired: boolean;
    /** 손상 원본이 백업 키에 저장되었는지 */
    backedUpCorrupt: boolean;
    /** 저장소 schemaVersion이 앱보다 높은(미래) 버전인지 */
    futureVersion: boolean;
}

export type SaveResult =
    | { ok: true }
    | { ok: false; reason: "quota" | "unknown" };
