import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Site header — Project #001 V3 ("premium, quiet, conversion-focused").
 * Navigation follows the locked V3 sitemap: Websites, Website Care, AI Pilot, About + one CTA.
 * Legacy pages remain routable (and linked from the legacy footer); they are no longer in primary nav.
 */
const NAV = [
  { name: "Websites", href: "/websites" },
  { name: "Website Care", href: "/website-care" },
  { name: "AI Pilot", href: "/ai-pilot" },
  { name: "About", href: "/about" },
] as const;

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

export function Header() {
  const pathname = useLocation().pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <nav aria-label="Main" className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className={cn("shrink-0 rounded text-base font-semibold tracking-tight text-white sm:text-lg", focus)}>
            Mercy Speaks Digital
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-7">
              {NAV.map((l) => {
                const active = pathname === l.href;
                return (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded text-sm transition-colors",
                        active ? "text-white" : "text-slate-300 hover:text-white",
                        focus
                      )}
                    >
                      {l.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              to="/contact"
              className={cn(
                "inline-flex min-h-10 items-center rounded-lg border border-slate-600 px-4 text-sm font-medium text-white transition-colors hover:border-slate-400",
                focus
              )}
            >
              Get a Website Quote
            </Link>
          </div>

          <button
            type="button"
            className={cn("inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-200 md:hidden", focus)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>

        {mobileOpen && (
          <div id="mobile-menu" className="border-t border-slate-800 pb-6 pt-2 md:hidden">
            <ul className="divide-y divide-slate-800">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    aria-current={pathname === l.href ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={cn("flex min-h-12 items-center text-base text-slate-200", focus)}
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-white px-6 text-base font-semibold text-slate-950",
                focus
              )}
            >
              Get a Website Quote
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
