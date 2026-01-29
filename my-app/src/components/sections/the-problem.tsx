import { motion } from "framer-motion";
import { PhoneOff, Clock, CalendarX, UserX, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface PainPoint {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  isPurple: boolean;
}

const PAIN_POINTS: PainPoint[] = [
  {
    icon: PhoneOff,
    text: "Missed calls after hours",
    isPurple: true,
  },
  {
    icon: Clock,
    text: "Slow website response",
    isPurple: false,
  },
  {
    icon: CalendarX,
    text: "Manual appointment booking",
    isPurple: true,
  },
  {
    icon: UserX,
    text: "No-shows killing your schedule",
    isPurple: false,
  },
];

export function TheProblem() {
  return (
    <section className="py-16 md:py-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
      
      <div className="max-w-7xl mx-auto relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            Are You Losing Money From...
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {PAIN_POINTS.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.text}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-xl p-6 flex items-center gap-4 hover:border-electric-purple/50 transition-all group"
              >
                <div className={cn(
                  "p-3 rounded-lg",
                  point.isPurple ? "bg-electric-purple/20" : "bg-neon-cyan/20"
                )}>
                  <Icon className={cn(
                    "w-6 h-6",
                    point.isPurple ? "text-electric-purple" : "text-neon-cyan"
                  )} />
                </div>
                <p className="text-lg font-semibold text-slate-50 group-hover:text-neon-cyan transition-colors">
                  {point.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
