/**
 * Top bar titles from the current location (no async data in Phase 1).
 */
export function getDashboardTitle(pathname: string): string {
  const path = pathname.replace(/\/$/, "") || "/dashboard";

  const rules: { test: RegExp; title: string }[] = [
    { test: /^\/dashboard$/, title: "Overview" },
    { test: /^\/dashboard\/leads\/[^/]+$/, title: "Lead detail" },
    { test: /^\/dashboard\/leads$/, title: "Leads" },
    { test: /^\/dashboard\/conversations\/[^/]+$/, title: "Conversation" },
    { test: /^\/dashboard\/conversations$/, title: "Conversations" },
    { test: /^\/dashboard\/appointments$/, title: "Appointments" },
    { test: /^\/dashboard\/clients\/[^/]+$/, title: "Client" },
    { test: /^\/dashboard\/clients$/, title: "Clients" },
    { test: /^\/dashboard\/ai-settings$/, title: "AI settings" },
    { test: /^\/dashboard\/knowledge-base$/, title: "Knowledge base" },
    { test: /^\/dashboard\/follow-up$/, title: "Follow-up" },
    { test: /^\/dashboard\/analytics$/, title: "Analytics" },
    { test: /^\/dashboard\/settings$/, title: "Settings" },
  ];

  for (const { test, title } of rules) {
    if (test.test(path)) return title;
  }

  return "Mercy AI Dashboard";
}
