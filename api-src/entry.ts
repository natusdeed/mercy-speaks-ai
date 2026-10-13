/**
 * Vercel: single serverless function for all /api/* routes (Hobby plan ≤12 functions).
 */
import { dispatchVercelApi } from "../lib/vercel-api-dispatch";

export default {
  async fetch(request: Request): Promise<Response> {
    return dispatchVercelApi(request);
  },
};
