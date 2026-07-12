"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItemData = {
  id: string;
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItemData[];
  className?: string;
  /** Which item is open initially; `null` = all closed. Default: first item. */
  defaultOpenId?: string | null;
};

/**
 * FAQ/accordion that always renders every answer in the DOM (SEO / view-source).
 * Collapse uses the HTML `hidden` attribute — never conditionally mount panels.
 */
export function Accordion({ items, className, defaultOpenId }: AccordionProps) {
  const initialOpen =
    defaultOpenId !== undefined ? defaultOpenId : items[0]?.id ?? null;
  const [openId, setOpenId] = useState<string | null>(initialOpen);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const triggerId = `accordion-trigger-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            className="rounded-2xl bg-slate-900/20 shadow-sm overflow-hidden"
          >
            <h3 className="m-0">
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full p-5 sm:p-7 flex items-center justify-between text-left hover:bg-slate-800/20 transition-colors group min-h-[52px]"
              >
                <span className="card-title text-slate-50 group-hover:text-neon-cyan transition-colors pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300",
                    isOpen && "rotate-180 text-neon-cyan"
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            {/* Always in the DOM for crawlers; `hidden` only affects display / a11y tree */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="px-5 sm:px-7 pb-5 sm:pb-7 pt-0 text-slate-300 text-sm leading-relaxed"
            >
              {item.answer}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
