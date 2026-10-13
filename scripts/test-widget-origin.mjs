// Widget origin policy tests: shared helper, config/chat/lead via the bundled API, frame-ancestors
// consistency with vercel.json, and widget-lead false-success. No real network: fetch is mocked.
// Run: npm run build:api && npx tsx scripts/test-widget-origin.mjs
import fs from "node:fs";
import {
  isHostAllowedByDomains, isWidgetRequestOriginAllowed, buildFrameAncestors, frameAncestorsHeaderValue,
} from "../my-app/src/lib/widget-origin.ts";
import { DEMO_TENANT_DOMAINS } from "../my-app/src/lib/widget-tenant.ts";

for (const k of ["SUPABASE_URL","SUPABASE_SERVICE_KEY","RESEND_API_KEY","OPENAI_API_KEY","MERCY_TENANT_ID"]) delete process.env[k];
let fail = 0;
const t = (name, ok, extra = "") => { if (!ok) fail++; console.log(ok ? "PASS" : "FAIL", name, extra); };

// ---- helper unit tests
const D = ["mercyspeaksdigital.com", "*.client.example", "localhost", "*", "*.app"];
t("helper exact", isHostAllowedByDomains(D, "mercyspeaksdigital.com"));
t("helper www ignored", isHostAllowedByDomains(D, "www.mercyspeaksdigital.com"));
t("helper subdomain wildcard", isHostAllowedByDomains(D, "a.client.example"));
t("helper wildcard not apex", !isHostAllowedByDomains(D, "client.example"));
t("helper bare * ignored", !isHostAllowedByDomains(["*"], "evil.com"));
t("helper *.tld ignored", !isHostAllowedByDomains(D, "evil.app"));
t("helper suffix trick", !isHostAllowedByDomains(D, "evilmercyspeaksdigital.com"));
t("helper unapproved", !isHostAllowedByDomains(D, "evil.example.com"));
const R = (url, h) => new Request(url, { headers: h });
t("req approved origin", isWidgetRequestOriginAllowed(R("https://p.vercel.app/x", { origin: "https://mercyspeaksdigital.com" }), D));
t("req same-origin (frame)", isWidgetRequestOriginAllowed(R("https://p.vercel.app/x", { origin: "https://p.vercel.app" }), []));
t("req other vercel.app rejected", !isWidgetRequestOriginAllowed(R("https://p.vercel.app/x", { origin: "https://evil.vercel.app" }), DEMO_TENANT_DOMAINS));
t("req missing origin rejected", !isWidgetRequestOriginAllowed(R("https://p.vercel.app/x", {}), D));
t("req null origin rejected", !isWidgetRequestOriginAllowed(R("https://p.vercel.app/x", { origin: "null" }), D));
t("req referer fallback", isWidgetRequestOriginAllowed(R("https://p.vercel.app/x", { referer: "https://mercyspeaksdigital.com/a" }), D));
const fa = buildFrameAncestors(D);
t("frame-ancestors no bare *", !fa.split(" ").includes("*") && !/https:\/\/\*\.app\b/.test(fa), fa);
t("frame-ancestors starts 'self'", fa.startsWith("'self'"));
const vj = JSON.parse(fs.readFileSync(new URL("../vercel.json", import.meta.url)));
const frameRule = vj.headers.find((h) => h.source === "/widget/frame(.*)");
const csp = frameRule?.headers.find((h) => h.key === "Content-Security-Policy")?.value;
t("vercel.json CSP == helper(DEMO_TENANT_DOMAINS)", csp === frameAncestorsHeaderValue(DEMO_TENANT_DOMAINS), csp);
t("vercel.json frame rule has no XFO", !frameRule.headers.some((h) => h.key === "X-Frame-Options"));
const catchAll = vj.headers.find((h) => h.headers.some((x) => x.key === "X-Frame-Options"));
t("vercel.json XFO DENY elsewhere", catchAll?.source === "/((?!widget/frame).*)" && catchAll.headers.find((x) => x.key === "X-Frame-Options").value === "DENY");

