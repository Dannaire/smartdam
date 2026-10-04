// data/mock-alerts.ts — Data notifikasi & peringatan (sesuai PRD §7.4 dan §9)
import { AlertItem, OperationSchedule, SpillwayGate } from "@/types";

export const mockAlerts: AlertItem[] = [
  {
    id: "alert-001",
    kind: "peringatan",
    level: "siaga",
    title: "Status Siaga",
    message:
      "Potensi peningkatan inflow akibat hujan lebat di hulu.",
    createdAt: "2026-09-29T01:30:00.000Z", // 29 Sep 2026 08.30 WIB
    read: false,
  },
  {
    id: "alert-002",
    kind: "operasi",
    level: "waspada",
    title: "Rencana Pelepasan Air",
    message:
      "Pelepasan air melalui spillway mulai 30 Sep 2026 pukul 10.00 WIB. Debit rencana: 150 m³/det.",
    createdAt: "2026-09-29T01:30:00.000Z", // 29 Sep 08.30
    read: false,
  },
  {
    id: "alert-003",
    kind: "peringatan",
    level: "waspada",
    title: "Peningkatan Curah Hujan",
    message: "Curah hujan tinggi di DAS hulu (> 50 mm/jam).",
    createdAt: "2026-09-28T23:15:00.000Z", // 29 Sep 06.15 WIB
    read: false,
  },
  {
    id: "alert-004",
    kind: "info",
    level: "normal",
    title: "Kondisi Normal",
    message: "Semua parameter dalam batas aman.",
    createdAt: "2026-09-28T11:00:00.000Z", // 28 Sep 18.00 WIB
    read: true,
  },
];

// Status peringatan saat ini (sesuai PRD — "Siaga" di halaman peringatan)
export const currentAlertStatus: {
  level: "normal" | "waspada" | "siaga" | "awas";
  message: string;
  timestamp: string;
} = {
  level: "siaga",
  message: "Potensi peningkatan inflow akibat hujan lebat di hulu.",
  timestamp: "2026-09-29T01:30:00.000Z",
};

export const mockOperationSchedules: OperationSchedule[] = [
  {
    id: "ops-001",
    title: "Pelepasan Air melalui Spillway",
    startAt: "2026-09-30T03:00:00.000Z", // 30 Sep pukul 10.00 WIB
    plannedDischarge: 150,
    status: "terjadwal",
  },
  {
    id: "ops-002",
    title: "Operasi Pintu Pengambilan Irigasi",
    startAt: "2026-09-29T01:00:00.000Z", // 29 Sep 08.00 WIB
    plannedDischarge: 3.5,
    status: "berlangsung",
  },
  {
    id: "ops-003",
    title: "Penutupan Pintu Pembilas Sedimen",
    startAt: "2026-09-27T02:00:00.000Z",
    plannedDischarge: 0,
    status: "selesai",
  },
];

export const mockSpillwayGates: SpillwayGate[] = [
  {
    id: "gate-spillway-1",
    name: "Pintu Spillway 1",
    isOpen: false,
    openingPercent: 0,
    discharge: 0,
  },
  {
    id: "gate-spillway-2",
    name: "Pintu Spillway 2",
    isOpen: false,
    openingPercent: 0,
    discharge: 0,
  },
  {
    id: "gate-irrigation",
    name: "Pintu Pengambilan Irigasi",
    isOpen: true,
    openingPercent: 45,
    discharge: 3.5,
  },
  {
    id: "gate-water-supply",
    name: "Pintu Air Baku",
    isOpen: true,
    openingPercent: 30,
    discharge: 0.076,
  },
];
