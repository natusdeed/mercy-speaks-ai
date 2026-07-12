import {
  BOOKING_LINKS,
  CAL_COM_EMBED,
  type BookingLinkKey,
} from "@/lib/site-config";

export { BOOKING_LINKS, CAL_COM_EMBED, type BookingLinkKey };

/** Resolve a semantic booking CTA to its configured path/URL. */
export function getBookingUrl(kind: BookingLinkKey = "generalStrategyCall"): string {
  return BOOKING_LINKS[kind];
}

export function isExternalBookingUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

/** Full Cal.com URL for the /book-demo embed fallback link. */
export function getCalEmbedUrl(): string {
  return CAL_COM_EMBED.url;
}
