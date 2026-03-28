import { z } from 'zod';

/** ElevenLabs / Mercy AI message-capture webhook body. */
export const messageCaptureBodySchema = z.object({
  full_name: z.string().min(1, 'full_name is required'),
  callback_number: z.string().min(1, 'callback_number is required'),
  reason_for_call: z.string().min(1, 'reason_for_call is required'),
  best_callback_time: z.string().min(1, 'best_callback_time is required'),
  source: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export type MessageCaptureBody = z.infer<typeof messageCaptureBodySchema>;
