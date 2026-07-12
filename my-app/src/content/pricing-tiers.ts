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

import { BOOKING_LINKS } from "@/lib/site-config";

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
  "Published overage rates coming soon — ask on your call" as const;

export const TERMS_PENDING_UI =
  "Confirmed in writing before you start — ask on your strategy call" as const;

export const AI_RECEPTIONIST_TIERS: AiReceptionistTier[] = [
  {
    name: "Mercy Starter",
    price: 197,
    priceCurrency: "USD",
    setup: "$997 one-time setup",
    callVolume: "Up to ~500 calls/month",
    bestFor: "Churches, solo contractors, cleaning companies",
    previewDescription: "AI receptionist, lead capture, GBP audit, missed-call text-back.",
    included: [
      "24/7 AI receptionist",
      "Appointment scheduling",
      "Lead capture & qualification",
      "Missed-call text-back automation",
      "Google Business Profile audit",
      "Email notifications",
      "Guided onboarding",
    ],
    popular: false,
  },
  {
    name: "Mercy Growth",
    price: 397,
    priceCurrency: "USD",
    setup: "$2,500 one-time setup",
    callVolume: "Up to ~1,200 calls/month",
    bestFor: "HVAC, Plumbing, Roofing, Electrical",
    previewDescription: "Full website + AI receptionist + SMS automation + booking system.",
    included: [
      "Everything in Mercy Starter",
      "Full website redesign (up to 10 pages)",
      "SMS & email follow-up automation",
      "Booking system integration",
      "Advanced CRM sync",
      "Monthly performance report",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Mercy Pro",
    price: 697,
    priceCurrency: "USD",
    setup: "$4,500 one-time setup",
    callVolume: "~3,000+ calls/month",
    bestFor: "Dental offices, multi-location contractors, med spas",
    previewDescription: "Custom AI call flows, CRM, review generation, quarterly strategy.",
    included: [
      "Everything in Mercy Growth",
      "Custom AI call flows & Mercy training",
      "CRM integration",
      "Review generation system",
      "SMS/email nurture sequences",
      "Quarterly strategy call",
      "Dedicated account manager",
    ],
    popular: false,
  },
];

export const WEBSITE_TIERS: WebsiteTier[] = [
  {
    name: "Starter Website",
    price: 997,
    priceCurrency: "USD",
    priceLabel: "Starting at $997",
    audience: "Perfect for new or local businesses that need a clean, trustworthy website fast.",
    included: [
      "Premium 1–3 page site (home + core pages)",
      "Mobile-first design + fast performance",
      "Conversion-ready contact/quote flow",
      "Basic on-page SEO + analytics setup",
    ],
    cta: "Get a Website Quote",
    href: BOOKING_LINKS.websiteQuote,
    popular: false,
  },
  {
    name: "Business Website",
    price: 1997,
    priceCurrency: "USD",
    priceLabel: "Starting at $1,997",
    audience: "For established companies that need stronger messaging, structure, and lead capture.",
    included: [
      "Premium 5–8 page website",
      "Service pages built for conversion",
      "SEO-ready structure + technical cleanup",
      "Integrations (forms, email, booking, CRM-ready)",
    ],
    cta: "Book Website Call",
    href: BOOKING_LINKS.websiteQuote,
    popular: true,
  },
  {
    name: "Premium / Custom Website",
    price: null,
    priceCurrency: "USD",
    priceLabel: "Custom quote",
    audience: "For high-growth brands that need custom UI, advanced sections, and tailored strategy.",
    included: [
      "Custom UX + design system direction",
      "Advanced sections (case studies, portals, calculators)",
      "Performance + SEO optimization",
      "Ongoing iteration and launch support",
    ],
    cta: "Request Custom Quote",
    href: BOOKING_LINKS.websiteQuote,
    popular: false,
  },
];

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

/** Market comparison strip on /pricing — Mercy Starter price is derived from tiers. */
export const MARKET_COMPARISON = {
  humanReceptionist: "$2,900+/mo",
  answeringService: "$250–500/mo",
  footnote:
    "Human receptionist and answering-service figures are market estimates, not Mercy Speaks Digital prices. Mercy Starter is our published list price.",
} as const;

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
