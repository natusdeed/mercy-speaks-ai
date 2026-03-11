const DEFAULT_BOOKING_PATH = "/book-demo";

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

  return candidate ?? DEFAULT_BOOKING_PATH;
}

export function isExternalBookingUrl(url: string = getBookingUrl()): boolean {
  return /^https?:\/\//i.test(url);
}

