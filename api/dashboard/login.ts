/**
 * Vercel serverless: POST /api/dashboard/login
 */
import { POST } from "../../my-app/src/app/api/dashboard/login/route";

export default {
  async fetch(request: Request): Promise<Response> {
    try {
      return await POST(request);
    } catch (e) {
      console.error("[api/dashboard/login]", e);
      return new Response(JSON.stringify({ message: "Sign-in failed." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
