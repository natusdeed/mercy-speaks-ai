"use client";

import { motion } from "framer-motion";
import { Quote, ArrowRight, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingLink } from "@/components/cta/booking-link";

export interface Testimonial {
  id: string;
  clientName: string;
  businessName?: string;
  roleTitle?: string;
  quote: string;
  /** Optional avatar/logo image URL (local or remote) */
  imageUrl?: string;
}

interface TestimonialsProps {
  items?: Testimonial[];
}

export function Testimonials({ items }: TestimonialsProps) {
  const testimonials = (items ?? []).slice(0, 6);

  return (
    <section className="section relative overflow-hidden" aria-labelledby="testimonials-title">
      <div className="section-inner relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="text-center mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 mb-4">
            <Quote className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-slate-300 font-medium">
              Client Feedback
            </span>
          </div>
          <h2 id="testimonials-title" className="text-3xl md:text-4xl font-bold text-slate-50 mb-3">
            What clients say about our website work
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto">
            We only publish real testimonials. References are available on request.
          </p>
        </motion.div>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {testimonials.map((t, index) => (
              <motion.article
                key={t.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="card-premium flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-center justify-center shrink-0">
                      {t.imageUrl ? (
                        <img
                          src={t.imageUrl}
                          alt={`${t.clientName} avatar`}
                          className="h-full w-full object-cover rounded-xl"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <MessageSquareText className="h-5 w-5 text-neon-cyan" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-slate-50 font-semibold leading-tight truncate">
                        {t.clientName}
                      </p>
                      <p className="text-slate-400 text-sm leading-tight truncate">
                        {[t.roleTitle, t.businessName].filter(Boolean).join(" • ")}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed flex-1">
                  “{t.quote}”
                </p>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="card-premium text-center max-w-3xl mx-auto">
            <p className="text-slate-300">
              We don’t publish unverified quotes. If you want references for similar website projects, book a call and we’ll share them where appropriate.
            </p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button variant="primary" size="lg" asChild className="w-full sm:w-auto">
            <BookingLink className="flex items-center justify-center gap-2">
              Book a Website Strategy Call
              <ArrowRight className="w-5 h-5" />
            </BookingLink>
          </Button>
          <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
            <a href="#portfolio" className="flex items-center justify-center gap-2">
              View Website Work
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
