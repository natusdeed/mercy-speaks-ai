"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export function Accordion({ items, className, defaultOpenId }: AccordionProps) {
  const initialOpen =
    defaultOpenId !== undefined ? defaultOpenId : items[0]?.id ?? null;
  const [openId, setOpenId] = useState<string | null>(initialOpen);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            className="rounded-2xl bg-slate-900/20 shadow-sm overflow-hidden"
          >
            <button
              type="button"
              id={`accordion-trigger-${item.id}`}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full p-5 sm:p-7 flex items-center justify-between text-left hover:bg-slate-800/20 transition-colors group min-h-[52px]"
            >
              <span className="card-title text-slate-50 group-hover:text-neon-cyan transition-colors pr-4">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-slate-400 shrink-0 transition-transform",
                  isOpen && "rotate-180 text-neon-cyan"
                )}
                aria-hidden
              />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-7 pb-5 sm:pb-7 pt-0 text-slate-300 text-sm leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
