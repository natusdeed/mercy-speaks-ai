/**
 * Static mock data for the Missed Revenue demo dashboard.
 * Illustrative dollars only — not tied to real pipeline or Supabase.
 */

export type MockFunnelStep = {
  id: string;
  label: string;
  count: number;
  dropOffPct: number;
  revenueAtRiskUsd: number;
  /** Tailwind width class for the bar (static strings so the compiler can see them). */
  barWidthClass: "w-full" | "w-[94%]" | "w-[33%]" | "w-[14%]";
};

export type MockRecoveryPlay = {
  id: string;
  title: string;
  impactUsd: number;
  effort: "Low" | "Medium" | "High";
  window: string;
};

export type MockMissedRevenueKpis = {
  captureRatePct: number;
  qualifiedToBookedPct: number;
  revenueAtRisk30dUsd: number;
  recoverableLowEffortUsd: number;
};

export const MOCK_MISSED_REVENUE_KPIS: MockMissedRevenueKpis = {
  captureRatePct: 94,
  qualifiedToBookedPct: 41,
  revenueAtRisk30dUsd: 48200,
  recoverableLowEffortUsd: 21600,
};

export const MOCK_FUNNEL_STEPS: MockFunnelStep[] = [
  {
    id: "f1",
    label: "Inbound touches",
    count: 1840,
    dropOffPct: 0,
    revenueAtRiskUsd: 0,
    barWidthClass: "w-full",
  },
  {
    id: "f2",
    label: "Responded same day",
    count: 1729,
    dropOffPct: 6,
    revenueAtRiskUsd: 8200,
    barWidthClass: "w-[94%]",
  },
  {
    id: "f3",
    label: "Qualified fit",
    count: 612,
    dropOffPct: 65,
    revenueAtRiskUsd: 24100,
    barWidthClass: "w-[33%]",
  },
  {
    id: "f4",
    label: "Booked on calendar",
    count: 251,
    dropOffPct: 59,
    revenueAtRiskUsd: 15900,
    barWidthClass: "w-[14%]",
  },
];

export const MOCK_RECOVERY_PLAYS: MockRecoveryPlay[] = [
  {
    id: "r1",
    title: "Re-engage stalled qualified leads with a two-touch SMS sequence",
    impactUsd: 9400,
    effort: "Low",
    window: "7 days · mock",
  },
  {
    id: "r2",
    title: "Offer same-week slots to voice callers who did not book",
    impactUsd: 7200,
    effort: "Medium",
    window: "14 days · mock",
  },
  {
    id: "r3",
    title: "Win-back nurture for lost-to-price with a capped incentive",
    impactUsd: 5000,
    effort: "High",
    window: "30 days · mock",
  },
];
