// app/api/instruments/route.ts — Route Handler data instrumen
import { NextResponse } from "next/server";
import { mockInstruments } from "@/data/mock-instruments";

export async function GET() {
  // Tambah variasi kecil pada nilai instrumen
  const liveInstruments = mockInstruments.map((inst) => ({
    ...inst,
    value:
      inst.value !== null
        ? Math.round((inst.value + (Math.random() - 0.5) * inst.value * 0.01) * 100) / 100
        : null,
    updatedAt: new Date().toISOString(),
  }));

  return NextResponse.json(liveInstruments);
}
