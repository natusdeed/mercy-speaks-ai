import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Button } from "@/components/ui/button";
import { BookingLink } from "@/components/cta/booking-link";
import { NAV_PATHS } from "@/lib/site-config";
import {
  breadcrumbSchema,
  itemListSchema,
  webPageSchema,
} from "@/lib/schema";
import { getAllIndustryPages } from "@/content/industry-pages";

const SEO_TITLE = "Industries | Mercy Speaks Digital";
const SEO_DESCRIPTION =
  "AI receptionist and automation for HVAC, plumbing, dental, law firms, churches, and auto repair—industry pages with missed-call recovery and booking workflows.";

export default function IndustriesIndexPage() {
  const industries = getAllIndustryPages();

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead path={NAV_PATHS.industries} title={SEO_TITLE} description={SEO_DESCRIPTION} />
      <JsonLd
        data={[
          webPageSchema({
            name: SEO_TITLE,
            description: SEO_DESCRIPTION,
            path: NAV_PATHS.industries,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: NAV_PATHS.industries },
          ]),
          itemListSchema({
            name: "Industries we serve",
            items: industries.map((ind) => ({
              name: ind.navLabel,
              path: ind.path,
            })),
          }),
        ]}
      />

      <main>
        <section className="section pt-6 pb-0" aria-label="Breadcrumb">
          <div className="section-inner max-w-4xl mx-auto">
            <Breadcrumbs items={[{ name: "Industries" }]} className="mb-2" />
          </div>
        </section>

        <section className="section pt-8 md:pt-12" aria-labelledby="industries-index-title">
          <div className="section-inner max-w-4xl mx-auto text-center mb-12">
            <motion.h1
              id="industries-index-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-50 tracking-tight mb-6"
            >
              AI receptionist systems by industry
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Missed calls look different in every trade and practice. Pick your vertical for
              industry-specific intake, automations, and pricing guidance.
            </motion.p>
          </div>

          <div className="section-inner max-w-5xl mx-auto">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {industries.map((ind, index) => (
                <motion.li
                  key={ind.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                >
                  <Link
                    to={ind.path}
                    className="group flex flex-col h-full rounded-2xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-md p-6 hover:border-neon-cyan/40 transition-colors"
                  >
                    <span className="text-xl font-bold text-slate-50 group-hover:text-neon-cyan transition-colors mb-2">
                      {ind.navLabel}
                    </span>
                    <span className="text-slate-400 leading-relaxed flex-1 text-sm md:text-base">
                      {ind.indexBlurb}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-electric-purple">
                      View {ind.navLabel} page
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-12 text-center">
              <Button variant="primary" size="lg" asChild>
                <BookingLink kind="aiReceptionistDemo" className="inline-flex items-center gap-2">
                  Book a demo
                  <ArrowRight className="w-5 h-5" />
                </BookingLink>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
