import { Navigate, Outlet } from "react-router-dom";
import { useDashboardAuth } from "@/dashboard/contexts/dashboard-auth-context";

function ShellSkeleton() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <div className="hidden w-64 shrink-0 border-r border-zinc-800/80 bg-zinc-950 lg:block" />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-14 border-b border-zinc-800/80 bg-zinc-950/95" />
        <div className="flex-1 p-6">
          <div className="mx-auto max-w-6xl space-y-4">
            <div className="h-8 w-48 animate-pulse rounded-md bg-zinc-800/80" />
            <div className="h-40 animate-pulse rounded-xl border border-zinc-800/60 bg-zinc-900/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Protects dashboard routes: verifies session before rendering the shell.
 */
export function AuthGate() {
  const { status } = useDashboardAuth();

  if (status === "unknown") {
    return <ShellSkeleton />;
  }

  if (status === "guest") {
    return <Navigate to="/dashboard/login" replace />;
  }

  return <Outlet />;
}
