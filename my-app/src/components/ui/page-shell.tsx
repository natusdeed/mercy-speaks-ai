import { cn } from "@/lib/utils";

/**
 * Wrapper for page content. Top offset is applied globally via <main> in App.tsx
 * (pt-20 md:pt-24) so H1s sit below the fixed header. This shell only adds bottom
 * padding for section spacing.
 */
interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div
      className={cn(
        "pb-12",
        className
      )}
    >
      {children}
    </div>
  );
}
