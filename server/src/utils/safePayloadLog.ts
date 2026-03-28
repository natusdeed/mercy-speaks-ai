import type { BookingIntentBody } from '../schemas/bookingIntent.js';
import type { HandoffRequestBody } from '../schemas/handoffRequest.js';
import type { MessageCaptureBody } from '../schemas/messageCapture.js';

/**
 * Returns a copy safe for logs (masks phone digits; trims long notes).
 * Keeps debugging useful without dumping full PII in production logs.
 */
export function toLogSafeMessageCapture(payload: MessageCaptureBody): Record<string, unknown> {
  const phone = payload.callback_number.trim();
  const masked =
    phone.length <= 4
      ? '***'
      : `${phone.slice(0, 2)}…${phone.slice(-4)}`;

  const notes = payload.notes?.trim();
  const notesPreview =
    notes && notes.length > 200 ? `${notes.slice(0, 200)}… (${notes.length} chars)` : notes;

  return {
    full_name: payload.full_name.trim(),
    callback_number_masked: masked,
    reason_for_call: payload.reason_for_call.trim(),
    best_callback_time: payload.best_callback_time.trim(),
    source: payload.source?.trim() ?? null,
    notes: notesPreview ?? null,
  };
}

/** Safe snapshot for booking-intent logs (masks phone; trims long notes). */
export function toLogSafeBookingIntent(payload: BookingIntentBody): Record<string, unknown> {
  const phone = payload.callback_number.trim();
  const masked =
    phone.length <= 4
      ? '***'
      : `${phone.slice(0, 2)}…${phone.slice(-4)}`;

  const notes = payload.notes?.trim();
  const notesPreview =
    notes && notes.length > 200 ? `${notes.slice(0, 200)}… (${notes.length} chars)` : notes;

  return {
    full_name: payload.full_name.trim(),
    callback_number_masked: masked,
    service_needed: payload.service_needed.trim(),
    preferred_day_or_time: payload.preferred_day_or_time.trim(),
    source: payload.source?.trim() ?? null,
    notes: notesPreview ?? null,
    urgency: payload.urgency?.trim() ?? null,
  };
}

/** Safe snapshot for handoff-request logs (masks phone; trims long notes). */
export function toLogSafeHandoffRequest(payload: HandoffRequestBody): Record<string, unknown> {
  const phone = payload.callbackNumber.trim();
  const masked =
    phone.length <= 4
      ? '***'
      : `${phone.slice(0, 2)}…${phone.slice(-4)}`;

  const notes = payload.notes?.trim();
  const notesPreview =
    notes && notes.length > 200 ? `${notes.slice(0, 200)}… (${notes.length} chars)` : notes;

  return {
    fullName: payload.fullName.trim(),
    callbackNumberMasked: masked,
    reasonForCall: payload.reasonForCall.trim(),
    bestCallbackTime: payload.bestCallbackTime.trim(),
    requestedPerson: payload.requestedPerson?.trim() ?? null,
    source: payload.source?.trim() ?? null,
    notes: notesPreview ?? null,
  };
}
