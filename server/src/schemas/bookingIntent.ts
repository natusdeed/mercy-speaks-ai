import { z } from 'zod';

/** Mercy AI Agent — booking / demo capture webhook body. */
export const bookingIntentBodySchema = z.object({
  full_name: z.string().min(1, 'full_name is required'),
  callback_number: z.string().min(1, 'callback_number is required'),
  service_needed: z.string().min(1, 'service_needed is required'),
  preferred_day_or_time: z.string().min(1, 'preferred_day_or_time is required'),
  source: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  urgency: z.string().nullable().optional(),
});

export type BookingIntentBody = z.infer<typeof bookingIntentBodySchema>;
