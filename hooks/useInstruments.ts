// hooks/useInstruments.ts — React Query hook untuk data instrumen
"use client";

import { useQuery } from "@tanstack/react-query";
import { Instrument } from "@/types";

async function fetchInstruments(): Promise<Instrument[]> {
  const res = await fetch("/api/instruments");
  if (!res.ok) throw new Error("Gagal mengambil data instrumen");
  return res.json();
}

export function useInstruments() {
  return useQuery<Instrument[], Error>({
    queryKey: ["instruments"],
    queryFn: fetchInstruments,
    refetchInterval: 30_000,
    staleTime: 25_000,
  });
}
