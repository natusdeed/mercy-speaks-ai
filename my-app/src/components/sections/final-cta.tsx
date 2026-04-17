import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingLink } from "@/components/cta/booking-link";

interface FinalCTAProps {
  title?: string;
  description?: string;
}

export function FinalCTA({
  title = "Ready to Stop Missing Leads?",
  description = "Book a demo. See how AI can answer your calls, book appointments, and follow up—without hiring more staff.",
}: FinalCTAProps) {
  return (
    <section
      className="section relative overflow-hidden bg-slate-950 pb-[max(2rem,env(safe-area-inset-bottom,0px))]"
      aria-labelledby="final-cta-title"
    >
      <div className="section-inner relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2
            id="final-cta-title"
            className="text-3xl md:text-4xl font-bold text-slate-50 mb-3"
          >
            {title}
          </h2>
          <p className="text-lg text-slate-400 mb-6">{description}</p>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              asChild
              className="w-full sm:w-auto min-h-[48px]"
            >
              <BookingLink className="flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Book Demo
                <ArrowRight className="w-5 h-5" />
              </BookingLink>
            </Button>
          </motion.div>

          <p className="mt-4 text-sm text-slate-500">
            No credit card required • Guided onboarding • Terms reviewed on your call
          </p>
        </motion.div>
      </div>
    </section>
  );
}
