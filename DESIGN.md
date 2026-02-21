# Todo SaaS 설계 시스템 디자인 문서 (DESIGN.md)

## 1. 개요 (Overview)
본 디자인 문서는 Todo SaaS의 Premium 오토파일럿 기능을 시각적으로 돋보이게 하면서 사용자에게 직관적이고 편안한(Avoidance Mode 최소화) UI/UX를 제공하기 위한 가이드입니다.

## 2. 디자인 원칙 (Core Principles)
- **Mobile-First**: 모바일 화면(스마트폰)을 기준으로 모든 레이아웃과 카드 크기를 우선적으로 모델링합니다.
- **Dark Theme Default**: 눈의 피로도를 낮추고 심리적인 안정감을 주기 위해 다크모드를 기본 제공합니다.
- **Card-based UI**: 각 컴포넌트(할 일, 진행률 통계, 요약 리포트)를 독립된 카드 UI로 분리하여 인지 부하(Cognitive Load)를 줄입니다.
- **Less Animation**: 현란한 애니메이션은 배제하고, 즉각적인 반응성(Hover, Active 상태)에 집중하여 구조적 안정감을 최우선시합니다.

## 3. 색상 팔레트 (Color Palette)

### 3.1 Dark Mode (기본)
- **Background (Main)**: `#101922` (깊이감 있는 다크 네이비 / 블랙)
- **Background (Card/Surface)**: `#1A242F` (메인 배경보다 한 단계 밝은 다크톤)
- **Primary Accent**: `#137fec` (시선 집중 요소: 버튼, 진행률 바, 토글 등)
- **Text (Primary)**: `#F3F4F6` (가독성 높은 오프화이트)
- **Text (Secondary/Muted)**: `#9CA3AF` (보조 텍스트, 플레이스홀더)
- **Premium/Lock Accent**: `#F59E0B` (Amber-500, 프리미엄 기능과 페이월 영역을 강조하는 황금색 계열)
- **Success/Done**: `#10B981` (Emerald-500, 완료된 태스크 표시)

### 3.2 Light Mode (선택)
- **Background (Main)**: `#F6F7F8` 
- **Background (Card)**: `#FFFFFF`
- **Text (Primary)**: `#111827`
- **Text (Secondary)**: `#6B7280`

## 4. 타이포그래피 (Typography)
- **Font Family**: `Inter`, `sans-serif`
- **Heading 1**: 24px (1.5rem), Font Weight 700 (화면 제목)
- **Heading 2**: 18px (1.125rem), Font Weight 600 (카드 제목)
- **Body**: 14px (0.875rem), Font Weight 400 (기본 텍스트 및 태스크 내용)
- **Small/Muted**: 12px (0.75rem), Font Weight 400 (날짜, 라벨 등)

## 5. UI 구조 (UI Structure) & 3대 핵심 컴포넌트

**1) 오늘 할 일 (MainTodo)**
- **형태**: Card 리스트 형태
- **기능**: 사용자의 오늘 할 일을 리스트업
- **특징**: 태스크 클릭 시 체크박스가 애니메이션 없이 즉각적으로 상태(Done)를 변경함. 미완료 상태는 Primary Accent, 완료 상태는 Success Accent 적용.

**2) 통계/진행률 (ProgressStats)**
- **형태**: Card UI 상단에 배치되는 Progress Bar 또는 Chart
- **기능**: 오늘 또는 이번 주의 달성 상황을 직관적인 Bar 형태의 비율(%)로 표시.
- **특징**: "Guilt-free" 철학에 따라 남은 일을 강조하기보다, 달성한 비율(진행률)을 긍정적으로 시각화.

**3) 프리미엄 잠금 안내 (PremiumPaywall)**
- **형태**: Lock Icon(자물쇠) 아이콘과 함께 그라데이션이 적용된 프로모션 카드
- **기능**: Free 사용자의 Dashboard 하단이나 AI 기능 탭에 위치하며, Premium 결제를 유도(PayPal)
- **특징**: Premium Accent(황금색/Amber) 보더 및 아이콘을 사용하여 클릭을 유도하며 잠금 해제 시의 이점을 시각적으로 어필함.
