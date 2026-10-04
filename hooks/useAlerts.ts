// hooks/useAlerts.ts — React Query hook untuk data peringatan
"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertItem } from "@/types";

interface AlertsResponse {
  currentLevel: "normal" | "waspada" | "siaga" | "awas";
  currentMessage: string;
  currentTimestamp: string;
  alerts: AlertItem[];
  unreadCount: number;
}

async function fetchAlerts(): Promise<AlertsResponse> {
  const res = await fetch("/api/alerts");
  if (!res.ok) throw new Error("Gagal mengambil data peringatan");
  return res.json();
}

export function useAlerts() {
  return useQuery<AlertsResponse, Error>({
    queryKey: ["alerts"],
    queryFn: fetchAlerts,
    refetchInterval: 30_000,
    staleTime: 25_000,
  });
}
