import { z } from 'zod';

/** Mercy AI Agent — human handoff / escalation webhook body. */
export const handoffRequestBodySchema = z.object({
  fullName: z.string().min(1, 'fullName is required'),
  callbackNumber: z.string().min(1, 'callbackNumber is required'),
  reasonForCall: z.string().min(1, 'reasonForCall is required'),
  bestCallbackTime: z.string().min(1, 'bestCallbackTime is required'),
  requestedPerson: z.string().nullable().optional(),
  source: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export type HandoffRequestBody = z.infer<typeof handoffRequestBodySchema>;
