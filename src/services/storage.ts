// ─── Storage Service ────────────────────────────────────────────────
// localStorage 읽기/쓰기를 단일 모듈로 통합.
// TaskContext는 이 모듈만 호출하며 localStorage에 직접 접근하지 않는다.

import {
    CURRENT_SCHEMA_VERSION,
    STORAGE_KEY,
    type LoadMeta,
    type SaveResult,
    type StorageSchema,
    type Task,
} from "../types/storage";

// ─── Helpers ────────────────────────────────────────────────────────

/** JSON.parse를 안전하게 감싸는 래퍼. 실패 시 null 반환. */
export function safeParse(json: string): unknown | null {
    try {
        return JSON.parse(json);
    } catch {
        return null;
    }
}

/** 비어 있는 v1 StorageSchema 생성 */
export function createInitialStorage(): StorageSchema {
    return {
        schemaVersion: CURRENT_SCHEMA_VERSION,
        tasks: [],
        isPremium: false,
    };
}

// ─── Migration ──────────────────────────────────────────────────────

interface MigrateResult {
    data: StorageSchema;
    futureVersion: boolean;
}

/**
 * 임의의 raw 데이터를 최신 StorageSchema로 마이그레이션한다.
 *
 * - v0 (레거시): Task[] 배열만 저장된 경우 → v1 래핑
 * - v1: 현재 버전 — 그대로 반환
 * - 미래 버전: 데이터를 건드리지 않고 futureVersion 플래그만 설정
 */
export function migrateData(raw: unknown): MigrateResult {
    // ── Case 1: 레거시 형태 — 최상위가 배열(Task[])인 경우
    if (Array.isArray(raw)) {
        return {
            data: {
                schemaVersion: CURRENT_SCHEMA_VERSION,
                tasks: raw as Task[],
                isPremium: false,
            },
            futureVersion: false,
        };
    }

    // ── Case 2: 객체 형태
    if (raw !== null && typeof raw === "object") {
        const obj = raw as Record<string, unknown>;
        const version =
            typeof obj.schemaVersion === "number" ? obj.schemaVersion : 0;

        // 미래 버전 — 데이터 보존, 경고만
        if (version > CURRENT_SCHEMA_VERSION) {
            return {
                data: raw as StorageSchema,
                futureVersion: true,
            };
        }

        // v0 (schemaVersion 누락 또는 0) → v1
        if (version < 1) {
            return {
                data: {
                    schemaVersion: CURRENT_SCHEMA_VERSION,
                    tasks: Array.isArray(obj.tasks) ? (obj.tasks as Task[]) : [],
                    isPremium: obj.isPremium === true,
                },
                futureVersion: false,
            };
        }

        // v1 정상
        return {
            data: raw as StorageSchema,
            futureVersion: false,
        };
    }

    // ── Case 3: 전혀 예상 못 한 타입 → 초기 상태로 복구
    return {
        data: createInitialStorage(),
        futureVersion: false,
    };
}

// ─── Load ───────────────────────────────────────────────────────────

interface LoadResult {
    data: StorageSchema;
    meta: LoadMeta;
}

/**
 * localStorage에서 데이터를 읽고 마이그레이션한 뒤 반환한다.
 * JSON 파싱 실패 시 손상 원본을 백업 키에 보존하고 빈 상태로 복구한다.
 */
export function loadStorage(): LoadResult {
    const meta: LoadMeta = {
        repaired: false,
        backedUpCorrupt: false,
        futureVersion: false,
    };

    const raw = localStorage.getItem(STORAGE_KEY);

    // ── 키가 아예 없으면 → 레거시 키 탐색 후 초기값
    if (raw === null) {
        // 기존 분리 키("tasks", "isPremium")가 있으면 마이그레이션
        const legacyTasks = localStorage.getItem("tasks");
        const legacyPremium = localStorage.getItem("isPremium");

        if (legacyTasks !== null) {
            const parsed = safeParse(legacyTasks);
            if (Array.isArray(parsed)) {
                const migrated: StorageSchema = {
                    schemaVersion: CURRENT_SCHEMA_VERSION,
                    tasks: parsed as Task[],
                    isPremium: legacyPremium === "true",
                };
                // 통합 키로 저장하고 레거시 키 제거
                saveStorage(migrated);
                localStorage.removeItem("tasks");
                localStorage.removeItem("isPremium");
                meta.repaired = true;
                return { data: migrated, meta };
            }
        }

        return { data: createInitialStorage(), meta };
    }

    // ── JSON 파싱 시도
    const parsed = safeParse(raw);

    if (parsed === null) {
        // 손상 — 백업 후 복구
        const backupKey = `${STORAGE_KEY}_corrupt_${Date.now()}`;
        try {
            localStorage.setItem(backupKey, raw);
            meta.backedUpCorrupt = true;
        } catch {
            // 백업 실패(용량 초과 등)는 무시
        }
        meta.repaired = true;
        const initial = createInitialStorage();
        saveStorage(initial);
        return { data: initial, meta };
    }

    // ── 마이그레이션
    const { data, futureVersion } = migrateData(parsed);
    meta.futureVersion = futureVersion;

    return { data, meta };
}

// ─── Save ───────────────────────────────────────────────────────────

/**
 * StorageSchema를 localStorage에 저장한다.
 * QuotaExceededError 발생 시 { ok: false, reason: "quota" }를 반환한다.
 */
export function saveStorage(next: StorageSchema): SaveResult {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return { ok: true };
    } catch (e: unknown) {
        if (
            e instanceof DOMException &&
            (e.name === "QuotaExceededError" ||
                e.code === DOMException.QUOTA_EXCEEDED_ERR)
        ) {
            return { ok: false, reason: "quota" };
        }
        return { ok: false, reason: "unknown" };
    }
}
