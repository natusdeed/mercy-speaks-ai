import { motion } from "framer-motion";
import { Zap, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BookingLink } from "@/components/cta/booking-link";

export function WebsiteBenefits() {
  const benefits = [
    {
      icon: Zap,
      title: "Built Faster",
      description: "AI accelerates development, so you get your website in days, not months.",
    },
    {
      icon: DollarSign,
      title: "More Affordable",
      description: "Smart AI tools mean lower costs—high-quality websites without high agency prices.",
    },
    {
      icon: Clock,
      title: "Smarter Solutions",
      description: "Modern websites designed to convert visitors into customers and grow your business.",
    },
  ];

  return (
    <section className="section relative overflow-hidden">
      <div className="section-inner relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-50 mb-4">
            We Build Your Website{" "}
            <span className="text-neon-cyan">Faster, Smarter, and More Affordably</span>{" "}
            Using AI
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-6">
            So you can focus on your business—not building websites. We use modern AI tools to deliver 
            professional websites that help small businesses, local businesses, and churches grow their 
            online presence without breaking the bank.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card hover:shadow-md transition-shadow group"
              >
                <div className="p-3 rounded-lg bg-electric-purple/20 w-fit mb-4">
                  <Icon className="w-6 h-6 text-electric-purple" />
                </div>
                <h3 className="text-xl font-bold text-slate-50 mb-2">{benefit.title}</h3>
                <p className="text-slate-400">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button variant="primary" size="lg" asChild className="group/btn">
            <BookingLink className="flex items-center gap-3">
              Book Demo
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </BookingLink>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
