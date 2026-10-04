// components/ui/LiveIndicator.tsx — Indikator "Live" berkedip (PRD §12)
import { cn } from "@/lib/utils";

interface LiveIndicatorProps {
  className?: string;
  label?: string;
}

export function LiveIndicator({ className, label = "Live" }: LiveIndicatorProps) {
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-status-normal" />
      </span>
      <span className="text-xs text-ink-500 font-medium">{label}</span>
    </div>
  );
}
