"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const servicesItems = [
    { name: "AI-Powered Website Design", href: "/services/website-design" },
    { name: "AI Phone Receptionist", href: "/services/ai-phone-receptionist" },
    { name: "Website Chatbot", href: "/services/website-chatbot" },
    { name: "Appointment Automation", href: "/services/appointment-automation" },
    { name: "Review Generation", href: "/services/review-generation" },
  ];

  const isServicesActive = mounted && (pathname?.startsWith("/services") ?? false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800">
      <nav>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="shrink-0 ml-8 lg:ml-16 text-2xl font-bold text-electric-purple hover:text-purple-400 transition-colors"
            >
              Mercy Speaks Digital
            </Link>

            {/* Desktop Navigation (centered) */}
            <div className="hidden md:flex flex-1 items-center justify-center gap-8">
              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={`text-lg font-medium transition-colors flex items-center gap-1 ${
                    isServicesActive
                      ? "text-electric-purple font-semibold"
                      : "text-slate-300 hover:text-slate-50"
                  }`}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  suppressHydrationWarning
                >
                  Services
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-lg shadow-xl overflow-hidden"
                    >
                      {servicesItems.map((item, index) => {
                        const isActive = mounted && pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setServicesOpen(false)}
                            className={`block px-4 py-3 text-sm transition-colors border-b border-slate-800/50 last:border-b-0 ${
                              isActive
                                ? "text-electric-purple font-semibold bg-slate-800/70"
                                : "text-slate-300 hover:text-slate-50 hover:bg-slate-800/50"
                            }`}
                            style={{
                              animationDelay: `${index * 0.05}s`,
                            }}
                            suppressHydrationWarning
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pricing Link */}
              <Link
                href="/pricing"
                className={`text-lg font-medium transition-colors ${
                  mounted && pathname === "/pricing"
                    ? "text-electric-purple font-semibold"
                    : "text-slate-300 hover:text-slate-50"
                }`}
              >
                Pricing
              </Link>

              {/* Portfolio Link */}
              <Link
                href="/portfolio"
                className={`text-lg font-medium transition-colors ${
                  mounted && pathname === "/portfolio"
                    ? "text-electric-purple font-semibold"
                    : "text-slate-300 hover:text-slate-50"
                }`}
              >
                Portfolio
              </Link>

              {/* Contact Link */}
              <Link
                href="/contact"
                className={`text-lg font-medium transition-colors ${
                  mounted && pathname === "/contact"
                    ? "text-electric-purple font-semibold"
                    : "text-slate-300 hover:text-slate-50"
                }`}
              >
                Contact
              </Link>

              {/* Book Demo Button */}
              <Button variant="ghost" size="sm" asChild>
                <Link href="/book-demo">Book Demo</Link>
              </Button>
            </div>

            {/* CTA Button (right) */}
            <div className="hidden lg:block shrink-0">
              <Link href="/book-demo">
                <button
                  className="relative px-8 py-4 rounded-md text-lg font-bold text-white bg-linear-to-r from-electric-purple via-purple-500 to-neon-cyan hover:shadow-xl hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50"
                  suppressHydrationWarning
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

