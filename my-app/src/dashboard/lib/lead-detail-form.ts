import { z } from "zod";
import { LEAD_PRIORITIES, LEAD_STATUSES } from "@/dashboard/types/leads";

export const leadDetailFormSchema = z.object({
  firstName: z.string().max(120),
  lastName: z.string().max(120),
  businessName: z.string().max(240),
  email: z.string().email(),
  phone: z.string().min(6).max(40),
  serviceInterest: z.string().max(240),
  status: z.enum(LEAD_STATUSES),
  priority: z.enum(LEAD_PRIORITIES),
  /** Raw input; parsed to number | null in submit handler */
  estimatedValue: z.string(),
  notes: z.string().max(20000),
  assignedTo: z.string().max(120),
});

export type LeadDetailFormValues = z.infer<typeof leadDetailFormSchema>;

export function parseEstimatedValue(raw: string): { ok: true; value: number | null } | { ok: false; message: string } {
  const t = raw.trim();
  if (t === "") return { ok: true, value: null };
  const n = Number(t);
  if (Number.isNaN(n) || n < 0) {
    return { ok: false, message: "Estimated value must be a valid non-negative number." };
  }
  return { ok: true, value: n };
}
