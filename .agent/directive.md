# Todo 앱 Directive (SOP)

> **프로젝트**: Test-papal-Todolist  
> **스택**: React 19 · TypeScript · Vite · TailwindCSS · Framer Motion  
> **저장소**: localStorage (Local-first)  
> **버전**: v1.0.0  
> **최종 갱신**: 2026-02-25

---

## 1. Goal

할 일(Task)을 **생성 · 조회 · 수정 · 삭제 · 완료 토글**할 수 있는 Local-first Todo 앱을 제공한다.

- 무료 사용자에게는 **최대 10개** 저장 제한을 적용한다.
- 프리미엄 사용자에게는 **무제한** 저장을 허용한다.
- 모든 데이터는 **브라우저 localStorage**에 영속 저장하며, 서버 통신 없이 동작한다.

---

## 2. Constitution (비타협 규칙)

| # | 규칙 | 위반 시 결과 |
|---|------|-------------|
| C-1 | **데이터 무손실**: Task 추가·삭제·수정 후 반드시 `localStorage.setItem` 호출 | 데이터 유실 |
| C-2 | **단일 진실 공급원(SSOT)**: `TaskContext`만이 Task 상태를 보유하고 변경한다 | 상태 불일치 |
| C-3 | **UI 문자열 하드코딩 금지**: 모든 사용자 노출 문자열은 `i18n` 키 기반으로 관리한다 | 다국어 확장 불가 |
| C-4 | **스키마 버전 필수**: localStorage 데이터에 `schemaVersion` 필드를 포함하고, 마이그레이션 로직을 반드시 구현한다 | 하위 호환 불가 |
| C-5 | **ID 유일성 보장**: Task ID는 충돌 확률이 극히 낮은 방식(`crypto.randomUUID()` 또는 36진 랜덤)으로 생성한다 | 데이터 충돌 |
| C-6 | **외부 서비스 의존 금지**: 서버/결제/로그인 등 외부 네트워크 호출을 핵심 CRUD 로직에 포함하지 않는다 | 오프라인 동작 불가 |

---

## 3. Scope

### 포함 ✅

| 기능 | 설명 |
|------|------|
| Task CRUD | 생성 · 조회 · 수정 · 삭제 |
| 완료 토글 | `completed` 필드 flip |
| 필터링 | `all` / `important` (high priority) / `completed` |
| 카테고리 분류 | `category` 필드 기반 |
| 우선순위 | `low` / `medium` / `high` 3단계 |
| 마감일 | 선택적 `dueDate` (ISO 8601) |
| 다크 모드 | `useTheme` 훅 기반 테마 전환 |
| 프리미엄 제한 | 무료 10개 제한, 프리미엄 무제한 |
| 데이터 영속성 | localStorage 읽기/쓰기 |
| 스키마 마이그레이션 | `schemaVersion` 기반 데이터 업그레이드 |

### 제외 ❌

| 항목 | 이유 |
|------|------|
| 서버 동기화 | Local-first 원칙 |
| 사용자 인증/로그인 | Scope 외 |
| 결제 처리 (PayPal 등) | Scope 외 (Paywall UI만 존재) |
| 푸시 알림 | Scope 외 |
| 다중 기기 동기화 | 서버 없음 |

---

## 4. Data Model

### 4.1 Task 스키마 (v1)

```typescript
interface Task {
  id: string;            // 고유 식별자 (36진 랜덤 또는 UUID)
  title: string;         // 할 일 제목 (1~200자)
  completed: boolean;    // 완료 여부
  priority: "low" | "medium" | "high";  // 우선순위
  dueDate?: string;      // 마감일 (ISO 8601, 선택)
  category?: string;     // 카테고리 (선택)
}
```

### 4.2 localStorage 저장 구조

```typescript
interface StorageSchema {
  schemaVersion: number;   // 현재: 1
  tasks: Task[];           // Task 배열
  isPremium: boolean;      // 프리미엄 상태
}
```

| 키 | 타입 | 기본값 | 설명 |
|----|------|--------|------|
| `todo_data` | `StorageSchema` (JSON 직렬화) | `{ schemaVersion: 1, tasks: [], isPremium: false }` | 모든 앱 데이터 통합 저장 |

### 4.3 스키마 버전 전략

```
v1 → v2 마이그레이션 예시:
- v1에 없는 필드(예: `tags: string[]`) 추가 시
- 기존 데이터에 기본값(`tags: []`)을 주입
- schemaVersion을 2로 업데이트
```

