import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function ServiceWebsiteDesign() {
  return (
    <div className="min-h-screen bg-slate-950">
      <main className="py-16 md:py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Globe className="w-16 h-16 text-neon-cyan mx-auto mb-4" />
            <h1 className="text-5xl md:text-6xl font-bold text-slate-50 mb-6">
              AI-Powered Website Design
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Modern, mobile-friendly websites built fast using AI
            </p>
            <Button variant="glow" size="lg" asChild>
              <Link to="/book-demo">Book a Demo</Link>
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
