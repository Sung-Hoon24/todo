# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-02-25

### Added
- Centralized i18n system using `useI18n` hook.
- Korean dictionary (`src/i18n/ko.ts`) with hierarchical key structure.
- Support for dynamic parameter substitution in translations.

### Changed
- Migrated all hardcoded UI strings to i18n keys in the following components:
    - `MainTodo.tsx` (Empty states)
    - `TaskItem.tsx` (Priority labels, edit prompts)
    - `ProgressStats.tsx` (Progress messages)
    - `Settings.tsx` (All settings UI, push notifications, payment messages)
    - `LandingGate.tsx` (Hero, value propositions, CTA)
    - `PremiumPaywall.tsx` (Benefits, fake door labs, surveys)
- Standardized error message keys under `errors.*` namespace.
- Improved accessibility by adding i18n support to `aria-label` and `title` attributes.

### Fixed
- Potential missing translation fallbacks by ensuring `t` function returns the key if not found.
