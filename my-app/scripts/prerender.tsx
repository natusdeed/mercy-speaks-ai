/**
 * After `vite build`, generates real HTML for public marketing routes so crawlers and non-JS
 * clients see titles, meta, canonicals, and body content (including JSON-LD) without executing the bundle.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { ComponentType } from "react";
import React from "react";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "@/lib/react-helmet-compat";
import { getPrerenderPaths } from "@/lib/public-routes";
import { StaticRouter } from "react-router-dom/server";
import { loadEnv } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const distDir = join(rootDir, "dist");

/** Derived from `src/lib/public-routes.ts` (excludes /dashboard, /api, admin). */
export const PRERENDER_PATHS: string[] = getPrerenderPaths();

/** Unmatched path used only to render the catch-all NotFound into dist/404.html */
const NOT_FOUND_PRERENDER_PATH = "/__not_found__";

const PRERENDER_HEAD_REGION =
  /<!--\s*vite-prerender-head:begin\s*-->[\s\S]*?<!--\s*vite-prerender-head:end\s*-->/;

/**
 * React 19 emits <title>/<meta>/<link> in document order; they appear as a contiguous prefix before real UI
 * (e.g. skip-link). Consume every consecutive head-eligible tag so nothing invalid stays inside #root.
 * JSON-LD scripts are also head-eligible (Google + Rich Results expect them in <head> or early body).
 */
const HEAD_TAG_CHUNK =
  /^(<title\b[\s\S]*?<\/title>|<meta\b[\s\S]*?>|<link\b[\s\S]*?>|<base\b[\s\S]*?>|<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>)/i;

const LD_JSON_SCRIPT =
  /<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi;

function splitHoistedHead(html: string): { headInner: string; bodyHtml: string } {
  let s = html.trimStart();
  const chunks: string[] = [];
  for (;;) {
    const m = s.match(HEAD_TAG_CHUNK);
    if (!m) break;
    chunks.push(m[1]);
    s = s.slice(m[1].length).trimStart();
  }
  // Safety net: move any remaining JSON-LD scripts out of the body into <head>
  const bodyLd: string[] = [];
  s = s.replace(LD_JSON_SCRIPT, (match) => {
    bodyLd.push(match);
    return "";
  });
  return { headInner: chunks.concat(bodyLd).join(""), bodyHtml: s };
}

function injectPrerenderedHead(template: string, headInner: string): string {
  const block = `<!-- vite-prerender-head:begin -->\n${headInner}\n<!-- vite-prerender-head:end -->`;
  if (!PRERENDER_HEAD_REGION.test(template)) {
    throw new Error("index.html missing vite-prerender-head markers");
  }
  return template.replace(PRERENDER_HEAD_REGION, block);
}

function injectBody(template: string, innerHtml: string): string {
  if (!template.includes('<div id="root"></div>')) {
    throw new Error('Expected empty <div id="root"></div> in dist/index.html');
  }
  return template.replace('<div id="root"></div>', `<div id="root">${innerHtml}</div>`);
}

type HelmetServerState = {
  script?: { toString(): string };
  title?: { toString(): string };
  meta?: { toString(): string };
  link?: { toString(): string };
};

function renderRoute(App: ComponentType, pathname: string): { headInner: string; bodyHtml: string } {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const app = (
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={pathname}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );
  const raw = renderToString(app);
  const { headInner, bodyHtml } = splitHoistedHead(raw);
  const helmet = helmetContext.helmet;
  // react-helmet-async may collect <script> tags into context instead of the render string
  const helmetScripts = helmet?.script?.toString?.() ?? "";
  return {
    headInner: `${headInner}${helmetScripts}`,
    bodyHtml,
  };
}

function outputPathForRoute(pathname: string): string {
  if (pathname === "/") return join(distDir, "index.html");
  const clean = pathname.replace(/^\//, "");
  return join(distDir, clean, "index.html");
}

async function main() {
  const mode = process.env.MODE || "production";
  Object.assign(process.env, loadEnv(mode, rootDir, ""), loadEnv(mode, join(rootDir, ".."), ""));
  if (!process.env.VITE_SITE_URL && !process.env.CI) {
    process.env.VITE_SITE_URL = "https://www.mercyspeaksdigital.com";
  }

  const { default: App } = await import("../src/App");

  const templatePath = join(distDir, "index.html");
  const templateBase = readFileSync(templatePath, "utf8");

  for (const path of PRERENDER_PATHS) {
    const { headInner, bodyHtml } = renderRoute(App, path);
    const html = injectBody(injectPrerenderedHead(templateBase, headInner), bodyHtml);
    const out = outputPathForRoute(path);
    if (path !== "/") {
      mkdirSync(dirname(out), { recursive: true });
    }
    writeFileSync(out, html, "utf8");
    console.log("prerender", path, "->", out.replace(distDir, "dist"));
  }

  // Vercel serves dist/404.html with HTTP 404 when no static file or rewrite matches.
  {
    const { headInner, bodyHtml } = renderRoute(App, NOT_FOUND_PRERENDER_PATH);
    const html = injectBody(injectPrerenderedHead(templateBase, headInner), bodyHtml);
    const out = join(distDir, "404.html");
    writeFileSync(out, html, "utf8");
    console.log("prerender", NOT_FOUND_PRERENDER_PATH, "-> dist/404.html");
  }

  console.log(
    `Prerendered ${PRERENDER_PATHS.length} routes + 404.html. Set VITE_SITE_URL in build env for canonicals.`
  );
}

void main();
