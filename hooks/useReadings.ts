// hooks/useReadings.ts — React Query hook untuk data TMA (polling 30 detik)
"use client";

import { useQuery } from "@tanstack/react-query";
import { WaterLevelReading } from "@/types";

interface ReadingsResponse {
  current: {
    tma: number;
    trend: number;
    nwl: number;
    lwl: number;
    rwl: number;
    inflow: number;
    outflow: number;
  };
  series: WaterLevelReading[];
  updatedAt: string;
}

async function fetchReadings(): Promise<ReadingsResponse> {
  const res = await fetch("/api/readings");
  if (!res.ok) throw new Error("Gagal mengambil data TMA");
  return res.json();
}

export function useReadings() {
  return useQuery<ReadingsResponse, Error>({
    queryKey: ["readings"],
    queryFn: fetchReadings,
    refetchInterval: 30_000,
    staleTime: 25_000,
  });
}
