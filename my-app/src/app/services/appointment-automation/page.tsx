import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Zap,
  CheckCircle2,
  Bell,
  RefreshCw,
  Users,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AppointmentAutomationPage() {
  const features = [
    {
      icon: Clock,
      title: "24/7 Scheduling",
      description: "Customers can book appointments anytime, anywhere—even outside business hours.",
    },
    {
      icon: Zap,
      title: "Instant Confirmations",
      description: "Automated confirmations via email and SMS keep everyone informed and reduce no-shows.",
    },
    {
      icon: RefreshCw,
      title: "Smart Rescheduling",
      description: "Easy rescheduling and cancellation with automatic calendar updates and notifications.",
    },
    {
      icon: Bell,
      title: "Automated Reminders",
      description: "Reduce no-shows with automated reminders sent 24 hours and 1 hour before appointments.",
    },
    {
      icon: Users,
      title: "Multi-User Support",
      description: "Manage multiple team members, resources, and locations from one unified system.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Track booking trends, no-show rates, and revenue to optimize your scheduling.",
    },
  ];

  const capabilities = [
    "Accept appointments 24/7 through website, phone, or chatbot",
    "Automatically check availability across multiple calendars",
    "Send confirmation emails and SMS messages",
    "Set up automated reminder notifications",
    "Handle rescheduling and cancellations automatically",
    "Sync with Google Calendar, Outlook, and other calendars",
    "Manage multiple staff members and resources",
    "Set custom booking rules and availability windows",
    "Collect payment deposits during booking",
    "Generate appointment reports and analytics",
  ];

  const benefits = [
    {
      stat: "50%",
      description: "Reduction in no-shows",
    },
    {
      stat: "3x",
      description: "More bookings captured",
    },
    {
      stat: "10 hours",
      description: "Saved per week on admin",
    },
    {
      stat: "100%",
      description: "Automated reminders",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <main>
        {/* Hero Section */}
        <section className="section">
          <div className="section-inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-purple/20 mb-6">
                <Calendar className="w-4 h-4 text-electric-purple" />
                <span className="text-sm text-electric-purple font-medium">
                  Appointment Automation
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 mb-6 title-3d">
                Automated{" "}
                <span className="text-neon-cyan">Appointment Scheduling</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-slate-300 max-w-3xl mx-auto mb-8">
                Stop playing phone tag. Automate your entire booking process with intelligent
                scheduling that works 24/7, reduces no-shows, and frees up hours of admin time
                every week.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg" asChild>
                  <Link to="/book-demo">Schedule a Demo</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </motion.div>

            {/* Benefits Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                  className="card text-center transition-colors"
                >
                  <div className="text-5xl md:text-6xl font-bold text-neon-cyan mb-2">
                    {benefit.stat}
                  </div>
                  <div className="text-base md:text-lg text-slate-300">{benefit.description}</div>
                </motion.div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  className="card hover:shadow-md transition-shadow"
                >
                  <feature.icon className="w-8 h-8 text-electric-purple mb-4" />
                  <h3 className="text-lg font-semibold text-slate-50 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Capabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="card mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-8">
                Complete Booking Automation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {capabilities.map((capability, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + idx * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-neon-cyan mt-0.5 flex-shrink-0" />
                    <span className="text-lg md:text-xl text-slate-300">{capability}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="card mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-8 text-center">
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    step: "1",
                    title: "Customer Requests",
                    description: "Via phone, website, or chatbot",
                  },
                  {
                    step: "2",
                    title: "AI Checks Availability",
                    description: "Real-time calendar synchronization",
                  },
                  {
                    step: "3",
                    title: "Automated Booking",
                    description: "Instant confirmation sent",
                  },
                  {
                    step: "4",
                    title: "Smart Reminders",
                    description: "Reduces no-shows automatically",
                  },
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + idx * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-neon-cyan/80 flex items-center justify-center text-2xl font-bold text-slate-950 mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-50 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-400">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-center"
            >
              <div className="card max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
                  Ready to Automate Your Scheduling?
                </h2>
                <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-8">
                  Save hours every week and never miss another booking opportunity.
                </p>
                <Button variant="primary" size="lg" asChild>
                  <Link to="/book-demo">Schedule a Demo</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}