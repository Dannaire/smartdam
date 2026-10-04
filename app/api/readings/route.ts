// app/api/readings/route.ts — Route Handler TMA dengan variasi acak kecil (PRD §12)
import { NextResponse } from "next/server";
import { mockReadings7Days, currentTMA } from "@/data/mock-readings";

export async function GET() {
  // Tambah variasi acak ±0.02 m agar terasa hidup (PRD §12)
  const variation = (Math.random() - 0.5) * 0.04;
  const liveTMA = Math.round((currentTMA.value + variation) * 100) / 100;

  return NextResponse.json({
    current: {
      tma: liveTMA,
      trend: currentTMA.trend,
      nwl: currentTMA.nwl,
      lwl: currentTMA.lwl,
      rwl: currentTMA.rwl,
      inflow: currentTMA.inflow + (Math.random() - 0.5) * 2,
      outflow: currentTMA.outflow + (Math.random() - 0.5) * 1,
    },
    series: mockReadings7Days,
    updatedAt: new Date().toISOString(),
  });
}
