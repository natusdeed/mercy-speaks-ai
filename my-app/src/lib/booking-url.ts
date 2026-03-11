/** Primary booking: Cal.com. Override with VITE_BOOKING_URL (client) or BOOKING_URL (build). */
const DEFAULT_CAL_COM_URL = "https://cal.com/natusdeed/free-ai-receptionist-demo";

function normalizeEnvValue(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

export function getBookingUrl(): string {
  const candidate =
    normalizeEnvValue((import.meta as any).env?.VITE_BOOKING_URL) ??
    normalizeEnvValue((import.meta as any).env?.BOOKING_URL) ??
    normalizeEnvValue((import.meta as any).env?.VITE_BOOKING_LINK) ??
    normalizeEnvValue((import.meta as any).env?.BOOKING_LINK);

  return candidate ?? DEFAULT_CAL_COM_URL;
}

export function isExternalBookingUrl(url: string = getBookingUrl()): boolean {
  return /^https?:\/\//i.test(url);
}

