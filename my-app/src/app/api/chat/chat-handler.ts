/**
 * Shared chat request handler — OpenAI (server-side only).
 * Used by route.ts and Vite dev middleware.
 * Guardrails: message length limit, rate limit per IP. Never invents facts (business context).
 */

import { getBusinessContextBlock } from "../../../lib/business-context";

export const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20;
export const FALLBACK_MESSAGE =
  "I'm having trouble connecting right now. Please call us at (703) 332-5956 or email don@mercyspeaksdigital.com and we'll help you right away! 📞";

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

/** True when the user message suggests pricing or demo intent (for lead capture). */
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
    "demo",
    "quote",
    "pricing options",
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
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const ip = getClientIp(request.headers);
  const rate = checkRateLimit(ip);
  if (!rate.ok) {
    return Response.json(
      {
        error: "Too many requests. Please try again in a moment.",
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
  if (!apiKey) {
    console.error("OPENAI_API_KEY is not set");
    return Response.json(
      { error: "Chat is not configured. Please try again later." },
      { status: 503 }
    );
  }

  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return Response.json(
      { error: "Invalid JSON body" },
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
    return Response.json(
      { error: "Message is required" },
      { status: 400 }
    );
  }
  if (userMessage.length > MAX_MESSAGE_LENGTH) {
    return Response.json(
      {
        error: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters).`,
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

  try {
    if (streamRequest) {
      const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 1024,
        stream: true,
      });

      const encoder = new TextEncoder();
      let fullText = "";
      const readable = new ReadableStream({
        async start(controller) {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) {
              fullText += text;
              controller.enqueue(encoder.encode(text));
            }
          }
          logConversation(ip, userMessage, fullText, askForLead);
          controller.close();
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

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 1024,
    });
    const text =
      completion.choices[0]?.message?.content?.trim() ||
      "Sorry, I couldn't generate a response.";
    logConversation(ip, userMessage, text, askForLead);
    return Response.json({
      response: text,
      askForLead,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("OpenAI chat error:", message);
    return Response.json(
      {
        error: "Service temporarily unavailable.",
        fallbackMessage: FALLBACK_MESSAGE,
      },
      { status: 502 }
    );
  }
}
