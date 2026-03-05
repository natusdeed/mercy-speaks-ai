import { motion } from "framer-motion";
import { Bot, Zap, Clock, Database, Workflow, MessageSquare } from "lucide-react";
import { CheckCircle2 } from "lucide-react";

export function WhatAreDigitalEmployees() {
  const digitalEmployees = [
    {
      icon: Bot,
      title: "AI Systems",
      description: "Intelligent systems that understand your business and make decisions autonomously.",
      examples: [
        "AI phone receptionists that never miss a call",
        "Smart chatbots that answer customer questions",
        "Automated lead qualification systems",
      ],
      color: "electric-purple",
    },
    {
      icon: Zap,
      title: "Automations",
      description: "Workflows that eliminate repetitive tasks and manual processes.",
      examples: [
        "Automated appointment scheduling and reminders",
        "Review generation and management",
        "Data entry and synchronization",
      ],
      color: "neon-cyan",
    },
    {
      icon: Clock,
      title: "24/7 Digital Workers",
      description: "Always-on systems that work around the clock without breaks or overtime.",
      examples: [
        "Round-the-clock customer support",
        "Continuous lead capture and nurturing",
        "Automated follow-ups and communications",
      ],
      color: "electric-purple",
    },
  ];

  const benefits = [
    "Save time on repetitive tasks",
    "Reduce operational costs",
    "Scale without hiring more staff",
    "Work 24/7 without overtime pay",
    "Eliminate human error",
    "Improve customer response times",
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
          <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            What Are{" "}
            <span className="text-neon-cyan">
              Digital Employees?
            </span>
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-slate-300 max-w-3xl mx-auto">
            Digital employees are AI-powered systems, automations, and smart workflows that handle 
            your business tasks automatically—working tirelessly, accurately, and cost-effectively.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {digitalEmployees.map((employee, index) => {
            const Icon = employee.icon;
            return (
              <motion.div
                key={employee.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card group"
              >
                <div className={`p-4 rounded-xl w-fit mb-4 ${
                  employee.color === "electric-purple" 
                    ? "bg-electric-purple/20" 
                    : "bg-neon-cyan/20"
                }`}>
                  <Icon className={`w-8 h-8 ${
                    employee.color === "electric-purple" 
                      ? "text-electric-purple" 
                      : "text-neon-cyan"
                  }`} />
                </div>
                <h3 className="card-title text-slate-50 mb-2">{employee.title}</h3>
                <p className="card-body text-slate-300 mb-4">{employee.description}</p>
                <div className="space-y-2">
                  {employee.examples.map((example, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        employee.color === "electric-purple" 
                          ? "text-electric-purple" 
                          : "text-neon-cyan"
                      }`} />
                      <span className="text-sm text-slate-400">{example}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-slate-50 mb-4 text-center">
            Why Digital Employees?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-neon-cyan mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
