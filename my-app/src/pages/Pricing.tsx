import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { BookingLink } from "@/components/cta/booking-link";

interface Tier {
  name: string;
  price: number;
  callVolume: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: 197,
    callVolume: "Up to 500 calls/month",
    description: "For small businesses ready to stop missing calls.",
    features: [
      "24/7 AI receptionist",
      "Lead capture & qualification",
      "Appointment scheduling",
      "Missed-call text back",
      "Email notifications",
      "48-hour setup",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: 397,
    callVolume: "Up to 1,200 calls/month",
    description: "For growing teams that need more capacity and control.",
    popular: true,
    features: [
      "Everything in Starter",
      "Missed Revenue Dashboard",
      "Advanced scheduling & CRM sync",
      "Custom AI training",
      "SMS notifications",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: 797,
    callVolume: "3,000+ calls/month",
    description: "For high-volume and multi-location operations.",
    features: [
      "Everything in Professional",
      "Dedicated AI agent",
      "API & custom integrations",
      "Dedicated account manager",
      "24/7 phone support",
      "SLA guarantees",
    ],
  },
];

const TRUST_NOTES = [
  "Setup in 48 hours",
  "Works with your current number",
  "Cancel anytime",
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45 },
};

export default function Pricing() {
  return (
    <div className="min-h-screen bg-slate-950">
      <main className="w-full">
        {/* Hero */}
        <section className="section section-hero">
          <div className="section-inner max-w-3xl mx-auto text-center">
            <motion.h1
              {...fadeUp}
              className="text-4xl md:text-5xl font-bold text-slate-50 tracking-tight mb-4"
            >
              Simple, transparent pricing
            </motion.h1>
            <motion.p
              {...fadeUp}
              transition={{ delay: 0.06 }}
              className="text-lg text-slate-400 mb-10"
            >
              One plan, one price. Scale with add-ons when you need more.
            </motion.p>
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400"
            >
              {TRUST_NOTES.map((note) => (
                <span key={note} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0" />
                  {note}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3-tier grid */}
        <section className="section border-t border-slate-800/50" aria-labelledby="pricing-tiers">
          <div className="section-inner">
            <h2 id="pricing-tiers" className="sr-only">
              Pricing tiers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {TIERS.map((tier, index) => (
                <motion.article
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className={`relative rounded-xl border p-8 flex flex-col ${
                    tier.popular
                      ? "border-electric-purple/50 bg-slate-900/30 md:-my-2 md:py-10"
                      : "border-slate-800/50 bg-slate-900/10"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-block px-3 py-1 rounded-full bg-electric-purple text-slate-950 text-xs font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-slate-50 mb-1">{tier.name}</h3>
                  <p className="text-slate-500 text-sm mb-4">{tier.callVolume}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold text-slate-50">${tier.price}</span>
                    <span className="text-slate-400">/month</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-6">{tier.description}</p>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={tier.popular ? "primary" : "outline"}
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <BookingLink className="flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      Book Demo
                      <ArrowRight className="w-4 h-4" />
                    </BookingLink>
                  </Button>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons for extra calls */}
        <section className="section border-t border-slate-800/40">
          <div className="section-inner max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="rounded-xl border border-slate-800/50 bg-slate-900/10 p-8"
            >
              <h2 className="text-lg font-bold text-slate-50 mb-2">Add-ons</h2>
              <p className="text-slate-400 text-sm mb-4">
                Need more calls than your plan includes? Add extra call packs anytime.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0" />
                  Extra call pack: $0.25/call (billed in blocks of 100)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0" />
                  Overage is prorated; we’ll never cut off your line
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section border-t border-slate-800/40 pb-20 md:pb-28">
          <div className="section-inner max-w-2xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-400 mb-6"
            >
              Not sure which plan fits? We’ll recommend one during your demo.
            </motion.p>
            <Button variant="primary" size="lg" asChild>
              <BookingLink className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Book Demo
                <ArrowRight className="w-5 h-5" />
              </BookingLink>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
