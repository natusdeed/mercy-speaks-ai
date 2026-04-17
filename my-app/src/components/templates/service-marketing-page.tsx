import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { BookingLink } from "@/components/cta/booking-link";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { NAV_PATHS } from "@/lib/site-config";
import { breadcrumbSchema, faqPageSchema, serviceSchema, webPageSchema } from "@/lib/schema";
import { Accordion, type AccordionItemData } from "@/components/ui/Accordion";

export type ServiceSection = {
  title: string;
  body: string;
};

export type RelatedLink = { to: string; label: string };

export type ServiceMarketingPageProps = {
  seoTitle: string;
  seoDescription: string;
  path: string;
  icon: LucideIcon;
  h1: string;
  intro: string;
  /** Plain-language block for users and answer engines */
  atAGlance: string;
  sections: ServiceSection[];
  related?: RelatedLink[];
  serviceType?: string;
  /** Optional per-service FAQ (collapsible accordion). */
  faqs?: AccordionItemData[];
};

export function ServiceMarketingPage({
  seoTitle,
  seoDescription,
  path,
  icon: Icon,
  h1,
  intro,
  atAGlance,
  sections,
  related = [],
  serviceType,
  faqs,
}: ServiceMarketingPageProps) {
  const crumbs = [
    { name: "Services", path: NAV_PATHS.services },
    { name: h1 },
  ];

  const ld = [
    webPageSchema({ name: seoTitle, description: seoDescription, path }),
    serviceSchema({
      name: h1,
      description: seoDescription,
      path,
      serviceType: serviceType ?? h1,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: NAV_PATHS.services },
      { name: h1, path },
    ]),
    ...(faqs?.length
      ? [
          faqPageSchema(
            faqs.map((f) => ({ question: f.question, answer: f.answer }))
          ),
        ]
      : []),
  ];

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead title={seoTitle} description={seoDescription} path={path} />
      <JsonLd data={ld} />
      <main className="pb-16 md:pb-20">
        <section className="section section-hero border-b border-slate-800/40">
          <div className="section-inner max-w-3xl mx-auto">
            <Breadcrumbs
              items={crumbs}
              className="mb-6 text-left"
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-center"
            >
              <Icon className="w-14 h-14 sm:w-16 sm:h-16 text-neon-cyan mx-auto mb-4" aria-hidden />
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-50 mb-4 title-3d px-1 [overflow-wrap:anywhere]">
                {h1}
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-8 px-1">{intro}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
                <Button variant="primary" size="lg" asChild className="w-full sm:w-auto">
                  <BookingLink className="flex items-center justify-center gap-2">
                    Book a strategy call
                    <ArrowRight className="w-5 h-5" />
                  </BookingLink>
                </Button>
                <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                  <Link to={NAV_PATHS.contact} className="flex items-center justify-center gap-2">
                    Contact
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section" aria-labelledby="at-a-glance">
          <div className="section-inner max-w-3xl mx-auto">
            <div
              id="at-a-glance"
              className="rounded-2xl border border-slate-800/60 bg-slate-900/30 p-6 sm:p-8 backdrop-blur-sm"
            >
              <h2 className="text-sm font-semibold text-neon-cyan uppercase tracking-wider mb-3">At a glance</h2>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed">{atAGlance}</p>
            </div>
          </div>
        </section>

        <section className="section pt-0 space-y-12 sm:space-y-14" aria-label="Service details">
          <div className="section-inner max-w-3xl mx-auto space-y-10">
            {sections.map((s) => (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                className="border-b border-slate-800/50 pb-10 last:border-0 last:pb-0"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-slate-50 mb-3">{s.title}</h2>
                <p className="text-slate-400 text-base sm:text-lg leading-relaxed whitespace-pre-line">{s.body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        {faqs && faqs.length > 0 && (
          <section
            className="section pt-0"
            aria-labelledby="service-faq-heading"
          >
            <div className="section-inner max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8 md:mb-10"
              >
                <h2
                  id="service-faq-heading"
                  className="text-3xl md:text-4xl font-bold text-slate-50 mb-3"
                >
                  Frequently asked questions
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  Quick answers about setup, integration, and support.
                </p>
              </motion.div>
              <Accordion items={faqs} />
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="section pt-0" aria-label="Related services">
            <div className="section-inner max-w-3xl mx-auto">
              <h2 className="text-lg font-semibold text-slate-50 mb-4">Related services</h2>
              <ul className="flex flex-col sm:flex-row flex-wrap gap-3">
                {related.map((r) => (
                  <li key={r.to}>
                    <Link
                      to={r.to}
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/40 px-4 py-3 text-slate-300 hover:text-neon-cyan hover:border-neon-cyan/30 transition-colors"
                    >
                      {r.label}
                      <ArrowRight className="w-4 h-4" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="section pt-0">
          <div className="section-inner max-w-3xl mx-auto text-center">
            <Button variant="primary" size="lg" asChild className="px-8">
              <BookingLink className="flex items-center justify-center gap-2">
                Book a free strategy call
                <ArrowRight className="w-5 h-5" />
              </BookingLink>
            </Button>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
