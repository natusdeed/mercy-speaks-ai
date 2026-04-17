/**
 * POST /api/chat — OpenAI chatbot (server-side only, no API key on client).
 * Success: JSON { response: string, askForLead?: boolean, fallbackCta?: boolean }.
 * Errors: 500 Missing OPENAI_API_KEY; 502 { error: "Upstream error", fallbackMessage, fallbackCta: true }; 429/400 as appropriate.
 * Body: { userMessage, conversationHistory?, context? }
 * Client expects JSON (no Accept: text/event-stream); handler returns JSON by default.
 */

import { handleChatRequest } from "./chat-handler";

export async function POST(request: Request): Promise<Response> {
  return handleChatRequest(request);
}
