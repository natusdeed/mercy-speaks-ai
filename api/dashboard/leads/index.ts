/**
 * Vercel: GET/POST /api/dashboard/leads
 */
import { GET, POST } from "../../../my-app/src/app/api/dashboard/leads/route";

export default {
  async fetch(request: Request): Promise<Response> {
    try {
      if (request.method === "GET") return await GET(request);
      if (request.method === "POST") return await POST(request);
      return Response.json({ message: "Method not allowed" }, { status: 405 });
    } catch (e) {
      console.error("[api/dashboard/leads]", e);
      return Response.json({ message: "Request failed." }, { status: 500 });
    }
  },
};
