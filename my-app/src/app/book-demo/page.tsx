"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { LeadForm, type LeadFormData } from "@/components/forms/lead-form";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Zap,
  Users,
  Video,
} from "lucide-react";
import { BookingLink } from "@/components/cta/booking-link";
import { getBookingUrl, isExternalBookingUrl } from "@/lib/booking-url";

const API_LEAD = "/api/lead";

export default function BookDemoPage() {
  const bookingUrl = getBookingUrl();
  const externalBooking = isExternalBookingUrl(bookingUrl);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (data: LeadFormData) => {
    setSubmitError(null);
    try {
      console.log("[BookDemo] Submitting lead form", data);
      const res = await fetch(API_LEAD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const message =
          (err && (err.error || err.message)) ||
          "Submission failed. Please try again.";
        console.error(
          "[BookDemo] Server returned error for lead form submission",
          res.status,
          message,
          err
        );
        throw new Error(message);
      }
      console.log("[BookDemo] Lead form submitted successfully");
      setIsSubmitted(true);
    } catch (e) {
      console.error("[BookDemo] Lead form submission failed", e);
      setSubmitError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <main className="pb-16">
        <section className="section">
          <div className="section-inner">
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 mb-3 md:mb-4 title-3d">
                See It In{" "}
                <span className="text-neon-cyan">Action</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto px-1">
                Schedule a personalized demo and discover how AI automation can transform your
                business operations and save you thousands per month.
              </p>
            </motion.div>

            {externalBooking ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card text-center max-w-2xl mx-auto"
              >
                <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-neon-cyan mx-auto mb-4" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-50 mb-4">
                  Book Your Demo
                </h2>
                <p className="text-slate-400 mb-4">
                  We use an external booking tool to schedule demos. Click below to choose a time that
                  works for you.
                </p>
                <div className="mb-6">
                  <BookingLink className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-neon-cyan text-slate-950 font-semibold text-lg shadow-lg hover:bg-neon-cyan/90 transition-colors">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book via our scheduler
                  </BookingLink>
                </div>
                <p className="text-xs text-slate-500 break-all">
                  Booking link:{" "}
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-cyan hover:text-cyan-300 underline"
                  >
                    {bookingUrl}
                  </a>
                </p>
              </motion.div>
            ) : isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card text-center max-w-2xl mx-auto"
              >
                <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-neon-cyan mx-auto mb-4" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-50 mb-4">Demo Scheduled!</h2>
                <p className="text-slate-400 mb-6">
                  We&apos;ve received your request and will confirm your demo time via email within 24
                  hours.
                </p>
                <p className="text-slate-400 mb-8">
                  In the meantime, feel free to explore our{" "}
                  <Link to="/portfolio" className="text-neon-cyan hover:underline">
                    case studies
                  </Link>{" "}
                  or{" "}
                  <Link to="/contact" className="text-neon-cyan hover:underline">
                    contact us
                  </Link>{" "}
                  if you have any questions.
                </p>
                <Button variant="outline" size="lg" onClick={() => setIsSubmitted(false)}>
                  Book Another Demo
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-3 sm:space-y-4 order-2 lg:order-1"
                >
                  <div className="card">
                    <Video className="w-6 h-6 text-electric-purple mb-4" />
                    <h3 className="text-lg font-semibold text-slate-50 mb-2">Live Demo</h3>
                    <p className="text-slate-400 text-sm">
                      See our AI solutions in action with a personalized live demonstration.
                    </p>
                  </div>
                  <div className="card">
                    <Clock className="w-6 h-6 text-neon-cyan mb-4" />
                    <h3 className="text-lg font-semibold text-slate-50 mb-2">30 Minutes</h3>
                    <p className="text-slate-400 text-sm">
                      Quick and focused demo tailored to your business needs.
                    </p>
                  </div>
                  <div className="card">
                    <Zap className="w-6 h-6 text-electric-purple mb-4" />
                    <h3 className="text-lg font-semibold text-slate-50 mb-2">No Commitment</h3>
                    <p className="text-slate-400 text-sm">
                      Explore our solutions with zero pressure or obligation.
                    </p>
                  </div>
                  <div className="card">
                    <Users className="w-6 h-6 text-neon-cyan mb-4" />
                    <h3 className="text-lg font-semibold text-slate-50 mb-2">Expert Guidance</h3>
                    <p className="text-slate-400 text-sm">
                      Get personalized recommendations from our automation specialists.
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
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-50 mb-4 sm:mb-6">Schedule Your Demo</h2>
                    {submitError && (
                      <p className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm" role="alert">
                        {submitError}
                      </p>
                    )}
                    <LeadForm
                      submitLabel="Schedule Demo"
                      submittingLabel="Scheduling..."
                      submitIcon={<Calendar className="w-5 h-5" />}
                      onSubmit={handleSubmit}
                      placeholders={{ message: "Tell us about your challenges or use cases..." }}
                    />
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
