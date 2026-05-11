/**
 * Static mock data for the Marketing & Social AI Employee preview.
 * No network calls — design review only.
 */

export type MockMarketingAccent = "cyan" | "violet" | "emerald";

export type MockMarketingAgent = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  accent: MockMarketingAccent;
  /** Simulated tasks in the last 24h */
  mockTasks24h: number;
  lastActivityLabel: string;
};

export type MockWeeklyStrategy = {
  weekLabel: string;
  theme: string;
  pillars: string[];
  audienceFocus: string;
  ctaTheme: string;
};

export type MockCalendarDay = {
  day: string;
  dateLabel: string;
  slots: { time: string; topic: string; platform: string; format: string }[];
};

export type MockPostDraft = {
  id: string;
  platform: string;
  headline: string;
  bodyPreview: string;
  status: "Draft" | "Ready for review" | "Scheduled";
};

export type MockVideoScript = {
  id: string;
  title: string;
  durationSec: number;
  hook: string;
  beats: string[];
};

export type MockContentApproval = {
  id: string;
  title: string;
  type: "Post" | "Carousel" | "Reel script" | "Thread";
  submittedAtLabel: string;
  priority: "Normal" | "High";
};

export type MockPlatformStat = {
  platform: string;
  handle: string;
  reachMock: number;
  engagementRatePct: number;
  postsThisWeek: number;
  trendLabel: string;
};

export type MockHook = {
  id: string;
  text: string;
  scoreLabel: string;
  usedIn: string;
};

export type MockNextAction = {
  id: string;
  title: string;
  detail: string;
  ownerAgent: string;
};

export const MOCK_MARKETING_AGENTS: MockMarketingAgent[] = [
  {
    id: "strategist",
    title: "Marketing Strategist Agent",
    subtitle: "marketing.strategist",
    description:
      "Aligns weekly themes with pipeline goals, brand voice, and seasonal offers so every asset pulls toward revenue.",
    accent: "cyan",
    mockTasks24h: 14,
    lastActivityLabel: "4m ago · mock",
  },
  {
    id: "planner",
    title: "Content Planner Agent",
    subtitle: "marketing.planner",
    description:
      "Builds a balanced calendar across platforms, pacing hero content with nurture posts and proof moments.",
    accent: "violet",
    mockTasks24h: 22,
    lastActivityLabel: "12m ago · mock",
  },
  {
    id: "hook-script",
    title: "Hook & Script Writer Agent",
    subtitle: "marketing.hooks",
    description:
      "Drafts scroll-stopping hooks and beat sheets for short-form video so editors ship faster with less rewrite.",
    accent: "emerald",
    mockTasks24h: 18,
    lastActivityLabel: "8m ago · mock",
  },
  {
    id: "social-writer",
    title: "Social Post Writer Agent",
    subtitle: "marketing.social_writer",
    description:
      "Turns briefs into platform-native copy — character counts, CTA rhythm, and compliance guardrails included.",
    accent: "cyan",
    mockTasks24h: 31,
    lastActivityLabel: "1m ago · mock",
  },
  {
    id: "visual-prompt",
    title: "Visual Prompt Agent",
    subtitle: "marketing.visual",
    description:
      "Produces image and carousel prompts that match brand palettes and aspect ratios for each network.",
    accent: "violet",
    mockTasks24h: 9,
    lastActivityLabel: "25m ago · mock",
  },
  {
    id: "scheduler",
    title: "Social Scheduler Agent",
    subtitle: "marketing.scheduler",
    description:
      "Queues approved assets into optimal send windows, avoids collisions, and reserves slots for reactive trends.",
    accent: "emerald",
    mockTasks24h: 26,
    lastActivityLabel: "3m ago · mock",
  },
  {
    id: "community",
    title: "Community Engagement Agent",
    subtitle: "marketing.community",
    description:
      "Drafts replies, DMs, and comment threads with escalation paths when sentiment or legal risk spikes.",
    accent: "cyan",
    mockTasks24h: 44,
    lastActivityLabel: "just now · mock",
  },
  {
    id: "analytics",
    title: "Marketing Analytics Agent",
    subtitle: "marketing.analytics",
    description:
      "Summarizes what is working by hook, format, and source — feeding the strategist for the next weekly plan.",
    accent: "violet",
    mockTasks24h: 7,
    lastActivityLabel: "41m ago · mock",
  },
];

