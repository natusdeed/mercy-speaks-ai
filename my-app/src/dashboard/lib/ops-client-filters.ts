/** Case-insensitive substring match across string fields. */
export function matchesOpsSearch(query: string, parts: Array<string | null | undefined>): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return parts.some((part) => (part ?? "").toLowerCase().includes(q));
}

export function matchesOpsStatusFilter(filter: string, value: string): boolean {
  if (!filter) return true;
  return value === filter;
}

export function uniqueSorted(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

export function statusMatchesAny(value: string, needles: string[]): boolean {
  const v = value.toLowerCase();
  return needles.some((n) => v.includes(n));
}

export function countWhere<T>(rows: T[], predicate: (row: T) => boolean): number {
  return rows.reduce((n, row) => (predicate(row) ? n + 1 : n), 0);
}
