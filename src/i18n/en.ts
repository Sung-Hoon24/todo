// ─── English (en) Translation Dictionary ─────────────────────────────────────────
// Supports substitution tokens like {token}.
// Keep the keys exactly aligned with ko.ts.

export const en: Record<string, string> = {
    // ── common ──
    "common.close": "Close",
    "common.upgrade": "Upgrade",
    "common.add": "Add",
    "common.save": "Save",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.test": "Test",
    "common.logout": "Log out",

    // ── Errors ──
    "errors.emptyTitle": "Please enter a task.",
    "errors.titleTooLong": "Task title can be up to {max} characters.",
    "errors.paymentFailed": "An error occurred during payment. Please try again.",

    // ── MainTodo / Empty State ──
    "empty.title": "Everything's clear for today!",
    "empty.desc": "Start by adding a new task below.",

    // ── TaskItem ──
    "task.editPrompt": "Edit your task:",
    "task.priority.low": "Low",
    "task.priority.medium": "Medium",
    "task.priority.high": "High",

    // ── ProgressStats ──
    "stats.title": "Today's Progress",
    "stats.status": "{completed} of {total} completed",
    "stats.complete": "🎉 You've finished everything today! Great job!",
    "stats.keepGoing": "Step by step! Keep it up!",

    // ── Settings ──
    "settings.title": "Settings",
    "settings.appearance": "Appearance",
    "settings.theme": "Theme",
    "settings.themeDesc": "Customize your interface theme",
    "settings.notifications": "Notifications",
    "settings.push": "Push Notifications",
    "settings.pushDesc": "Receive alerts for deadlines",
    "settings.pushStatus.unsupported": "Unsupported",
    "settings.pushStatus.ready": "Ready",
    "settings.pushStatus.blocked": "Blocked",
    "settings.pushStatus.notGranted": "Not Granted",
    "settings.pushMsg.unsupported": "This browser does not support push notifications.",
    "settings.pushMsg.blocked": "Notifications are blocked in your browser settings.",
    "settings.pushMsg.required": "Permission required. Please allow notifications.",
    "settings.pushMsg.enabled": "Push notifications are enabled.",
    "settings.email": "Email Digest",
    "settings.emailDesc": "Daily summary of tasks via email",
    "settings.account": "Account",
    "settings.plan.pro": "PRO Plan",
    "settings.plan.free": "Free Plan",
    "settings.upgradeText": "Upgrade to PRO for unlimited tasks!",
    "settings.upgradeSuccess": "Congratulations! Premium features are now active. You can save unlimited tasks.",
    "settings.adminUnlock": "(Admin) Instantly Unlock Premium",
    "settings.manageSub": "Manage Subscription",

    // ── LandingGate ──
    "landing.heroTitle1": "Your productivity data deserves",
    "landing.heroHighlight": "analysis",
    "landing.heroTitle2": ".",
    "landing.heroSub1": "Stop guessing. Start measuring.",
    "landing.heroSub2": "Turn your daily output into structured insights.",
    "landing.problem1": "Still writing tasks and avoiding them?",
    "landing.problem2": "You don't lack motivation. You lack ",
    "landing.problemBold": "feedback",
    "landing.problem3": ".",
    "landing.value1": "AI-powered productivity analysis",
    "landing.value2": "Structured daily insights",
    "landing.value3": "Secure data backup (Coming soon)",
    "landing.cta": "Analyze My Day (Free)",
    "landing.footer": "Start instantly without sign-up · Data stays on your device",

    // ── UpgradeModal ──
    "upgrade.title": "Upgrade to Premium",
    "upgrade.body": "Free version is limited to {limit} tasks.",
    "upgrade.note": "Upgrade to unlock unlimited storage.",

    // ── PremiumPaywall ──
    "paywall.headline": "Get Cuter and More Powerful with Premium ✨",
    "paywall.subcopy": "Weekly reports + themes + backup make consistency easier.",
    "paywall.benefit.report.title": "Weekly Report",
    "paywall.benefit.report.desc": "Check completion rates and patterns at a glance",
    "paywall.benefit.theme.title": "Customization",
    "paywall.benefit.theme.desc": "Preview aesthetic themes and stickers",
    "paywall.benefit.backup.title": "Backup",
    "paywall.benefit.backup.desc": "Keep data safe even when switching devices",
    "paywall.previewOnly": "Preview only",
    "paywall.lab.desc": "🧪 Which feature interests you most? Tap to vote!",
    "paywall.lab.pet.title": "Grow Pets & Limited Skins",
    "paywall.lab.pet.desc": "Grow your cute pet while finishing tasks!",
    "paywall.lab.ai.title": "AI Deep Report",
    "paywall.lab.ai.desc": "Let AI analyze your unique productivity patterns.",
    "paywall.lab.trainer.title": "Strict Trainer Mode",
    "paywall.lab.trainer.desc": "Anti-procrastination! Strong alerts and motivation.",
    "paywall.lab.cta": "Tap if you're interested! 👆",
    "paywall.plan.title": "Premium Plan",
    "paywall.plan.price": "$5",
    "paywall.plan.period": "/ mo",
    "paywall.plan.note": "Cancel anytime · Payment link in next step",
    "paywall.cta.primary": "Start Premium",
    "paywall.cta.secondary": "Maybe later",
    "paywall.trust.secure": "🔐 Secure Payment Environment",
    "paywall.trust.next": "🧾 Payment continues in next step",
    "paywall.survey.title": "💬 Wait! One quick question",
    "paywall.survey.body": "Would you pay $5/mo for {target} feature?",
    "paywall.survey.yes": "Yes, I'd pay for it!",
    "paywall.survey.maybe": "Let me think about it 🤔",
    "paywall.survey.no": "No, thanks",
};
