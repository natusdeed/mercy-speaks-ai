import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-slate-950 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-electric-purple text-white hover:bg-electric-purple/90 glow-purple",
        cyan: "bg-neon-cyan text-slate-950 hover:bg-neon-cyan/90 glow-cyan",
        outline: "border border-slate-400 bg-transparent hover:border-slate-300 text-slate-400 hover:text-slate-50",
        ghost: "hover:bg-slate-800 hover:text-white",
        glow: "bg-gradient-to-r from-electric-purple via-purple-500 to-neon-cyan text-white hover:from-electric-purple/90 hover:via-purple-500/90 hover:to-neon-cyan/90 hover:shadow-xl transition-shadow duration-300",
        purplePink: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:shadow-xl transition-shadow duration-300",
        blueCyan: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 hover:shadow-xl transition-shadow duration-300",
        greenEmerald: "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:shadow-xl transition-shadow duration-300",
      },
      size: {
        default: "h-12 px-8 py-4 text-lg md:text-xl min-h-[48px]",
        sm: "h-10 rounded-md px-6 py-3 text-base min-h-[48px]",
        lg: "h-14 rounded-md px-8 py-4 text-lg md:text-xl min-h-[48px]",
        icon: "h-12 w-12 min-h-[48px]",
      },
    },
    defaultVariants: {
      variant: "default",
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
