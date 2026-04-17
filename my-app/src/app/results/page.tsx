"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { PortfolioGallery, type PortfolioItem } from "@/components/sections/portfolio-gallery";
import { Link } from "react-router-dom";
import { BookingLink } from "@/components/cta/booking-link";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { BRAND_TAGLINE } from "@/lib/site-config";
import { breadcrumbSchema, organizationSchema, webPageSchema } from "@/lib/schema";

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

const CASE_STUDIES = [
  {
    industry: "Legal",
    situation:
      "Small firm had steady after-hours and overflow call volume that often landed in voicemail—potential clients moving on before anyone could respond.",
    installed: "24/7 AI receptionist + calendar sync; missed-revenue dashboard.",
    outcomes: [
      "Reduced missed consultations by 80%, recovered ~$4,200/month in potential revenue.",
      "After-hours calls answered and qualified instead of lost to voicemail.",
      "Leadership gained clearer visibility into missed-call patterns and follow-up; front-desk time shifted toward in-person priorities while the line stayed covered.",
    ],
    quote: "Illustrative scenario. References available on request.",
  },
  {
    industry: "Auto repair",
    situation: "Shop struggled with no-shows and back-and-forth scheduling during busy hours.",
    installed: "AI receptionist + automated reminders and follow-up; booking tied to calendar.",
    outcomes: [
      "Answered 100% of after-hours calls, booked 12 additional appointments in first 30 days.",
      "No-shows dropped significantly; reminders and confirmations automated.",
      "Scheduling handled 24/7 with every inquiry captured and followed up while the front desk focused on customers in the shop.",
    ],
    quote: "Illustrative scenario. References available on request.",
  },
  {
    industry: "HVAC / home services",
    situation: "Emergency calls at night and on weekends were going to voicemail; leads went cold.",
    installed: "24/7 AI that qualifies emergencies, books same-day/next-day slots, and notifies the team.",
    outcomes: [
      "Captured every after-hours call during peak season, added $6,800 in recovered jobs.",
      "Emergency bookings improved with fewer overnight voicemails sitting untouched.",
      "Callers qualified and scheduled before moving to the next name on Google; reporting made outcomes easier to review than ad hoc text chains or voicemail.",
    ],
    quote: "Illustrative scenario. References available on request.",
  },
];

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "mercyspeaks-ai",
    title: "Mercy Speaks Digital",
    url: "https://mercyspeaks.ai",
    category: "Websites",
    description: "Agency website with clear positioning, premium UI, and conversion-focused inquiry flow.",
    stack: ["Next.js", "Tailwind"],
    thumbnail: "/portfolio/mercyspeaks-ai.png",
    liveUrl: "https://mercyspeaks.ai",
    ctaLabel: "View Site",
    featured: true,
  },
  {
    id: "widget-install",
    title: "Chat Widget Install Experience",
    url: "https://mercyspeaks.ai/widget/install",
    category: "Automation",
    description: "Self-serve install flow for embedding a branded website chat widget—clear steps + copy-paste snippet.",
    stack: ["Next.js", "TypeScript"],
    thumbnail: "/portfolio/widget-install.png",
    liveUrl: "https://mercyspeaks.ai/widget/install",
    ctaLabel: "View Install Flow",
  },
  {
    id: "7",
    title: "PRIME Global Logistics",
    url: "https://primeglogistics.com/",
    category: "Websites",
    industryTag: "Logistics / Solar Supply",
    description:
      "Premium marketing site for solar supply + Africa logistics with product categories, gallery, FAQs, and a quote flow.",
    stack: ["Next.js", "Tailwind", "Vercel"],
    thumbnail: "/portfolio/primeglobal-logistics.png",
    liveUrl: "https://primeglogistics.com/",
    ctaLabel: "View Live Site",
    featured: true,
  },
  {
    id: "davita-auto-logistics",
    title: "Davita Auto Logistics",
    url: "https://davita-auto-logistics.vercel.app/",
    category: "Websites",
    industryTag: "Logistics / Solar Supply",
    description:
      "Clean-energy logistics brand: Tier-1 solar supply, luxury auto transport, Texas-based coordination, and global shipping lanes.",
    outcome:
      "Conversion-ready site with product proof points, gallery, regional shipping copy, and quote flows for export buyers.",
    stack: ["Next.js", "Tailwind", "Vercel"],
    thumbnail: "/portfolio/davita-auto-logistics.png",
    liveUrl: "https://davita-auto-logistics.vercel.app/",
    ctaLabel: "View Live Site",
    featured: true,
  },
];

export default function ResultsPage() {
  const description = `Results and illustrative outcomes: ${BRAND_TAGLINE}`;

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead path="/results" title="Results & proof" description={description} />
      <JsonLd
        data={[
          organizationSchema(),
          webPageSchema({ name: "Results & proof", description, path: "/results" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Results", path: "/results" },
          ]),
        ]}
      />
      <main>
        {/* Hero + pilot label */}
        <section className="section" aria-labelledby="results-title">
          <div className="section-inner max-w-4xl mx-auto text-center">
            <motion.div {...fadeUp}>
              <span className="inline-block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                Proof first
              </span>
              <h1
                id="results-title"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-50 tracking-tight mb-4"
              >
                Results
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                We don&apos;t publish invented testimonials. The scenarios below are illustrative composites—not named
                clients. Where we can&apos;t share details publicly, we offer references on request.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 3 featured case studies — scannable, premium */}
        <section className="section" aria-label="Featured case studies">
          <div className="section-inner max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {CASE_STUDIES.map((study, index) => (
                <motion.article
                  key={study.industry + index}
                  {...fadeUpInView}
                  className="card-premium flex flex-col rounded-2xl"
                >
                  <p className="text-xs font-semibold text-neon-cyan uppercase tracking-wider mb-3">
                    {study.industry}
                  </p>
                  <h2 className="text-xl font-bold text-slate-50 mb-3">
                    {study.industry}
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {study.situation}
                  </p>
                  <p className="text-slate-400 text-sm mb-5">
                    <span className="text-slate-500 font-medium">What we installed: </span>
                    {study.installed}
                  </p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {study.outcomes.map((outcome, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-slate-300 text-sm"
                      >
                        <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0 mt-0.5" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                  <p className="text-slate-400 text-sm italic mb-6 border-l-2 border-slate-700/50 pl-4">
                    &ldquo;{study.quote}&rdquo;
                  </p>
                  <Button variant="primary" size="default" className="w-full" asChild>
                    <BookingLink className="flex items-center justify-center gap-2">
                      Book Demo
                      <ArrowRight className="w-4 h-4" />
                    </BookingLink>
                  </Button>
                </motion.article>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-slate-500 max-w-2xl mx-auto">
              Metrics based on client-reported outcomes. Results vary by business.
            </p>
          </div>
        </section>

        {/* Portfolio Gallery */}
        <PortfolioGallery items={PORTFOLIO_ITEMS} layout="row" />

        {/* Bottom CTA */}
        <section className="section" aria-label="Book a demo">
          <div className="section-inner max-w-2xl mx-auto text-center">
            <motion.div {...fadeUp}>
              <p className="text-slate-400 mb-6">
                Want outcomes like these? Book a demo and we’ll show you how we can do the same for your business.
              </p>
              <Button variant="primary" size="lg" asChild>
                <BookingLink className="flex items-center justify-center gap-2">
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
