/**
 * Vercel serverless: POST /api/chat/lead — delegates to my-app lead route.
 */
import { handleChatLeadRequest } from "../../my-app/src/app/api/chat/lead-route";

export default {
  async fetch(request: Request): Promise<Response> {
    return handleChatLeadRequest(request);
  },
};
