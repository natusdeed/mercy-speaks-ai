/**
 * Canonical site URL: set `VITE_SITE_URL` in production (e.g. https://www.mercyspeaksdigital.com).
 * Fallback matches the live site URL used elsewhere in this project.
 */
export function getSiteOrigin(): string {
  const fromProcess =
    typeof process !== "undefined" && typeof process.env?.VITE_SITE_URL === "string"
      ? process.env.VITE_SITE_URL
      : undefined;
  if (fromProcess && fromProcess.trim().length > 0) {
    return fromProcess.replace(/\/$/, "");
  }
  const metaEnv =
    typeof import.meta !== "undefined" && import.meta.env ? import.meta.env : undefined;
  const raw = metaEnv?.VITE_SITE_URL as string | undefined;
  if (raw && raw.trim().length > 0) {
    return raw.replace(/\/$/, "");
  }
  return "https://www.mercyspeaksdigital.com";
}

export function absoluteUrl(path: string): string {
  const origin = getSiteOrigin();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${p}`;
}

/** Default social preview (1200×630). Per-page assets live under `/og/`; override via SeoHead `ogImagePath`. */
export const DEFAULT_OG_IMAGE_PATH = "/og-default.png";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
/** Complete sentence for og:image:alt — keep ≤100 characters. */
export const OG_IMAGE_ALT =
  "Mercy Speaks Digital — AI receptionists, websites, and automation for small businesses.";

/** Route path → `/og/{slug}.png`. Unlisted paths fall back to {@link DEFAULT_OG_IMAGE_PATH}. */
export const OG_IMAGE_BY_PATH: Record<string, string> = {
  "/": "/og/home.png",
  "/pricing": "/og/pricing.png",
  "/services/ai-phone-receptionist": "/og/ai-phone-receptionist.png",
  "/services/website-design": "/og/website-design.png",
  "/services/voice-agents": "/og/voice-agents.png",
  "/about": "/og/about.png",
  "/contact": "/og/contact.png",
};

/** Resolve share image path: explicit override → path map → default. */
export function resolveOgImagePath(pagePath?: string, override?: string): string {
  if (override && override.trim().length > 0) {
    return override.startsWith("/") || override.startsWith("http") ? override : `/${override}`;
  }
  if (pagePath) {
    const normalized = pagePath === "" ? "/" : pagePath.replace(/\/$/, "") || "/";
    const mapped = OG_IMAGE_BY_PATH[normalized] ?? OG_IMAGE_BY_PATH[pagePath];
    if (mapped) return mapped;
  }
  return DEFAULT_OG_IMAGE_PATH;
}

export function defaultOgImageUrl(): string {
  return absoluteUrl(DEFAULT_OG_IMAGE_PATH);
}

/** Core brand line — reuse in metadata, schema, summaries, footer where appropriate */
export const BRAND_TAGLINE =
  "Premium websites, AI receptionists, and automation that capture leads, speed up follow-up, and improve booking—without extra headcount.";

/**
 * Marketing content switches. Keep demo media null until real assets are ready —
 * LiveDemoHome hides the entire "See It In Action" section when both URLs are null.
 * LiveDemo (call-the-AI module) uses audioUrl for its "Hear a sample call" fallback
 * when {@link siteConfig.demoPhoneNumber} is null.
 */
export type DemoMediaConfig = {
  audioUrl: string | null;
  /** Link to a full transcript page or .txt/.vtt for the sample call */
  audioTranscriptUrl: string | null;
  videoUrl: string | null;
  videoPosterUrl: string | null;
  /** Optional dashboard peeks; omitted from the section when null/empty */
  dashboardScreenshots: { src: string; alt: string; label: string }[] | null;
};

export const siteContent: { demoMedia: DemoMediaConfig } = {
  demoMedia: {
    audioUrl: null,
    audioTranscriptUrl: null,
    videoUrl: null,
    videoPosterUrl: null,
    dashboardScreenshots: null,
  },
};

export function hasDemoMedia(): boolean {
  const { audioUrl, videoUrl } = siteContent.demoMedia;
  return Boolean(audioUrl || videoUrl);
}

/**
 * Site-wide marketing switches for interactive demos.
 * `demoPhoneNumber`: public AI receptionist demo line (E.164 preferred, e.g. "+17135551234").
 * Leave null until the real line is provisioned — LiveDemo shows the sample-call fallback.
 */
export const siteConfig: {
  demoPhoneNumber: string | null;
} = {
  // Set to the live public demo number (E.164) when ready. Do not invent a number.
  demoPhoneNumber: null,
};

/** `tel:` href for the LiveDemo line, or null when unset. */
export function demoTelHref(): string | null {
  const raw = siteConfig.demoPhoneNumber;
  if (!raw || !raw.trim()) return null;
  const cleaned = raw.replace(/[^\d+]/g, "");
  if (!cleaned) return null;
  const e164 = cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
  return `tel:${e164}`;
}

/** Human-readable demo number for UI; falls back to the raw config string. */
export function demoPhoneDisplay(): string | null {
  const raw = siteConfig.demoPhoneNumber;
  if (!raw || !raw.trim()) return null;
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return raw.trim();
}

/** Footer + schema.org sameAs — single source for social profile URLs */
export const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://facebook.com/mercyspeaksdigital" },
  { name: "Twitter", href: "https://twitter.com/mercyspeaksai" },
  { name: "Instagram", href: "https://instagram.com/mercyspeaksdigital" },
  { name: "LinkedIn", href: "https://linkedin.com/company/mercyspeaksdigital" },
  { name: "YouTube", href: "https://youtube.com/@mercyspeaksdigital" },
] as const;

/** Absolute logo path under /public — used for Organization logo + image */
export const LOGO_PATH = "/favicon-512x512.png";

/**
 * NAP + org identity for contact UI, tel:/mailto:, and JSON-LD.
 * Do not hardcode these values on individual pages — import from here.
 */
export const BUSINESS = {
  name: "Mercy Speaks Digital",
  legalName: "Mercy Speaks LLC",
  email: "don@mercyspeaksdigital.com",
  phoneDisplay: "(703) 332-5956",
  /** E.164 for tel: and schema */
  telephone: "+17033325956",
  /** NAP: aligned with contact page */
  address: {
    streetAddress: undefined as string | undefined,
    addressLocality: "Richmond",
    addressRegion: "TX",
    postalCode: "77407",
    addressCountry: "US",
  },
  /** Schema.org areaServed (strings; ProfessionalService / LocalBusiness) */
  areaServed: ["Houston Metro Area", "United States"] as const,
  /** Schema.org openingHours — weekdays 9am–6pm Central (CST/CDT) */
  openingHours: "Mo-Fr 09:00-18:00",
  openingHoursTimezone: "America/Chicago",
  logoPath: LOGO_PATH,
  sameAs: SOCIAL_LINKS.map((l) => l.href),
} as const;

export const NAV_PATHS = {
  home: "/",
  services: "/services",
  websiteDesign: "/services/website-design",
  aiReceptionist: "/services/ai-phone-receptionist",
  missedCallTextBack: "/services/missed-call-text-back",
  workflowAutomation: "/services/workflow-automation",
  appointmentAutomation: "/services/appointment-automation",
  websiteChatbot: "/services/website-chatbot",
  reviewGeneration: "/services/review-generation",
  socialMediaManagement: "/services/social-media-management",
  reputationManagement: "/services/reputation-management",
  voiceAgents: "/services/voice-agents",
  ragData: "/services/rag-data",
  industries: "/industries",
  houston: "/houston",
  richmondTx: "/richmond-tx",
  pricing: "/pricing",
  results: "/results",
  about: "/about",
  blog: "/blog",
  contact: "/contact",
  bookDemo: "/book-demo",
} as const;

/**
 * Davita Auto Logistics portfolio URL.
 * TODO: replace with the client's production domain when it goes live.
 * Until then this is the Vercel demo deploy — label the card "Demo build".
 */
export const DAVITA_AUTO_LOGISTICS_URL = "https://davita-auto-logistics.vercel.app/";

/**
 * Semantic booking CTAs. Every marketing CTA must use the correct key so we can
 * point website / e-commerce / receptionist flows at different schedulers later.
 * Today all resolve to the canonical internal `/book-demo` page.
 */
export const BOOKING_LINKS = {
  aiReceptionistDemo: NAV_PATHS.bookDemo,
  websiteQuote: NAV_PATHS.bookDemo,
  ecommerceQuote: NAV_PATHS.bookDemo,
  generalStrategyCall: NAV_PATHS.bookDemo,
} as const;

export type BookingLinkKey = keyof typeof BOOKING_LINKS;

/**
 * Cal.com embed used only on `/book-demo` (inline scheduler + fallback).
 * Do not wire website or e-commerce CTAs directly to this slug.
 */
export const CAL_COM_EMBED = {
  url: "https://cal.com/natusdeed/free-ai-receptionist-demo",
  /** Path for Cal embed `calLink` (username/event-slug) */
  calLink: "natusdeed/free-ai-receptionist-demo",
  origin: "https://cal.com",
  embedScriptSrc: "https://app.cal.com/embed/embed.js",
} as const;

/** E.164 `tel:` href from {@link BUSINESS.telephone} — use site-wide. */
export function telHref(): string {
  return `tel:${BUSINESS.telephone}`;
}