```typescript
function migrateData(raw: unknown): StorageSchema {
  const data = raw as Record<string, unknown>;
  let version = (data.schemaVersion as number) ?? 0;

  // v0 → v1: 레거시(tasks-only 배열) → StorageSchema 래핑
  if (version < 1) {
    return {
      schemaVersion: 1,
      tasks: Array.isArray(data) ? data : (data.tasks as Task[]) ?? [],
      isPremium: false,
    };
  }

  // v1 → v2: 향후 마이그레이션 슬롯
  // if (version < 2) { ... version = 2; }

  return data as StorageSchema;
}
```

---

## 5. Edge Cases

### EC-1: localStorage 파싱 실패 (데이터 손상)

| 항목 | 내용 |
|------|------|
| **트리거** | `JSON.parse()` 예외 발생, 수동 localStorage 편집, 브라우저 확장 프로그램 간섭 |
| **현재 동작** | catch 블록에서 `INITIAL_TASKS` 로 폴백 |
| **권장 동작** | ① 손상된 원본을 `todo_data_corrupt_{timestamp}`로 백업 → ② 빈 상태(`[]`)로 초기화 → ③ 사용자에게 토스트 알림 표시 |

### EC-2: localStorage 용량 한도 초과

| 항목 | 내용 |
|------|------|
| **트리거** | 약 5MB 한도 도달 (극단적 대량 입력) |
| **현재 동작** | `setItem` 시 `QuotaExceededError` 예외 미처리 |
| **권장 동작** | ① try-catch로 `setItem` 감싸기 → ② 실패 시 에러 토스트 표시 → ③ 가장 오래된 완료 Task 삭제 제안 |

### EC-3: 동일 브라우저 다중 탭 동시 편집

| 항목 | 내용 |
|------|------|
| **트리거** | 탭 A에서 Task 추가, 탭 B에서 Task 삭제 → 마지막 `setItem` 승리 (데이터 유실) |
| **현재 동작** | 탭 간 동기화 없음 |
| **권장 동작** | `window.addEventListener('storage', ...)` 이벤트로 외부 변경 감지 → state 재로드 |

### EC-4: 빈 제목 / 극단적 긴 제목 입력

| 항목 | 내용 |
|------|------|
| **트리거** | 공백만 입력, 또는 1000자 이상 제목 |
| **현재 동작** | `prompt`에서 빈 문자열 체크만 존재 |
| **권장 동작** | ① `title.trim()` 후 빈 문자열이면 거부 → ② 최대 200자 제한 → ③ 초과 시 잘라내기 + 토스트 알림 |

### EC-5: 무료 한도(10개) 도달 후 Task 추가 시도

| 항목 | 내용 |
|------|------|
| **트리거** | `!isPremium && tasks.length >= 10` 상태에서 `addTask` 호출 |
| **현재 동작** | `alert()` 차단 |
| **권장 동작** | 커스텀 모달로 변경, 프리미엄 업그레이드 CTA 포함 |

---

## 6. Execution Plan

### 3-Layer 아키텍처 매핑

```
┌─────────────────────────────────────────────────────┐
│  Layer 1: Presentation (UI)                         │
│  ─────────────────────────────                      │
│  components/   pages/   layouts/                    │
│  • TaskItem.tsx   • Dashboard.tsx   • MainLayout    │
│  • MainTodo.tsx   • AllTasks.tsx    • Sidebar       │
│  • ThemeToggle    • Settings.tsx                    │
│  • ProgressStats  • Deadline.tsx                    │
├─────────────────────────────────────────────────────┤
│  Layer 2: Business Logic                            │
│  ─────────────────────                              │
│  context/TaskContext.tsx                             │
│  • addTask (한도 검증 포함)                           │
│  • toggleTask / deleteTask / updateTask             │
│  • FREE_TASK_LIMIT = 10                             │
│  hooks/useTheme.tsx                                 │
├─────────────────────────────────────────────────────┤
│  Layer 3: Persistence (Data)                        │
│  ──────────────────────────                         │
│  localStorage (key: "todo_data")                    │
│  • migrateData(): 스키마 마이그레이션                  │
│  • saveTasks(): JSON 직렬화 + setItem               │
│  • loadTasks(): getItem + parse + 마이그레이션        │
└─────────────────────────────────────────────────────┘
```

### Phase 1: Persistence Layer 강화

