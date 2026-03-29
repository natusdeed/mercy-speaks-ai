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

/** Default social preview image (512×512 brand asset in /public). Override per page via SeoHead `ogImagePath`. */
export const DEFAULT_OG_IMAGE_PATH = "/favicon-512x512.png";

export function defaultOgImageUrl(): string {
  return absoluteUrl(DEFAULT_OG_IMAGE_PATH);
}

/** Core brand line — reuse in metadata, schema, summaries, footer where appropriate */
export const BRAND_TAGLINE =
  "Premium websites, AI receptionists, and automation that capture leads, speed up follow-up, and improve booking—without extra headcount.";

export const BUSINESS = {
  name: "Mercy Speaks Digital",
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
  sameAs: [
    "https://facebook.com/mercyspeaksdigital",
    "https://twitter.com/mercyspeaksai",
    "https://instagram.com/mercyspeaksdigital",
    "https://linkedin.com/company/mercyspeaksdigital",
    "https://youtube.com/@mercyspeaksdigital",
  ],
} as const;

export const NAV_PATHS = {
  home: "/",
  services: "/services",
  websiteDesign: "/services/website-design",
  aiReceptionist: "/services/ai-phone-receptionist",
  workflowAutomation: "/services/workflow-automation",
  appointmentAutomation: "/services/appointment-automation",
  websiteChatbot: "/services/website-chatbot",
  reviewGeneration: "/services/review-generation",
  voiceAgents: "/services/voice-agents",
  ragData: "/services/rag-data",
  solutions: "/solutions",
  pricing: "/pricing",
  results: "/results",
  about: "/about",
  contact: "/contact",
  bookDemo: "/book-demo",
} as const;
