
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  const serviceLinks = [
    { name: "AI-Powered Website Design", href: "/services/website-design" },
    { name: "AI Phone Receptionist", href: "/services/ai-phone-receptionist" },
    { name: "Website Chatbot", href: "/services/website-chatbot" },
    { name: "Appointment Automation", href: "/services/appointment-automation" },
    { name: "Review Generation", href: "/services/review-generation" },
    { name: "Workflow Automation", href: "/services/workflow-automation" },
  ];

  const policyLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Cookie Policy", href: "/cookie-policy" },
    { name: "Disclaimer", href: "/disclaimer" },
  ];

  const socialLinks = [
    { 
      name: "Facebook", 
      href: "https://facebook.com/mercyspeaksdigital", 
      icon: Facebook,
      color: "text-blue-500 border-blue-500/50"
    },
    { 
      name: "Twitter", 
      href: "https://twitter.com/mercyspeaksai", 
      icon: Twitter,
      color: "text-white border-slate-600"
    },
    { 
      name: "Instagram", 
      href: "https://instagram.com/mercyspeaksdigital", 
      icon: Instagram,
      color: "text-pink-500 border-pink-500/50"
    },
    { 
      name: "LinkedIn", 
      href: "https://linkedin.com/company/mercyspeaksdigital", 
      icon: Linkedin,
      color: "text-blue-600 border-blue-600/50"
    },
    { 
      name: "YouTube", 
      href: "https://youtube.com/@mercyspeaksdigital", 
      icon: Youtube,
      color: "text-red-500 border-red-500/50"
    },
  ];

  const contactInfo = [
    { 
      icon: Mail, 
      label: "Email", 
      value: "hello@mercyspeaks.ai", 
      href: "mailto:hello@mercyspeaks.ai" 
    },
    { 
      icon: Phone, 
      label: "Phone", 
      value: "(703) 332-5956", 
      href: "tel:7033325956" 
    },
    { 
      icon: MapPin, 
      label: "Location", 
      value: "Houston, TX", 
      href: null 
    },
  ];

  return (
    <footer className="relative border-t border-slate-800/50 bg-slate-950/95 backdrop-blur-xl">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/1 via-transparent to-neon-cyan/1 opacity-5" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">M</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-slate-50">MERCY SPEAKS</span>
                <span className="text-xs text-slate-400">DIGITAL</span>
              </div>
            </Link>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              We install digital employees. Stop hiring overhead. Start installing intelligence. 
              AI automation agency delivering voice agents, workflow automation, and RAG solutions.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-300 hover:text-electric-purple transition-colors text-base md:text-lg flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-300 hover:text-neon-cyan transition-colors text-base md:text-lg flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Policies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Contact</h3>
            <ul className="space-y-3 mb-6">
              {contactInfo.map((contact) => {
                const Icon = contact.icon;
                return (
                  <li key={contact.label}>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="text-slate-300 hover:text-electric-purple transition-colors text-base md:text-lg flex items-center gap-3 group"
                      >
                        <Icon className="w-4 h-4 text-slate-500 group-hover:text-electric-purple transition-colors" />
                        <span>{contact.value}</span>
                      </a>
                    ) : (
                      <div className="text-slate-300 text-base md:text-lg flex items-center gap-3">
                        <Icon className="w-4 h-4 text-slate-500" />
                        <span>{contact.value}</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <h3 className="text-lg font-semibold text-slate-50 mb-4 mt-8">Policies</h3>
            <ul className="space-y-3">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-300 hover:text-slate-200 transition-colors text-base md:text-lg flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Social Media Icons - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="border-t border-slate-800/50 pt-8 mt-8"
        >
          <div className="flex flex-col items-center gap-4 mb-8">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Follow Us
            </h3>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 rounded-lg border-2 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-slate-800/70 ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-slate-800/50 pt-8 mt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-base md:text-lg text-center md:text-left">
              © {currentYear} Mercy Speaks Digital. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                to="/book-demo"
                className="text-slate-300 hover:text-electric-purple transition-colors text-base md:text-lg flex items-center gap-2 group"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
