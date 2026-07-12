/**
 * Public marketing route registry — single source for sitemap.xml + prerender paths.
 * When you add/remove a public page in `App.tsx`, update this list in the same change.
 * Blog post URLs are derived from `getPublishedBlogPaths()` (markdown in content/blog/posts).
 *
 * Never listed here (and never in the sitemap): `/dashboard/*`, `/api/*`, `/admin/*`,
 * `/demo/*` (dev-only), and the 404 catch-all.
 */

import { getPublishedBlogPaths } from "@/content/blog-posts";

export type PublicRouteDef = {
  /** Path without domain; no trailing slash except home (`/`). */
  path: string;
  /**
   * Include in sitemap.xml. Must be indexable, HTTP 200, and must not redirect
   * (exclude aliases like `/portfolio` → `/results` and `/services/reputation-management`).
   */
  sitemap: boolean;
  /** Emit static HTML under `dist/` after `vite build`. */
  prerender: boolean;
};

/**
 * Ordered list of public chrome routes. Sitemap order follows this array.
 */
export const PUBLIC_ROUTES: readonly PublicRouteDef[] = [
  { path: "/", sitemap: true, prerender: true },
  { path: "/services", sitemap: true, prerender: true },
  { path: "/services/website-design", sitemap: true, prerender: true },
  { path: "/services/ai-phone-receptionist", sitemap: true, prerender: true },
  { path: "/services/missed-call-text-back", sitemap: true, prerender: true },
  { path: "/services/workflow-automation", sitemap: true, prerender: true },
  { path: "/services/appointment-automation", sitemap: true, prerender: true },
  { path: "/services/website-chatbot", sitemap: true, prerender: true },
  { path: "/services/review-generation", sitemap: true, prerender: true },
  { path: "/services/voice-agents", sitemap: true, prerender: true },
  { path: "/services/social-media-management", sitemap: true, prerender: true },
  { path: "/services/rag-data", sitemap: true, prerender: true },
  // Legacy alias — permanent redirect in my-app/vercel.json; prerender only
  { path: "/services/reputation-management", sitemap: false, prerender: true },
  // Legacy hub — permanent redirect /solutions → /services; omit from sitemap
  { path: "/solutions", sitemap: false, prerender: true },
  { path: "/industries", sitemap: true, prerender: true },
  { path: "/industries/hvac", sitemap: true, prerender: true },
  { path: "/industries/plumbing", sitemap: true, prerender: true },
  { path: "/industries/dental", sitemap: true, prerender: true },
  { path: "/industries/legal", sitemap: true, prerender: true },
  { path: "/industries/churches", sitemap: true, prerender: true },
  { path: "/industries/auto-repair", sitemap: true, prerender: true },
  // Legacy industry URL — still live; new HVAC/plumbing live under /industries/*
  { path: "/roofing", sitemap: true, prerender: true },
  // Legacy aliases — permanent redirects in my-app/vercel.json; prerender only
  { path: "/hvac", sitemap: false, prerender: true },
  { path: "/plumbing", sitemap: false, prerender: true },
  { path: "/houston", sitemap: true, prerender: true },
  { path: "/richmond-tx", sitemap: true, prerender: true },
  { path: "/pricing", sitemap: true, prerender: true },
  { path: "/results", sitemap: true, prerender: true },
  { path: "/testimonials", sitemap: true, prerender: true },
  { path: "/about", sitemap: true, prerender: true },
  { path: "/blog", sitemap: true, prerender: true },
  { path: "/contact", sitemap: true, prerender: true },
  { path: "/book-demo", sitemap: true, prerender: true },
  { path: "/ai-employee-system", sitemap: true, prerender: true },
  { path: "/cookie-policy", sitemap: true, prerender: true },
  // Client navigate → /results; canonical points at /results — omit from sitemap
  { path: "/portfolio", sitemap: false, prerender: true },
  // Widget surfaces — excluded from sitemap (/widget/*)
  { path: "/widget/frame", sitemap: false, prerender: true },
  { path: "/widget/install", sitemap: false, prerender: true },
] as const;

export function getSitemapPaths(): string[] {
  return [
    ...PUBLIC_ROUTES.filter((r) => r.sitemap).map((r) => r.path),
    ...getPublishedBlogPaths(),
  ];
}

export function getPrerenderPaths(): string[] {
  return [
    ...PUBLIC_ROUTES.filter((r) => r.prerender).map((r) => r.path),
    ...getPublishedBlogPaths(),
  ];
}

/** Absolute loc for sitemap: https origin, www host preferred via env, no trailing slash except `/`. */
export function toSitemapLoc(origin: string, path: string): string {
  const base = origin.replace(/\/$/, "");
  if (path === "/") return `${base}/`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean.replace(/\/$/, "")}`;
}
