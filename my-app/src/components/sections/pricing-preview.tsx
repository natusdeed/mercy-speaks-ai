"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

export function PricingPreview() {
  return (
    <section
      className="section bg-slate-950 pt-8 md:pt-10"
      aria-labelledby="pricing-preview-title"
    >
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {TIERS.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`card-premium flex flex-col ${tier.highlight ? "bg-slate-900/40" : ""}`}
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
                variant={tier.highlight ? "primary" : "outline"}
                size="default"
                asChild
                className="mt-auto w-full"
              >
                <Link to="/pricing">View plan</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-500 text-sm mt-6"
        >
          <Link to="/pricing" className="text-neon-cyan hover:text-neon-cyan/80">
            See full pricing and features →
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
