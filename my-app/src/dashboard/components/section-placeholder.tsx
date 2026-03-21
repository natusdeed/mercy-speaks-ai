import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardPanelClass } from "@/dashboard/lib/dashboard-styles";
import { cn } from "@/lib/utils";

type SectionPlaceholderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function SectionPlaceholder({
  eyebrow = "Soon",
  title,
  description,
}: SectionPlaceholderProps) {
  return (
    <Card className={cn("shadow-none", dashboardPanelClass)}>
      <CardHeader className="space-y-2 border-b border-zinc-800/80 pb-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">{eyebrow}</p>
        <CardTitle className="text-lg font-semibold tracking-tight text-zinc-100">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-5">
        <p className="text-sm leading-relaxed text-zinc-500">{description}</p>
      </CardContent>
    </Card>
  );
}
