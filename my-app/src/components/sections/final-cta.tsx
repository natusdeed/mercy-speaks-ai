"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="py-16 md:py-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/2 via-transparent to-neon-cyan/2" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-purple/1 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-cyan/1 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6">
            Ready to Get Your Website?
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 mb-12">
            Join small businesses, local businesses, and churches who are growing their online 
            presence with modern websites built faster, smarter, and more affordably using AI.
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="glow"
              size="lg"
              asChild
              className="px-8 py-4 text-lg font-bold group/btn"
            >
              <Link to="/book-demo" className="flex items-center gap-2">
                Get Your Website
                <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="px-8 py-4 text-lg font-bold group/btn"
            >
              <Link to="/book-demo">
                Book a Free Strategy Call
              </Link>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-sm text-slate-500"
          >
            No credit card required • Setup in 48 hours • Cancel anytime
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
