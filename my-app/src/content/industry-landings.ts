import {
  CloudLightning,
  Phone,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Legacy flat industry landings (currently `/roofing` only).
 * HVAC & plumbing live under `/industries/*` via `industry-pages.ts`.
 */

export type IndustrySlug = "roofing";

export interface IndustryOutcome {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface IndustryLandingConfig {
  slug: IndustrySlug;
  path: `/${string}`;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  headline: string;
  lead: string;
  problems: string[];
  outcomes: IndustryOutcome[];
  finalCtaTitle: string;
  finalCtaDescription: string;
}

export const INDUSTRY_LANDING_CONFIG: Record<IndustrySlug, IndustryLandingConfig> = {
  roofing: {
    slug: "roofing",
    path: "/roofing",
    seoTitle: "AI Receptionist for Roofing | Mercy Speaks Digital",
    seoDescription:
      "Capture storm and emergency roofing leads 24/7—AI answers calls, qualifies damage reports, and books inspections while your crews stay on the roof.",
    eyebrow: "Roofing contractors",
    headline: "Stop losing storm and emergency jobs to voicemail",
    lead:
      "When hail hits or a leak turns urgent, homeowners call fast—and the first company that answers wins. We install a 24/7 AI receptionist that captures every lead, books inspections, and texts your team so nothing slips through.",
    problems: [
      "After-hours storm calls go to voicemail while competitors book the job.",
      "Office staff can't triage emergencies during peak season—callbacks get slower.",
      "Missed follow-ups mean lost supplements and slower cash flow.",
      "Dispatch and crews don't get clean handoffs from chaotic phone tags.",
    ],
    outcomes: [
      {
        icon: Phone,
        title: "24/7 call capture",
        description:
          "Every ring gets answered with your pricing rules, service area, and urgency cues—then booked or escalated with context.",
      },
      {
        icon: CloudLightning,
        title: "Storm-ready intake",
        description:
          "Capture address, roof type, insurance questions, and photos links so estimators walk in prepared.",
      },
      {
        icon: ShieldCheck,
        title: "Fewer dropped leads",
        description:
          "Instant SMS and email follow-up while the homeowner is still searching for a roofer—before they call your competitor.",
      },
    ],
    finalCtaTitle: "Book more roofing jobs—starting with the next ring",
    finalCtaDescription:
      "See the AI receptionist workflow for storm intake, emergency triage, and booked inspections—tailored to your crews and service area.",
  },
};
