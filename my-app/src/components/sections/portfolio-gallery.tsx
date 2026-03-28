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
  /**
   * Extra classes for the thumbnail `<img>` (e.g. `object-[17%_center]` to crop a shared
   * horizontal strip so each card shows a different site preview).
   */
  thumbnailImgClassName?: string;
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
  /** "showcase" adds ambient glow, glass-style cards, gold accent eyebrow — for service pages */
  variant?: "default" | "showcase";
  /** Set false to hide category chips (e.g. when all items are the same category) */
  showFilters?: boolean;
  /** When layout is grid, use 3 columns on wide screens (e.g. full-width trio of site cards). */
  gridColumns?: 2 | 3;
}

export function PortfolioGallery({
  items,
  defaultFilter = "All",
  eyebrow,
  title = "Portfolio",
  description = "Explore websites, automation, AI receptionists, and e-commerce projects we’ve built.",
  sectionId,
  layout = "grid",
  variant = "default",
  showFilters = true,
  gridColumns = 2,
}: PortfolioGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory | "All">(defaultFilter);

  const filtered =
    activeFilter === "All"
      ? [...items].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)) // featured first
      : items.filter((item) => item.category === activeFilter);

  const featuredCountInFilter = filtered.filter((i) => i.featured).length;

  const isShowcase = variant === "showcase";

  return (
    <section
      id={sectionId}
      className={cn(
        "section scroll-mt-24",
        isShowcase && "relative overflow-hidden pt-6! pb-12! md:pt-10! md:pb-16!"
      )}
      aria-label="Portfolio gallery"
    >
      {isShowcase && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -top-24 left-[15%] h-72 w-72 rounded-full bg-electric-purple/20 blur-3xl" />
          <div className="absolute top-1/3 -right-16 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute -bottom-20 left-0 h-64 w-64 rounded-full bg-neon-cyan/10 blur-3xl" />
        </div>
      )}

      <div
        className={cn(
          "section-inner mx-auto relative z-10",
          isShowcase ? "max-w-6xl" : "max-w-5xl"
        )}
      >
        {eyebrow && (
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-widest mb-3",
              isShowcase ? "text-amber-400/90" : "text-slate-500"
            )}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            "font-bold text-slate-50 mb-2",
            isShowcase ? "text-3xl md:text-4xl tracking-tight" : "text-2xl md:text-3xl"
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "text-slate-400 max-w-2xl",
            isShowcase && "text-base md:text-lg leading-relaxed",
            showFilters && !isShowcase && "mb-6",
            showFilters && isShowcase && "mb-8",
            !showFilters && "mb-8"
          )}
        >
          {description}
        </p>

        {/* Filter chips */}
        {showFilters && (
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
        )}

        {isShowcase && layout === "row" && (
          <p className="text-xs text-slate-500 mb-4 md:hidden">Swipe sideways to explore each live site.</p>
        )}

        {/* Grid or horizontal row */}
        <div
          className={cn(
            "gap-6 md:gap-8",
            layout === "row"
              ? "flex flex-row overflow-x-auto overflow-y-visible pb-3 snap-x snap-mandatory scroll-pl-1 scroll-pr-4 -mx-1 px-1 [scrollbar-width:thin] md:scroll-pl-0"
              : cn(
                  "grid",
                  gridColumns === 3
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1 md:grid-cols-2"
                ),
            isShowcase &&
              layout === "row" &&
              "relative rounded-3xl border border-white/6 bg-slate-950/30 backdrop-blur-md p-4 md:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
            isShowcase &&
              layout === "grid" &&
              "relative rounded-3xl border border-white/6 bg-slate-950/30 backdrop-blur-md p-4 md:p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
          )}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => {
              const heroWide =
                isShowcase &&
                layout === "grid" &&
                featuredCountInFilter === 1 &&
                Boolean(item.featured) &&
                index === 0;
              return (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, delay: index * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={cn(
                  "card-premium flex flex-col overflow-hidden group",
                  layout === "row" &&
                    (isShowcase
                      ? "shrink-0 w-[min(24rem,calc(100vw-2.5rem))] sm:w-96 snap-start border border-white/8 bg-slate-950/50 backdrop-blur-sm shadow-[0_0_0_1px_rgba(139,92,246,0.1),0_20px_50px_-15px_rgba(0,0,0,0.65)] transition-[box-shadow,border-color,transform] duration-300 hover:border-electric-purple/30 hover:shadow-[0_0_0_1px_rgba(139,92,246,0.2),0_28px_60px_-12px_rgba(139,92,246,0.12)]"
                      : "shrink-0 w-[min(22rem,calc(100vw-2rem))] sm:w-80 snap-start"),
                  layout === "grid" &&
                    isShowcase &&
                    "border border-white/8 bg-slate-950/50 backdrop-blur-sm shadow-[0_0_0_1px_rgba(139,92,246,0.1),0_20px_50px_-15px_rgba(0,0,0,0.65)] transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-1 hover:border-electric-purple/35 hover:shadow-[0_0_0_1px_rgba(139,92,246,0.22),0_28px_60px_-12px_rgba(6,182,212,0.08)]",
                  heroWide && "md:col-span-2"
                )}
              >
                {/* Thumbnail — 16:10, rounded-2xl, hover overlay; clickable when item has a URL */}
                <div
                  className={cn(
                    "relative -mx-7 -mt-7 mb-4 aspect-16/10 overflow-hidden rounded-2xl bg-slate-800/60",
                    isShowcase && "ring-1 ring-inset ring-amber-400/15"
                  )}
                >
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
                        className={cn(
                          "h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]",
                          item.thumbnailImgClassName
                        )}
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
                <p
                  className={cn(
                    "text-slate-400 text-sm leading-relaxed mb-4 flex-1",
                    isShowcase && layout === "grid" ? "line-clamp-3" : "line-clamp-2"
                  )}
                >
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
            );
            })}
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
