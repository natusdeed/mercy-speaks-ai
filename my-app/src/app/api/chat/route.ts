/**
 * POST /api/chat — OpenAI chatbot (server-side only, no API key on client).
 * Supports streaming (Accept: text/event-stream) or JSON response.
 * Body: { userMessage, conversationHistory?, context? }
 */

import { handleChatRequest } from "./chat-handler";

export async function POST(request: Request): Promise<Response> {
  return handleChatRequest(request);
}
