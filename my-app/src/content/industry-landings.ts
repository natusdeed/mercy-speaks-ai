import {
  CloudLightning,
  Droplets,
  Flame,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Testimonial } from "@/components/sections/testimonials";
import { TESTIMONIAL_CHENS_AUTO, TESTIMONIAL_MARTINEZ_HVAC } from "@/content/industry-testimonials";

export type IndustrySlug = "roofing" | "hvac" | "plumbing";

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
  testimonial: Testimonial;
  finalCtaTitle: string;
  finalCtaDescription: string;
}

export const INDUSTRY_LANDING_CONFIG: Record<IndustrySlug, IndustryLandingConfig> = {
  roofing: {
    slug: "roofing",
    path: "/roofing",
    seoTitle: "AI Receptionist for Roofing Companies | Mercy Speaks Digital",
    seoDescription:
      "Capture storm and emergency roofing leads 24/7—AI answers calls, qualifies damage, and books inspections while your crews stay on the roof.",
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
    testimonial: TESTIMONIAL_MARTINEZ_HVAC,
    finalCtaTitle: "Book more roofing jobs—starting with the next ring",
    finalCtaDescription:
      "See the AI receptionist workflow for storm intake, emergency triage, and booked inspections—tailored to your crews and service area.",
  },
  hvac: {
    slug: "hvac",
    path: "/hvac",
    seoTitle: "AI Phone Receptionist for HVAC | Mercy Speaks Digital",
    seoDescription:
      "HVAC AI receptionist: book tune-ups and emergencies 24/7, reduce hold times, and protect margin—without adding front-desk headcount.",
    eyebrow: "HVAC & mechanical",
    headline: "Peak season shouldn't mean missed emergency calls",
    lead:
      "Heat waves and cold snaps flood your phones. We deploy an AI receptionist trained on your services, dispatch rules, and seasonality—so after-hours and overflow calls turn into booked jobs instead of voicemail roulette.",
    problems: [
      "Technicians are in attics and crawlspaces; nobody reliable is free to answer.",
      "After-hours emergencies stack up—callbacks arrive too late to save the ticket.",
      "Maintenance memberships and tune-ups slip when the phone stays overloaded.",
      "CSR turnover makes scripts inconsistent and bookings uneven.",
    ],
    outcomes: [
      {
        icon: Flame,
        title: "Emergency + tune-up booking",
        description:
          "Qualify the issue, offer the next real arrival window, and sync to your calendar—without burning out your CSRs.",
      },
      {
        icon: Phone,
        title: "Overflow and after-hours coverage",
        description:
          "When the queue spikes, AI answers instantly—so customers don't hear ring-until-hang-up.",
      },
      {
        icon: Wrench,
        title: "Dispatch-ready notes",
        description:
          "Equipment age, location, and symptom summaries go to techs so first visits are productive.",
      },
    ],
    testimonial: TESTIMONIAL_MARTINEZ_HVAC,
    finalCtaTitle: "Keep trucks full when the weather turns",
    finalCtaDescription:
      "Walk through after-hours coverage, dispatch notes, and calendar booking—built for HVAC peaks without adding CSRs.",
  },
  plumbing: {
    slug: "plumbing",
    path: "/plumbing",
    seoTitle: "AI Receptionist for Plumbing Companies | Mercy Speaks Digital",
    seoDescription:
      "Plumbing AI receptionist for burst pipes, drains, and water heaters—answer every emergency call 24/7 and book jobs before competitors do.",
    eyebrow: "Plumbing & drain",
    headline: "Answer every emergency call—before the flood gets worse",
    lead:
      "Water damage moves fast. If your customer hits voicemail, they dial the next plumber. We install AI reception that answers instantly, captures the job details, and dispatches—so your trucks stay full without hiring a night dispatcher.",
    problems: [
      "True emergencies need an immediate answer—not a promise to call back Monday.",
      "Dispatchers juggle multiple lines; callers abandon when hold times climb.",
      "After-hours fees and scope questions need consistent, compliant wording.",
      "Missed calls mean missed hydro-jetting, water heater, and line jobs.",
    ],
    outcomes: [
      {
        icon: Droplets,
        title: "Emergency triage",
        description:
          "Separate true emergencies from routine work, capture address and shutoff status, and book the right tech skill.",
      },
      {
        icon: Phone,
        title: "24/7 live answering",
        description:
          "Burst pipes and sewer backups don't wait—your line is always covered with instant response.",
      },
      {
        icon: ShieldCheck,
        title: "Revenue protection",
        description:
          "Follow-up texts and booking confirmations reduce no-shows and keep your schedule dense.",
      },
    ],
    testimonial: TESTIMONIAL_CHENS_AUTO,
    finalCtaTitle: "Stop losing emergency plumbing calls to voicemail",
    finalCtaDescription:
      "Book a demo to see instant answer, emergency triage, and dispatch-ready handoffs—so your next after-hours call becomes revenue.",
  },
};
