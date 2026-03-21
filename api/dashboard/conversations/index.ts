/**
 * Vercel: GET /api/dashboard/conversations
 */
import { GET } from "../../../my-app/src/app/api/dashboard/conversations/route";

export default {
  async fetch(request: Request): Promise<Response> {
    try {
      if (request.method === "GET") return await GET(request);
      return Response.json({ message: "Method not allowed" }, { status: 405 });
    } catch (e) {
      console.error("[api/dashboard/conversations]", e);
      return Response.json({ message: "Request failed." }, { status: 500 });
    }
  },
};
