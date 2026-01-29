import { useEffect } from "react";

interface UseScrollAnimationOptions {
  /**
   * The threshold percentage (0.0 to 1.0) of the element that must be visible before triggering.
   * @default 0.1
   */
  threshold?: number;
  /**
   * The root margin for the IntersectionObserver (e.g., "-100px" to trigger 100px before element enters viewport).
   * @default "0px"
   */
  rootMargin?: string;
  /**
   * Whether to trigger animation only once or every time the element enters viewport.
   * @default true
   */
  once?: boolean;
}

/**
 * Hook that sets up IntersectionObserver to add 'animate-in' class to elements with data-animate attribute
 * when they scroll into view. Perfect for CSS-based scroll animations.
 * 
 * @example
 * // In your component:
 * useScrollAnimation(); // Uses default options
 * 
 * // In your JSX:
 * <div data-animate className="opacity-0">Content</div>
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", once = true } = options;

  useEffect(() => {
    // Find all elements with data-animate attribute
    const animatedElements = document.querySelectorAll<HTMLElement>('[data-animate]');
    
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // If once is true, stop observing after animation triggers
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            // If once is false, remove class when element leaves viewport
            entry.target.classList.remove('animate-in');
          }
        });
      },
      { 
        threshold,
        rootMargin 
      }
    );

    // Observe all elements with data-animate attribute
    animatedElements.forEach((el) => {
      observer.observe(el);
    });

    // Cleanup: unobserve all elements when component unmounts
    return () => {
      animatedElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [threshold, rootMargin, once]);
}
