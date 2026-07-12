/**
 * Analyze prerendered dist HTML directly (authoritative SEO source).
 * Also verifies FAQ answer strings appear in HTML.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const require = createRequire(import.meta.url);

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function metaContent(html, attr, name) {
  const re1 = new RegExp(`<meta[^>]*${attr}=["']${name}["'][^>]*content=["']([^"']*)["'][^>]*>`, "i");
  const re2 = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*${attr}=["']${name}["'][^>]*>`, "i");
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
  return [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
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
        if (Array.isArray(node)) return node.forEach(walk);
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

function extractImgs(html) {
  return [...html.matchAll(/<img\b([^>]*)>/gi)].map((m) => {
    const attrs = m[1];
    return {
      src: (attrs.match(/\bsrc=["']([^"']+)["']/i) || [])[1] || "",
      alt: (() => {
        const am = attrs.match(/\balt=["']([^"']*)["']/i);
        return am ? decodeEntities(am[1]) : null;
      })(),
      hasAltAttr: /\balt=/i.test(attrs),
      width: (attrs.match(/\bwidth=["']?(\d+)/i) || [])[1] || null,
      height: (attrs.match(/\bheight=["']?(\d+)/i) || [])[1] || null,
      loading: (attrs.match(/\bloading=["']([^"']+)["']/i) || [])[1] || null,
    };
  });
}

function fileForPath(p) {
  if (p === "/") return path.join(DIST, "index.html");
  return path.join(DIST, p.replace(/^\//, ""), "index.html");
}

function sitemapPaths() {
  const xml = fs.readFileSync(path.join(DIST, "sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
    const u = new URL(m[1]);
    return u.pathname.replace(/\/$/, "") || "/";
  });
}

const FORBIDDEN_RES = [
  { id: "lorem", re: /lorem\s+ipsum/i },
  { id: "Martinez HVAC", re: /Martinez\s+HVAC/i },
  { id: "Carlos Martinez", re: /Carlos\s+Martinez/i },
  { id: "Elite Dental", re: /Elite\s+Dental/i },
  { id: "Chen's Auto", re: /Chen'?s\s+Auto/i },
  { id: "$0 in", re: /\$0\s+in\b/i },
  { id: "0% missed", re: /0%\s+missed/i },
  { id: "NEEDS_REAL", re: /NEEDS_REAL/ },
  { id: "Video preview placeholder", re: /Video preview placeholder/i },
];

async function main() {
  const paths = sitemapPaths();
  const routes = [];
  for (const p of paths) {
    const file = fileForPath(p);
    if (!fs.existsSync(file)) {
      routes.push({ path: p, missingFile: true });
      continue;
    }
    const html = fs.readFileSync(file, "utf8");
    const title = extractTitle(html);
    const description = metaContent(html, "name", "description");
    const canonical = linkHref(html, "canonical");
    const h1s = extractH1s(html);
    const jsonLd = extractJsonLdTypes(html);
    const imgs = extractImgs(html);
    const forbidden = FORBIDDEN_RES.filter((f) => f.re.test(html)).map((f) => f.id);
    const mercyHits = [...html.matchAll(/mercyspeaks\.ai/gi)].map((m) =>
      html.slice(Math.max(0, m.index - 60), m.index + 60).replace(/\s+/g, " "),
    );
    const flags = [];
    if (!title) flags.push("missing title");
    if (!description) flags.push("missing meta description");
    if (!canonical) flags.push("missing canonical");
    if (h1s.length !== 1) flags.push(`H1 count=${h1s.length}`);
    if (!jsonLd.length) flags.push("missing JSON-LD");
    if (title && (title.length < 30 || title.length > 60)) flags.push(`title ${title.length} chars`);
    if (description && (description.length < 70 || description.length > 160))
      flags.push(`desc ${description.length} chars`);
    const weakAlts = imgs.filter((i) => !i.hasAltAttr || !i.alt || i.alt.length < 3 || /^(image|img|photo)$/i.test(i.alt));
    const missingDims = imgs.filter((i) => !i.width || !i.height);
    const missingLazy = imgs.filter((i) => i.loading !== "lazy" && i.loading !== "eager");

    routes.push({
      path: p,
      title,
      titleLen: title?.length ?? 0,
      description,
      descLen: description?.length ?? 0,
      canonical,
      h1s,
      jsonLd,
      ogTitle: metaContent(html, "property", "og:title"),
      ogDesc: metaContent(html, "property", "og:description"),
      ogImage: metaContent(html, "property", "og:image"),
      twCard: metaContent(html, "name", "twitter:card"),
      twImage: metaContent(html, "name", "twitter:image"),
      twTitle: metaContent(html, "name", "twitter:title"),
      flags,
      forbidden,
      mercyHits,
      imgs: { count: imgs.length, weakAlts, missingDims, missingLazy, all: imgs },
      hasPreconnectCal: /preconnect[^>]+cal\.com/i.test(html),
      hasPreconnectFonts: /preconnect[^>]+fonts\.googleapis/i.test(html),
    });
  }

  // FAQ integrity: home FAQs
  const homeHtml = fs.readFileSync(fileForPath("/"), "utf8");
  const homeFaqsPath = path.join(ROOT, "src/content/home-faqs.ts");
  const homeFaqsSrc = fs.readFileSync(homeFaqsPath, "utf8");
  const answers = [...homeFaqsSrc.matchAll(/answer:\s*\n?\s*"([^"]+)"/g)].map((m) => m[1]);
  const homeFaqCheck = answers.map((a) => ({
    snippet: a.slice(0, 60),
    present: homeHtml.includes(a),
  }));

  // Industry HVAC faqs via generated content in HTML — check a few known strings
  const hvacHtml = fs.readFileSync(fileForPath("/industries/hvac"), "utf8");
  const pricingHtml = fs.readFileSync(fileForPath("/pricing"), "utf8");
  const airHtml = fs.readFileSync(fileForPath("/services/ai-phone-receptionist"), "utf8");

  const out = {
    generatedAt: new Date().toISOString(),
    routes,
    seoProblems: routes.filter((r) => r.flags?.length || r.forbidden?.length),
    homeFaqCheck,
    homeFaqMissing: homeFaqCheck.filter((x) => !x.present),
    sampleFaqPresence: {
      homeHasCommonQuestions: /Common Questions/i.test(homeHtml),
      pricingHasFaq: /faq|Frequently|Common Questions/i.test(pricingHtml),
      airHasFaq: /faq|Frequently|Common Questions/i.test(airHtml),
      hvacHasFaq: /faq|Frequently|Common Questions/i.test(hvacHtml),
    },
  };
  fs.writeFileSync(path.join(ROOT, "qa-seo-dist.json"), JSON.stringify(out, null, 2));
  console.log(
    JSON.stringify(
      {
        routes: routes.length,
        problemPages: out.seoProblems.length,
        homeFaqMissing: out.homeFaqMissing.length,
        samples: routes.slice(0, 5).map((r) => ({
          p: r.path,
          title: r.title,
          titleLen: r.titleLen,
          descLen: r.descLen,
          h1: r.h1s,
          jsonLd: r.jsonLd,
          flags: r.flags,
          forbidden: r.forbidden,
        })),
        imgIssues: routes
          .filter((r) => r.imgs?.weakAlts?.length || r.imgs?.missingDims?.length)
          .map((r) => ({
            p: r.path,
            weak: r.imgs.weakAlts,
            dims: r.imgs.missingDims,
          })),
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
