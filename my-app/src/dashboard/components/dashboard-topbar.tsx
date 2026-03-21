import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDashboardTitle } from "@/dashboard/lib/titles";
import { useDashboardAuth } from "@/dashboard/contexts/dashboard-auth-context";

type DashboardTopbarProps = {
  onOpenSidebar: () => void;
};

export function DashboardTopbar({ onOpenSidebar }: DashboardTopbarProps) {
  const { pathname } = useLocation();
  const { displayEmail, logout } = useDashboardAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const title = getDashboardTitle(pathname);

  useEffect(() => {
    if (!menuOpen) return;
    function handlePointerDown(e: MouseEvent) {
      if (menuRef.current?.contains(e.target as Node)) return;
      setMenuOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-zinc-800/80 bg-slate-950/95 px-4 backdrop-blur-sm lg:h-[3.75rem] lg:px-8">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onOpenSidebar}
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold tracking-tight text-zinc-100 md:text-base">
          {title}
        </h1>
        <p className="hidden text-xs text-zinc-500 sm:block">Mercy AI</p>
      </div>

      <Button
        asChild
        variant="secondary"
        size="sm"
        className="hidden sm:inline-flex"
      >
        <Link to="/dashboard/leads">
          <Plus className="h-4 w-4" aria-hidden />
          Add lead
        </Link>
      </Button>

      <div className="relative" ref={menuRef}>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1.5 text-zinc-300 hover:bg-zinc-800/80 hover:text-zinc-50"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
        >
          <span className="hidden max-w-[140px] truncate sm:inline">
            {displayEmail ?? "Account"}
          </span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
        {menuOpen ? (
          <div
            role="menu"
            className="absolute right-0 mt-2 w-48 rounded-lg border border-zinc-800/90 bg-zinc-950 py-1 shadow-lg"
          >
            <button
              type="button"
              role="menuitem"
              className="block w-full px-3 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-900"
              onClick={() => {
                setMenuOpen(false);
                logout();
              }}
            >
              Sign out
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
