/**
 * Shared chat request handler — OpenAI (server-side only).
 * Used by route.ts and Vite dev middleware.
 * Guardrails: message length limit, rate limit per IP. Never invents facts (business context).
 * Reliability: 20s timeout, one retry for transient upstream failures, structured errors, request logging.
 */

import { getBusinessContextBlock } from "../../../lib/business-context";

export const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20;
export const REQUEST_TIMEOUT_MS = 20_000; // 20s
export const FALLBACK_MESSAGE =
  "I'm having trouble connecting right now. Please call us at (703) 332-5956 or email don@mercyspeaksdigital.com and we'll help you right away! 📞";

/** Generate a short request id for tracing (server logs only). */
function generateRequestId(): string {
  return `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

/** Whether an upstream error is likely transient and worth one retry. */
function isRetriableError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  const code = err && typeof err === "object" && "code" in err ? (err as { code?: string }).code : undefined;
  if (code === "ECONNRESET" || code === "ETIMEDOUT" || code === "ECONNREFUSED") return true;
  if (message.includes("timeout") || message.includes("abort") || message.includes("AbortError")) return true;
  if (message.includes("503") || message.includes("502") || message.includes("429")) return true;
  return false;
}

/** Server-only request log: requestId, timestamp, route, status, upstream error, userAgent. */
function logRequest(params: {
  requestId: string;
  route: string;
  status: number;
  upstreamError?: string;
  userAgent?: string | null;
}): void {
  const payload = {
    requestId: params.requestId,
    timestamp: new Date().toISOString(),
    route: params.route,
    status: params.status,
    ...(params.upstreamError && { upstreamError: params.upstreamError }),
    ...(params.userAgent && { userAgent: params.userAgent }),
  };
  console.log("[chat-api]", JSON.stringify(payload));
}

// In-memory rate limit: IP -> { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  let entry = rateLimitMap.get(ip);
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  if (now >= entry.resetAt) {
    entry = { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
    rateLimitMap.set(ip, entry);
    return { ok: true };
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true };
}

/** True when the user message suggests pricing, demo, or booking/schedule/call intent (lead capture + fallback CTA). */
function isLeadIntent(userMessage: string): boolean {
  const lower = userMessage.toLowerCase();
  const triggers = [
    "pricing",
    "price",
    "cost",
    "how much",
    "book a demo",
    "book demo",
    "schedule a demo",
    "schedule demo",
    "schedule",
    "demo",
    "quote",
    "pricing options",
    "call",
    "talk",
    "meeting",
    "speak with",
    "speak to",
  ];
  return triggers.some((t) => lower.includes(t));
}

export type ChatRequestBody = {
  userMessage?: string;
  message?: string; // legacy
  conversationHistory?: Array<{ role: "user" | "assistant"; content: string }>;
  context?: string;
};

function getSystemPrompt(context?: string): string {
  const businessBlock = getBusinessContextBlock();
  const base = `You are Mercy AI, a professional assistant for Mercy Speaks Digital.

${businessBlock}

Communication style: Professional and direct. Keep responses concise (2–3 sentences when possible). No excessive formatting. Do not invent any facts not listed above — if unsure, suggest booking a demo or calling the team.`;
  if (context?.trim()) {
    return `${base}\n\nCurrent page context (use only to tailor your reply): ${context.trim()}`;
  }
  return base;
}

/** Log conversation for conversion measurement (console; optional DB can be added later). */
function logConversation(
  ip: string,
  userMessage: string,
  assistantPreview: string,
  askForLead: boolean
): void {
  const payload = {
    ts: new Date().toISOString(),
    ip,
    userMessageLength: userMessage.length,
    assistantPreview: assistantPreview.slice(0, 200),
    askForLead,
  };
  console.log("[chat]", JSON.stringify(payload));
}

export async function handleChatRequest(request: Request): Promise<Response> {
  const requestId = generateRequestId();
  const userAgent = request.headers.get("user-agent");
  const route = "/api/chat";

  if (request.method !== "POST") {
    logRequest({ requestId, route, status: 405, userAgent });
    return Response.json(
      { error: "Method not allowed", code: "METHOD_NOT_ALLOWED" },
      { status: 405 }
    );
  }

  const ip = getClientIp(request.headers);
  const rate = checkRateLimit(ip);
  if (!rate.ok) {
    logRequest({ requestId, route, status: 429, userAgent });
    return Response.json(
      {
        error: "Too many requests. Please try again in a moment.",
        code: "RATE_LIMITED",
        retryAfter: rate.retryAfter,
      },
      {
        status: 429,
        headers: rate.retryAfter
          ? { "Retry-After": String(rate.retryAfter) }
          : undefined,
      }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  // #region agent log
  const debugLog = (msg: string, data: Record<string, unknown>) => {
    fetch("http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "7bd99d" }, body: JSON.stringify({ sessionId: "7bd99d", location: "chat-handler.ts", message: msg, data, timestamp: Date.now(), hypothesisId: "H1" }) }).catch(() => {});
  };
  // #endregion
  if (!apiKey) {
    console.error("[chat-api] Missing OPENAI_API_KEY — cannot serve chat.");
    debugLog("missing OPENAI_API_KEY, returning 500", { hasKey: false, status: 500 });
    logRequest({ requestId, route, status: 500, upstreamError: "Missing OPENAI_API_KEY", userAgent });
    return Response.json(
      { error: "Missing OPENAI_API_KEY" },
      { status: 500 }
    );
  }
  debugLog("OPENAI_API_KEY present, parsing body", { hasKey: true });

  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    logRequest({ requestId, route, status: 400, userAgent });
    return Response.json(
      { error: "Invalid JSON body", code: "BAD_REQUEST" },
      { status: 400 }
    );
  }

  const userMessage =
    typeof body.userMessage === "string"
      ? body.userMessage.trim()
      : typeof body.message === "string"
        ? body.message.trim()
        : "";
  if (!userMessage) {
    logRequest({ requestId, route, status: 400, userAgent });
    return Response.json(
      { error: "Message is required", code: "BAD_REQUEST" },
      { status: 400 }
    );
  }
  if (userMessage.length > MAX_MESSAGE_LENGTH) {
    logRequest({ requestId, route, status: 400, userAgent });
    return Response.json(
      {
        error: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters).`,
        code: "BAD_REQUEST",
      },
      { status: 400 }
    );
  }

  const history = Array.isArray(body.conversationHistory)
    ? body.conversationHistory.filter(
        (m) =>
          m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string"
      )
    : [];
  const context =
    typeof body.context === "string" ? body.context.trim() : undefined;

  const askForLead = isLeadIntent(userMessage);

  const { OpenAI } = await import("openai");
  const openai = new OpenAI({ apiKey });

  const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: getSystemPrompt(context) },
    ...history.slice(-20).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content.slice(0, 8000),
    })),
    { role: "user", content: userMessage },
  ];

  const streamRequest = request.headers.get("accept")?.includes("text/event-stream");

  const runWithTimeout = async (signal: AbortSignal): Promise<Response> => {
    if (streamRequest) {
      const stream = await openai.chat.completions.create(
        {
          model: "gpt-4o-mini",
          messages,
          max_tokens: 1024,
          stream: true,
        },
        { signal }
      );

      const encoder = new TextEncoder();
      let fullText = "";
      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              const text = chunk.choices[0]?.delta?.content;
              if (text) {
                fullText += text;
                controller.enqueue(encoder.encode(text));
              }
            }
            logConversation(ip, userMessage, fullText, askForLead);
          } catch (streamErr) {
            const msg = streamErr instanceof Error ? streamErr.message : String(streamErr);
            console.error("[chat-api] stream error:", msg);
            throw streamErr;
          } finally {
            controller.close();
          }
        },
      });

      return new Response(readable, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    const completion = await openai.chat.completions.create(
      {
        model: "gpt-4o-mini",
        messages,
        max_tokens: 1024,
      },
      { signal }
    );
    const text =
      completion.choices[0]?.message?.content?.trim() ||
      "Sorry, I couldn't generate a response.";
    logConversation(ip, userMessage, text, askForLead);
    return Response.json({
      response: text,
      askForLead,
    });
  };

  let lastError: unknown;
  for (let attempt = 0; attempt <= 1; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const res = await runWithTimeout(controller.signal);
      clearTimeout(timeoutId);
      logRequest({ requestId, route, status: res.status, userAgent });
      return res;
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      lastError = err;
      const message = err instanceof Error ? err.message : String(err);
      if (attempt === 0 && isRetriableError(err)) {
        console.warn("[chat-api] transient error, retrying:", message);
        continue;
      }
      break;
    }
  }

  const upstreamMessage = lastError instanceof Error ? lastError.message : String(lastError);
  const upstreamStack = lastError instanceof Error ? lastError.stack : undefined;
  console.error("[chat-api] OpenAI call failed:", upstreamMessage, upstreamStack ? "\n" + upstreamStack : "");
  // Server-side fallback: if AI failed but user intent was booking/pricing, return helpful CTA instead of error.
  if (isLeadIntent(userMessage)) {
    logRequest({
      requestId,
      route,
      status: 200,
      upstreamError: upstreamMessage,
      userAgent,
    });
    return Response.json({
      response:
        "I'm having trouble connecting right now. Use the links below to book a demo or contact us — we'll get back to you right away.",
      askForLead: false,
      fallbackCta: true,
    });
  }
  debugLog("OpenAI failed, returning 502", { status: 502, upstreamError: upstreamMessage });
  logRequest({
    requestId,
    route,
    status: 502,
    upstreamError: upstreamMessage,
    userAgent,
  });
  return Response.json(
    {
      error: "Upstream error",
      fallbackMessage: FALLBACK_MESSAGE,
      fallbackCta: true,
    },
    { status: 502 }
  );
}
