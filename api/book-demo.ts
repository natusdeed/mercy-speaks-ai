/**
 * Vercel serverless: POST /api/book-demo — delegates to my-app route.
 * Wrapped in try/catch so no uncaught exception reaches Vercel (avoids FUNCTION_INVOCATION_FAILED).
 */
import { POST } from "../my-app/src/app/api/book-demo/route";

export default {
  async fetch(request: Request): Promise<Response> {
    try {
      return await POST(request);
    } catch (e) {
      console.error("[api/book-demo]", e);
      return new Response(
        JSON.stringify({
          message: "A server error occurred. Please try again or use the Cal.com link to book directly.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },
};
