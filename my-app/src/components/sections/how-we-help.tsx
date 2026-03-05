import { motion } from "framer-motion";
import { Globe, Phone, Zap, Database, MessageSquare, Calendar, Star, Workflow, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HowWeHelp() {
  const services = [
    {
      icon: Phone,
      title: "AI Phone Receptionist",
      description: "24/7 AI receptionist that never misses a call",
      href: "/services/ai-phone-receptionist",
      color: "neon-cyan",
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      description: "Automate repetitive tasks and business processes",
      href: "/services/workflow-automation",
      color: "electric-purple",
    },
    {
      icon: MessageSquare,
      title: "Website Chatbot",
      description: "AI chatbot that answers questions and captures leads",
      href: "/services/website-chatbot",
      color: "neon-cyan",
    },
    {
      icon: Database,
      title: "RAG Data Systems",
      description: "AI-powered knowledge base for your business",
      href: "/services/rag-data",
      color: "electric-purple",
    },
    {
      icon: Calendar,
      title: "Appointment Automation",
      description: "Automate scheduling and reduce no-shows",
      href: "/services/appointment-automation",
      color: "neon-cyan",
    },
    {
      icon: Star,
      title: "Review Generation",
      description: "Automatically generate and manage customer reviews",
      href: "/services/review-generation",
      color: "electric-purple",
    },
  ];

  return (
    <section className="section relative overflow-hidden">
      <div className="section-inner relative z-10 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            How We Help <span className="text-neon-cyan">Your Business</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            We install digital employees and smart business systems that automate your operations, 
            integrate your tools, and scale your growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card hover:shadow-md transition-shadow group"
              >
                <div className={`p-3 rounded-lg w-fit mb-4 ${
                  service.color === "electric-purple" 
                    ? "bg-electric-purple/20" 
                    : "bg-neon-cyan/20"
                }`}>
                  <Icon className={`w-6 h-6 ${
                    service.color === "electric-purple" 
                      ? "text-electric-purple" 
                      : "text-neon-cyan"
                  }`} />
                </div>
                <h3 className="card-title text-slate-50 mb-2">{service.title}</h3>
                <p className="card-body text-slate-400 mb-4">{service.description}</p>
                <Link
                  to={service.href}
                  className={`text-sm font-medium flex items-center gap-1 group/link ${
                    service.color === "electric-purple"
                      ? "text-electric-purple hover:text-electric-purple/80"
                      : "text-neon-cyan hover:text-neon-cyan/80"
                  }`}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Button variant="outline" size="lg" asChild>
            <Link to="/services">
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
