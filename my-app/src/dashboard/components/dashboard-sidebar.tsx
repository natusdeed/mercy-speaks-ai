import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { DASHBOARD_NAV } from "@/dashboard/config/navigation";

type DashboardSidebarProps = {
  onNavigate?: () => void;
  className?: string;
};

export function DashboardSidebar({ onNavigate, className }: DashboardSidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full w-full flex-col border-zinc-800/80 bg-slate-950 lg:border-r",
        className
      )}
    >
      <div className="flex h-14 items-center gap-3 border-b border-zinc-800/80 px-5 lg:h-[3.75rem]">
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 text-xs font-semibold tracking-tight text-zinc-200">
          MS
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight text-zinc-100">Mercy AI</p>
          <p className="truncate text-xs text-zinc-500">Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3" aria-label="Dashboard">
        {DASHBOARD_NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/dashboard"}
            onClick={() => onNavigate?.()}
            className={({ isActive }: { isActive: boolean }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-zinc-800/90 text-zinc-50"
                  : "text-zinc-400 hover:bg-zinc-900/70 hover:text-zinc-200"
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-zinc-800/80 p-4">
        <p className="text-xs leading-relaxed text-zinc-600">
          Mercy Speaks Digital · Leads and operations
        </p>
      </div>
    </aside>
  );
}
