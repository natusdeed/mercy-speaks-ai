import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Zap,
  Users,
  Phone,
  Mail,
  Video,
} from "lucide-react";
import { z } from "zod";
import { Link } from "react-router-dom";

const demoFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().min(2, "Company name is required"),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  interestedIn: z.array(z.string()).min(1, "Please select at least one service"),
  message: z.string().optional(),
});

type DemoFormData = z.infer<typeof demoFormSchema>;

export default function BookDemoPage() {
  const [formData, setFormData] = useState<DemoFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    preferredDate: "",
    preferredTime: "",
    interestedIn: [],
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof DemoFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    "AI Phone Receptionist",
    "Website Chatbot",
    "Appointment Automation",
    "Review Generation",
    "Custom Automation",
  ];

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof DemoFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const current = prev.interestedIn || [];
      const updated = current.includes(service)
        ? current.filter((s) => s !== service)
        : [...current, service];
      return { ...prev, interestedIn: updated };
    });
    if (errors.interestedIn) {
      setErrors((prev) => ({ ...prev, interestedIn: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = demoFormSchema.parse(formData);
      // In a real app, you'd send this to your API/calendar system
      console.log("Demo booking submitted:", validatedData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof DemoFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof DemoFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="pb-16">
        <section className="py-16 md:py-24 px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-purple/20 border border-electric-purple/30 mb-6">
                <Calendar className="w-4 h-4 text-electric-purple" />
                <span className="text-sm text-electric-purple font-medium">Book a Demo</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 mb-6 title-3d">
                See It In{" "}
                <span className="bg-gradient-to-r from-electric-purple to-neon-cyan bg-clip-text text-transparent">
                  Action
                </span>
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                Schedule a personalized demo and discover how AI automation can transform your
                business operations and save you thousands per month.
              </p>
            </motion.div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-12 text-center border border-neon-cyan/30"
              >
                <CheckCircle2 className="w-16 h-16 text-neon-cyan mx-auto mb-4" />
                <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">Demo Scheduled!</h2>
                <p className="text-slate-400 mb-6">
                  We've received your request and will confirm your demo time via email within 24
                  hours.
                </p>
                <p className="text-slate-400 mb-8">
                  In the meantime, feel free to explore our{" "}
                  <Link to="/portfolio" className="text-neon-cyan hover:underline">
                    case studies
                  </Link>{" "}
                  or{" "}
                  <Link to="/contact" className="text-neon-cyan hover:underline">
                    contact us
                  </Link>{" "}
                  if you have any questions.
                </p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)} className="px-8 py-4 text-lg font-bold">
                  Book Another Demo
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Benefits Sidebar */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="glass rounded-xl p-6 border border-slate-800/50">
                    <Video className="w-6 h-6 text-electric-purple mb-4" />
                    <h3 className="text-lg font-semibold text-slate-50 mb-2">Live Demo</h3>
                    <p className="text-slate-400 text-sm">
                      See our AI solutions in action with a personalized live demonstration.
                    </p>
                  </div>

                  <div className="glass rounded-xl p-6 border border-slate-800/50">
                    <Clock className="w-6 h-6 text-neon-cyan mb-4" />
                    <h3 className="text-lg font-semibold text-slate-50 mb-2">30 Minutes</h3>
                    <p className="text-slate-400 text-sm">
                      Quick and focused demo tailored to your business needs.
                    </p>
                  </div>

                  <div className="glass rounded-xl p-6 border border-slate-800/50">
                    <Zap className="w-6 h-6 text-electric-purple mb-4" />
                    <h3 className="text-lg font-semibold text-slate-50 mb-2">No Commitment</h3>
                    <p className="text-slate-400 text-sm">
                      Explore our solutions with zero pressure or obligation.
                    </p>
                  </div>

                  <div className="glass rounded-xl p-6 border border-slate-800/50">
                    <Users className="w-6 h-6 text-neon-cyan mb-4" />
                    <h3 className="text-lg font-semibold text-slate-50 mb-2">
                      Expert Guidance
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Get personalized recommendations from our automation specialists.
                    </p>
                  </div>
                </motion.div>

                {/* Demo Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="lg:col-span-2"
                >
                  <div className="glass rounded-2xl p-8 md:p-12 border border-slate-800/50">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6">Schedule Your Demo</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-slate-300 mb-2"
                          >
                            Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                              errors.name
                                ? "border-red-500"
                                : "border-slate-700 focus:border-neon-cyan"
                            } text-slate-50 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-colors`}
                            placeholder="Your name"
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-300 mb-2"
                          >
                            Email <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                              errors.email
                                ? "border-red-500"
                                : "border-slate-700 focus:border-neon-cyan"
                            } text-slate-50 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-colors`}
                            placeholder="your@email.com"
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-slate-300 mb-2"
                          >
                            Phone <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                              errors.phone
                                ? "border-red-500"
                                : "border-slate-700 focus:border-neon-cyan"
                            } text-slate-50 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-colors`}
                            placeholder="(703) 332-5956"
                          />
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="company"
                            className="block text-sm font-medium text-slate-300 mb-2"
                          >
                            Company <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                              errors.company
                                ? "border-red-500"
                                : "border-slate-700 focus:border-neon-cyan"
                            } text-slate-50 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-colors`}
                            placeholder="Your company"
                          />
                          {errors.company && (
                            <p className="mt-1 text-sm text-red-400">{errors.company}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="preferredDate"
                            className="block text-sm font-medium text-slate-300 mb-2"
                          >
                            Preferred Date <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="date"
                            id="preferredDate"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            min={getMinDate()}
                            className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                              errors.preferredDate
                                ? "border-red-500"
                                : "border-slate-700 focus:border-neon-cyan"
                            } text-slate-50 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-colors`}
                          />
                          {errors.preferredDate && (
                            <p className="mt-1 text-sm text-red-400">{errors.preferredDate}</p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="preferredTime"
                            className="block text-sm font-medium text-slate-300 mb-2"
                          >
                            Preferred Time <span className="text-red-400">*</span>
                          </label>
                          <select
                            id="preferredTime"
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                              errors.preferredTime
                                ? "border-red-500"
                                : "border-slate-700 focus:border-neon-cyan"
                            } text-slate-50 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-colors`}
                          >
                            <option value="">Select a time</option>
                            {timeSlots.map((time) => (
                              <option key={time} value={time} className="bg-slate-900">
                                {time} CST
                              </option>
                            ))}
                          </select>
                          {errors.preferredTime && (
                            <p className="mt-1 text-sm text-red-400">{errors.preferredTime}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                          Interested In <span className="text-red-400">*</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {services.map((service) => (
                            <button
                              key={service}
                              type="button"
                              onClick={() => handleServiceToggle(service)}
                              className={`px-4 py-3 rounded-lg border text-left transition-colors ${
                                formData.interestedIn?.includes(service)
                                  ? "bg-electric-purple/20 border-electric-purple text-slate-50"
                                  : "bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-600"
                              }`}
                            >
                              {service}
                            </button>
                          ))}
                        </div>
                        {errors.interestedIn && (
                          <p className="mt-1 text-sm text-red-400">{errors.interestedIn}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-slate-300 mb-2"
                        >
                          Additional Information
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-neon-cyan text-slate-50 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-colors resize-none"
                          placeholder="Tell us about your current challenges or specific use cases..."
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="glow"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? (
                          "Scheduling..."
                        ) : (
                          <>
                            Schedule Demo
                            <Calendar className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}