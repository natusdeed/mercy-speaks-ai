/**
 * Lightweight analytics hook for marketing CTAs.
 *
 * TODO: Wire to GA4 / gtag (or another consented analytics provider) once the
 * marketing pixel is installed. Until then we:
 * 1. Set `data-analytics-event` / `data-analytics-location` on interactive elements
 * 2. Dispatch a CustomEvent (`msd:analytics`) listeners can subscribe to
 * 3. Push to `window.dataLayer` when present (GTM-compatible)
 */

export type TrackEventPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(name: string, payload: TrackEventPayload = {}): void {
  if (typeof window === "undefined") return;

  const detail = { event: name, ...payload };

  window.dispatchEvent(new CustomEvent("msd:analytics", { detail }));

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(detail);
  }
}
