import { cn } from "@/lib/utils";

/**
 * Wrapper for page content. Top offset for the fixed header is set on #public-layout > .public-main
 * in globals.css (--header-offset). This shell adds bottom padding for section spacing.
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
