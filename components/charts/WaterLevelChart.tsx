"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { WaterLevelReading } from "@/types";
import { cn } from "@/lib/utils";
interface WaterLevelChartProps {
  data: WaterLevelReading[];
  nwl: number;
  lwl: number;
  height?: number;
  showLegend?: boolean;
  showRuleCurve?: boolean;
  className?: string;
}

function formatLabel(isoStr: string): string {
  const d = new Date(isoStr);
  return `${d.getUTCDate()}/${d.getUTCMonth() + 1}`;
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-line rounded-xl shadow-lg px-3 py-2 text-sm">
      <p className="text-ink-500 text-xs mb-1">{label}</p>
      <p className="font-semibold text-brand-800">
        TMA:{" "}
        <span className="text-ink-900">
          {payload[0].value?.toFixed(2).replace(".", ",")} m
        </span>
      </p>
    </div>
  );
}

export default function WaterLevelChart({
  data,
  nwl,
  lwl,
  height = 260,
  showLegend = true,
  showRuleCurve = false,
  className,
}: WaterLevelChartProps) {
  const chartData = data.map((r) => ({
    date: formatLabel(r.timestamp),
    tma: r.tma,
    ruleCurve: (r as unknown as { ruleCurve?: number }).ruleCurve,
  }));

  const minY = Math.floor(Math.min(lwl - 2, ...data.map((r) => r.tma)) / 5) * 5;
  const maxY = Math.ceil(Math.max(nwl + 2, ...data.map((r) => r.tma)) / 5) * 5;

  return (
    <div className={cn("w-full flex justify-center items-center overflow-hidden", className)} style={{ height }}>
       <img src="/assets/monitoringdam.png" alt="Grafik Tinggi Muka Air" className="w-full h-full object-contain" />
    </div>
  );
}
