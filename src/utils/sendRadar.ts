/* ──────────────────────────────────────────────
   sendRadar — Discord Webhook으로 이벤트를 전송하는 유틸리티
   - VITE_DISCORD_WEBHOOK_URL 환경변수에서 Webhook URL을 읽음
   - 실패해도 앱 동작에 영향 없음 (fire-and-forget)
   - Phase 8: 외부 유저 클릭 실시간 모니터링용
   ────────────────────────────────────────────── */

/* 디스코드 Webhook URL (Vercel 환경변수 또는 .env.local) */
const WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL || "";

/**
 * 디스코드 채널에 이벤트 메시지를 전송한다.
 * - Webhook URL이 없으면 조용히 무시 (개발 환경 안전)
 * - 네트워크 실패 시에도 앱은 정상 동작
 * @param message 전송할 메시지 문자열
 */
export function sendRadar(message: string): void {
    if (!WEBHOOK_URL) {
        // Webhook URL이 설정되지 않으면 콘솔에만 표시
        console.info("[Radar] Webhook URL 미설정 — 로컬 로그만:", message);
        return;
    }

    try {
        // fire-and-forget: await 하지 않아 앱 흐름을 차단하지 않음
        fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: message,
            }),
        }).catch((err) => {
            console.warn("[Radar] 전송 실패 (무시됨):", err);
        });
    } catch (e) {
        console.warn("[Radar] 전송 중 에러 (무시됨):", e);
    }
}
