/**
 * Single source of truth for widget origin/domain authorization.
 *
 * Used by /api/widget/config, /api/widget/chat, /api/widget/lead AND to derive the
 * /widget/frame `Content-Security-Policy: frame-ancestors` value, so these can never disagree.
 *
 * Model:
 * - A tenant's `domains` list (Supabase `tenants.domains`, or the built-in demo tenant) names the
 *   sites that may embed / call the widget. Exact host match (leading "www." ignored); a rule of the
 *   form "*.example.com" matches subdomains only. A bare "*" is never honored.
 * - The widget frame itself is served from this deployment, so its own fetches carry this
 *   deployment's origin. Documented exception: an Origin/Referer whose host equals the request's own
 *   host (same-origin, i.e. our /widget/frame) is accepted. Which third-party sites may host that
 *   frame is enforced by frame-ancestors, built from the same tenant domain list.
 * - A missing or unparseable Origin/Referer is rejected.
 * The public widget key is an identifier only and is checked separately; it is never logged here.
 */

function normalizeHost(host: string): string {
  return host.toLowerCase().trim().replace(/\.$/, "").replace(/^www\./, "");
}

/** Hostname of the caller from Origin (preferred) or Referer, or null. */
export function getRequestOriginHost(request: Request): string | null {
  for (const name of ["origin", "referer"]) {
    const v = request.headers.get(name);
    if (v && v !== "null") {
      try {
        return new URL(v).hostname || null;
      } catch {
        return null;
      }
    }
  }
  return null;
}

/** True when hostname matches one of the tenant domain rules. */
export function isHostAllowedByDomains(domains: readonly string[], hostname: string): boolean {
  const h = normalizeHost(hostname);
  if (!h) return false;
  return domains.some((d) => {
    if (typeof d !== "string") return false;
    const rule = normalizeHost(d);
    if (!rule || rule === "*" || rule.includes("/")) return false;
    if (rule.startsWith("*.")) {
      const suffix = rule.slice(1); // ".example.com"
      // require a real registrable suffix (at least one dot after the wildcard)
      if (!suffix.slice(1).includes(".")) return false;
      return h.endsWith(suffix) && h.length > suffix.length;
    }
    return rule === h;
  });
}

function requestOwnHost(request: Request): string | null {
  try {
    return new URL(request.url).hostname || null;
  } catch {
    return null;
  }
}

/**
 * Shared decision for widget API routes: allowed when the caller origin is in the tenant's domains,
 * or is this deployment's own origin (the widget frame). Missing origin => rejected.
 */
export function isWidgetRequestOriginAllowed(
  request: Request,
  domains: readonly string[]
): boolean {
  const originHost = getRequestOriginHost(request);
  if (!originHost) return false;
  const own = requestOwnHost(request);
  if (own && normalizeHost(own) === normalizeHost(originHost)) return true;
  return isHostAllowedByDomains(domains, originHost);
}

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

/**
 * CSP frame-ancestors source list for the given tenant domains. Always starts with 'self'.
 * Public hosts => https only (+ www. variant for apex rules). localhost / 127.0.0.1 => http, any port.
 * Never emits "*".
 */
export function buildFrameAncestors(domains: readonly string[]): string {
  const sources = ["'self'"];
  const add = (s: string) => {
    if (!sources.includes(s)) sources.push(s);
  };
  for (const d of domains) {
    if (typeof d !== "string") continue;
    const rule = normalizeHost(d);
    if (!rule || rule === "*" || !/^(\*\.)?[a-z0-9.-]+$/.test(rule)) continue;
    if (LOCAL_HOSTS.has(rule)) {
      add(`http://${rule}:*`);
      continue;
    }
    if (rule.startsWith("*.")) {
      if (!rule.slice(2).includes(".")) continue;
      add(`https://${rule}`);
      continue;
    }
    add(`https://${rule}`);
    add(`https://www.${rule}`);
  }
  return sources.join(" ");
}

export function frameAncestorsHeaderValue(domains: readonly string[]): string {
  return `frame-ancestors ${buildFrameAncestors(domains)}`;
}
