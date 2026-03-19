/**
 * Vercel serverless: POST /api/widget/chat — tenant-scoped chat (OpenAI).
 */

import { handleWidgetChatRequest } from "../../my-app/src/app/api/widget/chat-handler";

export default {
  async fetch(request: Request): Promise<Response> {
    return handleWidgetChatRequest(request);
  },
};
