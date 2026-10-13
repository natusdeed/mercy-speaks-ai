/**
 * Vercel: single serverless function (api/index.mjs) for all /api/* routes (Hobby plan ≤12 functions).
 * vercel.json rewrites /api/(.*) -> /api/index?__path=$1, because non-Next.js projects only match
 * one path segment for file-based dynamic routes. If the function sees the rewrite destination
 * instead of the original URL, the original path is restored from __path before dispatch.
 */
import { dispatchVercelApi } from "../lib/vercel-api-dispatch";

function restoreOriginalPath(request: Request): Request {
  const url = new URL(request.url);
  const original = url.searchParams.get("__path");
  if (original === null) return request;
  url.searchParams.delete("__path");
  if (url.pathname === "/api/index" || url.pathname === "/api/index.mjs" || url.pathname === "/api") {
    url.pathname = "/api/" + original.replace(/^\/+/, "");
  }
  return new Request(url.toString(), request);
}

export default {
  async fetch(request: Request): Promise<Response> {
    return dispatchVercelApi(restoreOriginalPath(request));
  },
};
