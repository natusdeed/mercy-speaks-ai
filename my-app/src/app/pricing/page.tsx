"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import {
  CheckCircle2,
  ArrowRight,
  Clock,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { BookingLink } from "@/components/cta/booking-link";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbSchema,
  faqPageSchema,
  offerCatalogSchema,
  webPageSchema,
} from "@/lib/schema";
import {
  getCancelFaqStructure,
  PRICING_FAQ_ITEMS,
  WEBSITE_TIERS,
} from "@/content/pricing-tiers";

const AI_PILOT_NOTICE = "AI receptionist services are currently in pilot testing.";
// P0 hotfix: AI receptionist plan pricing / call-volume overage FAQ is not published while in pilot.
const VISIBLE_FAQ_ITEMS = PRICING_FAQ_ITEMS.filter(
  (x) => x.question !== "What if I exceed my call volume?"
);

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45 },
};

const fadeUpInView = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45 },
};

const CANCEL_FAQ_STRUCTURE = getCancelFaqStructure();

const TRUST_NOTES = [
  { icon: Clock, text: "Guided setup—timeline confirmed on your call" },
    { icon: RotateCcw, text: "Flexible plans—terms reviewed before you start" },
];

const SOCIAL_AND_REPUTATION_PRICING = [
  {
    title: "Social Media Management",
    items: [
      "Starter: $397/mo — 12 posts, Facebook + Instagram, content calendar, basic report",
      "Growth: $697/mo — 20 posts, all platforms, Stories/Reels, review automation, strategy call",
      "Onboarding fee: $197 one-time",
    ],
  },
  {
    title: "Reputation Management",
    items: [
      "Standalone: $197/mo — review automation, monitoring, alerts, monthly report",
      "Bundled: Included in SMM Growth at $697/mo",
    ],
  },
] as const;

export default function PricingPage() {
  const description =
    "Website packages from Mercy Speaks Digital with guided onboarding. AI receptionist services are currently in pilot testing.";

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead path="/pricing" title="Pricing" description={description} />
      <JsonLd
        data={[
          webPageSchema({ name: "Pricing", description, path: "/pricing" }),
          offerCatalogSchema({
            aiTiers: [],
            websiteTiers: WEBSITE_TIERS,
          }),
          faqPageSchema(
            VISIBLE_FAQ_ITEMS.map((x) => ({ question: x.question, answer: x.answer }))
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
        ]}
      />
      <main>
        {/* Hero */}
        <section className="section" aria-labelledby="pricing-title">
          <div className="section-inner max-w-4xl mx-auto text-center">
            <motion.div {...fadeUp}>
              <h1
                id="pricing-title"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-50 tracking-tight mb-4"
              >
                Simple, transparent pricing
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Website packages with guided onboarding. AI receptionist services are currently in pilot testing.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section pt-0" aria-labelledby="social-reputation-pricing-title">
          <div className="section-inner max-w-5xl mx-auto">
            <motion.div
              {...fadeUpInView}
              className="rounded-2xl border border-slate-800/60 bg-slate-900/10 backdrop-blur-md p-6 md:p-8"
            >
              <h2
                id="social-reputation-pricing-title"
                className="text-2xl md:text-3xl font-bold text-slate-50 mb-5"
              >
                Social media and reputation plans
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SOCIAL_AND_REPUTATION_PRICING.map((entry) => (
                  <div key={entry.title} className="rounded-2xl bg-slate-900/20 p-6">
                    <h3 className="text-lg font-semibold text-slate-50 mb-3">{entry.title}</h3>
                    <ul className="space-y-2.5">
                      {entry.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-slate-300 text-sm leading-snug">
                          <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust notes */}
        <section className="section pt-0" aria-label="Trust notes">
          <div className="section-inner max-w-4xl mx-auto">
            <motion.div
              {...fadeUp}
              className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-slate-400"
            >
              {TRUST_NOTES.map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-neon-cyan shrink-0" />
                  <span className="text-sm md:text-base">{text}</span>
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* AI receptionist: pilot notice only (P0 hotfix — no AI pricing published) */}
        <section className="section" aria-labelledby="ai-receptionist-plans-title">
          <div className="section-inner max-w-3xl mx-auto text-center">
            <h2
              id="ai-receptionist-plans-title"
              className="text-2xl md:text-3xl font-bold text-slate-50 mb-4"
            >
              AI receptionist
            </h2>
            <p className="text-slate-300">{AI_PILOT_NOTICE}</p>
          </div>
        </section>

        {/* Website Development Pricing */}
        <section className="section pt-0" aria-labelledby="website-pricing-title">
          <div className="section-inner max-w-5xl mx-auto">
            <div className="rounded-2xl border border-slate-800/60 bg-slate-900/10 backdrop-blur-md p-6 md:p-8 mb-6 md:mb-8">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                Website Development
              </p>
              <h2
                id="website-pricing-title"
                className="text-2xl md:text-3xl font-bold text-slate-50 mb-2"
              >
                Website Development Pricing
              </h2>
              <p className="text-slate-400 text-sm md:text-base max-w-3xl">
                Premium, mobile-first websites built for trust and conversion. Choose a tier to get a
                starting point—final pricing depends on pages, content, and integrations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {WEBSITE_TIERS.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  {...fadeUpInView}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
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
                  <div className={`flex flex-col flex-1 ${tier.popular ? "p-7 pt-12" : "p-0"}`}>
                    <h3 className="text-xl font-bold text-slate-50 mb-2">{tier.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5">{tier.audience}</p>
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-slate-50">
                        {tier.priceLabel}
                      </span>
                      {tier.priceLabel !== "Custom quote" && (
                        <span className="text-slate-400 ml-2 text-sm">USD</span>
                      )}
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
                      <Link to={tier.href} className="flex items-center justify-center gap-2">
                        {tier.cta}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Short FAQ */}
        <section className="section" aria-labelledby="faq-title">
          <div className="section-inner max-w-2xl mx-auto">
            <motion.h2
              id="faq-title"
              {...fadeUp}
              className="text-2xl md:text-3xl font-bold text-slate-50 text-center mb-6"
            >
              Frequently asked
            </motion.h2>
            <div className="space-y-4">
              {VISIBLE_FAQ_ITEMS.map((faq) => (
                <motion.div
                  key={faq.question}
                  {...fadeUpInView}
                  className="rounded-2xl bg-slate-900/20 p-7 shadow-sm"
                >
                  <h3 className="text-base font-semibold text-slate-50 mb-2">
                    {faq.question}
                  </h3>
                  {faq.question === "Can I cancel?" ? (
                    <dl className="space-y-3">
                      {CANCEL_FAQ_STRUCTURE.map((item) => (
                        <div key={item.label}>
                          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                            {item.label}
                          </dt>
                          <dd className="text-sm text-slate-400 leading-relaxed">{item.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="text-sm text-slate-400 leading-relaxed">{faq.answer}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section" aria-label="Book a demo">
          <div className="section-inner max-w-2xl mx-auto text-center">
            <motion.div {...fadeUp}>
              <p className="text-slate-400 mb-6 text-base">
                Not sure which plan? We’ll recommend one during your demo.
              </p>
              <Button variant="primary" size="lg" asChild>
                <BookingLink kind="generalStrategyCall" className="flex items-center justify-center gap-2">
                  Book Demo
                  <ArrowRight className="w-5 h-5" />
                </BookingLink>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
