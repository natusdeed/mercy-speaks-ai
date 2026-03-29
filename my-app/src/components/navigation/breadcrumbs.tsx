import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = { name: string; path?: string };

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("w-full", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-500">
        <li className="flex items-center gap-1.5">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-neon-cyan transition-colors min-h-[44px] sm:min-h-0"
          >
            <Home className="w-3.5 h-3.5 shrink-0" aria-hidden />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className="flex items-center gap-1.5 min-w-0">
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" aria-hidden />
              {item.path && !isLast ? (
                <Link
                  to={item.path}
                  className="text-slate-400 hover:text-neon-cyan transition-colors truncate max-w-[12rem] sm:max-w-none"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="text-slate-300 truncate max-w-[14rem] sm:max-w-none" aria-current={isLast ? "page" : undefined}>
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
