/**
 * Role identifiers reserved for future RBAC.
 * MVP: all signed-in users receive MERCY_DASHBOARD_DEFAULT_ROLE or super_admin.
 */
export type DashboardRole =
  | "super_admin"
  | "admin"
  | "sales_rep"
  | "support"
  | "client_view";

export const DASHBOARD_ROLES: readonly DashboardRole[] = [
  "super_admin",
  "admin",
  "sales_rep",
  "support",
  "client_view",
] as const;
