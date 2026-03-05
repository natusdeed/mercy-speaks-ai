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
    <div className="card h-full flex flex-col relative overflow-hidden group">
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 rounded-lg bg-electric-purple/20">
            <Code2 className="w-5 h-5 text-electric-purple" />
          </div>
          <h3 className="card-title text-slate-50">
            Powered By Industry Leaders
          </h3>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 shadow-sm hover:bg-slate-800/60 transition-colors group/item"
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

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 pt-4"
        >
          <p className="card-body text-center text-slate-400">
            <span className="text-slate-300 font-medium">Enterprise-grade technology</span>{" "}
            at <span className="text-neon-cyan font-semibold">small business prices</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
