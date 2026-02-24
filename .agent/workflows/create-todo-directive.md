---
description: Todo 앱용 3-Layer 기반 Directive(SOP) 자동 생성
---

# Todo 앱 Directive (SOP)

> **프로젝트**: Test-papal-Todolist  
> **스택**: React 19 · TypeScript · Vite · TailwindCSS · Framer Motion  
> **저장소**: localStorage (Local-first)  
> **버전**: v1.1.0  
> **최종 갱신**: 2026-02-25  
> **문서 성격**: Antigravity 운영 명세 (3-Layer 기반)

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
| C-5 | **ID 유일성 보장**: Task ID는 `crypto.randomUUID()` 또는 동등 수준의 충돌 저항 전략 사용 | 데이터 충돌 |
| C-6 | **외부 서비스 의존 금지**: 서버/결제/로그인 등 외부 네트워크 호출을 핵심 CRUD 로직에 포함하지 않는다 | 오프라인 동작 불가 |

---

## 3. Scope

### 포함 ✅

- Task CRUD (생성 · 조회 · 수정 · 삭제)
- 완료 토글
- 필터링 (`all` / `important` / `completed`)
- 카테고리 분류
- 우선순위 (`low` / `medium` / `high`)
- 마감일 (ISO 8601)
- 다크 모드
- 프리미엄 10개 제한
- localStorage 영속성
- 스키마 마이그레이션

### 제외 ❌

- 서버 동기화
- 로그인/인증
- 결제 처리
- 푸시 알림
- 다중 기기 동기화

---

## 4. Data Model

```ts
interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  category?: string;
}

interface StorageSchema {
  schemaVersion: number;
  tasks: Task[];
  isPremium: boolean;
}