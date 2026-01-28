"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface InfiniteMovingCardsProps {
  items: Array<{
    name: string;
    color: string;
  }>;
  direction?: "up" | "down";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteMovingCards({
  items,
  direction = "up",
  speed = "normal",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items multiple times for truly seamless infinite scroll
  // With 4 sets, we ensure smooth continuous looping regardless of container height
  const duplicatedItems = [...items, ...items, ...items, ...items];

  const speedMap = {
    slow: 50,
    normal: 30,
    fast: 20,
  };

  return (
    <div
      className={cn(
        "overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white_20%,white_80%,transparent)]",
        className
      )}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <motion.div
        className="flex flex-col gap-6"
        animate={{
          y: direction === "up" ? [0, -50 + "%"] : [0, 50 + "%"],
        }}
        transition={{
          duration: speedMap[speed],
          repeat: Infinity,
          ease: "linear",
          ...(isPaused && { duration: 0 }),
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <motion.div
            key={`${item.name}-${idx}`}
            className="flex items-center justify-between px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-800/50 hover:border-electric-purple/50 transition-colors group/item"
            whileHover={{ scale: 1.02 }}
          >
            <span className={cn("font-semibold", item.color, "group-hover/item:scale-105 transition-transform")}>
              {item.name}
            </span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover/item:text-electric-purple group-hover/item:translate-x-1 transition-all" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
