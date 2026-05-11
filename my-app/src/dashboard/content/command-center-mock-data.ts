import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  CalendarCheck,
  Inbox,
  Mail,
  Share2,
  Target,
  UserRound,
  Wallet,
} from "lucide-react";

export type CommandCenterAccent = "cyan" | "violet" | "emerald";

export type MockOverviewCard = {
  id: string;
  title: string;
  blurb: string;
  accent: CommandCenterAccent;
  icon: LucideIcon;
};

/** Eight capability pillars — illustrative copy only, not live metrics. */
export const MOCK_COMMAND_OVERVIEW: MockOverviewCard[] = [
  {
    id: "intake",
    title: "Lead Intake",
    blurb: "Voice, chat, and form captures normalized into one timeline the AI can reason over.",
    accent: "cyan",
    icon: Inbox,
  },
  {
    id: "qual",
    title: "Lead Qualification",
    blurb: "Intent, urgency, and fit scored before your team spends a minute on the wrong conversations.",
    accent: "violet",
    icon: Target,
  },
  {
    id: "booking",
    title: "Booking Intent",
    blurb: "Slots, services, and constraints surfaced so scheduling feels concierge, not robotic.",
    accent: "emerald",
    icon: CalendarCheck,
  },
  {
    id: "followup",
    title: "Follow-Up Drafts",
    blurb: "SMS and email drafts queued for approval — tone-matched to your brand voice.",
    accent: "cyan",
    icon: Mail,
  },
  {
    id: "handoff",
    title: "Human Handoff",
    blurb: "Escalations with full context land where owners already work: inbox, SMS, or dashboard.",
    accent: "violet",
    icon: UserRound,
  },
  {
    id: "missed",
    title: "Missed Revenue Tracking",
    blurb: "After-hours and dropped threads quantified so you see the revenue you almost left on the table.",
    accent: "emerald",
    icon: Wallet,
  },
  {
    id: "strategy",
    title: "Marketing Strategy",
    blurb: "Weekly themes, hooks, and channel mix proposed from what leads are actually asking.",
    accent: "cyan",
    icon: BarChart3,
  },
  {
    id: "social",
    title: "Social Media Content",
    blurb: "Platform-native drafts and calendars — approve once, nothing posts without you.",
    accent: "violet",
    icon: Share2,
  },
];

export const MOCK_COMMAND_WORKFLOW = [
  "Lead comes in",
  "AI qualifies",
  "Booking / follow-up",
  "Owner alert",
  "Dashboard",
  "Marketing insight",
] as const;

export type MockActivityKind =
  | "lead"
  | "booking"
  | "followup"
  | "handoff"
  | "social";

export type MockActivityItem = {
  id: string;
  kind: MockActivityKind;
  title: string;
  detail: string;
  timeLabel: string;
};

export const MOCK_COMMAND_ACTIVITY: MockActivityItem[] = [
  {
    id: "a1",
    kind: "lead",
    title: "New lead captured",
    detail: "Web chat — “Emergency leak, need someone today” — tagged High urgency · Plumbing.",
    timeLabel: "2m ago",
  },
  {
    id: "a2",
    kind: "booking",
    title: "Booking intent created",
    detail: "AI proposed Thu 2:00 PM · 90 min slot · technician: any certified.",
    timeLabel: "6m ago",
  },
  {
    id: "a3",
    kind: "followup",
    title: "Follow-up drafted",
    detail: "SMS draft ready for approval — references prior visit + seasonal tune-up offer.",
    timeLabel: "18m ago",
  },
  {
    id: "a4",
    kind: "handoff",
    title: "Human handoff requested",
    detail: "Caller asked for commercial quote > $25k — owner notified with transcript excerpt.",
    timeLabel: "32m ago",
  },
  {
    id: "a5",
    kind: "social",
    title: "Social post generated",
    detail: "Instagram carousel outline + caption — “Why we answer at 2am” — awaiting approval.",
    timeLabel: "1h ago",
  },
];

export type MockCommandKpi = {
  id: string;
  label: string;
  value: string;
  hint: string;
};

export const MOCK_COMMAND_KPIS: MockCommandKpi[] = [
  { id: "k1", label: "Leads captured", value: "847", hint: "Rolling 30 days (mock)" },
  { id: "k2", label: "AI runs", value: "12.4k", hint: "Orchestration steps (mock)" },
  { id: "k3", label: "Follow-ups drafted", value: "1,902", hint: "Across SMS + email (mock)" },
  { id: "k4", label: "Pending approvals", value: "23", hint: "Drafts awaiting owner (mock)" },
  { id: "k5", label: "Missed revenue estimate", value: "$48.2k", hint: "Modeled from after-hours gaps (mock)" },
];
