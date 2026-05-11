import { Link, Navigate, useRoutes } from "react-router-dom";
import { AgentOsMockPage } from "@/dashboard/pages/agent-os-mock-page";
import { ApprovalsDemoPage } from "@/dashboard/pages/approvals-demo-page";
import { LeadOpsDemoPage } from "@/dashboard/pages/lead-ops-demo-page";
import { CommandCenterMockPage } from "@/dashboard/pages/command-center-mock-page";
import { MarketingSocialMockPage } from "@/dashboard/pages/marketing-social-mock-page";
import { MissedRevenueDemoPage } from "@/dashboard/pages/missed-revenue-demo-page";
import { DemoHubPage } from "@/demo/demo-hub-page";
import { dashboardCanvasClass } from "@/dashboard/lib/dashboard-styles";
import { cn } from "@/lib/utils";
import { FlaskConical } from "lucide-react";

/**
 * Unauthenticated Phase 4 UI previews for local development only.
 * Imported only via lazy() from App.tsx when `import.meta.env.DEV` is true (see App.tsx `isViteDev`).
 */
export default function DevDemoShell() {
  const element = useRoutes([
    { index: true, element: <DemoHubPage /> },
    { path: "ai-employees", element: <AgentOsMockPage /> },
    { path: "lead-ops", element: <LeadOpsDemoPage /> },
    { path: "missed-revenue", element: <MissedRevenueDemoPage /> },
    { path: "approvals", element: <ApprovalsDemoPage /> },
    { path: "marketing-social", element: <MarketingSocialMockPage /> },
    { path: "command-center", element: <CommandCenterMockPage /> },
    { path: "*", element: <Navigate to="/demo" replace /> },
  ]);

  return (
    <div className={cn("min-h-screen", dashboardCanvasClass)}>
      <div className="border-b border-amber-500/25 bg-amber-950/30 px-4 py-3 text-center text-sm text-amber-100/95 md:text-left">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 md:flex-row md:px-4">
          <span className="inline-flex items-center gap-2 font-medium">
            <FlaskConical className="h-4 w-4 shrink-0 text-amber-300" aria-hidden />
            <span>Local demo preview — mock data only.</span>
            <span className="hidden text-amber-100/70 md:inline">
              No sign-in, outbound actions, Supabase writes, or production wiring.
            </span>
          </span>
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-2">
            <Link
              to="/demo"
              className="rounded-md border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-100 hover:border-cyan-400/50 hover:bg-cyan-500/15"
            >
              Back to hub
            </Link>
            <a
              href="/"
              className="rounded-md border border-zinc-600 bg-zinc-950/60 px-3 py-1 text-xs font-medium text-zinc-200 hover:border-zinc-500 hover:bg-zinc-900/80"
            >
              Back to site
            </a>
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">{element}</main>
    </div>
  );
}