| 단계 | 작업 | 파일 |
|------|------|------|
| 1-1 | `StorageSchema` 타입 정의 + `schemaVersion` 도입 | `src/types/storage.ts` [NEW] |
| 1-2 | `migrateData()` 함수 구현 (v0 → v1) | `src/services/storage.ts` [NEW] |
| 1-3 | `saveTasks()` / `loadTasks()` 단일 키 통합 | `src/services/storage.ts` |
| 1-4 | `QuotaExceededError` 처리 추가 | `src/services/storage.ts` |

### Phase 2: Business Logic Layer 리팩터링

| 단계 | 작업 | 파일 |
|------|------|------|
| 2-1 | `TaskContext`에서 직접 localStorage 접근 제거 → `storage.ts` 위임 | `src/context/TaskContext.tsx` |
| 2-2 | `title` 검증 로직 추가 (빈 문자열, 최대 길이) | `src/context/TaskContext.tsx` |
| 2-3 | `storage` 이벤트 리스너로 다중 탭 동기화 | `src/context/TaskContext.tsx` |

### Phase 3: Presentation Layer i18n 적용

| 단계 | 작업 | 파일 |
|------|------|------|
| 3-1 | i18n 키-값 맵 정의 (ko 기본) | `src/i18n/ko.ts` [NEW] |
| 3-2 | `useI18n()` 훅 구현 | `src/hooks/useI18n.ts` [NEW] |
| 3-3 | 모든 UI 하드코딩 문자열을 i18n 키로 교체 | 전체 `components/`, `pages/` |

### Phase 4: Edge Case 방어 구현

| 단계 | 작업 | 파일 |
|------|------|------|
| 4-1 | 손상 데이터 백업 + 안전 초기화 | `src/services/storage.ts` |
| 4-2 | 프리미엄 한도 도달 시 커스텀 모달 | `src/components/UpgradeModal.tsx` [NEW] |
| 4-3 | 빈 상태 UI 한국어 처리 | `src/components/MainTodo.tsx` |

---

## 7. Test Plan

### Happy Path ✅

| # | 시나리오 | 기대 결과 |
|---|---------|----------|
| H-1 | Task 생성 → 새로고침 | 생성한 Task가 그대로 표시됨 |
| H-2 | Task 완료 토글 → 새로고침 | 완료 상태가 유지됨 |
| H-3 | Task 제목 수정 → 새로고침 | 수정된 제목이 유지됨 |
| H-4 | Task 삭제 → 새로고침 | 해당 Task가 없음 |
| H-5 | 필터 `important` 선택 | `priority: "high"` Task만 표시됨 |
| H-6 | 다크 모드 전환 | 테마가 즉시 반영되고, 새로고침 후에도 유지됨 |
| H-7 | 프리미엄 활성화 → 11번째 Task 추가 | 정상 추가됨 |

### Abuse Path 🔥

| # | 시나리오 | 기대 결과 |
|---|---------|----------|
| A-1 | 무료 상태에서 11번째 Task 추가 | 방지 모달 표시, Task 추가 안 됨 |
| A-2 | DevTool로 `localStorage` 직접 조작 후 새로고침 | 스키마 마이그레이션 후 정상 로드 |
| A-3 | 제목 빈 문자열 / 공백만 입력 | 입력 거부, 에러 메시지 표시 |
| A-4 | 제목 200자 초과 입력 | 200자로 잘림 + 토스트 알림 |
| A-5 | 동일 브라우저 2개 탭에서 동시 수정 | `storage` 이벤트로 양쪽 동기화 |

### Disaster Path 💀

| # | 시나리오 | 기대 결과 |
|---|---------|----------|
| D-1 | `localStorage` 데이터가 `undefined` / 빈 문자열 | 빈 Task 목록으로 안전 초기화 |
| D-2 | `JSON.parse` 실패 (깨진 JSON) | 손상 원본 백업 → 빈 상태 초기화 → 토스트 알림 |
| D-3 | localStorage `QuotaExceededError` 발생 | 저장 실패 토스트 + 완료된 오래된 Task 삭제 제안 |
| D-4 | `schemaVersion` 미래 버전 (다운그레이드 시) | "지원하지 않는 버전" 경고 표시, 데이터 유지 |

---

## 8. CHANGELOG (append-only)

| 날짜 | 버전 | 변경 내용 |
|------|------|----------|
| 2026-02-25 | v1.0.0 | 최초 Directive 작성. 현재 프로젝트 구조 분석 기반 3-Layer SOP 수립 |
