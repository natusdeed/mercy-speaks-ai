import { motion } from "framer-motion";
import { Phone, Clock, Globe, Zap, CheckCircle2, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VoiceAgentsPage() {
  const features = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Never miss a call. Your AI receptionist works around the clock.",
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Communicate with customers in their preferred language.",
    },
    {
      icon: Zap,
      title: "Instant Response",
      description: "Zero wait times. Customers get immediate assistance.",
    },
    {
      icon: Phone,
      title: "Natural Conversations",
      description: "Human-like interactions powered by advanced AI.",
    },
  ];

  const useCases = [
    "Answering frequently asked questions",
    "Scheduling appointments and consultations",
    "Qualifying leads and gathering information",
    "Routing calls to the right department",
    "Providing product information and pricing",
    "Handling after-hours inquiries",
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-purple/20 border border-electric-purple/30 mb-6">
              <Phone className="w-4 h-4 text-electric-purple" />
              <span className="text-sm text-electric-purple font-medium">
                Voice Agents
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 mb-6 title-3d">
              24/7 AI{" "}
              <span className="bg-gradient-to-r from-electric-purple to-neon-cyan bg-clip-text text-transparent">
                Receptionist
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Replace your phone support team with intelligent AI agents that never sleep,
              never get tired, and provide consistent, professional service every time.
            </p>
            <Button variant="glow" size="lg" className="px-8 py-4 text-lg font-bold">
              Schedule a Demo
            </Button>
          </motion.div>

          {/* Audio Visualizer Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/1 to-neon-cyan/1 opacity-5" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-8">
                <Volume2 className="w-6 h-6 text-electric-purple" />
                <h2 className="text-2xl font-semibold text-slate-50">
                  Live Audio Visualization
                </h2>
              </div>
              {/* Audio Visualizer - Animated waveform bars */}
              <div className="flex items-end justify-center gap-2 h-32 mb-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 bg-gradient-to-t from-electric-purple to-neon-cyan rounded-full"
                    animate={{
                      height: `${Math.random() * 80 + 20}px`,
                    }}
                    transition={{
                      duration: 0.5 + Math.random() * 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: Math.random() * 0.3,
                    }}
                  />
                ))}
              </div>
              <p className="text-center text-slate-400 text-sm">
                AI processing conversation in real-time
              </p>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass rounded-xl p-6 hover:border-electric-purple/50 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-electric-purple mb-4" />
                <h3 className="text-lg font-semibold text-slate-50 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Use Cases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-slate-50 mb-8">
              What Your AI Receptionist Can Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {useCases.map((useCase, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + idx * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-neon-cyan mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{useCase}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
