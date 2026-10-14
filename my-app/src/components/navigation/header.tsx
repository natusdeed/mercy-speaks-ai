import { Link, useLocation } from "react-router-dom";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Site header — four main links (Home, Services, Our Work, About) + one "Get a Website Quote" CTA.
 * Services is a click/tap/keyboard disclosure (button + aria-expanded), never hover-only.
 * Escape closes any open menu and returns focus to its button; clicking outside closes the desktop submenu.
 * All targets are at least 44px tall.
 */
export const SERVICE_LINKS = [
  { name: "Conversion Websites", href: "/websites" },
  { name: "Website Care & Optimization", href: "/website-care" },
  { name: "AI Receptionist — Pilot", href: "/ai-pilot" },
] as const;

const SERVICE_PATHS = new Set<string>([...SERVICE_LINKS.map((l) => l.href), "/services", "/services/website-design", "/pricing"]);

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

function ServiceLabel({ name }: { name: string }) {
  if (!name.endsWith("— Pilot")) return <>{name}</>;
  return (
    <>
      AI Receptionist
      <span className="ml-2 rounded border border-slate-600 px-1.5 py-px text-[11px] font-medium uppercase tracking-wide text-slate-300">
        <span className="sr-only"> — </span>Pilot
      </span>
    </>
  );
}

export function Header() {
  const pathname = useLocation().pathname.replace(/\/$/, "") || "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const servicesWrapRef = useRef<HTMLLIElement>(null);
  const servicesMenuId = useId();

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen && !servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (servicesOpen) {
        setServicesOpen(false);
        servicesButtonRef.current?.focus();
      } else if (mobileOpen) {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (servicesOpen && servicesWrapRef.current && !servicesWrapRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [mobileOpen, servicesOpen]);

  const linkCls = (active: boolean) =>
    cn(
      "inline-flex min-h-11 items-center rounded px-1 text-sm transition-colors",
      active ? "text-white" : "text-slate-300 hover:text-white",
      focus
    );

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <nav aria-label="Main" className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            to="/"
            className={cn("inline-flex min-h-11 min-w-0 items-center gap-2.5 rounded text-base font-semibold tracking-tight text-white sm:text-lg", focus)}
          >
            <img src="/brand/logo-mark-96.webp" alt="" width={26} height={32} className="h-8 w-auto shrink-0" />
            <span className="truncate">Mercy Speaks Digital</span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <ul className="flex items-center gap-6">
              <li>
                <Link to="/" aria-current={pathname === "/" ? "page" : undefined} className={linkCls(pathname === "/")}>
                  Home
                </Link>
              </li>
              <li ref={servicesWrapRef} className="relative">
                <button
                  ref={servicesButtonRef}
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls={servicesMenuId}
                  onClick={() => setServicesOpen((v) => !v)}
                  className={cn(linkCls(SERVICE_PATHS.has(pathname)), "gap-1")}
                >
                  Services
                  <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} aria-hidden />
                </button>
                <ul
                  id={servicesMenuId}
                  hidden={!servicesOpen}
                  className="absolute left-1/2 top-full mt-2 w-72 -translate-x-1/2 rounded-lg border border-slate-700 bg-slate-950 p-2 shadow-lg"
                >
                  {SERVICE_LINKS.map((l) => (
                    <li key={l.href}>
                      <Link
                        to={l.href}
                        aria-current={pathname === l.href ? "page" : undefined}
                        onClick={() => setServicesOpen(false)}
                        className={cn(
                          "flex min-h-11 items-center rounded-md px-3 text-sm text-slate-200 hover:bg-slate-800 hover:text-white",
                          pathname === l.href && "text-white",
                          focus
                        )}
                      >
                        <ServiceLabel name={l.name} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link to="/results" aria-current={pathname === "/results" ? "page" : undefined} className={linkCls(pathname === "/results")}>
                  Our Work
                </Link>
              </li>
              <li>
                <Link to="/about" aria-current={pathname === "/about" ? "page" : undefined} className={linkCls(pathname === "/about")}>
                  About
                </Link>
              </li>
            </ul>
            <Link
              to="/contact"
              className={cn(
                "inline-flex min-h-11 items-center rounded-lg bg-white px-4 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-200",
                focus
              )}
            >
              Get a Website Quote
            </Link>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className={cn("inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-200 md:hidden", focus)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>

        <div id="mobile-menu" hidden={!mobileOpen} className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-800 pb-6 pt-2 md:hidden">
          <ul className="divide-y divide-slate-800">
            <li>
              <Link onClick={() => setMobileOpen(false)} to="/" aria-current={pathname === "/" ? "page" : undefined} className={cn("flex min-h-12 items-center text-base text-slate-200", focus)}>
                Home
              </Link>
            </li>
            <li className="py-2">
              <p className="flex min-h-10 items-center text-base text-slate-400" id="mobile-services-label">
                Services
              </p>
              <ul aria-labelledby="mobile-services-label" className="pl-4">
                {SERVICE_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link onClick={() => setMobileOpen(false)}
                      to={l.href}
                      aria-current={pathname === l.href ? "page" : undefined}
                      className={cn("flex min-h-12 items-center text-base text-slate-200", focus)}
                    >
                      <ServiceLabel name={l.name} />
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link onClick={() => setMobileOpen(false)} to="/results" aria-current={pathname === "/results" ? "page" : undefined} className={cn("flex min-h-12 items-center text-base text-slate-200", focus)}>
                Our Work
              </Link>
            </li>
            <li>
              <Link onClick={() => setMobileOpen(false)} to="/about" aria-current={pathname === "/about" ? "page" : undefined} className={cn("flex min-h-12 items-center text-base text-slate-200", focus)}>
                About
              </Link>
            </li>
          </ul>
          <Link onClick={() => setMobileOpen(false)}
            to="/contact"
            className={cn(
              "mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-white px-6 text-base font-semibold text-slate-950",
              focus
            )}
          >
            Get a Website Quote
          </Link>
        </div>
      </nav>
    </header>
  );
}
