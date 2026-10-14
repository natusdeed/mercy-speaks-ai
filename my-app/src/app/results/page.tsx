"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { PortfolioGallery, type PortfolioItem } from "@/components/sections/portfolio-gallery";
import { Link } from "react-router-dom";
import { BookingLink } from "@/components/cta/booking-link";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { DAVITA_AUTO_LOGISTICS_URL } from "@/lib/site-config";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45 },
};

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "mercyspeaks-ai",
    title: "Mercy Speaks Digital",
    url: "https://www.mercyspeaksdigital.com",
    category: "Websites",
    description: "Agency website with clear positioning, premium UI, and conversion-focused inquiry flow.",
    stack: ["Next.js", "Tailwind"],
    thumbnail: "/portfolio/mercyspeaks-ai.png",
    liveUrl: "https://www.mercyspeaksdigital.com",
    ctaLabel: "View Site",
    featured: true,
  },
  {
    id: "widget-install",
    title: "Chat Widget Install Experience",
    // Marketing/portfolio link uses the canonical site; widget allowlists may still accept mercyspeaks.ai.
    url: "https://www.mercyspeaksdigital.com/widget/install",
    category: "Automation",
    description: "Self-serve install flow for embedding a branded website chat widget—clear steps + copy-paste snippet.",
    stack: ["Next.js", "TypeScript"],
    thumbnail: "/portfolio/widget-install.png",
    liveUrl: "https://www.mercyspeaksdigital.com/widget/install",
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
    url: DAVITA_AUTO_LOGISTICS_URL,
    category: "Websites",
    industryTag: "Demo build",
    description:
      "Clean-energy logistics brand: Tier-1 solar supply, luxury auto transport, Texas-based coordination, and global shipping lanes.",
    outcome:
      "Conversion-ready site with product proof points, gallery, regional shipping copy, and quote flows for export buyers.",
    stack: ["Next.js", "Tailwind", "Vercel"],
    thumbnail: "/portfolio/davita-auto-logistics.png",
    liveUrl: DAVITA_AUTO_LOGISTICS_URL,
    ctaLabel: "View Demo Build",
    featured: true,
  },
];

export default function ResultsPage() {
  const description =
    "Website projects built by Mercy Speaks Digital. We only publish results that are verified and approved by the client.";

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead path="/results" title="Results & Proof" description={description} />
      <JsonLd
        data={[
          webPageSchema({ name: "Results & Proof", description, path: "/results" }),
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
              <span className="inline-block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Proof first
              </span>
              <h1
                id="results-title"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-50 tracking-tight mb-4"
              >
                Results
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                We don&apos;t publish invented testimonials or unverified results. Below are website projects we have
                built.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Case studies removed (P0 hotfix): no unverified outcome metrics are published. */}
        <section className="section" aria-labelledby="pilot-note-title">
          <div className="section-inner max-w-3xl mx-auto text-center">
            <h2 id="pilot-note-title" className="text-2xl md:text-3xl font-bold text-slate-50 mb-4">
              AI receptionist results
            </h2>
            <p className="text-slate-300">
              AI receptionist services are currently in pilot testing. We will only publish results once they are
              verified and the client has given permission.
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
                Want to talk about your website? Book a call and we’ll walk through what your business needs.
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
