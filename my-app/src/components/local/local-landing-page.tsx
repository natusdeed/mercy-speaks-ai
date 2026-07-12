"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { BookingLink } from "@/components/cta/booking-link";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import {
  breadcrumbSchema,
  faqPageSchema,
  localBusinessSchema,
  webPageSchema,
} from "@/lib/schema";
import type { LocalPageConfig } from "@/content/local-pages";

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

export interface LocalLandingPageProps {
  config: LocalPageConfig;
}

export function LocalLandingPage({ config }: LocalLandingPageProps) {
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
          localBusinessSchema({
            path: config.path,
            description: config.seoDescription,
            areaServedCities: config.areaServedCities,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: config.breadcrumbLabel, path: config.path },
          ]),
          faqPageSchema(
            config.faqs.map((f) => ({ question: f.question, answer: f.answer }))
          ),
        ]}
      />

      <main>
        <section className="section pt-6 pb-0" aria-label="Breadcrumb">
          <div className="section-inner max-w-4xl mx-auto">
            <Breadcrumbs items={[{ name: config.breadcrumbLabel }]} className="mb-2" />
          </div>
        </section>

        <section className="section pt-8 md:pt-12" aria-labelledby="local-hero-title">
          <div className="section-inner max-w-4xl mx-auto text-center">
            <motion.p
              {...fadeUp}
              className="inline-flex items-center gap-2 text-xs font-semibold text-neon-cyan uppercase tracking-widest mb-3"
            >
              <MapPin className="w-3.5 h-3.5" aria-hidden />
              {config.navLabel}
            </motion.p>
            <motion.h1
              id="local-hero-title"
              {...fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-50 tracking-tight mb-6"
            >
              {config.h1}
            </motion.h1>
            <motion.p
              {...fadeUp}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-8"
            >
              {config.lead}
            </motion.p>
            <motion.div {...fadeUp} className="flex justify-center">
              <Button variant="primary" size="lg" asChild>
                <BookingLink kind="generalStrategyCall" className="flex items-center gap-2">
                  Book a demo
                  <ArrowRight className="w-5 h-5" />
                </BookingLink>
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="section" aria-labelledby="local-context-title">
          <div className="section-inner max-w-3xl mx-auto space-y-5">
            <motion.h2
              id="local-context-title"
              {...fadeUpInView}
              className="text-2xl md:text-3xl font-bold text-slate-50 text-center mb-2"
            >
              Local context
            </motion.h2>
            {config.contextParagraphs.map((p, i) => (
              <motion.p
                key={i}
                {...fadeUpInView}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="text-slate-400 leading-relaxed text-base md:text-lg"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="local-portfolio-title">
          <div className="section-inner max-w-3xl mx-auto">
            <motion.aside
              {...fadeUpInView}
              className="rounded-2xl border border-neon-cyan/20 bg-neon-cyan/5 p-6 md:p-8"
            >
              <h2
                id="local-portfolio-title"
                className="text-xl md:text-2xl font-bold text-slate-50 mb-3"
              >
                {config.portfolio.title}
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">{config.portfolio.description}</p>
              <a
                href={config.portfolio.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-neon-cyan font-semibold hover:underline"
              >
                Visit the live site
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.aside>
          </div>
        </section>

        <section className="section" aria-labelledby="local-services-title">
          <div className="section-inner max-w-5xl mx-auto">
            <motion.div {...fadeUpInView} className="text-center mb-8 max-w-3xl mx-auto">
              <h2
                id="local-services-title"
                className="text-2xl md:text-3xl font-bold text-slate-50 mb-4"
              >
                Services & industries
              </h2>
              <p className="text-slate-400 leading-relaxed">{config.servicesIntro}</p>
            </motion.div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {config.serviceLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  {...fadeUpInView}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                >
                  <Link
                    to={link.href}
                    className="group flex flex-col h-full rounded-2xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-md p-5 hover:border-neon-cyan/40 transition-colors"
                  >
                    <span className="font-bold text-slate-50 group-hover:text-neon-cyan transition-colors mb-1">
                      {link.label}
                    </span>
                    <span className="text-sm text-slate-400 leading-relaxed">{link.blurb}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            {config.industryLinks.length > 0 ? (
              <ul className="flex flex-wrap justify-center gap-2">
                {config.industryLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      title={link.blurb}
                      className="inline-flex items-center rounded-full border border-slate-800/70 bg-slate-900/50 px-4 py-2 text-sm text-slate-300 hover:border-electric-purple/50 hover:text-electric-purple transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>

        <section className="section" aria-labelledby="local-faq-title">
          <div className="section-inner max-w-3xl mx-auto">
            <motion.h2
              id="local-faq-title"
              {...fadeUpInView}
              className="text-2xl md:text-3xl font-bold text-slate-50 text-center mb-8"
            >
              Local FAQ
            </motion.h2>
            <Accordion items={faqsForAccordion} />
          </div>
        </section>

        <section className="section" aria-labelledby="local-cta-title">
          <div className="section-inner max-w-3xl mx-auto text-center">
            <motion.h2
              id="local-cta-title"
              {...fadeUpInView}
              className="text-2xl md:text-3xl font-bold text-slate-50 mb-4"
            >
              {config.ctaTitle}
            </motion.h2>
            <motion.p
              {...fadeUpInView}
              className="text-slate-400 leading-relaxed mb-8 max-w-2xl mx-auto"
            >
              {config.ctaDescription}
            </motion.p>
            <motion.div {...fadeUpInView} className="flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="lg" asChild>
                <BookingLink kind="generalStrategyCall" className="flex items-center gap-2">
                  Book a demo
                  <ArrowRight className="w-5 h-5" />
                </BookingLink>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Contact us
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
