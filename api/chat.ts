/**
 * Vercel serverless: POST /api/chat — delegates to my-app chat handler.
 */
import { handleChatRequest } from "../my-app/src/app/api/chat/chat-handler";

export default {
  async fetch(request: Request): Promise<Response> {
    return handleChatRequest(request);
  },
};
