import { useState } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { dashboardCanvasClass } from "@/dashboard/lib/dashboard-styles";
import { DashboardSidebar } from "@/dashboard/components/dashboard-sidebar";
import { DashboardTopbar } from "@/dashboard/components/dashboard-topbar";

export function DashboardShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={cn("flex min-h-screen", dashboardCanvasClass)}>
      {sidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          aria-label="Close navigation menu"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[min(18rem,100vw)] border-r border-zinc-800/80 shadow-xl transition-transform duration-200 ease-out lg:static lg:z-0 lg:w-64 lg:shrink-0 lg:border-r lg:shadow-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <DashboardSidebar onNavigate={() => setSidebarOpen(false)} className="h-full min-h-screen" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col lg:min-h-screen">
        <DashboardTopbar onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
