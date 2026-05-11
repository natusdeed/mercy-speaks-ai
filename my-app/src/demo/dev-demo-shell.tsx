import { Navigate, useRoutes } from "react-router-dom";
import { AgentOsMockPage } from "@/dashboard/pages/agent-os-mock-page";
import { ApprovalsDemoPage } from "@/dashboard/pages/approvals-demo-page";
import { LeadOpsDemoPage } from "@/dashboard/pages/lead-ops-demo-page";
import { MissedRevenueDemoPage } from "@/dashboard/pages/missed-revenue-demo-page";
import { dashboardCanvasClass } from "@/dashboard/lib/dashboard-styles";
import { cn } from "@/lib/utils";
import { FlaskConical } from "lucide-react";

/**
 * Unauthenticated Phase 4 UI previews for local development only.
 * Imported only via lazy() from App.tsx when `import.meta.env.DEV` is true (see App.tsx `isViteDev`).
 */
export default function DevDemoShell() {
  const element = useRoutes([
    { index: true, element: <Navigate to="ai-employees" replace /> },
    { path: "ai-employees", element: <AgentOsMockPage /> },
    { path: "lead-ops", element: <LeadOpsDemoPage /> },
    { path: "missed-revenue", element: <MissedRevenueDemoPage /> },
    { path: "approvals", element: <ApprovalsDemoPage /> },
    { path: "*", element: <Navigate to="ai-employees" replace /> },
  ]);

  return (
    <div className={cn("min-h-screen", dashboardCanvasClass)}>
      <div className="border-b border-amber-500/25 bg-amber-950/30 px-4 py-3 text-center text-sm text-amber-100/95 md:text-left">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 md:flex-row md:px-4">
          <span className="inline-flex items-center gap-2 font-medium">
            <FlaskConical className="h-4 w-4 shrink-0 text-amber-300" aria-hidden />
            Local dev preview — no sign-in. Static mock data only; not available in production builds.
          </span>
          <a
            href="/"
            className="shrink-0 rounded-md border border-zinc-600 bg-zinc-950/60 px-3 py-1 text-xs font-medium text-zinc-200 hover:border-zinc-500 hover:bg-zinc-900/80"
          >
            Back to site
          </a>
        </div>
      </div>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">{element}</main>
    </div>
  );
}
