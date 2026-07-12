import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home, Mail, SearchX, Tag, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { BookingLink } from "@/components/cta/booking-link";
import { SeoHead } from "@/components/seo/seo-head";

const HELP_LINKS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/services", label: "Services", icon: Wrench },
  { to: "/pricing", label: "Pricing", icon: Tag },
  { to: "/contact", label: "Contact", icon: Mail },
] as const;

/**
 * Branded 404 for unknown paths. Prerendered to dist/404.html so Vercel can
 * return a real HTTP 404 (see root vercel.json — no SPA catch-all rewrite).
 */
export default function NotFound() {
  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead
        path="/404"
        title="Page Not Found"
        description="That page does not exist. Browse Mercy Speaks Digital services, pricing, or book a demo for AI receptionists, websites, and automation."
        noindex
        robots="noindex"
      />
      <main className="pb-16">
        <section className="section">
          <div className="section-inner max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-2">
                <SearchX className="h-4 w-4 text-neon-cyan" aria-hidden />
                <span className="text-sm font-medium text-neon-cyan">Error 404</span>
              </div>

              <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-50 md:text-5xl">
                Page not found
              </h1>
              <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-slate-300">
                This URL is not on our site. Use the links below to get back on track, or book a
                demo and we will show you how AI receptionists and automation capture more leads.
              </p>

              <nav
                aria-label="Helpful links"
                className="mb-10 flex flex-wrap items-center justify-center gap-3"
              >
                {HELP_LINKS.map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm font-medium text-slate-200 backdrop-blur-md transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    {label}
                  </Link>
                ))}
              </nav>

              <Button variant="primary" size="lg" asChild className="px-8 py-4 text-lg font-bold">
                <BookingLink>
                  Book Demo
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
                </BookingLink>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
