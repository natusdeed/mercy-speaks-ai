import { useEffect, useRef, useState, type RefObject } from "react";

interface UseCountUpProps {
  end: number;
  duration?: number;
  start?: number;
  enabled?: boolean;
}

interface UseCountUpResult<T extends HTMLElement> {
  count: number;
  ref: RefObject<T | null>;
}

/**
 * Count-up as progressive enhancement for marketing stats.
 *
 * Why the final value must be in the initial HTML:
 * Crawlers, view-source, and no-JS users only see the first paint. If we
 * initialize at 0, they permanently see "0" / "$0" / "0%". We therefore
 * render `end` on the server/prerender and as the pre-hydration default;
 * after hydration we may animate from `start` → `end` on intersection.
 * `prefers-reduced-motion: reduce` skips the animation and keeps `end`.
 */
export function useCountUp<T extends HTMLElement = HTMLElement>({
  end,
  duration = 2000,
  start = 0,
  enabled = true,
}: UseCountUpProps): UseCountUpResult<T> {
  // Final value in prerendered HTML — never initialize at 0 for SEO / no-JS.
  const [count, setCount] = useState(end);
  const hasAnimatedRef = useRef(false);
  const ref = useRef<T | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setCount(end);

    if (!enabled) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    hasAnimatedRef.current = false;

    const animate = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      const startTime = performance.now();
      const range = end - start;

      // Drop to `start` only now (post-hydration, on intersection).
      setCount(start);

      const updateCount = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + range * easeOutQuart);

        setCount(progress < 1 ? current : end);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(updateCount);
        } else {
          animationFrameRef.current = null;
        }
      };

      animationFrameRef.current = requestAnimationFrame(updateCount);
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animate();
            observerRef.current?.disconnect();
            break;
          }
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [end, duration, start, enabled]);

  return { count, ref };
}
