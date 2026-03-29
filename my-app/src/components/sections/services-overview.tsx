"use client";

import { motion } from "framer-motion";
import { Globe, Phone, Zap, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookingLink } from "@/components/cta/booking-link";

const SERVICES = [
  {
    icon: Globe,
    title: "Website Design & Development",
    description:
      "Premium business websites built to look credible, load fast, and convert visitors into leads.",
    bullets: [
      "Business websites & redesigns",
      "Landing pages that convert",
      "Mobile-first + SEO-ready structure",
      "Lead capture & booking flows",
    ],
    href: "/services/website-design",
    cta: "Explore Website Services",
    accent: "neon-cyan",
    kind: "link" as const,
  },
  {
    icon: Phone,
    title: "AI Receptionists",
    description:
      "Answer calls 24/7, capture and qualify leads, and book appointments—without hiring more staff.",
    bullets: ["Inbound call handling", "Lead capture & qualification", "Appointment booking", "Missed-call follow-up"],
    href: "/services/ai-phone-receptionist",
    cta: "See AI Receptionist",
    accent: "electric-purple",
    kind: "link" as const,
  },
  {
    icon: Zap,
    title: "Business Automation",
    description:
      "Automated workflows that speed up follow-up, reduce busywork, and keep leads from slipping through the cracks.",
    bullets: ["CRM workflows", "Lead routing", "Text/email follow-up", "Time-saving automations"],
    href: "/services/workflow-automation",
    cta: "View Automations",
    accent: "neon-cyan",
    kind: "link" as const,
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    description:
      "Modern storefronts and product pages designed to build trust, increase conversions, and simplify checkout.",
    bullets: ["Product-focused storefronts", "Conversion-ready PDPs", "Checkout optimization", "Modern shopping UX"],
    href: "/contact",
    cta: "Get an E-commerce Quote",
    accent: "electric-purple",
    kind: "booking" as const,
  },
] as const;

export function ServicesOverview() {
  return (
    <section id="services" className="section bg-slate-950" aria-labelledby="services-overview-title">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10"
        >
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
            Services
          </p>
          <h2 id="services-overview-title" className="text-3xl md:text-4xl font-bold text-slate-50 mb-3">
            Websites first—then AI systems that capture and convert
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto">
            Choose a premium website build, add an AI receptionist, and automate follow-up—so your online presence turns
            into booked customers.{" "}
            <Link to="/services" className="text-neon-cyan hover:underline font-medium whitespace-nowrap">
              View all services
            </Link>
            .
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            const isPurple = service.accent === "electric-purple";
            return (
              <motion.article
                key={service.title}
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

                <h3 className="text-xl font-bold text-slate-50 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {service.bullets.map((b) => (
                    <li key={b} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className={`mt-2 h-1.5 w-1.5 rounded-full ${isPurple ? "bg-electric-purple" : "bg-neon-cyan"}`} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                    {service.kind === "booking" ? (
                      <BookingLink className="flex items-center justify-center gap-2">
                        {service.cta}
                        <ArrowRight className="w-4 h-4" />
                      </BookingLink>
                    ) : (
                      <Link to={service.href} className="flex items-center justify-center gap-2">
                        {service.cta}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

