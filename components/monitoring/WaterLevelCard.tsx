import { Card } from "@/components/ui/Card";
import { formatTMA, formatTrend } from "@/lib/format";

interface WaterLevelCardProps {
  tma: number;
  trend: number;
  nwl: number;
  lwl: number;
}

export function WaterLevelCard({ tma, trend, nwl, lwl }: WaterLevelCardProps) {
  const percent = (tma - lwl) / (nwl - lwl);

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-semibold text-ink-900 mb-1">Tinggi Muka Air (TMA)</h3>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl md:text-5xl font-bold text-ink-900">
              {formatTMA(tma)}
            </span>
          </div>
          <p
            className={`text-sm font-medium flex items-center gap-1 ${
              trend >= 0 ? "text-status-normal" : "text-status-awas"
            }`}
          >
            {trend >= 0 ? "▲" : "▼"} {formatTrend(trend)}
            <span className="text-ink-500 text-xs font-normal ml-1">dari kemarin</span>
          </p>
        </div>
        
        <div className="text-right">
          <p className="text-xs text-ink-500 font-medium">NWL : {nwl.toFixed(2)} m</p>
          <p className="text-xs text-ink-500 font-medium mt-1">LWL : {lwl.toFixed(2)} m</p>
        </div>
      </div>

      <div className="mt-2 rounded-xl overflow-hidden">
        <img src="/assets/monitoringdam.png" alt="Visualisasi Bendungan" className="w-full object-cover" />
      </div>
    </Card>
  );
}
