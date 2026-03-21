import type { LeadDto } from "@/dashboard/types/leads";

export function displayLeadFullName(lead: Pick<LeadDto, "firstName" | "lastName" | "name">): string {
  const combined = [lead.firstName, lead.lastName].filter(Boolean).join(" ").trim();
  if (combined) return combined;
  if (lead.name?.trim()) return lead.name.trim();
  return "—";
}

export function formatLeadShortDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

export function formatLeadDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

export function formatLeadCurrency(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
