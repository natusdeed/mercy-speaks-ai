"use client";

import { motion } from "framer-motion";
import { Code2, Zap, Brain, Mic, Network } from "lucide-react";
import { cn } from "@/lib/utils";

interface TechItem {
  name: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  bgColor: string;
}

const TECH_STACK: TechItem[] = [
  {
    name: "Make.com",
    description: "Automation Platform",
    icon: <Zap className="w-5 h-5 text-electric-purple" />,
    iconColor: "text-electric-purple",
    bgColor: "bg-electric-purple/20",
  },
  {
    name: "Anthropic Claude",
    description: "Most Advanced AI (Same tech as ChatGPT)",
    icon: <Brain className="w-5 h-5 text-neon-cyan" />,
    iconColor: "text-neon-cyan",
    bgColor: "bg-neon-cyan/20",
  },
  {
    name: "Vapi",
    description: "Natural Voice Technology",
    icon: <Mic className="w-5 h-5 text-electric-purple" />,
    iconColor: "text-electric-purple",
    bgColor: "bg-electric-purple/20",
  },
  {
    name: "LangChain",
    description: "Multi-step AI Reasoning",
    icon: <Network className="w-5 h-5 text-neon-cyan" />,
    iconColor: "text-neon-cyan",
    bgColor: "bg-neon-cyan/20",
  },
];

export function TechStackTile() {
  return (
    <div className="glass rounded-2xl p-6 h-full flex flex-col relative overflow-hidden group">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/1 via-transparent to-neon-cyan/1 opacity-5" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-lg bg-electric-purple/20 backdrop-blur-sm">
            <Code2 className="w-5 h-5 text-electric-purple" />
          </div>
          <h3 className="text-lg font-semibold text-slate-50">
            Powered By Industry Leaders
          </h3>
        </div>

        {/* Tech Stack List */}
        <div className="flex-1 flex flex-col gap-3">
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800/50 hover:border-electric-purple/50 transition-all group/item"
              whileHover={{ scale: 1.02, x: 4 }}
            >
              <motion.div
                className={cn("p-1.5 rounded-md", tech.bgColor, "mt-0.5 relative z-10")}
                whileHover={{ 
                  scale: 1.15,
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.3 }
                }}
              >
                {tech.icon}
              </motion.div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-slate-50 group-hover/item:text-neon-cyan transition-colors">
                  {tech.name}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 pt-4 border-t border-slate-800/50"
        >
          <p className="text-xs text-center text-slate-400">
            <span className="text-slate-300 font-medium">Enterprise-grade technology</span>{" "}
            at <span className="text-neon-cyan font-semibold">small business prices</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