export const MOCK_WEEKLY_STRATEGY: MockWeeklyStrategy = {
  weekLabel: "Week of May 5",
  theme: "Proof-first storytelling • AI productivity for small teams • limited-time onboarding clarity",
  pillars: [
    "Before/after style customer proof on LinkedIn",
    "Reels that open with contrarian hooks, close with a single CTA",
    "Comment-to-DM nurture on announcement threads (mock workflow only)",
  ],
  audienceFocus: "Ops-minded owners in trades & logistics — time-starved, skeptical of hype, reward clarity.",
  ctaTheme: "Book a 20-minute workflow audit — calendar linked in bio (mock).",
};

export const MOCK_CONTENT_CALENDAR: MockCalendarDay[] = [
  {
    day: "Mon",
    dateLabel: "May 5",
    slots: [
      { time: "08:00", topic: "Weekly plan recap (carousel)", platform: "LinkedIn", format: "Carousel" },
      { time: "12:30", topic: "Hook teardown snippet", platform: "Instagram Reels", format: "Short video" },
    ],
  },
  {
    day: "Tue",
    dateLabel: "May 6",
    slots: [
      { time: "09:15", topic: "Customer win quote card", platform: "LinkedIn", format: "Image" },
      { time: "17:00", topic: "FAQ — pricing objection", platform: "X", format: "Thread" },
    ],
  },
  {
    day: "Wed",
    dateLabel: "May 7",
    slots: [
      { time: "10:00", topic: "Behind-the-scenes: intake workflow", platform: "Instagram Reels", format: "Short video" },
    ],
  },
  {
    day: "Thu",
    dateLabel: "May 8",
    slots: [
      { time: "08:45", topic: "Industry stat + Mercy take", platform: "LinkedIn", format: "Text" },
      { time: "15:20", topic: "Meme-format pain point", platform: "Instagram", format: "Story set" },
    ],
  },
  {
    day: "Fri",
    dateLabel: "May 9",
    slots: [
      { time: "11:00", topic: "Founder voice note (script)", platform: "LinkedIn", format: "Video" },
    ],
  },
  {
    day: "Sat",
    dateLabel: "May 10",
    slots: [{ time: "10:30", topic: "Weekend tip — missed calls cost", platform: "Instagram Reels", format: "Short video" }],
  },
  {
    day: "Sun",
    dateLabel: "May 11",
    slots: [{ time: "18:00", topic: "Week ahead teaser", platform: "X", format: "Post" }],
  },
];

export const MOCK_SOCIAL_DRAFTS: MockPostDraft[] = [
  {
    id: "d1",
    platform: "LinkedIn",
    headline: "Your phone isn’t ‘busy.’ It’s silently burning revenue.",
    bodyPreview:
      "Most teams think missed calls are a staffing issue. They’re a systems issue. Here’s the 3-step fix we use with owners who…",
    status: "Ready for review",
  },
  {
    id: "d2",
    platform: "Instagram",
    headline: "POV: the lead form filled out 4 hours ago.",
    bodyPreview:
      "Still no reply. That isn’t ‘being careful.’ It’s handing the deal to whoever responds first. (Mercy replies in under a…",
    status: "Draft",
  },
  {
    id: "d3",
    platform: "X",
    headline: "Hot take: speed-to-lead beats perfect copy.",
    bodyPreview:
      "You can always edit a fast draft. You can’t unsend silence. Thread ↓ with the exact reply template we give CS teams…",
    status: "Draft",
  },
];

