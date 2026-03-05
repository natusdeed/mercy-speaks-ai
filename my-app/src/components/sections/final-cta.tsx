import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section
      className="section relative overflow-hidden bg-slate-950"
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
            Ready to Stop Missing Leads?
          </h2>
          <p className="text-lg text-slate-400 mb-6">
            Book a demo. See how AI can answer your calls, book appointments, and follow up—without hiring more staff.
          </p>

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
              className="w-full sm:w-auto"
            >
              <Link to="/book-demo" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Book Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          <p className="mt-4 text-sm text-slate-500">
            No credit card required • 48-hour setup • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
