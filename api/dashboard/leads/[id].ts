/**
 * Vercel: GET/PATCH /api/dashboard/leads/:id
 */
import { GET, PATCH } from "../../../my-app/src/app/api/dashboard/leads/[id]/route";

export default {
  async fetch(request: Request): Promise<Response> {
    try {
      if (request.method === "GET") return await GET(request);
      if (request.method === "PATCH") return await PATCH(request);
      return Response.json({ message: "Method not allowed" }, { status: 405 });
    } catch (e) {
      console.error("[api/dashboard/leads/[id]]", e);
      return Response.json({ message: "Request failed." }, { status: 500 });
    }
  },
};
