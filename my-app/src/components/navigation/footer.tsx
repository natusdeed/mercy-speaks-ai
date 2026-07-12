
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
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { BRAND_TAGLINE, BUSINESS, NAV_PATHS, SOCIAL_LINKS, telHref } from "@/lib/site-config";

const SOCIAL_ICONS: Record<string, { icon: LucideIcon; color: string }> = {
  Facebook: { icon: Facebook, color: "text-blue-500 border-blue-500/50" },
  Twitter: { icon: Twitter, color: "text-white border-slate-600" },
  Instagram: { icon: Instagram, color: "text-pink-500 border-pink-500/50" },
  LinkedIn: { icon: Linkedin, color: "text-blue-600 border-blue-600/50" },
  YouTube: { icon: Youtube, color: "text-red-500 border-red-500/50" },
};

const AREA_LINKS = [
  { name: "Houston, TX", href: NAV_PATHS.houston },
  { name: "Richmond, TX", href: NAV_PATHS.richmondTx },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: "Services", href: "/services" },
    { name: "Website Design", href: "/services/website-design" },
    { name: "Industries", href: "/industries" },
    { name: "Pricing", href: "/pricing" },
    { name: "Results", href: "/results" },
    { name: "Blog", href: NAV_PATHS.blog },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Book Demo", href: "/book-demo" },
  ];
  const exploreLinkColumns = [
    navigationLinks.slice(0, 5),
    navigationLinks.slice(5),
  ];

  const socialLinks = SOCIAL_LINKS.map((link) => {
    const meta = SOCIAL_ICONS[link.name] ?? {
      icon: ArrowRight,
      color: "text-slate-300 border-slate-600",
    };
    return {
      ...link,
      ...meta,
      ariaLabel: `${BUSINESS.name} on ${link.name}`,
    };
  });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: BUSINESS.email,
      href: `mailto:${BUSINESS.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: BUSINESS.phoneDisplay,
      href: telHref(),
    },
    {
      icon: MapPin,
      label: "Location",
      value: `${BUSINESS.address.addressLocality}, ${BUSINESS.address.addressRegion} · Houston metro`,
      href: null,
    },
  ];

  return (
    <footer id="site-footer" className="relative bg-slate-950/95 backdrop-blur-xl">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 bg-electric-purple rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">M</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-slate-50">MERCY SPEAKS</span>
                <span className="text-xs text-slate-400">DIGITAL</span>
              </div>
            </Link>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              {BRAND_TAGLINE} Based in the Houston metro; serving businesses nationwide.
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Explore</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {exploreLinkColumns.map((columnLinks, columnIndex) => (
                <div
                  key={`explore-column-${columnIndex}`}
                  className="rounded-xl border border-slate-800/70 bg-slate-900/40 p-3 backdrop-blur-sm"
                >
                  <ul className="space-y-2">
                    {columnLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="text-slate-300 hover:text-electric-purple transition-colors text-base md:text-lg flex min-h-11 items-center gap-2 rounded-lg py-1.5 -mx-2 px-2 group"
                        >
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          <span>{link.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Areas — local landing pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-1"
          >
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Areas</h3>
            <ul className="space-y-2 rounded-xl border border-slate-800/70 bg-slate-900/40 p-3 backdrop-blur-sm">
              {AREA_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-300 hover:text-electric-purple transition-colors text-base md:text-lg flex min-h-11 items-center gap-2 rounded-lg py-1.5 -mx-2 px-2 group"
                  >
                    <MapPin className="w-3.5 h-3.5 text-slate-500 group-hover:text-electric-purple transition-colors shrink-0" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Contact</h3>
            <ul className="space-y-3">
              {contactInfo.map((contact) => {
                const Icon = contact.icon;
                return (
                  <li key={contact.label}>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="text-slate-300 hover:text-electric-purple transition-colors text-base md:text-lg flex min-h-11 items-center gap-3 rounded-lg py-1.5 -mx-2 px-2 group"
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
          </motion.div>
        </div>

        {/* Social Media Icons - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="border-t border-slate-800/30 pt-8 mt-8"
        >
          <div className="flex flex-col items-center gap-4 mb-8">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Follow Us
            </h3>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {socialLinks.length === 0 ? (
                <p className="text-sm text-slate-500">Social profiles coming soon.</p>
              ) : (
                socialLinks.map((social, index) => {
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
                      aria-label={social.ariaLabel}
                      title={social.ariaLabel}
                    >
                      <Icon className="w-6 h-6" aria-hidden />
                      <span className="sr-only">{social.ariaLabel}</span>
                    </motion.a>
                  );
                })
              )}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 mt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-base md:text-lg text-center md:text-left">
              © {currentYear} Mercy Speaks Digital. All rights reserved.
            </p>
            <div className="flex items-center">
              <Link
                to="/cookie-policy"
                className="text-slate-400 hover:text-electric-purple transition-colors text-base md:text-lg"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
