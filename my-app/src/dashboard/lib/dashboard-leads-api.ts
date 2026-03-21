import type { LeadDto } from "@/dashboard/types/leads";

type ErrorBody = { message?: string };

async function parseJson<T>(res: Response): Promise<T> {
  return (await res.json().catch(() => ({}))) as T;
}

export async function fetchLeadById(
  token: string,
  id: string
): Promise<{ ok: true; lead: LeadDto } | { ok: false; status: number; message: string }> {
  const res = await fetch(`/api/dashboard/leads/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await parseJson<{ lead?: LeadDto } & ErrorBody>(res);
  if (!res.ok) {
    return { ok: false, status: res.status, message: data.message ?? "Failed to load lead." };
  }
  if (!data.lead) {
    return { ok: false, status: 500, message: "Invalid response from server." };
  }
  return { ok: true, lead: data.lead };
}

export async function fetchLeadsList(
  token: string,
  params: { q?: string; status?: string; priority?: string }
): Promise<{ ok: true; leads: LeadDto[] } | { ok: false; status: number; message: string }> {
  const sp = new URLSearchParams();
  if (params.q?.trim()) sp.set("q", params.q.trim());
  if (params.status) sp.set("status", params.status);
  if (params.priority) sp.set("priority", params.priority);
  const qs = sp.toString();
  const res = await fetch(`/api/dashboard/leads${qs ? `?${qs}` : ""}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await parseJson<{ leads?: LeadDto[] } & ErrorBody>(res);
  if (!res.ok) {
    return { ok: false, status: res.status, message: data.message ?? "Failed to load leads." };
  }
  return { ok: true, leads: data.leads ?? [] };
}

export async function createLeadRequest(
  token: string,
  body: Record<string, unknown>
): Promise<{ ok: true; lead: LeadDto } | { ok: false; status: number; message: string }> {
  const res = await fetch("/api/dashboard/leads", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await parseJson<{ lead?: LeadDto } & ErrorBody>(res);
  if (!res.ok) {
    return { ok: false, status: res.status, message: data.message ?? "Failed to create lead." };
  }
  if (!data.lead) {
    return { ok: false, status: 500, message: "Invalid response from server." };
  }
  return { ok: true, lead: data.lead };
}

export async function patchLeadRequest(
  token: string,
  id: string,
  body: Record<string, unknown>
): Promise<{ ok: true; lead: LeadDto } | { ok: false; status: number; message: string }> {
  const res = await fetch(`/api/dashboard/leads/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await parseJson<{ lead?: LeadDto } & ErrorBody>(res);
  if (!res.ok) {
    return { ok: false, status: res.status, message: data.message ?? "Failed to update lead." };
  }
  if (!data.lead) {
    return { ok: false, status: 500, message: "Invalid response from server." };
  }
  return { ok: true, lead: data.lead };
}
