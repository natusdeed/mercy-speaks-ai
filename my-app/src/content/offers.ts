/**
 * SINGLE SOURCE for every public offer, price and term (Project #001, CEO-locked copy:
 * /workspace/mercy-speaks/project-001/pages-copy-v3.md). Home, /websites, /website-care, /pricing,
 * /services, /services/website-design, industry/location pages and JSON-LD all read from here.
 * Do not restate prices or terms in page files.
 */

export type PriceItem = { name: string; price: string; details: string; recommended?: boolean };

export const WEBSITE_PACKAGES: readonly (PriceItem & {
  priceUsd: number;
  pages: string;
  revisions: string;
  bestFor: string;
})[] = [
  {
    name: "Starter",
    price: "$997",
    priceUsd: 997,
    pages: "Up to 5 pages",
    revisions: "2 revision rounds",
    bestFor: "Best for new or simple businesses that need a professional site.",
    details: "Up to 5 pages, 2 revision rounds. Best for new or simple businesses that need a professional site.",
    recommended: false,
  },
  {
    name: "Business",
    price: "$1,997",
    priceUsd: 1997,
    pages: "Up to 10 pages",
    revisions: "2 revision rounds",
    bestFor: "Best for service businesses that need a page for each service.",
    details: "Up to 10 pages, 2 revision rounds. Best for service businesses that need a page for each service.",
    recommended: true,
  },
  {
    name: "Premium",
    price: "from $3,500",
    priceUsd: 3500,
    pages: "Pages based on your approved scope",
    revisions: "3 revision rounds",
    bestFor: "Best for multi-location or custom needs.",
    details: "Pages based on your approved scope, 3 revision rounds. Best for multi-location or custom needs.",
    recommended: false,
  },
] as const;

export const CARE_PLANS: readonly (PriceItem & { priceUsd: number })[] = [
  {
    name: "Care",
    price: "$79/month",
    priceUsd: 79,
    details:
      "Routine updates, backups and security monitoring where applicable, and up to 30 minutes of minor content edits each month.",
  },
  {
    name: "Care Plus",
    price: "$149/month",
    priceUsd: 149,
    details: "Everything in Care, plus up to 90 minutes of edits or maintenance each month and priority handling.",
  },
] as const;

export const CARE_RULES = [
  "3-month minimum, then 30 days' written notice to cancel.",
  "Unused time does not roll over.",
  "Out-of-scope work requires approval and is billed at $95/hour.",
  "Where applicable, Mercy Speaks Digital uses the backup, security and maintenance tools available through the client's hosting environment. Advanced monitoring, premium security software, or other paid third-party services must be separately scoped and approved.",
  "Priority handling means Care Plus requests are placed ahead of standard Care requests in our work queue. It is not a guaranteed response or completion time.",
] as const;

/** CEO-locked add-ons (pages-copy-v3.md). */
export const ADDONS = [
  "Extra page: $150",
  "Logo design: $250 when separately scoped",
  "Copywriting: $100 per page",
  "Extra revision round: $150",
  "Spanish-language version: +40%, subject to scope and page count",
] as const;

export const PACKAGE_INCLUDES =
  "Every package includes mobile-first design checked on phones and desktops, tap-to-call to your existing number, a contact form, a Google Map embed or link, basic search setup (page titles, page descriptions, and your business details marked up for search engines), a private preview before launch, launch to your domain, 14 days of defect fixes, and a handoff. Included content is limited to what you supply or approve.";

export const PACKAGE_TIER_NOTES =
  "Business ($1,997) may include service-specific pages within the 10-page limit, a quote form, analytics setup when you provide or approve the account and access, and a review or testimonial section only when real, verified, permissioned content is supplied. Premium (from $3,500) may include custom features based on the approved project scope.";

export const PAYMENT_TERMS = "50% to begin, 50% before launch. Quotes are valid for 30 calendar days.";

export const TIMELINE =
  "10–15 business days of active Mercy Speaks production time after the 50% payment and all required assets and access are received. The delivery clock pauses while Mercy Speaks is waiting for client content, assets, credentials/access, feedback, revisions, or approvals.";

export const HOSTING =
  "Hosting and domain are not included. You own both accounts, give us delegated access, and pay any third-party costs.";

export const OWNERSHIP =
  "Once your project is paid in full, you own the final website deliverables we created specifically for your approved project. Mercy Speaks Digital keeps ownership of its pre-existing tools, frameworks, reusable code and components, templates, processes, methods, and know-how. Third-party software, plugins, fonts, images, licensed assets, and services stay subject to their own licenses and ownership terms.";

export const AFTER_LAUNCH = "14 calendar days of bug fixes for defects in delivered work, then an optional care plan.";

/** Short delivery process (Home, /websites, /services/website-design). */
export const DELIVERY_STEPS = [
  { title: "Quote", body: "Tell us about your business; we send a written quote, valid 30 calendar days." },
  { title: "Kickoff", body: "You pay 50% and send the required assets, content, and access." },
  { title: "Build", body: "10–15 business days of active Mercy Speaks production time, with a private preview for your review." },
  { title: "Launch", body: "You pay the final 50%; we launch on hosting and a domain you own, with delegated access for us." },
  { title: "Support", body: "14 calendar days of bug fixes for defects in delivered work, then an optional care plan." },
] as const;

/** The three public services, websites first. Summaries are CEO-locked wording. */
export const SERVICES = [
  {
    key: "website",
    name: "Conversion Websites",
    href: "/websites",
    summary:
      "New websites and redesigns that explain your business clearly and make it easy for visitors to call or request a quote.",
    priceNote: "Packages from $997",
    cta: "See website packages",
  },
  {
    key: "care",
    name: "Website Care & Optimization",
    href: "/website-care",
    summary: "Ongoing updates and maintenance to keep your website useful after launch.",
    priceNote: "$79/month or $149/month",
    cta: "See care plans",
  },
  {
    key: "ai-pilot",
    name: "AI Receptionist — Pilot",
    href: "/ai-pilot",
    summary:
      "AI-assisted answering for the calls you send to it, with messages and service requests passed to your team to review.",
    priceNote: "Limited pilot, by invitation",
    cta: "How the pilot works",
  },
] as const;

/** What the AI receptionist does in the pilot — customer language, no guarantees. */
export const PILOT_CAPABILITIES = [
  "Answers calls you route to it",
  "Takes messages for your team",
  "Captures service requests and appointment requests for your team to review and confirm. It does not confirm appointments itself.",
  "It can attempt to transfer to a number you choose. If no one answers, the caller can leave a message.",
] as const;

export const PILOT_LIMITS = [
  "Your team reviews every message and request and follows up with the caller.",
  "It does not confirm appointments or give emergency instructions.",
  "The pilot is separate from our website packages and care plans. Scope and terms are agreed in writing with each pilot business.",
] as const;
