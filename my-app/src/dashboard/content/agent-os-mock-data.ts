/**
 * Static mock data for the AI Employee Operating System preview dashboard.
 * No network calls — safe to render offline.
 */

export type MockAgentAccent = "cyan" | "violet";

export type MockAgentCard = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** Shown as a pill — still mock */
  lane: "Intake" | "Qualification" | "Revenue" | "Retention" | "Risk" | "Growth";
  accent: MockAgentAccent;
  mockRunsToday: number;
  mockSuccessPct: number;
  lastActivityLabel: string;
};

export type MockOrgStats = {
  runsToday: number;
  successRatePct: number;
  tasksCompleted: number;
  pendingApprovals: number;
};

export const MOCK_AGENT_OS_STATS: MockOrgStats = {
  runsToday: 184,
  successRatePct: 97.2,
  tasksCompleted: 42,
  pendingApprovals: 3,
};

export const MOCK_AGENT_OS_AGENTS: MockAgentCard[] = [
  {
    id: "intake",
    title: "Intake Agent",
    subtitle: "employee.intake",
    description: "Captures inbound leads, normalizes contact data, and opens the conversation record without human delay.",
    lane: "Intake",
    accent: "cyan",
    mockRunsToday: 62,
    mockSuccessPct: 98,
    lastActivityLabel: "2m ago · mock",
  },
  {
    id: "qualifier",
    title: "Lead Qualifier Agent",
    subtitle: "employee.qualifier",
    description: "Scores fit, urgency, and intent so downstream agents spend time on revenue-ready opportunities.",
    lane: "Qualification",
    accent: "violet",
    mockRunsToday: 41,
    mockSuccessPct: 96,
    lastActivityLabel: "6m ago · mock",
  },
  {
    id: "booking",
    title: "Booking Agent",
    subtitle: "employee.booking",
    description: "Drafts calendar-ready intents and hands off clean context when a human confirms the slot.",
    lane: "Revenue",
    accent: "cyan",
    mockRunsToday: 28,
    mockSuccessPct: 95,
    lastActivityLabel: "14m ago · mock",
  },
  {
    id: "follow-up",
    title: "Follow-Up Agent",
    subtitle: "employee.follow_up",
    description: "Structures nurture tasks and reminders so no qualified thread goes cold after the first touch.",
    lane: "Retention",
    accent: "violet",
    mockRunsToday: 33,
    mockSuccessPct: 99,
    lastActivityLabel: "9m ago · mock",
  },
  {
    id: "handoff",
    title: "Human Handoff Agent",
    subtitle: "employee.handoff",
    description: "Packages escalation payloads for owners — alerts, rationale, and suggested next actions in one view.",
    lane: "Risk",
    accent: "cyan",
    mockRunsToday: 12,
    mockSuccessPct: 94,
    lastActivityLabel: "22m ago · mock",
  },
  {
    id: "marketing",
    title: "Marketing Strategist Agent",
    subtitle: "employee.marketing",
    description: "Turns pipeline signals into campaign angles and weekly priorities your team can execute without guesswork.",
    lane: "Growth",
    accent: "violet",
    mockRunsToday: 5,
    mockSuccessPct: 100,
    lastActivityLabel: "1h ago · mock",
  },
  {
    id: "social",
    title: "Social Media Agent",
    subtitle: "employee.social",
    description: "Drafts channel-native posts from approved messaging — always review before anything goes live.",
    lane: "Growth",
    accent: "cyan",
    mockRunsToday: 3,
    mockSuccessPct: 100,
    lastActivityLabel: "3h ago · mock",
  },
];
