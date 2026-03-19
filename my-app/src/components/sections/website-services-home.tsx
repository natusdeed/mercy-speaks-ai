"use client";

import { motion } from "framer-motion";
import { Globe, RefreshCcw, LayoutTemplate, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookingLink } from "@/components/cta/booking-link";

const OFFERS = [
  {
    icon: Globe,
    title: "New Website Builds",
    description: "A premium, mobile-first website that makes your business look established and drives inquiries.",
    bullets: ["Clear service pages", "Lead capture + contact flows", "Fast, modern UX", "SEO-ready structure"],
    href: "/services/website-design",
    cta: "Request a Website Quote",
    ctaKind: "link" as const,
    accent: "neon-cyan",
  },
  {
    icon: RefreshCcw,
    title: "Website Redesigns",
    description: "Upgrade an outdated site into a modern, trustworthy experience built for conversion.",
    bullets: ["Premium visual refresh", "Stronger hierarchy & messaging", "Mobile optimization", "Speed + structure upgrades"],
    href: "/services/website-design",
    cta: "Plan a Redesign",
    ctaKind: "link" as const,
    accent: "electric-purple",
  },
  {
    icon: LayoutTemplate,
    title: "Conversion Landing Pages",
    description: "Campaign-ready pages that turn clicks into calls, forms, and booked appointments.",
    bullets: ["Offer-focused layout", "Social proof blocks", "CTA + booking readiness", "Analytics-ready structure"],
    href: "/book-demo",
    cta: "Book a Website Strategy Call",
    ctaKind: "booking" as const,
    accent: "neon-cyan",
  },
] as const;

const BENEFITS = [
  "Mobile-first design for every device",
  "Premium visual presentation that builds trust",
  "Fast loading and modern UX",
  "Lead capture readiness (forms, booking, calls)",
  "SEO-ready pages and clean structure",
  "Conversion-focused layout and messaging",
] as const;

export function WebsiteServicesHome() {
  return (
    <section id="website-services" className="section bg-slate-950" aria-labelledby="website-services-title">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10"
        >
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
            Website Development
          </p>
          <h2 id="website-services-title" className="text-3xl md:text-4xl font-bold text-slate-50 mb-3">
            Premium business websites built for trust, growth, and conversion
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto">
            Your website should elevate your brand—and make it effortless for customers to call, book, or request a quote.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 mb-8">
          {OFFERS.map((offer, index) => {
            const Icon = offer.icon;
            const isPurple = offer.accent === "electric-purple";
            return (
              <motion.article
                key={offer.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="card-premium flex flex-col"
              >
                <div
                  className={`inline-flex p-3 rounded-lg mb-4 w-fit ${
                    isPurple ? "bg-electric-purple/15 text-electric-purple" : "bg-neon-cyan/15 text-neon-cyan"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-50 mb-2">{offer.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{offer.description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {offer.bullets.map((b) => (
                    <li key={b} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className={`mt-2 h-1.5 w-1.5 rounded-full ${isPurple ? "bg-electric-purple" : "bg-neon-cyan"}`} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="primary" size="sm" asChild className="w-full">
                  {offer.ctaKind === "booking" ? (
                    <BookingLink className="flex items-center justify-center gap-2">
                      {offer.cta}
                      <ArrowRight className="w-4 h-4" />
                    </BookingLink>
                  ) : (
                    <Link to={offer.href} className="flex items-center justify-center gap-2">
                      {offer.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </Button>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="card-premium"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5">
              <h3 className="text-xl font-bold text-slate-50 mb-2">
                Built to look premium—and help you win more clients
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We combine modern design, clean UX, and conversion-focused structure so your website becomes a reliable lead source—not just a brochure.
              </p>
              <div className="mt-4">
                <Button variant="outline" size="sm" asChild className="rounded-xl">
                  <Link to="/contact" className="inline-flex items-center gap-2">
                    Get a Website Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

