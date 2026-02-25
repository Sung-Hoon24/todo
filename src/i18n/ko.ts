// ─── 한국어 (ko) 문구 사전 ─────────────────────────────────────────
// {token} 형태의 치환 토큰을 지원한다.
// 새 키를 추가할 때 이 파일에만 작성하면 된다.

export const ko: Record<string, string> = {
    // ── common ──
    "common.close": "닫기",
    "common.upgrade": "업그레이드",
    "common.add": "추가",
    "common.save": "저장",
    "common.delete": "삭제",
    "common.edit": "수정",
    "common.test": "테스트",
    "common.logout": "로그아웃",

    // ── 에러 문구 ──
    "errors.emptyTitle": "할 일을 입력해주세요.",
    "errors.titleTooLong": "할 일 제목은 최대 {max}자까지 입력할 수 있습니다.",
    "errors.paymentFailed": "결제 중 오류가 발생했습니다. 다시 시도해 주세요.",

    // ── MainTodo / Empty State ──
    "empty.title": "오늘 할 일이 없네요!",
    "empty.desc": "아래 버튼을 눌러 새로운 할 일을 추가해 보세요.",

    // ── TaskItem ──
    "task.editPrompt": "할 일 내용을 수정하세요:",
    "task.priority.low": "낮음",
    "task.priority.medium": "중간",
    "task.priority.high": "높음",

    // ── ProgressStats ──
    "stats.title": "오늘의 달성률",
    "stats.status": "{total}개 중 {completed}개 완료",
    "stats.complete": "🎉 오늘 할 일을 모두 끝내셨네요! 대단해요!",
    "stats.keepGoing": "한 걸음씩 꾸준히! 계속 힘내봐요!",

    // ── Settings ──
    "settings.title": "설정",
    "settings.appearance": "화면 설정",
    "settings.theme": "테마",
    "settings.themeDesc": "화면 스타일을 변경합니다.",
    "settings.notifications": "알림",
    "settings.push": "푸시 알림",
    "settings.pushDesc": "마감 시간 알림을 받습니다.",
    "settings.pushStatus.unsupported": "지원하지 않는 브라우저",
    "settings.pushStatus.ready": "준비됨",
    "settings.pushStatus.blocked": "차단됨",
    "settings.pushStatus.notGranted": "권한 없음",
    "settings.pushMsg.unsupported": "이 브라우저는 알림 기능을 지원하지 않습니다.",
    "settings.pushMsg.blocked": "브라우저 설정에서 알림이 차단되어 있습니다.",
    "settings.pushMsg.required": "알림 권한이 필요합니다. 허용을 눌러주세요.",
    "settings.pushMsg.enabled": "푸시 알림이 활성화되었습니다.",
    "settings.email": "이메일 요약",
    "settings.emailDesc": "매일 아침 할 일 요약을 받습니다.",
    "settings.account": "계정",
    "settings.plan.pro": "프로 플랜",
    "settings.plan.free": "무료 플랜",
    "settings.upgradeText": "무제한 할 일을 위해 PRO로 업그레이드하세요!",
    "settings.upgradeSuccess": "축하합니다! 프리미엄 기능이 활성화되었습니다. 이제 무제한으로 할 일을 저장할 수 있습니다.",
    "settings.adminUnlock": "(관리자) 즉시 프리미엄 잠금 해제",
    "settings.manageSub": "구독 관리",

    // ── LandingGate ──
    "landing.heroTitle1": "당신의 생산성 데이터는",
    "landing.heroHighlight": "분석",
    "landing.heroTitle2": "받아야 합니다.",
    "landing.heroSub1": "추측하지 마세요. 측정하세요.",
    "landing.heroSub2": "하루의 결과를 구조화된 인사이트로 바꾸세요.",
    "landing.problem1": "할 일을 적어놓고 피하고 있진 않나요?",
    "landing.problem2": "동기가 부족한 게 아닙니다. ",
    "landing.problemBold": "피드백",
    "landing.problem3": "이 없는 겁니다.",
    "landing.value1": "AI 기반 생산성 분석",
    "landing.value2": "구조화된 데일리 인사이트",
    "landing.value3": "데이터 안전 백업 (추후)",
    "landing.cta": "내 하루 분석 시작하기 (무료)",
    "landing.footer": "회원가입 없이 바로 시작 · 데이터는 내 기기에만 저장",

    // ── UpgradeModal ──
    "upgrade.title": "프리미엄으로 업그레이드",
    "upgrade.body": "무료 버전은 최대 {limit}개까지 저장할 수 있습니다.",
    "upgrade.note": "업그레이드하면 무제한으로 사용할 수 있습니다.",

    // ── PremiumPaywall ──
    "paywall.headline": "프리미엄으로 더 귀엽고 더 강력하게 ✨",
    "paywall.subcopy": "주간 리포트 + 꾸미기 + 백업으로, '꾸준함'이 덜 힘들어집니다.",
    "paywall.benefit.report.title": "주간 리포트",
    "paywall.benefit.report.desc": "완료율과 패턴을 한눈에 확인",
    "paywall.benefit.theme.title": "꾸미기",
    "paywall.benefit.theme.desc": "감성 테마와 스티커팩 미리보기",
    "paywall.benefit.backup.title": "백업",
    "paywall.benefit.backup.desc": "기기 바꿔도 안전하게 보관",
    "paywall.previewOnly": "미리보기만 제공됩니다",
    "paywall.lab.desc": "🧪 어떤 기능이 가장 기대되나요? 관심 있는 카드를 눌러주세요!",
    "paywall.lab.pet.title": "펫 키우기 & 한정판 스킨",
    "paywall.lab.pet.desc": "할 일을 완료하며 귀여운 펫을 성장시키세요!",
    "paywall.lab.ai.title": "AI 딥 리포트",
    "paywall.lab.ai.desc": "나만의 생산성 패턴을 AI가 분석해 드려요.",
    "paywall.lab.trainer.title": "독한 트레이너 모드",
    "paywall.lab.trainer.desc": "미루기 방지! 강력한 알림과 동기부여.",
    "paywall.lab.cta": "관심 있으면 터치! 👆",
    "paywall.plan.title": "프리미엄 플랜",
    "paywall.plan.price": "$5",
    "paywall.plan.period": "/ 월",
    "paywall.plan.note": "언제든 해지 가능 · 다음 단계에서 결제 연결",
    "paywall.cta.primary": "프리미엄 시작하기",
    "paywall.cta.secondary": "나중에 할게요",
    "paywall.trust.secure": "🔐 안전한 결제 환경",
    "paywall.trust.next": "🧾 결제 전환은 다음 단계에서",
    "paywall.survey.title": "💬 잠깐! 의견을 들려주세요",
    "paywall.survey.body": "{target} 기능이 있다면 월 $5 결제 의향이 있으신가요?",
    "paywall.survey.yes": "네, 결제할 의향 있어요!",
    "paywall.survey.maybe": "고민해볼게요 🤔",
    "paywall.survey.no": "아니요, 괜찮아요",
};
