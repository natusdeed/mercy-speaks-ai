"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { LeadForm, type LeadFormData } from "@/components/forms/lead-form";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { BRAND_TAGLINE } from "@/lib/site-config";
import { breadcrumbSchema, contactPageSchema, organizationSchema, webPageSchema } from "@/lib/schema";

const API_CONTACT = "/api/contact";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (data: LeadFormData) => {
    setSubmitError(null);
    try {
      const res = await fetch(API_CONTACT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Submission failed. Please try again.");
      }
      setIsSubmitted(true);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead
        path="/contact"
        title="Contact"
        description="Contact Mercy Speaks Digital for websites, AI receptionists, and business automation. Email, phone, or send a message—we reply to real inquiries."
      />
      <JsonLd
        data={[
          organizationSchema(),
          webPageSchema({
            name: "Contact Mercy Speaks Digital",
            description: BRAND_TAGLINE,
            path: "/contact",
          }),
          contactPageSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <main className="pb-16">
        <section className="section">
          <div className="section-inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/20 mb-4">
                <MessageSquare className="w-4 h-4 text-neon-cyan" />
                <span className="text-sm text-neon-cyan font-medium">Get in Touch</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 mb-3 md:mb-4 title-3d">
                Let&apos;s{" "}
                <span className="text-neon-cyan">Talk</span>
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed text-slate-300 max-w-3xl mx-auto px-1">
                Questions about a website build, AI receptionist, or automation roadmap? Send a note—we reply to real
                business inquiries, fast.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-3 sm:space-y-4 order-2 lg:order-1"
              >
                <div className="card">
                  <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-electric-purple mb-4" />
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-50 mb-2">Location</h2>
                  <p className="text-base sm:text-lg md:text-xl text-slate-300">
                    Richmond, Texas 77407
                    <br />
                    Houston Metro Area
                  </p>
                </div>
                <div className="card">
                  <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-neon-cyan mb-4" />
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-50 mb-2">Phone</h2>
                  <a
                    href="tel:7033325956"
                    className="text-base sm:text-lg md:text-xl text-slate-300 hover:text-neon-cyan transition-colors"
                  >
                    (703) 332-5956
                  </a>
                </div>
                <div className="card">
                  <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-electric-purple mb-4" />
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-50 mb-2">Email</h2>
                  <a
                    href="mailto:don@mercyspeaksdigital.com"
                    className="text-base sm:text-lg md:text-xl text-slate-300 hover:text-neon-cyan transition-colors break-all"
                  >
                    don@mercyspeaksdigital.com
                  </a>
                </div>
                <div className="card">
                  <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-neon-cyan mb-4" />
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-50 mb-2">Business Hours</h2>
                  <p className="text-base sm:text-lg md:text-xl text-slate-300">
                    Monday - Friday: 9:00 AM - 6:00 PM CST
                    <br />
                    Saturday - Sunday: By Appointment
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-2 order-1 lg:order-2"
              >
                <div className="card">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10 sm:py-12"
                    >
                      <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-neon-cyan mx-auto mb-4" />
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-50 mb-2">Message Sent!</h2>
                      <p className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-300 mb-6">
                        We&apos;ll get back to you within 24 hours.
                      </p>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-50 mb-4 sm:mb-6">Send Us a Message</h2>
                      {submitError && (
                        <p className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm" role="alert">
                          {submitError}
                        </p>
                      )}
                      <LeadForm
                        submitLabel="Send Message"
                        submittingLabel="Sending..."
                        submitIcon={<Send className="w-5 h-5" />}
                        onSubmit={handleSubmit}
                        placeholders={{ message: "Tell us about your business and how we can help..." }}
                      />
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
