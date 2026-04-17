"use client";

import { motion } from "framer-motion";
import { AlertCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { BookingLink } from "@/components/cta/booking-link";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { BRAND_TAGLINE } from "@/lib/site-config";
import { breadcrumbSchema, organizationSchema, webPageSchema } from "@/lib/schema";
import { FinalCTA } from "@/components/sections/final-cta";
import { Testimonials } from "@/components/sections/testimonials";
import type { IndustryLandingConfig } from "@/content/industry-landings";

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

export interface IndustryLandingPageProps {
  config: IndustryLandingConfig;
}

export function IndustryLandingPage({ config }: IndustryLandingPageProps) {
  const breadcrumbName =
    config.slug === "hvac" ? "HVAC" : config.slug.charAt(0).toUpperCase() + config.slug.slice(1);

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead path={config.path} title={config.seoTitle} description={config.seoDescription} />
      <JsonLd
        data={[
          organizationSchema(),
          webPageSchema({
            name: config.seoTitle,
            description: config.seoDescription,
            path: config.path,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: breadcrumbName, path: config.path },
          ]),
        ]}
      />
      <main>
        <section className="section pt-6 pb-0 border-b border-slate-800/30" aria-label="Summary">
          <div className="section-inner max-w-4xl mx-auto">
            <p className="text-slate-400 text-center text-sm sm:text-base leading-relaxed px-1">
              {BRAND_TAGLINE}
            </p>
          </div>
        </section>

        <section className="section pt-10 md:pt-14" aria-labelledby="industry-hero-title">
          <div className="section-inner max-w-4xl mx-auto text-center">
            <motion.div {...fadeUp} className="mb-3">
              <span className="text-xs font-semibold text-electric-purple uppercase tracking-widest">
                {config.eyebrow}
              </span>
            </motion.div>
            <motion.h1
              id="industry-hero-title"
              {...fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-50 tracking-tight mb-6"
            >
              {config.headline}
            </motion.h1>
            <motion.p
              {...fadeUp}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-8"
            >
              {config.lead}
            </motion.p>
            <motion.div {...fadeUp} className="flex justify-center">
              <Button variant="primary" size="lg" asChild>
                <BookingLink className="flex items-center gap-2">
                  Book Demo
                  <ArrowRight className="w-5 h-5" />
                </BookingLink>
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="section" aria-labelledby="industry-problems-title">
          <div className="section-inner max-w-3xl mx-auto">
            <motion.div {...fadeUpInView} className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 mb-4">
                <AlertTriangle className="w-4 h-4 text-neon-cyan" aria-hidden />
                <span className="text-sm text-slate-300 font-medium">The real cost of missed calls</span>
              </div>
              <h2 id="industry-problems-title" className="text-2xl md:text-3xl font-bold text-slate-50">
                Sound familiar?
              </h2>
            </motion.div>
            <ul className="space-y-4">
              {config.problems.map((line, i) => (
                <motion.li
                  key={i}
                  {...fadeUpInView}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="flex gap-3 text-slate-300 text-base md:text-lg"
                >
                  <AlertCircle className="w-5 h-5 text-electric-purple/90 shrink-0 mt-0.5" aria-hidden />
                  <span>{line}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" aria-labelledby="industry-outcomes-title">
          <div className="section-inner max-w-5xl mx-auto">
            <motion.h2
              id="industry-outcomes-title"
              {...fadeUpInView}
              className="text-2xl md:text-3xl font-bold text-slate-50 text-center mb-10"
            >
              What you get with Mercy Speaks Digital
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {config.outcomes.map((outcome, index) => {
                const Icon = outcome.icon;
                return (
                  <motion.article
                    key={outcome.title}
                    {...fadeUpInView}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className="card-premium flex flex-col h-full"
                  >
                    <div className="p-2.5 rounded-xl w-fit mb-4 bg-neon-cyan/10">
                      <Icon className="w-6 h-6 text-neon-cyan" aria-hidden />
                    </div>
                    <h3 className="text-xl font-bold text-slate-50 mb-2">{outcome.title}</h3>
                    <p className="text-slate-400 leading-relaxed flex-1">{outcome.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <Testimonials
          items={[config.testimonial]}
          title="Proof from real businesses"
          description="We only publish verified quotes tied to real engagements. References are available on request."
          primaryCtaOnly
          singleCardLayout
        />

        <FinalCTA title={config.finalCtaTitle} description={config.finalCtaDescription} />
      </main>
    </PageShell>
  );
}
