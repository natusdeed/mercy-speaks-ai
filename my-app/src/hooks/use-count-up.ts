"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpProps {
  end: number;
  duration?: number;
  start?: number;
  enabled?: boolean;
}

export function useCountUp({ end, duration = 2000, start = 0, enabled = true }: UseCountUpProps) {
  const [count, setCount] = useState(start);
  const hasAnimatedRef = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Cancel any existing animation
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Reset animation state when end value changes
    hasAnimatedRef.current = false;
    setCount(start);

    const animate = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      
      const startTime = Date.now();
      const range = end - start;

      const updateCount = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + range * easeOutQuart);
        
        setCount(current);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(updateCount);
        } else {
          setCount(end);
        }
      };

      animationFrameRef.current = requestAnimationFrame(updateCount);
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observerRef.current.observe(currentRef);
      
      // Check if already visible and trigger animation
      const rect = currentRef.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        // Small delay to ensure state is reset
        setTimeout(() => animate(), 10);
      }
    }

    return () => {
      if (currentRef && observerRef.current) {
        observerRef.current.unobserve(currentRef);
      }
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [end, duration, start, enabled]);

  return { count, ref };
}
