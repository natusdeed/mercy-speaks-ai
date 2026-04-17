import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingLink } from "@/components/cta/booking-link";

const industryLinks = [
  { name: "Roofing", href: "/roofing" },
  { name: "HVAC", href: "/hvac" },
  { name: "Plumbing", href: "/plumbing" },
] as const;

const navLinksBeforeIndustries = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
] as const;

const navLinksAfterIndustries = [
  { name: "Websites", href: "/services/website-design" },
  { name: "Solutions", href: "/solutions" },
  { name: "Pricing", href: "/pricing" },
  { name: "Results", href: "/results" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const;

function isIndustryPath(pathname: string): boolean {
  return industryLinks.some((l) => l.href === pathname);
}

function isActivePath(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/solutions") return pathname === "/solutions" || pathname.startsWith("/solutions/");
  if (href === "/services/website-design")
    return pathname === "/services/website-design" || pathname.startsWith("/services/website-design/");
  if (href === "/services") return pathname === "/services" || pathname.startsWith("/services/");
  return pathname === href;
}

export function Header() {
  const pathname = useLocation().pathname;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [desktopIndustriesOpen, setDesktopIndustriesOpen] = useState(false);
  const industriesWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setMobileIndustriesOpen(false);
    setDesktopIndustriesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!desktopIndustriesOpen) return;
    function handlePointerDown(e: MouseEvent) {
      if (industriesWrapRef.current?.contains(e.target as Node)) return;
      setDesktopIndustriesOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [desktopIndustriesOpen]);

  useEffect(() => {
    if (!mobileOpen) setMobileIndustriesOpen(false);
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/25">
      <nav className="section-inner py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="shrink-0 text-xl md:text-2xl font-bold text-slate-50 hover:text-electric-purple transition-colors"
          >
            Mercy Speaks Digital
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-2 lg:gap-3 xl:gap-4 min-w-0">
            {navLinksBeforeIndustries.map((link) => {
              const active = isActivePath(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-xs xl:text-sm font-medium transition-colors whitespace-nowrap",
                    active ? "text-electric-purple" : "text-slate-300 hover:text-slate-50"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="relative shrink-0" ref={industriesWrapRef}>
              <button
                type="button"
                onClick={() => setDesktopIndustriesOpen((o) => !o)}
                className={cn(
                  "flex items-center gap-1 text-xs xl:text-sm font-medium transition-colors whitespace-nowrap rounded-lg px-1 py-1",
                  isIndustryPath(pathname)
                    ? "text-electric-purple"
                    : "text-slate-300 hover:text-slate-50"
                )}
                aria-expanded={desktopIndustriesOpen}
                aria-haspopup="menu"
                aria-controls="industries-desktop-menu"
                id="industries-desktop-button"
              >
                Industries
                <ChevronDown
                  className={cn(
                    "w-4 h-4 shrink-0 transition-transform duration-200",
                    desktopIndustriesOpen && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>
              {desktopIndustriesOpen ? (
                <div
                  id="industries-desktop-menu"
                  role="menu"
                  aria-labelledby="industries-desktop-button"
                  className="absolute left-0 top-full z-50 mt-2 min-w-50 rounded-xl border border-slate-800/60 bg-slate-900/98 py-2 shadow-xl backdrop-blur-xl"
                >
                  {industryLinks.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        role="menuitem"
                        to={link.href}
                        onClick={() => setDesktopIndustriesOpen(false)}
                        className={cn(
                          "block px-4 py-2.5 text-sm font-medium transition-colors",
                          active
                            ? "bg-electric-purple/15 text-electric-purple"
                            : "text-slate-300 hover:bg-slate-800/80 hover:text-slate-50"
                        )}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>

            {navLinksAfterIndustries.map((link) => {
              const active = isActivePath(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-xs xl:text-sm font-medium transition-colors whitespace-nowrap",
                    active ? "text-electric-purple" : "text-slate-300 hover:text-slate-50"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <Button variant="primary" size="default" asChild className="shrink-0 ml-2">
              <BookingLink className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Book Demo
              </BookingLink>
            </Button>
          </div>

          {/* Mobile: hamburger + Book Demo */}
          <div className="flex md:hidden items-center gap-2">
            <Button variant="primary" size="default" asChild>
              <BookingLink className="flex items-center gap-1.5">
                <Phone className="w-4 h-4" />
                Book Demo
              </BookingLink>
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-50 hover:bg-slate-800 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu — premium layout; Industries uses accordion (no hover) */}
        {mobileOpen && (
          <div className="md:hidden mt-4 pt-4 pb-2 border-t border-slate-800/50 bg-slate-900/50 -mx-4 px-4 rounded-b-xl backdrop-blur-md">
            <div className="flex flex-col gap-0.5">
              {navLinksBeforeIndustries.map((link) => {
                const active = isActivePath(link.href, pathname);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-4 py-3.5 rounded-lg text-base font-medium transition-colors",
                      active
                        ? "text-electric-purple bg-electric-purple/15 border border-electric-purple/30"
                        : "text-slate-300 hover:bg-slate-800/80 hover:text-slate-50"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="rounded-lg border border-slate-800/60 bg-slate-950/40 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileIndustriesOpen((o) => !o)}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-3.5 text-base font-medium transition-colors",
                    isIndustryPath(pathname)
                      ? "text-electric-purple bg-electric-purple/10"
                      : "text-slate-300 hover:bg-slate-800/80"
                  )}
                  aria-expanded={mobileIndustriesOpen}
                >
                  Industries
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 shrink-0 transition-transform duration-200",
                      mobileIndustriesOpen && "rotate-180"
                    )}
                    aria-hidden
                  />
                </button>
                {mobileIndustriesOpen ? (
                  <div
                    className="border-t border-slate-800/60 px-2 py-2 space-y-0.5"
                    role="group"
                    aria-label="Industry pages"
                  >
                    {industryLinks.map((link) => {
                      const active = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          to={link.href}
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileIndustriesOpen(false);
                          }}
                          className={cn(
                            "block rounded-lg px-4 py-3 text-base font-medium transition-colors",
                            active
                              ? "text-electric-purple bg-electric-purple/15 border border-electric-purple/30"
                              : "text-slate-300 hover:bg-slate-800/80 hover:text-slate-50"
                          )}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              {navLinksAfterIndustries.map((link) => {
                const active = isActivePath(link.href, pathname);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-4 py-3.5 rounded-lg text-base font-medium transition-colors",
                      active
                        ? "text-electric-purple bg-electric-purple/15 border border-electric-purple/30"
                        : "text-slate-300 hover:bg-slate-800/80 hover:text-slate-50"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            <div className="pt-4 mt-2 border-t border-slate-800/50">
              <Button variant="primary" size="default" asChild className="w-full">
                <BookingLink onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Book Demo
                </BookingLink>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
