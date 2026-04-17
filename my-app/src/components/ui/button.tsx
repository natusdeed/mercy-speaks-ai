import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * CTA design system: primary (Executive Violet), secondary, outline.
 * Standard sizes: min 44px height (h-11) on mobile; lg uses h-12 from md+; rounded-xl/2xl.
 * All "Book Demo" and main CTAs use variant="primary".
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-tight ring-offset-slate-950 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /* Primary CTA: Executive Violet #6D28D9, hover #5B21B6, premium shadow & focus */
        primary:
          "bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-xl shadow-md hover:shadow-lg hover:shadow-violet-500/25 focus-visible:ring-violet-400 active:bg-violet-900",
        /* Secondary: muted fill for less prominent actions */
        secondary:
          "bg-slate-700/80 hover:bg-slate-600/90 text-slate-100 rounded-xl border border-slate-600/50 hover:border-slate-500/60 focus-visible:ring-slate-400",
        /* Outline: transparent with border, gentle hover fill */
        outline:
          "border border-slate-500/60 bg-transparent text-slate-200 rounded-xl hover:bg-slate-800/50 hover:border-slate-400/70 hover:text-slate-50 focus-visible:ring-slate-400",
        ghost:
          "border border-slate-500/60 bg-transparent text-slate-300 rounded-xl hover:bg-slate-800/40 hover:text-slate-50 focus-visible:ring-slate-400",
      },
      size: {
        /* Mobile tap targets: min 44px (2.75rem) */
        default: "min-h-11 h-11 px-4 md:px-5 text-sm rounded-xl",
        sm: "min-h-11 h-11 px-4 text-sm rounded-xl",
        lg: "min-h-11 h-11 md:min-h-12 md:h-12 px-5 md:px-6 text-base rounded-2xl",
        icon: "min-h-11 h-11 min-w-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
