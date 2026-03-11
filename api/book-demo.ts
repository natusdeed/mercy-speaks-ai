/**
 * Vercel serverless: POST /api/book-demo — delegates to my-app route.
 */
import { POST } from "../my-app/src/app/api/book-demo/route";

export default {
  async fetch(request: Request): Promise<Response> {
    return POST(request);
  },
};
