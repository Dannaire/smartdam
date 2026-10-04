// components/ui/Badge.tsx — Badge status (PRD §5.3 & §11)
import { cn } from "@/lib/utils";
import { AlertLevel } from "@/types";
import { ALERT_LEVEL_CONFIG } from "@/lib/alert-level";

interface StatusBadgeProps {
  level: AlertLevel;
  className?: string;
}

export function StatusBadge({ level, className }: StatusBadgeProps) {
  const config = ALERT_LEVEL_CONFIG[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        config.badgeBg,
        config.badgeText,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "brand";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variantMap = {
    default: "bg-brand-100 text-brand-800",
    outline: "border border-line text-ink-500",
    brand: "bg-brand-800 text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        variantMap[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
