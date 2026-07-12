/**
 * Comprehensive local QA crawl against vite preview (prerendered dist).
 * Usage: node scripts/qa-crawl.mjs [baseUrl]
 * Writes: qa-crawl-results.json (cwd = my-app)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE = (process.argv[2] || "http://127.0.0.1:4173").replace(/\/$/, "");
const DIST = path.join(ROOT, "dist");

const FORBIDDEN = [
  { id: "lorem", re: /lorem\s+ipsum/i },
  { id: "Martinez HVAC", re: /Martinez\s+HVAC/i },
  { id: "Carlos Martinez", re: /Carlos\s+Martinez/i },
  { id: "Elite Dental", re: /Elite\s+Dental/i },
  { id: "Chen's Auto", re: /Chen'?s\s+Auto/i },
  { id: "$0 in", re: /\$0\s+in\b/i },
  { id: "0% missed", re: /0%\s+missed/i },
  { id: "NEEDS_REAL", re: /NEEDS_REAL/ },
  { id: "placeholder (visible)", re: /\bplaceholder\b/i },
  { id: "mercyspeaks.ai", re: /mercyspeaks\.ai/i },
];

const ALLOWED_MERCY_AI = [
  /widget-tenant/i,
  /allowlist/i,
  /domains/i,
  /redirect/i,
  /data-mercy/i,
];

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function metaContent(html, attr, name) {
  const re1 = new RegExp(
    `<meta[^>]*${attr}=["']${name}["'][^>]*content=["']([^"']*)["'][^>]*>`,
    "i",
  );
  const re2 = new RegExp(
    `<meta[^>]*content=["']([^"']*)["'][^>]*${attr}=["']${name}["'][^>]*>`,
    "i",
  );
  const m = html.match(re1) || html.match(re2);
  return m ? decodeEntities(m[1]) : null;
}

function linkHref(html, rel) {
  const re1 = new RegExp(`<link[^>]*rel=["']${rel}["'][^>]*href=["']([^"']*)["'][^>]*>`, "i");
  const re2 = new RegExp(`<link[^>]*href=["']([^"']*)["'][^>]*rel=["']${rel}["'][^>]*>`, "i");
  const m = html.match(re1) || html.match(re2);
  return m ? decodeEntities(m[1]) : null;
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? decodeEntities(m[1].trim()) : null;
}

function extractH1s(html) {
  const matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  return matches.map((m) =>
    decodeEntities(m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()),
  );
}

function extractJsonLdTypes(html) {
  const blocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const types = [];
  for (const b of blocks) {
    try {
      const data = JSON.parse(b[1]);
      const walk = (node) => {
        if (!node || typeof node !== "object") return;
        if (Array.isArray(node)) {
          node.forEach(walk);
          return;
        }
        if (node["@type"]) {
          const t = node["@type"];
          if (Array.isArray(t)) types.push(...t);
          else types.push(t);
        }
        if (node["@graph"]) walk(node["@graph"]);
      };
      walk(data);
    } catch {
      types.push("PARSE_ERROR");
    }
  }
  return [...new Set(types)];
}

function extractAnchors(html) {
  const hrefs = [];
  for (const m of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)) {
    hrefs.push(decodeEntities(m[1]));
  }
  return hrefs;
}

function extractImgs(html) {
  const imgs = [];
  for (const m of html.matchAll(/<img\b([^>]*)>/gi)) {
    const attrs = m[1];
    const src = (attrs.match(/\bsrc=["']([^"']+)["']/i) || [])[1] || "";
    const altM = attrs.match(/\balt=["']([^"']*)["']/i);
    const alt = altM ? decodeEntities(altM[1]) : null;
    const hasAltAttr = /\balt=/i.test(attrs);
    const width = (attrs.match(/\bwidth=["']?(\d+)/i) || [])[1] || null;
    const height = (attrs.match(/\bheight=["']?(\d+)/i) || [])[1] || null;
    const loading = (attrs.match(/\bloading=["']([^"']+)["']/i) || [])[1] || null;
    imgs.push({ src, alt, hasAltAttr, width, height, loading });
  }
  return imgs;
}

function stripScriptsStyles(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
}

function findForbidden(html, routePath) {
  const visible = stripScriptsStyles(html);
  const hits = [];
  for (const f of FORBIDDEN) {
    if (f.id === "placeholder (visible)") {
      // Flag only if it looks like user-facing stub copy, not input placeholders / CSS
      const stub = /Video preview placeholder|Sample call — placeholder|Numbers are placeholders|placeholder-safe/i;
      if (stub.test(visible) || stub.test(html)) {
        hits.push({ id: f.id, sample: (html.match(stub) || ["match"])[0] });
      }
      continue;
    }
    if (f.id === "mercyspeaks.ai") {
      if (!f.re.test(html)) continue;
      // Allowed in functional refs: widget domains, comments about redirects
      const contexts = [...html.matchAll(/mercyspeaks\.ai/gi)].map((m) => {
        const start = Math.max(0, m.index - 80);
        const snippet = html.slice(start, m.index + 80).replace(/\s+/g, " ");
        return snippet;
      });
      const bad = contexts.filter(
        (c) => !ALLOWED_MERCY_AI.some((r) => r.test(c)) && !/301|redirect|legacy|hostname|allowlist|domains/i.test(c),
      );
      // Also allow email-like and pure domain lists in JSON-LD sameAs? Prefer flagging marketing body text.
      if (bad.length) hits.push({ id: f.id, samples: bad.slice(0, 5) });
      continue;
    }
    if (f.re.test(html)) {
      const m = html.match(f.re);
      hits.push({ id: f.id, sample: m ? m[0] : "match" });
    }
  }
  return hits;
}

function sitemapPaths() {
  const xml = fs.readFileSync(path.join(DIST, "sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
    const u = new URL(m[1]);
    return u.pathname.replace(/\/$/, "") || "/";
  });
}

async function fetchText(url, opts = {}) {
  const res = await fetch(url, {
    redirect: opts.redirect || "manual",
    headers: { "user-agent": "mercy-qa-crawl/1.0" },
  });
  const text = opts.skipBody ? "" : await res.text();
  return { status: res.status, headers: Object.fromEntries(res.headers), text, url };
}

function normalizeInternal(href, pagePath) {
  if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
    return null;
  }
  if (href.startsWith("#")) {
    return { type: "hash", path: pagePath, hash: href.slice(1) };
  }
  try {
    if (href.startsWith("http://") || href.startsWith("https://")) {
      const u = new URL(href);
      const localHosts = ["127.0.0.1", "localhost", "www.mercyspeaksdigital.com", "mercyspeaksdigital.com"];
      if (localHosts.includes(u.hostname)) {
        return { type: "internal", path: u.pathname.replace(/\/$/, "") || "/", hash: u.hash.slice(1) || null, abs: href };
      }
      return { type: "external", abs: href };
    }
  } catch {
    return { type: "bad", abs: href };
  }
  if (href.startsWith("/")) {
    const [p, hash] = href.split("#");
    return { type: "internal", path: p.replace(/\/$/, "") || "/", hash: hash || null };
  }
  // relative
  const base = pagePath.endsWith("/") ? pagePath : pagePath + "/";
  try {
    const u = new URL(href, `https://www.mercyspeaksdigital.com${base}`);
    return { type: "internal", path: u.pathname.replace(/\/$/, "") || "/", hash: u.hash.slice(1) || null };
  } catch {
    return { type: "bad", abs: href };
  }
}

async function main() {
  const paths = sitemapPaths();
  console.log(`Base ${BASE} — ${paths.length} sitemap routes`);

  const routeResults = [];
  const allInternal = new Map(); // path -> from[]
  const allExternal = new Map(); // url -> from[]
  const allHashes = []; // { page, hash, from }

  for (const p of paths) {
    const url = p === "/" ? `${BASE}/` : `${BASE}${p}`;
    let res;
    try {
      res = await fetchText(url);
    } catch (e) {
      routeResults.push({ path: p, error: String(e), status: 0 });
      continue;
    }
    const html = res.text;
    const title = extractTitle(html);
    const description = metaContent(html, "name", "description");
    const canonical = linkHref(html, "canonical");
    const h1s = extractH1s(html);
    const jsonLd = extractJsonLdTypes(html);
    const ogTitle = metaContent(html, "property", "og:title");
    const ogDesc = metaContent(html, "property", "og:description");
    const ogImage = metaContent(html, "property", "og:image");
    const twCard = metaContent(html, "name", "twitter:card");
    const twImage = metaContent(html, "name", "twitter:image");
    const twTitle = metaContent(html, "name", "twitter:title");
    const imgs = extractImgs(html);
    const forbidden = findForbidden(html, p);
    const flags = [];
    if (!title) flags.push("missing title");
    if (!description) flags.push("missing meta description");
    if (!canonical) flags.push("missing canonical");
    if (h1s.length !== 1) flags.push(`H1 count=${h1s.length}`);
    if (jsonLd.length === 0) flags.push("missing JSON-LD");
    if (title && title.length > 60) flags.push(`title long (${title.length})`);
    if (title && title.length < 30) flags.push(`title short (${title.length})`);
    if (description && description.length > 160) flags.push(`desc long (${description.length})`);
    if (description && description.length < 70) flags.push(`desc short (${description.length})`);

    for (const href of extractAnchors(html)) {
      const n = normalizeInternal(href, p);
      if (!n) continue;
      if (n.type === "internal") {
        if (!allInternal.has(n.path)) allInternal.set(n.path, []);
        allInternal.get(n.path).push(p);
        if (n.hash) allHashes.push({ page: p, targetPath: n.path, hash: n.hash, href });
      } else if (n.type === "external") {
        if (!allExternal.has(n.abs)) allExternal.set(n.abs, []);
        allExternal.get(n.abs).push(p);
      } else if (n.type === "hash") {
        allHashes.push({ page: p, targetPath: p, hash: n.hash, href });
      }
    }

    routeResults.push({
      path: p,
      status: res.status,
      title,
      titleLen: title?.length ?? 0,
      description,
      descLen: description?.length ?? 0,
      canonical,
      h1s,
      jsonLd,
      ogTitle,
      ogDesc,
      ogImage,
      twCard,
      twImage,
      twTitle,
      imgs,
      forbidden,
      flags,
    });
    process.stdout.write(res.status === 200 ? "." : "x");
  }
  console.log("");

  // 404 check
  const notFound = await fetchText(`${BASE}/this-route-should-not-exist-qa-404`);
  const notFoundOk = notFound.status === 404 || (notFound.status === 200 && /404|not found/i.test(notFound.text));

  // Resolve internal links
  const internalStatus = [];
  for (const [p, from] of [...allInternal.entries()].sort()) {
    const url = p === "/" ? `${BASE}/` : `${BASE}${p}`;
    try {
      const res = await fetchText(url, { skipBody: false, redirect: "manual" });
      // SPA preview may return 200 for unknown with index — check dist file too
      const distFile =
        p === "/"
          ? path.join(DIST, "index.html")
          : path.join(DIST, p.replace(/^\//, ""), "index.html");
      const distExists = fs.existsSync(distFile) || fs.existsSync(path.join(DIST, p.replace(/^\//, "") + ".html"));
      internalStatus.push({
        path: p,
        status: res.status,
        distExists,
        from: [...new Set(from)].slice(0, 8),
        broken: res.status >= 400 || (!distExists && res.status === 200 && /__not_found__|page not found/i.test(res.text)),
      });
    } catch (e) {
      internalStatus.push({ path: p, status: 0, error: String(e), from, broken: true });
    }
  }

  // Hash / anchor presence on target pages
  const hashIssues = [];
  for (const h of allHashes) {
    if (!h.hash) continue;
    const targetUrl = h.targetPath === "/" ? `${BASE}/` : `${BASE}${h.targetPath}`;
    try {
      const res = await fetchText(targetUrl);
      const idOk =
        res.text.includes(`id="${h.hash}"`) ||
        res.text.includes(`id='${h.hash}'`) ||
        res.text.includes(`name="${h.hash}"`);
      if (!idOk) hashIssues.push({ ...h, missing: true });
    } catch {
      hashIssues.push({ ...h, missing: true, fetchError: true });
    }
  }

  // External link status (HEAD then GET)
  const externalStatus = [];
  for (const [url, from] of [...allExternal.entries()].sort()) {
    let status = 0;
    let error = null;
    try {
      let res = await fetch(url, { method: "HEAD", redirect: "follow", headers: { "user-agent": "mercy-qa-crawl/1.0" } });
      if (res.status === 405 || res.status === 403 || res.status === 0) {
        res = await fetch(url, { method: "GET", redirect: "follow", headers: { "user-agent": "mercy-qa-crawl/1.0" } });
      }
      status = res.status;
    } catch (e) {
      error = String(e.message || e);
    }
    externalStatus.push({ url, status, error, from: [...new Set(from)].slice(0, 5) });
  }

  // FAQ answers in prerendered HTML (home + pricing + industry sample)
  const faqPages = ["/", "/pricing", "/services/ai-phone-receptionist", "/industries/hvac"];
  const faqCheck = [];
  for (const p of faqPages) {
    const r = routeResults.find((x) => x.path === p);
    if (!r) continue;
    const url = p === "/" ? `${BASE}/` : `${BASE}${p}`;
    const res = await fetchText(url);
    const hasFaqSection = /faq|Frequently Asked/i.test(res.text);
    const answerBlocks = (res.text.match(/itemprop=["']text["']|FaqAnswer|accordion|role=["']region["']/gi) || []).length;
    // Count details/summary or accordion content length
    const hiddenAnswers = (res.text.match(/hidden|aria-hidden=["']true["']/gi) || []).length;
    faqCheck.push({
      path: p,
      hasFaqSection,
      answerBlocks,
      // Answers should appear as text in prerender even if collapsed
      sampleAnswerPresent: /Yes\.|No\.|Typically|We |Our /i.test(res.text),
    });
  }

  const out = {
    base: BASE,
    generatedAt: new Date().toISOString(),
    sitemapCount: paths.length,
    notFound: { status: notFound.status, title: extractTitle(notFound.text), ok404: notFoundOk },
    routes: routeResults,
    internalLinks: internalStatus,
    brokenInternal: internalStatus.filter((x) => x.broken || x.status >= 400 || !x.distExists),
    hashIssues,
    externalLinks: externalStatus,
    faqCheck,
    seoFlags: routeResults.filter((r) => r.flags?.length),
    forbiddenHits: routeResults.filter((r) => r.forbidden?.length),
  };

  const outPath = path.join(ROOT, "qa-crawl-results.json");
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log("Wrote", outPath);
  console.log(
    JSON.stringify(
      {
        routesOk: routeResults.filter((r) => r.status === 200).length,
        routesFail: routeResults.filter((r) => r.status !== 200).length,
        notFound,
        brokenInternal: out.brokenInternal.length,
        hashIssues: hashIssues.length,
        externalFail: externalStatus.filter((e) => e.status >= 400 || e.error).length,
        seoFlagPages: out.seoFlags.length,
        forbiddenPages: out.forbiddenHits.length,
      },
      null,
      2,
    ),
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
