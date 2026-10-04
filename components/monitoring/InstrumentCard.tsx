import { Card } from "@/components/ui/Card";
import { AlertLevel } from "@/types";
import { getAlertConfig } from "@/lib/alert-level";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface InstrumentCardProps {
  label: string;
  value: number | string | null;
  unit: string;
  icon: LucideIcon;
  status: AlertLevel;
}

export function InstrumentCard({ label, value, unit, icon: Icon, status }: InstrumentCardProps) {
  const alertConfig = getAlertConfig(status);

  return (
    <Card padding="sm" className="flex flex-col relative overflow-hidden">
      {/* Decorative Status Bar Top */}
      <div className={cn("absolute top-0 left-0 right-0 h-1", alertConfig.bg)} />

      <div className="flex items-start gap-3 mt-1">
        <div className={cn("p-2 rounded-lg", alertConfig.bg, alertConfig.color)}>
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <p className="text-xs text-ink-500 font-medium leading-tight mb-1">{label}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-ink-900">
              {value !== null ? value : "-"}
            </span>
            <span className="text-xs text-ink-500">{unit}</span>
          </div>
        </div>
      </div>
      <div className="mt-2 text-right">
         <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1", alertConfig.bg, alertConfig.color)}>
           <span className={cn("w-1.5 h-1.5 rounded-full", alertConfig.dot)} />
           {alertConfig.label}
         </span>
      </div>
    </Card>
  );
}
