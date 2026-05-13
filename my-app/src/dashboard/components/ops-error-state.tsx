import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertTriangle, RefreshCw } from "lucide-react";

type OpsErrorStateProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
  retrying?: boolean;
  className?: string;
};

export function OpsErrorState({
  title = "Could not load live data",
  message,
  onRetry,
  retrying,
  className,
}: OpsErrorStateProps) {
  return (
    <Card
      className={cn(
        "border-rose-500/30 bg-rose-950/25 shadow-none backdrop-blur-md",
        className
      )}
      role="alert"
    >
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <span className="mt-0.5 rounded-lg border border-rose-500/30 bg-rose-500/10 p-2 text-rose-200">
            <AlertTriangle className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold text-rose-100">{title}</p>
            <p className="mt-1 text-sm leading-relaxed text-rose-100/85">{message}</p>
            <p className="mt-2 text-xs text-rose-200/70">
              This view is live read-only. No writes, emails, SMS, or bookings are triggered from here.
            </p>
          </div>
        </div>
        {onRetry ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={retrying}
            onClick={onRetry}
            className="shrink-0 border-rose-500/40 text-rose-100 hover:bg-rose-500/10"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", retrying && "animate-spin")} aria-hidden />
            {retrying ? "Retrying…" : "Retry"}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
