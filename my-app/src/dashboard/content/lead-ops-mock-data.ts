/**
 * Static mock data for the Lead Ops demo dashboard.
 * No Supabase, no network — design preview only.
 */

export type MockLeadStage = "New" | "Working" | "Qualified" | "Booked" | "Nurture" | "Lost";

export type MockLeadOpRow = {
  id: string;
  leadName: string;
  company: string;
  stage: MockLeadStage;
  source: string;
  responseSlaMins: number;
  owner: string;
  estValueUsd: number;
  lastTouchLabel: string;
};

export type MockLeadOpsKpis = {
  activeLeads: number;
  medianFirstResponseMins: number;
  qualifiedRatePct: number;
  meetingsBookedWeek: number;
};

export const MOCK_LEAD_OPS_KPIS: MockLeadOpsKpis = {
  activeLeads: 128,
  medianFirstResponseMins: 4,
  qualifiedRatePct: 34,
  meetingsBookedWeek: 19,
};

export const MOCK_LEAD_OPS_ROWS: MockLeadOpRow[] = [
  {
    id: "lo-1",
    leadName: "Jordan Ellis",
    company: "Northline Roofing Co.",
    stage: "Qualified",
    source: "Voice agent",
    responseSlaMins: 3,
    owner: "Mercy AI",
    estValueUsd: 12400,
    lastTouchLabel: "12m ago · mock",
  },
  {
    id: "lo-2",
    leadName: "Sam Rivera",
    company: "Rivera HVAC",
    stage: "Working",
    source: "Web chat",
    responseSlaMins: 6,
    owner: "Mercy AI",
    estValueUsd: 8200,
    lastTouchLabel: "28m ago · mock",
  },
  {
    id: "lo-3",
    leadName: "Priya Shah",
    company: "Shah Family Dental",
    stage: "Booked",
    source: "SMS follow-up",
    responseSlaMins: 2,
    owner: "Human — Ops",
    estValueUsd: 5600,
    lastTouchLabel: "1h ago · mock",
  },
  {
    id: "lo-4",
    leadName: "Chris Ortiz",
    company: "Ortiz Plumbing",
    stage: "Nurture",
    source: "Paid search",
    responseSlaMins: 18,
    owner: "Mercy AI",
    estValueUsd: 4100,
    lastTouchLabel: "3h ago · mock",
  },
  {
    id: "lo-5",
    leadName: "Taylor Brooks",
    company: "Brooks Legal Group",
    stage: "New",
    source: "Referral",
    responseSlaMins: 1,
    owner: "Mercy AI",
    estValueUsd: 18900,
    lastTouchLabel: "6m ago · mock",
  },
  {
    id: "lo-6",
    leadName: "Morgan Lee",
    company: "Lee Auto Detail",
    stage: "Lost",
    source: "Web form",
    responseSlaMins: 45,
    owner: "Unassigned",
    estValueUsd: 900,
    lastTouchLabel: "2d ago · mock",
  },
];
