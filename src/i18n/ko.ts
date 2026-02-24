// ─── 한국어 (ko) 문구 사전 ─────────────────────────────────────────
// {token} 형태의 치환 토큰을 지원한다.
// 새 키를 추가할 때 이 파일에만 작성하면 된다.

export const ko: Record<string, string> = {
    // ── common ──
    "common.close": "닫기",
    "common.upgrade": "업그레이드",

    // ── 에러 문구 ──
    "errors.emptyTitle": "할 일을 입력해주세요.",
    "errors.titleTooLong": "할 일 제목은 최대 {max}자까지 입력할 수 있습니다.",

    // ── UpgradeModal ──
    "upgrade.title": "프리미엄으로 업그레이드",
    "upgrade.body": "무료 버전은 최대 {limit}개까지 저장할 수 있습니다.",
    "upgrade.note": "업그레이드하면 무제한으로 사용할 수 있습니다.",
};
