/**
 * Canonical pricing tiers — UI (pricing page, homepage preview) and OfferCatalog JSON-LD
 * must read from this file so prices stay in sync.
 *
 * Placeholders:
 * - Set overagePerCallUsd to a number (USD) when rates are final; leave "NEEDS_REAL_RATES" until then.
 * - Set BILLING_TERMS fields to real copy when legal/ops terms are final; leave "NEEDS_REAL_TERMS" until then.
 * Vite warns at build time while any placeholder remains (warn-pricing-placeholders plugin).
 * You can also call warnPricingConfigPlaceholders() from Node scripts.
 */

import { WEBSITE_PACKAGES } from "@/content/offers";

/** Sentinel — replace with a real USD number before publishing overage rates in the UI. */
export const NEEDS_REAL_RATES = "NEEDS_REAL_RATES" as const;

/** Sentinel — replace with real contract/cancel/data copy before publishing terms in the UI. */
export const NEEDS_REAL_TERMS = "NEEDS_REAL_TERMS" as const;

export type AiReceptionistTier = {
  name: string;
  price: number;
  priceCurrency: "USD";
  setup: string;
  callVolume: string;
  bestFor: string;
  /** Short blurb for homepage pricing preview cards */
  previewDescription: string;
  included: string[];
  popular: boolean;
};

export type WebsiteTier = {
  name: string;
  /** Numeric starting price when published; null = custom quote */
  price: number | null;
  priceCurrency: "USD";
  priceLabel: string;
  audience: string;
  included: string[];
  cta: string;
  href: string;
  popular: boolean;
};

export type PlanOverageRow = {
  planName: string;
  includedVolume: string;
  /**
   * USD per additional call above included volume.
   * Use NEEDS_REAL_RATES until you have a real number — UI will not invent a rate.
   */
  overagePerCallUsd: typeof NEEDS_REAL_RATES | number;
};

export type BillingTerms = {
  contractLength: typeof NEEDS_REAL_TERMS | string;
  cancellation: typeof NEEDS_REAL_TERMS | string;
  numberAndData: typeof NEEDS_REAL_TERMS | string;
};

/** Honest UI copy when a NEEDS_REAL_* sentinel is still in config. */
export const OVERAGE_PENDING_UI =
  "Overage rates are not published" as const;

export const TERMS_PENDING_UI =
  "Confirmed in writing before you start — ask on your strategy call" as const;

/**
 * P0 hotfix: NOT PUBLISHED. AI receptionist services are in pilot testing; these tiers must not be
 * rendered or emitted in schema until pricing is verified and approved.
 */
export const AI_RECEPTIONIST_TIERS: AiReceptionistTier[] = [];

/** Derived from the single offers source (content/offers.ts) — never restate prices here. */
export const WEBSITE_TIERS: WebsiteTier[] = WEBSITE_PACKAGES.map((p) => ({
  name: `${p.name} Website`,
  price: p.priceUsd,
  priceCurrency: "USD" as const,
  priceLabel: p.price,
  audience: p.details,
  included: [p.pages, p.revisions],
  cta: "Get a Website Quote",
  href: "/contact",
  popular: !!p.recommended,
}));

/**
 * Per-plan overage — keep planName/includedVolume aligned with AI_RECEPTIONIST_TIERS.
 * Replace NEEDS_REAL_RATES with a number (e.g. 0.45) when rates are approved.
 */
export const PLAN_OVERAGE_ROWS: PlanOverageRow[] = [
  {
    planName: "Mercy Starter",
    includedVolume: "Up to ~500 calls/month",
    overagePerCallUsd: NEEDS_REAL_RATES,
  },
  {
    planName: "Mercy Growth",
    includedVolume: "Up to ~1,200 calls/month",
    overagePerCallUsd: NEEDS_REAL_RATES,
  },
  {
    planName: "Mercy Pro",
    includedVolume: "~3,000+ calls/month",
    overagePerCallUsd: NEEDS_REAL_RATES,
  },
];

