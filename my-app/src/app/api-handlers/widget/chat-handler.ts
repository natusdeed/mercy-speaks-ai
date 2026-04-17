/**
 * Widget chat: tenant-scoped OpenAI chat. Uses tenant system_prompt; same guardrails as main chat.
 */

import { getTenant, validateTenantKey } from "../../../lib/widget-tenant";
import type { WidgetChatBody } from "../../../lib/widget-types";

const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const REQUEST_TIMEOUT_MS = 20_000;
const FALLBACK_MESSAGE =
  "I'm having trouble connecting right now. Please try again or use the booking link to get in touch.";

function getOriginHost(request: Request): string | null {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).hostname;
    } catch {
      return null;
    }
  }
  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).hostname;
    } catch {
      return null;
    }
  }
  return null;
}

function isDomainAllowed(domains: string[], hostname: string): boolean {
  const normalized = hostname.toLowerCase().replace(/^www\./, "");
  return domains.some((d) => d.toLowerCase().replace(/^www\./, "") === normalized);
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}

/** Rate limit key: per tenant + IP to limit abuse per tenant. */
function getRateLimitKey(tenantId: string, ip: string): string {
  return `${tenantId}:${ip}`;
}

function checkRateLimit(key: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  let entry = rateLimitMap.get(key);
  if (!entry) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  if (now >= entry.resetAt) {
    entry = { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
    return { ok: true };
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true };
}

function isLeadIntent(userMessage: string): boolean {
  const lower = userMessage.toLowerCase();
  const triggers = [
    "pricing", "price", "cost", "how much", "book", "schedule", "demo",
    "quote", "call", "talk", "meeting", "speak with", "speak to",
  ];
  return triggers.some((t) => lower.includes(t));
}

export async function handleWidgetChatRequest(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const ip = getClientIp(request.headers);
  let body: WidgetChatBody;
  try {
    body = (await request.json()) as WidgetChatBody;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const tenantId = typeof body.tenantId === "string" ? body.tenantId.trim() : "";
  const rateKey = getRateLimitKey(tenantId || "unknown", ip);
  const rate = checkRateLimit(rateKey);
  if (!rate.ok) {
    return Response.json(
      { error: "Too many requests. Please try again in a moment.", retryAfter: rate.retryAfter },
      { status: 429, headers: rate.retryAfter ? { "Retry-After": String(rate.retryAfter) } : undefined }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Chat not configured" }, { status: 500 });
  }

  const userMessage = typeof body.userMessage === "string" ? body.userMessage.trim() : "";
  if (!tenantId || !userMessage) {
    return Response.json({ error: "tenantId and userMessage are required" }, { status: 400 });
  }
  if (userMessage.length > MAX_MESSAGE_LENGTH) {
    return Response.json(
      { error: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters)` },
      { status: 400 }
    );
  }

  const tenant = await getTenant(tenantId);
  if (!tenant) {
    return Response.json({ error: "Tenant not found" }, { status: 404 });
  }

  if (!validateTenantKey(tenant, body.key)) {
    return Response.json({ error: "Invalid key" }, { status: 403 });
  }

  const originHost = getOriginHost(request);
  if (!originHost || !isDomainAllowed(tenant.domains, originHost)) {
    return Response.json({ error: "Domain not allowed" }, { status: 403 });
  }

  const history = Array.isArray(body.conversationHistory)
    ? body.conversationHistory.filter(
        (m) =>
          m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string"
      )
    : [];
  const systemPrompt =
    tenant.system_prompt?.trim() ||
    `You are a helpful assistant for ${tenant.name}. Be professional and concise. Do not invent facts. Suggest booking a demo or contacting the team when appropriate.`;

  const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: systemPrompt },
    ...history.slice(-20).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content.slice(0, 8000),
    })),
    { role: "user", content: userMessage },
  ];

  const askForLead = isLeadIntent(userMessage);
  const { OpenAI } = await import("openai");
  const openai = new OpenAI({ apiKey });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const completion = await openai.chat.completions.create(
      {
        model: "gpt-4o-mini",
        messages,
        max_tokens: 1024,
      },
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);
    const text =
      completion.choices[0]?.message?.content?.trim() ||
      "Sorry, I couldn't generate a response.";
    return Response.json({
      response: text,
      askForLead,
      fallbackCta: false,
    });
  } catch (err) {
    clearTimeout(timeoutId);
    const message = err instanceof Error ? err.message : String(err);
    console.error("[widget-chat] OpenAI error:", message);
    if (isLeadIntent(userMessage)) {
      return Response.json({
        response: "I'm having trouble connecting. Please use the booking link to get in touch.",
        askForLead: false,
        fallbackCta: true,
      });
    }
    return Response.json(
      { error: "Upstream error", fallbackMessage: FALLBACK_MESSAGE },
      { status: 502 }
    );
  }
}
