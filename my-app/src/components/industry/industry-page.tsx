"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { BookingLink } from "@/components/cta/booking-link";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { LiveDemo } from "@/components/sections/live-demo";
import { NAV_PATHS } from "@/lib/site-config";
import {
  breadcrumbSchema,
  faqPageSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/schema";
import type { IndustryPageConfig } from "@/content/industry-pages";

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

export interface IndustryPageProps {
  config: IndustryPageConfig;
}

export function IndustryPage({ config }: IndustryPageProps) {
  const faqsForAccordion = config.faqs.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
  }));

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead path={config.path} title={config.seoTitle} description={config.seoDescription} />
      <JsonLd
        data={[
          webPageSchema({
            name: config.seoTitle,
            description: config.seoDescription,
            path: config.path,
          }),
          serviceSchema({
            name: config.h1,
            description: config.seoDescription,
            path: config.path,
            serviceType: "AI Phone Receptionist",
            audience: config.audience,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: NAV_PATHS.industries },
            { name: config.navLabel, path: config.path },
          ]),
          faqPageSchema(
            config.faqs.map((f) => ({ question: f.question, answer: f.answer }))
          ),
        ]}
      />

      <main>
        <section className="section pt-6 pb-0" aria-label="Breadcrumb">
          <div className="section-inner max-w-4xl mx-auto">
            <Breadcrumbs
              items={[
                { name: "Industries", path: NAV_PATHS.industries },
                { name: config.navLabel },
              ]}
              className="mb-2"
            />
          </div>
        </section>

        {/* Hero */}
        <section className="section pt-8 md:pt-12" aria-labelledby="industry-hero-title">
          <div className="section-inner max-w-4xl mx-auto text-center">
            <motion.p
              {...fadeUp}
              className="text-xs font-semibold text-electric-purple uppercase tracking-widest mb-3"
            >
              {config.navLabel}
            </motion.p>
            <motion.h1
              id="industry-hero-title"
              {...fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-50 tracking-tight mb-6"
            >
              {config.h1}
            </motion.h1>
            <motion.p
              {...fadeUp}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-8"
            >
              {config.heroPain}
            </motion.p>
            <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="lg" asChild>
                <BookingLink kind="aiReceptionistDemo" className="flex items-center gap-2">
                  Book Demo
                  <ArrowRight className="w-5 h-5" />
                </BookingLink>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#industry-live-demo" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Hear a live demo
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* The problem */}
        <section className="section" aria-labelledby="industry-problem-title">
          <div className="section-inner max-w-3xl mx-auto">
            <motion.div {...fadeUpInView} className="text-center mb-8">
              <h2
                id="industry-problem-title"
                className="text-2xl md:text-3xl font-bold text-slate-50 mb-4"
              >
                {config.problemTitle}
              </h2>
              <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                {config.problemLead}
              </p>
            </motion.div>
            <ul className="space-y-4">
              {config.problems.map((line, i) => (
                <motion.li
                  key={i}
                  {...fadeUpInView}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="flex gap-3 text-slate-300 text-base md:text-lg"
                >
                  <AlertCircle
                    className="w-5 h-5 text-electric-purple/90 shrink-0 mt-0.5"
                    aria-hidden
                  />
                  <span>{line}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* What we install */}
        <section className="section" aria-labelledby="industry-install-title">
          <div className="section-inner max-w-5xl mx-auto">
            <motion.div {...fadeUpInView} className="text-center mb-10 max-w-3xl mx-auto">
              <h2
                id="industry-install-title"
                className="text-2xl md:text-3xl font-bold text-slate-50 mb-4"
              >
                {config.installTitle}
              </h2>
              <p className="text-slate-400 leading-relaxed">{config.installLead}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {config.installItems.map((item, index) => (
                <motion.article
                  key={item.title}
                  {...fadeUpInView}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="rounded-2xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-md p-6"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" aria-hidden />
                    <h3 className="text-lg font-bold text-slate-50">{item.title}</h3>
                  </div>
                  <p className="text-slate-400 leading-relaxed pl-8">{item.description}</p>
                </motion.article>
              ))}
            </div>
            {config.complianceNote ? (
              <motion.p
                {...fadeUpInView}
                className="mt-8 text-sm text-slate-500 leading-relaxed max-w-3xl mx-auto text-center border border-slate-800/50 rounded-xl px-4 py-3 bg-slate-900/30"
              >
                {config.complianceNote}
              </motion.p>
            ) : null}
            {config.portfolioNote ? (
              <motion.aside
                {...fadeUpInView}
                className="mt-8 max-w-3xl mx-auto rounded-2xl border border-neon-cyan/20 bg-neon-cyan/5 p-6 text-center"
              >
                <p className="text-slate-300 leading-relaxed mb-3">
                  {config.portfolioNote.description}
                </p>
                <a
                  href={config.portfolioNote.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-neon-cyan font-semibold hover:underline"
                >
                  Visit {config.portfolioNote.label}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.aside>
            ) : null}
          </div>
        </section>

        {/* How it works */}
        <section className="section" aria-labelledby="industry-how-title">
          <div className="section-inner max-w-3xl mx-auto">
            <motion.h2
              id="industry-how-title"
              {...fadeUpInView}
              className="text-2xl md:text-3xl font-bold text-slate-50 text-center mb-10"
            >
              {config.howTitle}
            </motion.h2>
            <ol className="space-y-8">
              {config.steps.map((step, index) => (
                <motion.li
                  key={step.title}
                  {...fadeUpInView}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="flex gap-4"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-electric-purple/20 text-electric-purple font-bold text-sm"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-slate-50 mb-2">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" aria-labelledby="industry-faq-title">
          <div className="section-inner max-w-3xl mx-auto">
            <motion.h2
              id="industry-faq-title"
              {...fadeUpInView}
              className="text-2xl md:text-3xl font-bold text-slate-50 text-center mb-8"
            >
              {config.navLabel} FAQ
            </motion.h2>
            <Accordion items={faqsForAccordion} />
          </div>
        </section>

        {/* Pricing pointer */}
        <section className="section" aria-labelledby="industry-pricing-title">
          <div className="section-inner max-w-3xl mx-auto">
            <motion.div
              {...fadeUpInView}
              className="rounded-2xl border border-slate-800/60 bg-slate-900/50 backdrop-blur-md p-8 md:p-10 text-center"
            >
              <h2
                id="industry-pricing-title"
                className="text-2xl md:text-3xl font-bold text-slate-50 mb-3"
              >
                Which plan fits {config.navLabel.toLowerCase()}?
              </h2>
              <p className="text-neon-cyan font-semibold text-lg mb-4">{config.pricing.tierName}</p>
              <p className="text-slate-400 leading-relaxed mb-6">{config.pricing.reason}</p>
              <Button variant="outline" size="lg" asChild>
                <Link to={NAV_PATHS.pricing} className="inline-flex items-center gap-2">
                  See full pricing
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* CTA: LiveDemo + book demo */}
        <section
          id="industry-live-demo"
          className="section scroll-mt-24"
          aria-labelledby="industry-cta-title"
        >
          <div className="section-inner max-w-4xl mx-auto text-center mb-10">
            <motion.h2
              id="industry-cta-title"
              {...fadeUpInView}
              className="text-2xl md:text-3xl font-bold text-slate-50 mb-4"
            >
              {config.ctaTitle}
            </motion.h2>
            <motion.p {...fadeUpInView} className="text-slate-400 leading-relaxed max-w-2xl mx-auto">
              {config.ctaDescription}
            </motion.p>
          </div>
          <LiveDemo location={`industry-${config.slug}`} />
          <div className="section-inner max-w-4xl mx-auto flex justify-center mt-8 pb-4">
            <Button variant="primary" size="lg" asChild>
              <BookingLink kind="aiReceptionistDemo" className="flex items-center gap-2">
                Book a free demo
                <ArrowRight className="w-5 h-5" />
              </BookingLink>
            </Button>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
