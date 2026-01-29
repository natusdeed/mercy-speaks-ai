import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Workflow,
  CheckCircle2,
  ArrowRight,
  Zap,
  Database,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AutomationStep {
  id: number;
  title: string;
  description: string;
  status: "pending" | "active" | "completed";
  delay: number;
}

const AUTOMATION_STEPS: AutomationStep[] = [
  {
    id: 1,
    title: "Lead Captured",
    description: "New lead enters CRM system",
    status: "completed",
    delay: 500,
  },
  {
    id: 2,
    title: "Data Enrichment",
    description: "AI enriches lead with company data",
    status: "completed",
    delay: 1500,
  },
  {
    id: 3,
    title: "Lead Scoring",
    description: "Automated scoring based on fit",
    status: "active",
    delay: 2500,
  },
  {
    id: 4,
    title: "Task Creation",
    description: "Sales task automatically created",
    status: "pending",
    delay: 3500,
  },
  {
    id: 5,
    title: "Notification Sent",
    description: "Sales team notified via Slack",
    status: "pending",
    delay: 4500,
  },
  {
    id: 6,
    title: "Follow-up Scheduled",
    description: "AI schedules optimal follow-up time",
    status: "pending",
    delay: 5500,
  },
];

export default function WorkflowAutomationPage() {
  const [steps, setSteps] = useState<AutomationStep[]>(
    AUTOMATION_STEPS.map((s) => ({ ...s, status: "pending" as const }))
  );
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    steps.forEach((step) => {
      const timer = setTimeout(() => {
        setSteps((prev) =>
          prev.map((s) =>
            s.id === step.id
              ? { ...s, status: step.status === "pending" ? "active" : step.status }
              : s
          )
        );

        // Mark previous step as completed and next as active
        setTimeout(() => {
          setSteps((prev) =>
            prev.map((s) => {
              if (s.id === step.id) {
                return { ...s, status: "completed" };
              }
              if (s.id === step.id + 1 && step.status !== "pending") {
                return { ...s, status: "active" };
              }
              return s;
            })
          );
        }, 800);
      }, step.delay);

      return () => clearTimeout(timer);
    });
  }, [isRunning]);

  const startDemo = () => {
    setSteps(AUTOMATION_STEPS.map((s) => ({ ...s, status: "pending" })));
    setIsRunning(true);

    // Reset after completion
    setTimeout(() => {
      setIsRunning(false);
    }, 8000);
  };

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/20 border border-neon-cyan/30 mb-6">
              <Workflow className="w-4 h-4 text-neon-cyan" />
              <span className="text-sm text-neon-cyan font-medium">
                Workflow Automation
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 mb-6 title-3d">
              Automate Your{" "}
              <span className="bg-gradient-to-r from-neon-cyan to-electric-purple bg-clip-text text-transparent">
                Business Processes
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Connect your tools, eliminate manual work, and let AI handle repetitive tasks
              so your team can focus on what matters most.
            </p>
            <Button variant="glow" size="lg" onClick={startDemo} className="px-8 py-4 text-lg font-bold">
              See It in Action
            </Button>
          </motion.div>

          {/* Animated List Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/1 to-electric-purple/1 opacity-5" />
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold text-slate-50 mb-8">
                Automated Lead Processing
              </h2>

              {/* Animated Steps List */}
              <div className="space-y-4">
                <AnimatePresence>
                  {steps.map((step, idx) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: step.status === "pending" ? 0.4 : 1,
                        x: 0,
                      }}
                      transition={{ duration: 0.4 }}
                      className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                        step.status === "active"
                          ? "bg-neon-cyan/10 border-neon-cyan/50 glow-cyan"
                          : step.status === "completed"
                          ? "bg-electric-purple/10 border-electric-purple/30"
                          : "bg-slate-900/30 border-slate-800"
                      }`}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {step.status === "completed" ? (
                          <CheckCircle2 className="w-6 h-6 text-electric-purple" />
                        ) : step.status === "active" ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <Zap className="w-6 h-6 text-neon-cyan" />
                          </motion.div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-slate-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-semibold mb-1 ${
                            step.status === "active"
                              ? "text-neon-cyan"
                              : step.status === "completed"
                              ? "text-electric-purple"
                              : "text-slate-400"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-sm text-slate-400">{step.description}</p>
                      </div>
                      {step.status === "active" && (
                        <ArrowRight className="w-5 h-5 text-neon-cyan hover:scale-105 transition-transform" />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "10x Faster",
                description: "Process workflows in seconds, not hours",
                colorClass: "text-neon-cyan",
              },
              {
                icon: Database,
                title: "Zero Errors",
                description: "Eliminate human mistakes from repetitive tasks",
                colorClass: "text-electric-purple",
              },
              {
                icon: BarChart3,
                title: "Full Visibility",
                description: "Track every automation with detailed analytics",
                colorClass: "text-neon-cyan",
              },
            ].map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                className="glass rounded-xl p-6 text-center"
              >
                <benefit.icon
                  className={`w-12 h-12 ${benefit.colorClass} mx-auto mb-4`}
                />
                <h3 className="text-xl font-semibold text-slate-50 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
          </div>
        </section>
      </main>
    </div>
  );
}
