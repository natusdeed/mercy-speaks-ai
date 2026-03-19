"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const TIERS = [
  {
    name: "Starter",
    price: 197,
    description: "AI phone receptionist, lead capture, 48-hour setup.",
    highlight: false,
  },
  {
    name: "Professional",
    price: 397,
    description: "Advanced automation, custom workflows, priority support.",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: 797,
    description: "Unlimited calls, dedicated agent, API & custom integrations.",
    highlight: false,
  },
];

const WEBSITE_TIERS = [
  {
    name: "Starter Website",
    priceLabel: "Starting at $997",
    audience:
      "Perfect for new or local businesses that need a clean, trustworthy website fast.",
    included: [
      "Premium 1–3 page site (home + core pages)",
      "Mobile-first design + fast performance",
      "Conversion-ready contact/quote flow",
      "Basic on-page SEO + analytics setup",
    ],
    cta: "Get a Website Quote",
    href: "/contact",
    popular: false,
  },
  {
    name: "Business Website",
    priceLabel: "Starting at $1,997",
    audience:
      "For established companies that need stronger messaging, structure, and lead capture.",
    included: [
      "Premium 5–8 page website",
      "Service pages built for conversion",
      "SEO-ready structure + technical cleanup",
      "Integrations (forms, email, booking, CRM-ready)",
    ],
    cta: "Book Website Call",
    href: "/book-demo",
    popular: true,
  },
  {
    name: "Premium / Custom Website",
    priceLabel: "Custom quote",
    audience:
      "For high-growth brands that need custom UI, advanced sections, and tailored strategy.",
    included: [
      "Custom UX + design system direction",
      "Advanced sections (case studies, portals, calculators)",
      "Performance + SEO optimization",
      "Ongoing iteration and launch support",
    ],
    cta: "Request Custom Quote",
    href: "/contact",
    popular: false,
  },
] as const;

export function PricingPreview() {
  return (
    <section
      className="section bg-slate-950"
      aria-labelledby="pricing-preview-title"
    >
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            id="pricing-preview-title"
            className="text-3xl md:text-4xl font-bold text-slate-50 mb-3"
          >
            Pricing Preview
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Plans that scale. 48-hour setup. No long-term contracts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TIERS.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`card flex flex-col ${tier.highlight ? "bg-slate-900/40" : ""}`}
            >
              {tier.highlight && (
                <span className="text-xs font-semibold text-electric-purple uppercase tracking-wider mb-3">
                  Most popular
                </span>
              )}
              <h3 className="card-title text-slate-50 mb-1">
                {tier.name}
              </h3>
              <p className="text-2xl font-bold text-slate-50 mb-2">
                ${tier.price}
                <span className="text-sm font-normal text-slate-400">
                  /month
                </span>
              </p>
              <p className="card-body text-slate-400 mb-5">
                {tier.description}
              </p>
              <Button
                variant={tier.highlight ? "glow" : "outline"}
                size="default"
                asChild
                className="mt-auto w-full"
              >
                <Link to="/pricing">View plan</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Website Development Pricing (added section) */}
        <div className="mt-12 md:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-6 md:mb-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-slate-50 mb-2">
              Website Development
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
              Premium, mobile-first websites built for trust and conversion. Choose a tier for
              a starting point—final pricing depends on pages, content, and integrations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {WEBSITE_TIERS.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className={`relative flex flex-col rounded-2xl overflow-hidden ${
                  tier.popular
                    ? "bg-slate-900/50 shadow-lg shadow-electric-purple/5"
                    : "card-premium"
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 py-2 text-center text-xs font-semibold text-slate-950 bg-electric-purple">
                    Most Popular
                  </div>
                )}

                <div
                  className={`flex flex-col flex-1 p-7 ${
                    tier.popular ? "pt-12" : ""
                  }`}
                >
                  <h4 className="text-xl font-bold text-slate-50 mb-2">
                    {tier.name}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    {tier.audience}
                  </p>

                  <div className="mb-6">
                    <span className="text-3xl font-bold text-slate-50">
                      {tier.priceLabel}
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {tier.included.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-slate-300 text-sm leading-snug"
                      >
                        <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={tier.popular ? "primary" : "outline"}
                    size="default"
                    className="w-full"
                    asChild
                  >
                    <Link
                      to={tier.href}
                      className="flex items-center justify-center gap-2"
                    >
                      {tier.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-500 text-sm mt-8"
        >
          <Link to="/pricing" className="text-neon-cyan hover:text-neon-cyan/80">
            See full pricing and features →
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
