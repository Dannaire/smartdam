"use client";

import { Card } from "@/components/ui/Card";
import { formatTMA, formatTrend } from "@/lib/format";
import { AlertLevel, WaterLevelReading } from "@/types";
import { getAlertConfig } from "@/lib/alert-level";
import { AlertTriangle, CheckCircle, AlertOctagon, Droplet, CloudRain } from "lucide-react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";

// Lazy load chart for performance
const MiniChart = dynamic(() => import("@/components/charts/WaterLevelChart"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

interface SummaryCardsProps {
  tma: number;
  trend: number;
  nwl: number;
  lwl: number;
  rainfall: number;
  alertLevel: AlertLevel;
  chartData: WaterLevelReading[];
}

export function SummaryCards({
  tma,
  trend,
  nwl,
  lwl,
  rainfall,
  alertLevel,
  chartData,
}: SummaryCardsProps) {
  const alertConfig = getAlertConfig(alertLevel);
  const Icon = alertLevel === "normal" ? CheckCircle : alertLevel === "awas" ? AlertOctagon : AlertTriangle;

  return (
    <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-content mx-auto px-8 mt-8">
      {/* Kartu Status Peringatan */}
      <Card className="flex flex-col justify-center">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full ${alertConfig.badgeBg} text-white`}>
            <Icon size={32} />
          </div>
          <div>
            <p className="text-sm text-ink-500 mb-1">Status Keamanan</p>
            <h3 className={`text-2xl font-bold ${alertConfig.color}`}>
              {alertConfig.label}
            </h3>
            <p className="text-sm text-ink-900 mt-2">
              Tetap waspada, pantau terus perkembangan informasi.
            </p>
          </div>
        </div>
      </Card>

      {/* Kartu TMA & Curah Hujan */}
      <Card className="flex flex-col justify-between">
        <div className="flex justify-between items-center border-b border-line pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-50 rounded-lg text-brand-800">
              <Droplet size={24} />
            </div>
            <div>
              <p className="text-xs text-ink-500">Elevasi TMA</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-ink-900">{formatTMA(tma)}</span>
                <span className={`text-xs font-medium ${trend >= 0 ? "text-status-normal" : "text-status-awas"}`}>
                  {trend >= 0 ? "▲" : "▼"} {formatTrend(trend)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-50 rounded-lg text-brand-800">
            <CloudRain size={24} />
          </div>
          <div>
            <p className="text-xs text-ink-500">Curah Hujan</p>
            <span className="text-xl font-bold text-ink-900">{rainfall} <span className="text-sm font-normal text-ink-500">mm/jam</span></span>
          </div>
        </div>
      </Card>

      {/* Grafik TMA Mini */}
      <Card className="flex flex-col h-[200px]">
        <h4 className="text-sm font-semibold text-ink-900 mb-2">Tren TMA (7 Hari)</h4>
        <div className="flex-1 -mx-2">
          <MiniChart data={chartData} nwl={nwl} lwl={lwl} height={140} showLegend={false} />
        </div>
      </Card>
    </div>
  );
}
