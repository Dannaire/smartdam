/* eslint-disable @next/next/no-img-element */
"use client";

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

export default function WaterLevelChart({
  height = 260,
  className,
}: WaterLevelChartProps) {
  return (
    <div className={cn("w-full flex justify-center items-center overflow-hidden", className)} style={{ height }}>
       <img src="/assets/monitoringdam.png" alt="Grafik Tinggi Muka Air" className="w-full h-full object-contain" />
    </div>
  );
}
