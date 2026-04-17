/**
 * POST /api/chat/lead — lead capture from chatbot (business name, email, phone).
 * Delegates to shared handler in lead-route.ts.
 */
import { handleChatLeadRequest } from "../lead-route";

export async function POST(request: Request): Promise<Response> {
  return handleChatLeadRequest(request);
}
