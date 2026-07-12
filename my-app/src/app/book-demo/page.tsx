"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageShell } from "@/components/ui/page-shell";
import {
  Calendar,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
} from "lucide-react";
import { CalInlineEmbed } from "@/components/booking/cal-inline-embed";
import { CAL_COM_EMBED } from "@/lib/site-config";
import { STRATEGY_CALL_PREPARE_ITEMS } from "@/content/home-faqs";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

export default function BookDemoPage() {
  const description =
    "Book a strategy call or demo for websites, AI receptionists, and automation. See how Mercy Speaks Digital can capture leads and fill your calendar.";

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead path="/book-demo" title="Book a Demo" description={description} />
      <JsonLd
        data={[
          webPageSchema({ name: "Book a Demo", description, path: "/book-demo" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Book a demo", path: "/book-demo" },
          ]),
        ]}
      />
      <main className="pb-16">
        <section className="section">
          <div className="section-inner max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-purple/20 mb-4">
                <Calendar className="w-4 h-4 text-electric-purple" />
                <span className="text-sm text-electric-purple font-medium">Book a Demo</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-50 mb-3 md:mb-4 title-3d">
                Pick a time that{" "}
                <span className="text-neon-cyan">works for you</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto px-1">
                Schedule a personalized demo and see how websites, AI receptionists, and automation
                capture leads and fill your calendar—without extra headcount.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <motion.aside
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-4 order-2 lg:order-1"
              >
                <div className="rounded-2xl border border-slate-800/70 bg-slate-900/40 p-6 backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-4">
                    <ClipboardList className="w-5 h-5 text-neon-cyan" />
                    <h2 className="text-lg font-semibold text-slate-50">What to prepare</h2>
                  </div>
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                    A little context helps us recommend a realistic website and automation setup
                    without over-building.
                  </p>
                  <ul className="space-y-3">
                    {STRATEGY_CALL_PREPARE_ITEMS.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-slate-200 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs text-slate-500 leading-relaxed">
                    Prefer email first?{" "}
                    <Link to="/contact" className="text-neon-cyan hover:underline">
                      Contact us
                    </Link>
                    .
                  </p>
                </div>
              </motion.aside>

              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="lg:col-span-8 order-1 lg:order-2"
              >
                <div className="rounded-2xl border border-slate-800/70 bg-slate-900/40 p-3 sm:p-4 backdrop-blur-md overflow-hidden">
                  <CalInlineEmbed />
                </div>
                <p className="mt-4 text-center text-sm text-slate-500">
                  Scheduler not loading?{" "}
                  <a
                    href={CAL_COM_EMBED.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-neon-cyan hover:underline"
                  >
                    Open the booking page
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                  </a>
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
