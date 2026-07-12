/**
 * Build-time sitemap.xml generator.
 * Derives `<url>` entries from `src/lib/public-routes.ts` (sitemap: true only).
 * Writes `public/sitemap.xml` (copied into dist by Vite) and `dist/sitemap.xml` when dist exists.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";
import { getSitemapPaths, toSitemapLoc } from "../src/lib/public-routes";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const publicDir = join(rootDir, "public");
const distDir = join(rootDir, "dist");

function resolveOrigin(): string {
  const mode = process.env.MODE || "production";
  Object.assign(process.env, loadEnv(mode, rootDir, ""), loadEnv(mode, join(rootDir, ".."), ""));
  const raw =
    (typeof process.env.VITE_SITE_URL === "string" && process.env.VITE_SITE_URL.trim()) ||
    "https://www.mercyspeaksdigital.com";
  return raw.replace(/\/$/, "");
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSitemapXml(origin: string, lastmod: string): string {
  const paths = getSitemapPaths();
  const urls = paths
    .map((path) => {
      const loc = escapeXml(toSitemapLoc(origin, path));
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>
`;
}

function writeSitemap(filePath: string, xml: string): void {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, xml, "utf8");
  console.log("sitemap", filePath.replace(rootDir, "my-app").replace(/\\/g, "/"), `(${getSitemapPaths().length} urls)`);
}

function main(): void {
  const origin = resolveOrigin();
  // W3C date (YYYY-MM-DD) — build time is acceptable per product requirements
  const lastmod = new Date().toISOString().slice(0, 10);
  const xml = buildSitemapXml(origin, lastmod);

  writeSitemap(join(publicDir, "sitemap.xml"), xml);
  if (existsSync(distDir)) {
    writeSitemap(join(distDir, "sitemap.xml"), xml);
  }
}

main();
