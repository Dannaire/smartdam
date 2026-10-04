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

function CustomTooltip({ active, payload, label }: any) {
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
    <div className={cn("w-full flex flex-col", className)}>
      <div style={{ height }} className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="tmaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2F80ED" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2F80ED" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#667085" }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[minY, maxY]}
            tick={{ fontSize: 11, fill: "#667085" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}`}
            unit=" m"
          />
          <Tooltip content={<CustomTooltip />} />
          {/* NWL — merah putus-putus */}
          <ReferenceLine
            y={nwl}
            stroke="#E5322D"
            strokeDasharray="6 3"
            strokeWidth={1.5}
            label={{ value: `NWL (${nwl.toFixed(2)})`, position: "insideTopRight", fill: "#E5322D", fontSize: 10 }}
          />
          {/* LWL — kuning putus-putus */}
          <ReferenceLine
            y={lwl}
            stroke="#F5B700"
            strokeDasharray="6 3"
            strokeWidth={1.5}
            label={{ value: `LWL (${lwl.toFixed(2)})`, position: "insideBottomRight", fill: "#F5B700", fontSize: 10 }}
          />
          {showRuleCurve && (
            <Area
              type="monotone"
              dataKey="ruleCurve"
              stroke="#27AE60"
              strokeWidth={2}
              fill="transparent"
              strokeDasharray="5 5"
            />
          )}
          <Area
            type="monotone"
            dataKey="tma"
            stroke="#2F80ED"
            strokeWidth={2.5}
            fill="url(#tmaGrad)"
            dot={false}
            activeDot={{ r: 5, fill: "#2F80ED", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
        </ResponsiveContainer>
      </div>

      {showLegend && (
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 mb-2 text-xs text-ink-700 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-5 h-1 bg-[#2F80ED] rounded-full" />
            <span>TMA Waduk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 border-t-2 border-dashed border-[#E5322D]" />
            <span>NWL</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 border-t-2 border-dashed border-[#F5B700]" />
            <span>LWL</span>
          </div>
          {showRuleCurve && (
            <div className="flex items-center gap-2">
              <div className="w-5 border-t-2 border-dashed border-[#27AE60]" />
              <span>Rule Curve</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
