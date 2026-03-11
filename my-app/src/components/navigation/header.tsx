import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingLink } from "@/components/cta/booking-link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Solutions", href: "/solutions" },
  { name: "Pricing", href: "/pricing" },
  { name: "Results", href: "/results" },
  { name: "About", href: "/about" },
] as const;

function isActivePath(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/solutions") return pathname === "/solutions" || pathname.startsWith("/solutions/");
  return pathname === href;
}

export function Header() {
  const pathname = useLocation().pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <div className="hidden md:flex flex-1 items-center justify-center gap-8">
            {navLinks.map((link) => {
              const active = isActivePath(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
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
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu — premium layout */}
        {mobileOpen && (
          <div className="md:hidden mt-4 pt-4 pb-2 border-t border-slate-800/50 bg-slate-900/50 -mx-4 px-4 rounded-b-xl backdrop-blur-md">
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => {
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
