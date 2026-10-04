// types/index.ts — Smart Dam type definitions (persis sesuai PRD §9)

export type AlertLevel = "normal" | "waspada" | "siaga" | "awas";

export type AccessMode = "publik" | "instansi";

export interface Dam {
  id: string;
  name: string; // "Bendungan Sumbawa"
  status: AlertLevel;
  lastUpdate: string; // ISO
  coverImage: string;
  description: string;
  location: { lat: number; lng: number; address: string };
  technical: {
    type: string;
    height: number;
    crestLength: number;
    totalStorage: number;
    effectiveStorage: number;
    deadStorage: number;
    reservoirArea: number;
    functions: string[];
    completionYear?: string;
    operator?: string;
  };
  levels: { nwl: number; lwl: number; rwl: number };
}

export interface WaterLevelReading {
  timestamp: string;
  tma: number; // meter
  inflow?: number; // m3/s
  outflow?: number; // m3/s
}

export interface Instrument {
  id: string;
  type: "awlr" | "arg" | "piezometer" | "inclinometer" | "seismograph" | "cctv";
  name: string;
  value: number | null;
  unit: string; // mm/jam, kPa, mm, g
  status: AlertLevel;
  lat?: number;
  lng?: number;
  updatedAt: string;
  threshold?: { warning: number; danger: number };
}

export interface AlertItem {
  id: string;
  kind: "peringatan" | "operasi" | "info";
  level: AlertLevel;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface OperationSchedule {
  id: string;
  title: string;
  startAt: string;
  plannedDischarge: number; // m3/s
  status: "terjadwal" | "berlangsung" | "selesai";
}

export interface RainfallReading {
  timestamp: string;
  value: number; // mm/jam
}

export interface GalleryItem {
  id: string;
  type: "foto" | "video";
  src: string;
  thumbnail: string;
  caption: string;
}

export interface SpillwayGate {
  id: string;
  name: string;
  isOpen: boolean;
  openingPercent: number;
  discharge: number; // m3/s
}

export interface MapMarker {
  id: string;
  type: "dam" | "awlr" | "arg" | "piezometer" | "inclinometer" | "seismograph" | "pos";
  name: string;
  lat: number;
  lng: number;
  value?: number;
  unit?: string;
  status: AlertLevel;
}
