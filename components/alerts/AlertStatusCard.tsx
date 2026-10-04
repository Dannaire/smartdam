import { AlertLevel } from "@/types";
import { getAlertConfig, getAlertIcon } from "@/lib/alert-level";
import { Card } from "@/components/ui/Card";
import { formatDateWIB } from "@/lib/format";

interface AlertStatusCardProps {
  level: AlertLevel;
  message: string;
  time: string;
}

export function AlertStatusCard({ level, message, time }: AlertStatusCardProps) {
  const config = getAlertConfig(level);
  const Icon = getAlertIcon(level);
  const isDanger = level === "siaga" || level === "awas";

  return (
    <Card className={`relative overflow-hidden border-2 ${isDanger ? 'bg-danger-bg border-status-awas' : 'bg-white border-line'}`}>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className={`p-4 rounded-2xl flex items-center justify-center ${config.bg} ${config.color}`}>
          <Icon size={40} />
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-medium text-ink-500 mb-1">Status Saat Ini</h2>
          <div className="flex items-center gap-2 mb-2">
             <span className={`text-2xl font-bold ${config.color} uppercase tracking-wide`}>
                {level}
             </span>
          </div>
          <p className="text-ink-900 font-medium leading-relaxed mb-2">
            {message}
          </p>
          <p className="text-xs text-ink-500">
            Terakhir diperbarui: {formatDateWIB(time)}
          </p>
        </div>
      </div>
    </Card>
  );
}
