"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = contactSchema.parse(formData);
      // In a real app, you'd send this to your API
      console.log("Form submitted:", validatedData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="pb-16">
        <section className="py-16 md:py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/20 border border-neon-cyan/30 mb-6">
                <MessageSquare className="w-4 h-4 text-neon-cyan" />
                <span className="text-sm text-neon-cyan font-medium">Get in Touch</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 mb-6 title-3d">
                Let's{" "}
                <span className="bg-gradient-to-r from-neon-cyan to-electric-purple bg-clip-text text-transparent">
                  Talk
                </span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-slate-300 max-w-3xl mx-auto mb-8">
                Have questions? Want to see a demo? We're here to help you transform your business
                with AI automation.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="glass rounded-xl p-8 md:p-10 border border-slate-800/50">
                  <MapPin className="w-8 h-8 text-electric-purple mb-4" />
                  <h3 className="text-xl md:text-2xl font-semibold text-slate-50 mb-2">Location</h3>
                  <p className="text-lg md:text-xl text-slate-300">
                    Richmond, Texas 77407
                    <br />
                    Houston Metro Area
                  </p>
                </div>

                <div className="glass rounded-xl p-8 md:p-10 border border-slate-800/50">
                  <Phone className="w-8 h-8 text-neon-cyan mb-4" />
                  <h3 className="text-xl md:text-2xl font-semibold text-slate-50 mb-2">Phone</h3>
                  <a
                    href="tel:7033325956"
                    className="text-xl md:text-2xl text-slate-300 hover:text-neon-cyan transition-colors"
                  >
                    (703) 332-5956
                  </a>
                </div>

                <div className="glass rounded-xl p-8 md:p-10 border border-slate-800/50">
                  <Mail className="w-8 h-8 text-electric-purple mb-4" />
                  <h3 className="text-xl md:text-2xl font-semibold text-slate-50 mb-2">Email</h3>
                  <a
                    href="mailto:don@mercyspeaksdigital.com"
                    className="text-xl md:text-2xl text-slate-300 hover:text-neon-cyan transition-colors break-all"
                  >
                    don@mercyspeaksdigital.com
                  </a>
                </div>

                <div className="glass rounded-xl p-8 md:p-10 border border-slate-800/50">
                  <Clock className="w-8 h-8 text-neon-cyan mb-4" />
                  <h3 className="text-xl md:text-2xl font-semibold text-slate-50 mb-2">Business Hours</h3>
                  <p className="text-lg md:text-xl text-slate-300">
                    Monday - Friday: 9:00 AM - 6:00 PM CST
                    <br />
                    Saturday - Sunday: By Appointment
                  </p>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-2"
              >
                <div className="glass rounded-2xl p-8 md:p-12 border border-slate-800/50">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <CheckCircle2 className="w-16 h-16 text-neon-cyan mx-auto mb-4" />
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-2">Message Sent!</h2>
                      <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-6">
                        We'll get back to you within 24 hours.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-6">Send Us a Message</h2>
                      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-base md:text-lg font-medium text-slate-300 mb-2"
                            >
                              Name <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className={`w-full h-12 md:h-14 px-5 py-4 rounded-lg bg-slate-900/50 border ${
                                errors.name
                                  ? "border-red-500"
                                  : "border-slate-700 focus:border-neon-cyan"
                              } text-lg md:text-xl text-slate-50 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-colors`}
                              placeholder="Your name"
                            />
                            {errors.name && (
                              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                            )}
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-base md:text-lg font-medium text-slate-300 mb-2"
                            >
                              Email <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`w-full h-12 md:h-14 px-5 py-4 rounded-lg bg-slate-900/50 border ${
                                errors.email
                                  ? "border-red-500"
                                  : "border-slate-700 focus:border-neon-cyan"
                              } text-lg md:text-xl text-slate-50 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-colors`}
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
                              className="block text-base md:text-lg font-medium text-slate-300 mb-2"
                            >
                              Phone
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full h-12 md:h-14 px-5 py-4 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-neon-cyan text-lg md:text-xl text-slate-50 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-colors"
                              placeholder="(703) 332-5956"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="company"
                              className="block text-base md:text-lg font-medium text-slate-300 mb-2"
                            >
                              Company
                            </label>
                            <input
                              type="text"
                              id="company"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className="w-full h-12 md:h-14 px-5 py-4 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-neon-cyan text-lg md:text-xl text-slate-50 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-colors"
                              placeholder="Your company"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="message"
                            className="block text-base md:text-lg font-medium text-slate-300 mb-2"
                          >
                            Message <span className="text-red-400">*</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={6}
                            className={`w-full px-5 py-4 rounded-lg bg-slate-900/50 border ${
                              errors.message
                                ? "border-red-500"
                                : "border-slate-700 focus:border-neon-cyan"
                            } text-lg md:text-xl text-slate-50 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-colors resize-none`}
                            placeholder="Tell us about your business and how we can help..."
                          />
                          {errors.message && (
                            <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                          )}
                        </div>

                        <Button
                          type="submit"
                          variant="glow"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full"
                        >
                          {isSubmitting ? (
                            "Sending..."
                          ) : (
                            <>
                              Send Message
                              <Send className="w-5 h-5 ml-2" />
                            </>
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}