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
  /** Short summary of what was built */
  description: string;
  stack: string[];
  /** Optional outcome statement (no fabricated metrics) */
  outcome?: string;
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
  { value: "Websites", label: "Websites" },
  { value: "AI Receptionist", label: "AI Receptionist" },
  { value: "Automation", label: "Automation" },
  { value: "E-commerce", label: "E-commerce" },
  { value: "All", label: "All" },
];

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  /** Default selected category; use "Websites" on homepage for positioning */
  defaultFilter?: PortfolioCategory | "All";
  /** Optional eyebrow label above the title */
  eyebrow?: string;
  /** Optional heading override */
  title?: string;
  /** Optional description override */
  description?: string;
  /** Optional id for in-page anchor links */
  sectionId?: string;
  /** "row" = horizontal scroll row; "grid" = responsive 1–2 column grid */
  layout?: "grid" | "row";
}

export function PortfolioGallery({
  items,
  defaultFilter = "All",
  eyebrow,
  title = "Portfolio",
  description = "Explore websites, automation, AI receptionists, and e-commerce projects we’ve built.",
  sectionId,
  layout = "grid",
}: PortfolioGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory | "All">(defaultFilter);

  const filtered =
    activeFilter === "All"
      ? [...items].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)) // featured first
      : items.filter((item) => item.category === activeFilter);

  return (
    <section id={sectionId} className="section scroll-mt-24" aria-label="Portfolio gallery">
      <div className="section-inner max-w-5xl mx-auto">
        {eyebrow && (
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-2">
          {title}
        </h2>
        <p className="text-slate-400 mb-6 max-w-2xl">
          {description}
        </p>

        {/* Filter chips */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-1 px-1 md:flex-wrap md:overflow-visible md:pb-0 md:mx-0 md:px-0">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              aria-pressed={activeFilter === filter.value}
              className={cn(
                "shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                activeFilter === filter.value
                  ? "bg-electric-purple/20 text-slate-50 border border-electric-purple/40 shadow-[0_0_0_1px_rgba(139,92,246,0.15)]"
                  : "bg-slate-900/30 text-slate-300 border border-slate-800/60 hover:bg-slate-900/60 hover:text-slate-50 hover:border-slate-700"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grid or horizontal row */}
        <div
          className={cn(
            "gap-6",
            layout === "row"
              ? "flex flex-row overflow-x-auto overflow-y-visible pb-3 snap-x snap-mandatory scroll-pl-4 scroll-pr-4 -mx-1 px-1 [scrollbar-width:thin]"
              : "grid grid-cols-1 md:grid-cols-2"
          )}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "card-premium flex flex-col overflow-hidden group",
                  layout === "row" &&
                    "shrink-0 w-[min(22rem,calc(100vw-2rem))] sm:w-80 snap-start"
                )}
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
                      {/* Thumbnail placeholder: keep screenshots at 16:10 for consistent portfolio cards. */}
                      <img
                        src={item.thumbnail}
                        alt={`${item.title} website thumbnail`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                        decoding="async"
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

                {/* Outcome */}
                {item.outcome && (
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    <span className="text-slate-500 font-medium">Outcome: </span>
                    {item.outcome}
                  </p>
                )}

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
