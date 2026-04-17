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
import { StaticRouter } from "react-router-dom/server";
import { loadEnv } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const distDir = join(rootDir, "dist");

/** Paths aligned with sitemap + /portfolio; excludes /dashboard (SPA). */
export const PRERENDER_PATHS: string[] = [
  "/",
  "/about",
  "/contact",
  "/portfolio",
  "/pricing",
  "/book-demo",
  "/services",
  "/solutions",
  "/roofing",
  "/hvac",
  "/plumbing",
  "/results",
  "/services/ai-phone-receptionist",
  "/services/appointment-automation",
  "/services/rag-data",
  "/services/review-generation",
  "/services/voice-agents",
  "/services/website-chatbot",
  "/services/website-design",
  "/services/workflow-automation",
  "/widget/frame",
  "/widget/install",
];

const PRERENDER_HEAD_REGION =
  /<!--\s*vite-prerender-head:begin\s*-->[\s\S]*?<!--\s*vite-prerender-head:end\s*-->/;

/**
 * React 19 emits <title>/<meta>/<link> in document order; they appear as a contiguous prefix before real UI
 * (e.g. skip-link). Consume every consecutive head-eligible tag so nothing invalid stays inside #root.
 */
const HEAD_TAG_CHUNK =
  /^(<title\b[\s\S]*?<\/title>|<meta\b[\s\S]*?>|<link\b[\s\S]*?>|<base\b[\s\S]*?>)/i;

function splitHoistedHead(html: string): { headInner: string; bodyHtml: string } {
  let s = html.trimStart();
  const chunks: string[] = [];
  for (;;) {
    const m = s.match(HEAD_TAG_CHUNK);
    if (!m) break;
    chunks.push(m[1]);
    s = s.slice(m[1].length).trimStart();
  }
  return { headInner: chunks.join(""), bodyHtml: s };
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

function renderRoute(App: ComponentType, pathname: string): { headInner: string; bodyHtml: string } {
  const helmetContext: { helmet?: unknown } = {};
  const app = (
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={pathname}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );
  const raw = renderToString(app);
  return splitHoistedHead(raw);
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

  console.log(`Prerendered ${PRERENDER_PATHS.length} routes. Set VITE_SITE_URL in build env for canonicals.`);
}

void main();