export const MOCK_VIDEO_SCRIPTS: MockVideoScript[] = [
  {
    id: "v1",
    title: "3 signs your front desk is leaking money",
    durationSec: 42,
    hook: "If your calls go to voicemail more than once a day, you’re not understaffed — you’re underautomated.",
    beats: ["Pain hook", "Quick stat sticker", "Mercy pattern interrupt", "Single CTA to audit"],
  },
  {
    id: "v2",
    title: "What we’d fix in your intake in 20 minutes",
    durationSec: 58,
    hook: "Give me your website and your hours — I’ll show you the hole in your funnel without logging into anything.",
    beats: ["Screen-style narration", "Two mock examples", "Trust line", "Book audit CTA"],
  },
];

export const MOCK_CONTENT_APPROVALS: MockContentApproval[] = [
  {
    id: "a1",
    title: "Carousel: ‘Missed call math’ (5 slides)",
    type: "Carousel",
    submittedAtLabel: "Today · 09:12",
    priority: "High",
  },
  {
    id: "a2",
    title: "Reel script: dispatcher handoff joke (brand-safe)",
    type: "Reel script",
    submittedAtLabel: "Yesterday · 16:40",
    priority: "Normal",
  },
  {
    id: "a3",
    title: "Thread: reply speed benchmark vs industry",
    type: "Thread",
    submittedAtLabel: "Yesterday · 11:05",
    priority: "Normal",
  },
];

export const MOCK_PLATFORM_STATS: MockPlatformStat[] = [
  {
    platform: "LinkedIn",
    handle: "@mercyspeaksdigital",
    reachMock: 12800,
    engagementRatePct: 4.2,
    postsThisWeek: 5,
    trendLabel: "↑ mock vs prior week",
  },
  {
    platform: "Instagram",
    handle: "@mercyspeaks.ai",
    reachMock: 24600,
    engagementRatePct: 6.1,
    postsThisWeek: 7,
    trendLabel: "↑ Reels driving mix",
  },
  {
    platform: "X",
    handle: "@mercyspeaks",
    reachMock: 9100,
    engagementRatePct: 3.4,
    postsThisWeek: 6,
    trendLabel: "→ steady",
  },
];

export const MOCK_BEST_HOOKS: MockHook[] = [
  {
    id: "h1",
    text: "Silence isn’t neutral — it’s expensive.",
    scoreLabel: "Predicted hold: strong",
    usedIn: "LinkedIn opener · mock",
  },
  {
    id: "h2",
    text: "Your competitor isn’t ‘better.’ They’re just faster to the inbox.",
    scoreLabel: "High comment potential",
    usedIn: "Reel cold open · mock",
  },
  {
    id: "h3",
    text: "If your CRM is a graveyard of ‘new’ leads, this is the real problem.",
    scoreLabel: "Scroll-stop pattern",
    usedIn: "Carousel slide 1 · mock",
  },
];

export const MOCK_NEXT_ACTIONS: MockNextAction[] = [
  {
    id: "n1",
    title: "Refresh proof assets",
    detail: "Swap generic logos for two named case blurbs in the carousel queue — strategist flagged consistency risk.",
    ownerAgent: "Marketing Strategist Agent",
  },
  {
    id: "n2",
    title: "Tighten CTA duplication",
    detail: "Three posts use similar CTAs within 48 hours; scheduler suggests staggering by 6 hours for mock reach curve.",
    ownerAgent: "Social Scheduler Agent",
  },
  {
    id: "n3",
    title: "Expand comment playbook",
    detail: "Community agent drafted 12 reply templates — review tone for legal on ‘guarantee’ language.",
    ownerAgent: "Community Engagement Agent",
  },
  {
    id: "n4",
    title: "Analyze Reels 04:3 vs 9:16",
    detail: "Analytics mock shows vertical outperforming square by 18% on saves — bias next week’s shoot list.",
    ownerAgent: "Marketing Analytics Agent",
  },
];
