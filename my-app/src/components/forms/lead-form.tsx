"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { cn } from "@/lib/utils";

/** V1 shared schema: Name, Email, Phone, Business Type, Message (optional). */
export const leadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  businessType: z.string().min(1, "Please select your business type"),
  message: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export const BUSINESS_TYPES = [
  "Small Business",
  "Enterprise",
  "Agency",
  "Startup",
  "Other",
] as const;

const inputBase =
  "w-full min-h-[48px] px-4 rounded-xl border bg-slate-900/60 border-slate-600/80 text-slate-50 placeholder:text-slate-500 focus:outline-none transition-all duration-200 text-base touch-manipulation";
const inputFocus = "focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 focus:ring-offset-0 focus:ring-offset-transparent";
const inputError = "border-amber-500/70 focus:border-amber-500 focus:ring-amber-500/20";

export interface LeadFormProps {
  submitLabel: string;
  submittingLabel: string;
  submitIcon?: React.ReactNode;
  onSubmit: (data: LeadFormData) => Promise<void>;
  placeholders?: Partial<{ name: string; email: string; phone: string; message: string }>;
}

export function LeadForm({
  submitLabel,
  submittingLabel,
  submitIcon,
  onSubmit,
  placeholders = {},
}: LeadFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: keyof LeadFormData, value: unknown) => {
    const result = leadFormSchema.safeParse({ ...formData, [name]: value });
    if (result.success) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
      return;
    }
    const fieldError = result.error.errors.find((e) => e.path[0] === name);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError ? fieldError.message : undefined,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LeadFormData]) validateField(name as keyof LeadFormData, value);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    validateField(name as keyof LeadFormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    try {
      const validatedData = leadFormSchema.parse(formData);
      await onSubmit(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof LeadFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0] as keyof LeadFormData] = err.message;
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const placeholdersResolved = {
    name: "Your name",
    email: "your@email.com",
    phone: "(555) 123-4567",
    message: "Tell us about your business or questions...",
    ...placeholders,
  };

  const inputCn = (field: keyof LeadFormData) =>
    cn(inputBase, errors[field] ? inputError : inputFocus);

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-full" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="space-y-1.5">
          <label htmlFor="lead-name" className="block text-sm font-medium text-slate-300">
            Name <span className="text-amber-400">*</span>
          </label>
          <input
            type="text"
            id="lead-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputCn("name")}
            placeholder={placeholdersResolved.name}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "lead-name-error" : undefined}
            autoComplete="name"
          />
          {errors.name && (
            <p id="lead-name-error" className="text-sm text-amber-400/90 mt-1" role="alert">
              {errors.name}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="lead-email" className="block text-sm font-medium text-slate-300">
            Email <span className="text-amber-400">*</span>
          </label>
          <input
            type="email"
            id="lead-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputCn("email")}
            placeholder={placeholdersResolved.email}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "lead-email-error" : undefined}
            autoComplete="email"
          />
          {errors.email && (
            <p id="lead-email-error" className="text-sm text-amber-400/90 mt-1" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="space-y-1.5">
          <label htmlFor="lead-phone" className="block text-sm font-medium text-slate-300">
            Phone <span className="text-amber-400">*</span>
          </label>
          <input
            type="tel"
            id="lead-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputCn("phone")}
            placeholder={placeholdersResolved.phone}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "lead-phone-error" : undefined}
            autoComplete="tel"
          />
          {errors.phone && (
            <p id="lead-phone-error" className="text-sm text-amber-400/90 mt-1" role="alert">
              {errors.phone}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="lead-businessType" className="block text-sm font-medium text-slate-300">
            Business Type <span className="text-amber-400">*</span>
          </label>
          <select
            id="lead-businessType"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              inputCn("businessType"),
              "appearance-none bg-no-repeat bg-size-[1.25rem_1.25rem] bg-position-[right_0.75rem_center] pr-10 cursor-pointer"
            )}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
            }}
            aria-invalid={!!errors.businessType}
            aria-describedby={errors.businessType ? "lead-businessType-error" : undefined}
          >
            <option value="">Select type</option>
            {BUSINESS_TYPES.map((type) => (
              <option key={type} value={type} className="bg-slate-900 text-slate-50">
                {type}
              </option>
            ))}
          </select>
          {errors.businessType && (
            <p id="lead-businessType-error" className="text-sm text-amber-400/90 mt-1" role="alert">
              {errors.businessType}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="lead-message" className="block text-sm font-medium text-slate-300">
          Message <span className="text-slate-500 font-normal">(optional)</span>
        </label>
        <textarea
          id="lead-message"
          name="message"
          value={formData.message ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={4}
          className={cn(
            inputBase,
            inputFocus,
            "min-h-[100px] py-3 resize-y max-h-[200px]"
          )}
          placeholder={placeholdersResolved.message}
          aria-describedby="lead-message-desc"
        />
        <p id="lead-message-desc" className="sr-only">Optional details about your business or questions.</p>
      </div>

      <div className="pt-2 space-y-3">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            submittingLabel
          ) : submitIcon ? (
            <span className="inline-flex items-center justify-center gap-2">
              {submitLabel} {submitIcon}
            </span>
          ) : (
            submitLabel
          )}
        </Button>
        <p className="text-center text-sm text-slate-500">
          We respond within 2 business hours. No spam.
        </p>
      </div>
    </form>
  );
}
