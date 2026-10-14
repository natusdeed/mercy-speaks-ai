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
  { path: "/websites", sitemap: true, prerender: true },
  { path: "/website-care", sitemap: true, prerender: true },
  { path: "/ai-pilot", sitemap: true, prerender: true },
  { path: "/results", sitemap: true, prerender: true },
  { path: "/about", sitemap: true, prerender: true },
  { path: "/contact", sitemap: true, prerender: true },
  { path: "/pricing", sitemap: true, prerender: true },
  { path: "/services", sitemap: true, prerender: true },
  { path: "/services/website-design", sitemap: true, prerender: true },
  { path: "/book-demo", sitemap: true, prerender: true },
  { path: "/industries", sitemap: true, prerender: true },
  { path: "/industries/hvac", sitemap: true, prerender: true },
  { path: "/industries/plumbing", sitemap: true, prerender: true },
  { path: "/industries/dental", sitemap: true, prerender: true },
  { path: "/industries/legal", sitemap: true, prerender: true },
  { path: "/industries/churches", sitemap: true, prerender: true },
  { path: "/industries/auto-repair", sitemap: true, prerender: true },
  { path: "/roofing", sitemap: true, prerender: true },
  { path: "/houston", sitemap: true, prerender: true },
  { path: "/richmond-tx", sitemap: true, prerender: true },
  { path: "/cookie-policy", sitemap: true, prerender: true },
  // Privacy / Terms: substantive drafts pending Donatus's review — noindex, omit from sitemap until approved
  { path: "/privacy", sitemap: false, prerender: true },
  { path: "/terms", sitemap: false, prerender: true },
  // /widget/frame and /widget/install: widget parked — unrouted (files kept), not prerendered.
  // Redirect aliases (/solutions, /hvac, /plumbing, /portfolio, /testimonials, old AI service URLs) are handled by
  // vercel.json permanent redirects and are not prerendered. Withdrawn pages are not routed (404).
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
