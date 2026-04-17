"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { Testimonials } from "@/components/sections/testimonials";
import { ALL_SITE_TESTIMONIALS } from "@/content/all-testimonials";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { BRAND_TAGLINE } from "@/lib/site-config";
import { breadcrumbSchema, organizationSchema, webPageSchema } from "@/lib/schema";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45 },
};

const CAL_DEMO_URL = "https://cal.com/natusdeed/free-ai-receptionist-demo";

export default function TestimonialsPage() {
  const description = `Client testimonials and verified feedback from Houston-area businesses: ${BRAND_TAGLINE}`;

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead path="/testimonials" title="Testimonials" description={description} />
      <JsonLd
        data={[
          organizationSchema(),
          webPageSchema({ name: "Testimonials", description, path: "/testimonials" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Testimonials", path: "/testimonials" },
          ]),
        ]}
      />
      <main>
        <section className="section" aria-labelledby="testimonials-page-title">
          <div className="section-inner max-w-4xl mx-auto text-center">
            <motion.div {...fadeUp}>
              <span className="inline-block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                Social proof
              </span>
              <h1
                id="testimonials-page-title"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-50 tracking-tight mb-4"
              >
                Real results from real Houston businesses
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                We only publish real testimonials. References are available on request when disclosure allows.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Google Business Profile reviews — embed when available */}
        {
          // TODO: Add Google Business Profile review widget embed code here
          null
        }
        <section className="section pt-0" aria-label="Google reviews">
          <div className="section-inner max-w-3xl mx-auto">
            <div className="rounded-2xl border border-dashed border-slate-700/80 bg-slate-900/40 min-h-[120px] flex items-center justify-center px-6 py-10">
              <p className="text-sm text-slate-500 text-center">
                Google reviews will appear here once the Business Profile widget is embedded.
              </p>
            </div>
          </div>
        </section>

        <Testimonials
          items={ALL_SITE_TESTIMONIALS}
          title="What operators are saying"
          description="HVAC, automotive, and dental-adjacent scenarios—aligned with the same proof points we highlight on the homepage and industry pages."
          hideFooterCta
          singleCardLayout={false}
        />

        <section className="section" aria-label="Book a free demo">
          <div className="section-inner max-w-2xl mx-auto text-center">
            <motion.div {...fadeUp}>
              <p className="text-slate-300 text-lg mb-6">
                Ready to get results like these? Book your free demo →
              </p>
              <Button variant="primary" size="lg" asChild>
                <a
                  href={CAL_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Book your free demo
                  <ArrowRight className="w-5 h-5" aria-hidden />
                </a>
              </Button>
              <p className="mt-6 text-sm text-slate-500">
                Prefer to browse proof first?{" "}
                <Link to="/results" className="text-neon-cyan underline-offset-4 hover:underline">
                  See results &amp; case studies
                </Link>
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
