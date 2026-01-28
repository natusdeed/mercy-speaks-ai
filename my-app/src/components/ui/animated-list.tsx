"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedListProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export function AnimatedList({ className, children, delay = 0.1 }: AnimatedListProps) {
  const [displayedItems, setDisplayedItems] = useState<React.ReactNode[]>([]);
  const childrenArray = Array.isArray(children) ? children : [children];
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let currentIndex = 0;

    const showNextItem = () => {
      if (currentIndex < childrenArray.length) {
        setDisplayedItems((prev) => [...prev, childrenArray[currentIndex]]);
        currentIndex++;
      } else {
        // Reset after showing all items
        setTimeout(() => {
          setDisplayedItems([]);
          currentIndex = 0;
        }, 2000);
      }
    };

    // Initial delay before starting
    const initialTimeout = setTimeout(() => {
      showNextItem();
      intervalRef.current = setInterval(showNextItem, delay * 1000);
    }, delay * 1000);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [childrenArray, delay]);

  return (
    <div className={className}>
      {displayedItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{
            duration: 0.5,
            ease: [0.21, 1.11, 0.81, 0.99],
          }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}
