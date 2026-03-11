/**
 * Vercel serverless: POST /api/contact — delegates to my-app route.
 */
import { POST } from "../my-app/src/app/api/contact/route";

export default {
  async fetch(request: Request): Promise<Response> {
    return POST(request);
  },
};
