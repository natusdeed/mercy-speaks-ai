"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PortfolioCategory =
  | "Websites"
  | "Automation"
  | "AI Receptionist"
  | "E-commerce";

export interface PortfolioItem {
  id: string;
  title: string;
  url: string;
  category: PortfolioCategory;
  description: string;
  stack: string[];
  metric?: string;
  thumbnail?: string;
  detailsUrl?: string;
  /** Optional industry/niche tag shown on the card */
  industryTag?: string;
  /** Override for live link (else `url` is used) */
  liveUrl?: string;
  /** CTA button label; default "Live Site" */
  ctaLabel?: string;
  /** When true, can be used to sort or highlight */
  featured?: boolean;
}

const FILTERS: { value: PortfolioCategory | "All"; label: string }[] = [
  { value: "All", label: "All" },
  { value: "Websites", label: "Websites" },
  { value: "Automation", label: "Automation" },
  { value: "AI Receptionist", label: "AI Receptionist" },
  { value: "E-commerce", label: "E-commerce" },
];

interface PortfolioGalleryProps {
  items: PortfolioItem[];
}

export function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory | "All">("All");

  const filtered =
    activeFilter === "All"
      ? [...items].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)) // featured first
      : items.filter((item) => item.category === activeFilter);

  return (
    <section className="section" aria-label="Portfolio gallery">
      <div className="section-inner max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-2">
          Portfolio Gallery
        </h2>
        <p className="text-slate-400 mb-6 max-w-2xl">
          Projects we&apos;ve built: websites, automation, AI receptionists, and e-commerce.
        </p>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                activeFilter === filter.value
                  ? "bg-electric-purple/20 text-electric-purple border border-electric-purple/40"
                  : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-800 hover:text-slate-300 hover:border-slate-600"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="card-premium flex flex-col overflow-hidden group"
              >
                {/* Thumbnail — 16:10, rounded-2xl, hover overlay; clickable when item has a URL */}
                <div className="relative -mx-7 -mt-7 mb-4 aspect-16/10 overflow-hidden rounded-2xl bg-slate-800/60">
                  {item.thumbnail ? (
                    <a
                      href={item.liveUrl ?? item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-2xl"
                    >
                      <img
                        src={item.thumbnail}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                        aria-hidden
                      />
                    </a>
                  ) : (
                    <div
                      className="h-full w-full bg-linear-to-br from-slate-800 via-slate-800/90 to-electric-purple/10"
                      aria-hidden
                    />
                  )}
                  {item.metric && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/90 text-xs font-semibold text-neon-cyan backdrop-blur-sm">
                      {item.metric}
                    </span>
                  )}
                </div>

                {/* Category + optional industry tag */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-neon-cyan uppercase tracking-wider">
                    {item.category}
                  </span>
                  {item.industryTag && (
                    <span className="text-xs text-slate-500 font-medium">
                      {item.industryTag}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-50 mb-2 line-clamp-1">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                  {item.description}
                </p>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.stack.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" size="sm" asChild>
                    <a
                      href={item.liveUrl ?? item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {item.ctaLabel ?? "Live Site"}
                    </a>
                  </Button>
                  {item.detailsUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={item.detailsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Details
                      </a>
                    </Button>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="text-slate-500 text-center py-12">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