/**
 * Cancel / contract answers for the pricing FAQ.
 * Replace each NEEDS_REAL_TERMS value with the real policy text when legal/ops signs off.
 */
export const BILLING_TERMS: BillingTerms = {
  contractLength: NEEDS_REAL_TERMS,
  cancellation: NEEDS_REAL_TERMS,
  numberAndData: NEEDS_REAL_TERMS,
};

export function isOverageRatePublished(
  value: PlanOverageRow["overagePerCallUsd"]
): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function areOverageRatesPublished(
  rows: PlanOverageRow[] = PLAN_OVERAGE_ROWS
): boolean {
  return rows.every((row) => isOverageRatePublished(row.overagePerCallUsd));
}

export function resolveTermCopy(
  value: typeof NEEDS_REAL_TERMS | string
): string {
  return value === NEEDS_REAL_TERMS ? TERMS_PENDING_UI : value;
}

/** Structured cancel FAQ blocks for the pricing page UI. */
export function getCancelFaqStructure() {
  return [
    { label: "Contract length", value: resolveTermCopy(BILLING_TERMS.contractLength) },
    { label: "Cancellation terms", value: resolveTermCopy(BILLING_TERMS.cancellation) },
    {
      label: "Your number & data",
      value: resolveTermCopy(BILLING_TERMS.numberAndData),
    },
  ] as const;
}

/** Flat answer for FAQPage JSON-LD (same facts as the structured UI). */
export function getCancelFaqAnswerText(): string {
  const parts = getCancelFaqStructure();
  return parts.map((p) => `${p.label}: ${p.value}`).join(" ");
}

export function getOverageFaqAnswerText(): string {
  if (!areOverageRatesPublished()) {
    return `We notify you before you hit your included call volume. ${OVERAGE_PENDING_UI}. You can upgrade anytime.`;
  }
  const rates = PLAN_OVERAGE_ROWS.map(
    (row) =>
      `${row.planName}: $${(row.overagePerCallUsd as number).toFixed(2)} per additional call beyond ${row.includedVolume}`
  ).join("; ");
  return `We notify you before you hit your limit. Overage rates: ${rates}. You can upgrade anytime.`;
}

export const PRICING_FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "What if I exceed my call volume?",
    answer: getOverageFaqAnswerText(),
  },
  {
    question: "How long does setup take?",
    answer:
      "It depends on your phone setup, calendar tools, and how complex your call flows are. After a strategy call we give you a written onboarding sequence with milestones—many teams move quickly once requirements are locked.",
  },
  {
    question: "Can I cancel?",
    answer: getCancelFaqAnswerText(),
  },
];

/** Call from Vite buildStart — warns until placeholders are replaced with real values. */
export function warnPricingConfigPlaceholders(): void {
  const pendingRates = PLAN_OVERAGE_ROWS.filter(
    (row) => !isOverageRatePublished(row.overagePerCallUsd)
  );
  if (pendingRates.length > 0) {
    console.warn(
      `[pricing-tiers] NEEDS_REAL_RATES: overage rates unset for ${pendingRates
        .map((r) => r.planName)
        .join(", ")}. UI shows “${OVERAGE_PENDING_UI}” until you set numbers in PLAN_OVERAGE_ROWS.`
    );
  }

  const pendingTerms = (
    [
      ["contractLength", BILLING_TERMS.contractLength],
      ["cancellation", BILLING_TERMS.cancellation],
      ["numberAndData", BILLING_TERMS.numberAndData],
    ] as const
  ).filter(([, v]) => v === NEEDS_REAL_TERMS);

  if (pendingTerms.length > 0) {
    console.warn(
      `[pricing-tiers] NEEDS_REAL_TERMS: billing terms unset for ${pendingTerms
        .map(([k]) => k)
        .join(", ")}. UI shows “${TERMS_PENDING_UI}” until you fill BILLING_TERMS.`
    );
  }
}
