/**
 * Vercel serverless: POST /api/dashboard/verify
 */
import { POST } from "../../my-app/src/app/api/dashboard/verify/route";

export default {
  async fetch(request: Request): Promise<Response> {
    try {
      return await POST(request);
    } catch (e) {
      console.error("[api/dashboard/verify]", e);
      return new Response(
        JSON.stringify({ ok: false, message: "Verification failed." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },
};