// ---- route tests through the bundle
const realFetch = globalThis.fetch;
const calls = [];
let resendOk = true;
globalThis.fetch = async (input, init) => {
  const u = String(input?.url ?? input);
  calls.push(u);
  if (u.includes("openai.com")) return new Response(JSON.stringify({ choices: [{ message: { content: "mock" } }] }), { status: 200, headers: { "content-type": "application/json" } });
  if (u.includes("resend.com")) return resendOk ? new Response(JSON.stringify({ id: "mock" }), { status: 200, headers: { "content-type": "application/json" } }) : new Response(JSON.stringify({ message: "x", name: "x" }), { status: 500, headers: { "content-type": "application/json" } });
  throw new Error("unexpected network " + u);
};
const h = await import("../api/index.mjs");
const f = (h.default ?? h).fetch ?? h.fetch;
const HOST = "https://msai-preview.vercel.app";
const OK = { origin: "https://mercyspeaksdigital.com" }, SELF = { origin: HOST }, BAD = { origin: "https://evil.example.com" }, OTHERV = { origin: "https://evil.vercel.app" };
const cfg = (q, hd) => f(new Request(`${HOST}/api/index?__path=widget/config&${q}`, { headers: hd }));
const post = (p, body, hd) => f(new Request(`${HOST}/api/index?__path=${p}`, { method: "POST", headers: { "content-type": "application/json", ...hd }, body: JSON.stringify(body) }));
const K = "tenant=demo&key=" + "demo_public_key";
const exp = async (name, p, code) => { const r = await p; t(name, r.status === code, String(r.status)); return r; };
await exp("config approved origin + key", cfg(K, OK), 200);
await exp("config same-origin frame + key", cfg(K, SELF), 200);
await exp("config unapproved origin", cfg(K, BAD), 403);
await exp("config foreign *.vercel.app", cfg(K, OTHERV), 403);
await exp("config missing origin", cfg(K, {}), 403);
await exp("config missing key", cfg("tenant=demo", OK), 403);
await exp("config invalid key", cfg("tenant=demo&key=fake_invalid_123", OK), 403);

process.env.OPENAI_API_KEY = "test-mock-not-real";
const chat = { tenantId: "demo", key: "demo_public_key", userMessage: "hi" };
await exp("chat approved origin reaches app (mocked AI)", post("widget/chat", chat, OK), 200);
await exp("chat same-origin frame (mocked AI)", post("widget/chat", chat, SELF), 200);
await exp("chat unapproved origin", post("widget/chat", chat, BAD), 403);
await exp("chat missing origin", post("widget/chat", chat, {}), 403);
delete process.env.OPENAI_API_KEY;

const lead = { tenantId: "demo", name: "Test Fictional", email: "fictional@example.invalid", phone: "5550000000" };
await exp("lead unapproved origin", post("widget/lead", lead, BAD), 403);
await exp("lead missing origin", post("widget/lead", lead, {}), 403);
await exp("lead foreign *.vercel.app", post("widget/lead", lead, OTHERV), 403);
const r1 = await exp("lead approved, no durable path -> controlled 503", post("widget/lead", lead, OK), 503);
t("lead 503 not success", !(await r1.json()).success);
const r1b = await exp("lead same-origin frame, no durable path -> 503", post("widget/lead", lead, SELF), 503);
process.env.RESEND_API_KEY = "re_test_mock_not_real"; resendOk = false;
const r2 = await exp("lead email rejected -> controlled 503", post("widget/lead", lead, OK), 503);
resendOk = true;
const r3 = await exp("lead email accepted (mock) -> success", post("widget/lead", lead, OK), 200);
t("lead success only when accepted", (await r3.json()).success === true);
delete process.env.RESEND_API_KEY;
t("no unexpected network", calls.every((u) => u.includes("openai.com") || u.includes("resend.com")));
globalThis.fetch = realFetch;
console.log(fail ? `${fail} FAILED` : "ALL PASS");
process.exit(fail ? 1 : 0);
