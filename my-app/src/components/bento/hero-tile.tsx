import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowRight, Star, CheckCircle2, Clock, Shield, Phone, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroTile() {
  const scrollToCalculator = () => {
    const calculator = document.getElementById("roi-calculator");
    if (calculator) {
      calculator.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (!titleRef.current) return;
    const rect = titleRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  };

  return (
    <div className="glass rounded-2xl p-8 md:p-12 h-full flex flex-col justify-between relative overflow-hidden group">
      {/* Aceternity-style Hero Highlight Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/2 via-transparent to-neon-cyan/2 opacity-5 group-hover:opacity-[7.5%] transition-opacity" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-electric-purple/1 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-cyan/1 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.6 }}
          className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 pb-4 border-b border-slate-800/50"
        >
          <div className="flex items-center gap-2 text-sm md:text-base">
            <Star className="w-4 h-4 text-electric-purple fill-electric-purple" />
            <span className="text-slate-300">
              <span className="text-slate-50 font-semibold">4.9/5</span> from{" "}
              <span className="text-neon-cyan font-semibold">47+ Houston businesses</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-base">
            <CheckCircle2 className="w-4 h-4 text-neon-cyan" />
            <span className="text-slate-300">48-Hour Setup</span>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-base">
            <CheckCircle2 className="w-4 h-4 text-neon-cyan" />
            <span className="text-slate-300">No Setup Fees</span>
          </div>
        </motion.div>

        {/* Pricing Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6"
        >
          <div className="pricing-badge inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-yellow-500/10 via-yellow-500/5 to-transparent border border-yellow-500/30 backdrop-blur-sm hover:border-yellow-500/50 hover:bg-yellow-500/15 transition-all group/badge">
            <span className="text-lg">💰</span>
            <span className="text-base md:text-lg font-semibold text-slate-50">
              Starting at $197/month
            </span>
            <Link
              to="/pricing"
              className="text-sm md:text-base text-neon-cyan hover:text-electric-purple font-medium flex items-center gap-1 transition-colors group-hover/badge:gap-2"
            >
              See all plans
              <ArrowRight className="w-4 h-4 group-hover/badge:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Main Headline */}
          <motion.h1
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight title-3d-beautiful relative cursor-default"
          >
            We Install<br />Digital<br />Employees
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl leading-relaxed text-slate-300 mb-8 max-w-3xl font-medium"
          >
            Mercy Speaks Digital installs{" "}
            <span className="text-neon-cyan font-bold">AI-powered systems, automation, and 24/7 digital workers</span>{" "}
            that run your business for you—saving time, saving money, and scaling while you sleep.
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0.6 }}
            >
              <Button
                variant="glow"
                size="lg"
                asChild
                className="w-full sm:w-auto text-lg md:text-xl px-8 py-4 rounded-xl group/btn hover:shadow-xl transition-shadow min-h-[48px]"
              >
                <Link to="/book-demo" className="flex items-center justify-center gap-3">
                  <Phone className="w-5 h-5 md:w-6 md:h-6" />
                  Book a Demo
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover/btn:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full sm:w-auto text-lg md:text-xl px-8 py-4 rounded-xl border-2 border-slate-700 hover:border-electric-purple/50 hover:bg-slate-900/50 transition-all min-h-[48px]"
              >
                <Link to="/book-demo">
                  Get Started
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Guarantee */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-sm md:text-base text-slate-400 flex items-center gap-2"
          >
            <Shield className="w-4 h-4 text-neon-cyan" />
            <span>30-day money-back guarantee • No contracts</span>
          </motion.p>
        </div>
      </div>
    </div>
  );
}
