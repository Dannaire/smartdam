// data/mock-readings.ts — Data seri TMA 7 hari (23/9–29/9) sesuai PRD §9
import { WaterLevelReading, RainfallReading } from "@/types";

// Seri TMA 7 hari (23 Sep – 29 Sep 2026), naik bertahap dari ~77 ke 82.35
export const mockReadings7Days: WaterLevelReading[] = [
  { timestamp: "2026-09-23T00:00:00.000Z", tma: 77.12, inflow: 18.5, outflow: 15.2 },
  { timestamp: "2026-09-23T12:00:00.000Z", tma: 77.45, inflow: 20.1, outflow: 15.8 },
  { timestamp: "2026-09-24T00:00:00.000Z", tma: 78.03, inflow: 22.3, outflow: 16.0 },
  { timestamp: "2026-09-24T12:00:00.000Z", tma: 78.67, inflow: 24.0, outflow: 16.5 },
  { timestamp: "2026-09-25T00:00:00.000Z", tma: 79.21, inflow: 25.8, outflow: 17.2 },
  { timestamp: "2026-09-25T12:00:00.000Z", tma: 79.88, inflow: 28.2, outflow: 18.0 },
  { timestamp: "2026-09-26T00:00:00.000Z", tma: 80.34, inflow: 30.5, outflow: 18.8 },
  { timestamp: "2026-09-26T12:00:00.000Z", tma: 80.90, inflow: 32.0, outflow: 19.5 },
  { timestamp: "2026-09-27T00:00:00.000Z", tma: 81.22, inflow: 31.5, outflow: 20.0 },
  { timestamp: "2026-09-27T12:00:00.000Z", tma: 81.56, inflow: 33.0, outflow: 21.2 },
  { timestamp: "2026-09-28T00:00:00.000Z", tma: 81.88, inflow: 34.8, outflow: 22.0 },
  { timestamp: "2026-09-28T12:00:00.000Z", tma: 82.10, inflow: 35.5, outflow: 23.0 },
  { timestamp: "2026-09-29T00:00:00.000Z", tma: 82.23, inflow: 36.2, outflow: 24.0 },
  { timestamp: "2026-09-29T02:28:00.000Z", tma: 82.35, inflow: 36.8, outflow: 24.5 },
];

// Nilai TMA saat ini
export const currentTMA = {
  value: 82.35,
  trend: +0.12, // dibanding kemarin
  nwl: 85.0,
  lwl: 75.0,
  rwl: 85.0,
  inflow: 36.8,
  outflow: 24.5,
  powerPlant: 1.2, // MW
};

// Seri curah hujan 24 jam terakhir (mm/jam)
export const mockRainfall24h: RainfallReading[] = [
  { timestamp: "2026-09-28T04:00:00.000Z", value: 0 },
  { timestamp: "2026-09-28T05:00:00.000Z", value: 2.1 },
  { timestamp: "2026-09-28T06:00:00.000Z", value: 5.8 },
  { timestamp: "2026-09-28T07:00:00.000Z", value: 12.4 },
  { timestamp: "2026-09-28T08:00:00.000Z", value: 18.0 },
  { timestamp: "2026-09-28T09:00:00.000Z", value: 22.3 },
  { timestamp: "2026-09-28T10:00:00.000Z", value: 15.6 },
  { timestamp: "2026-09-28T11:00:00.000Z", value: 8.2 },
  { timestamp: "2026-09-28T12:00:00.000Z", value: 4.5 },
  { timestamp: "2026-09-28T13:00:00.000Z", value: 1.2 },
  { timestamp: "2026-09-28T14:00:00.000Z", value: 0.5 },
  { timestamp: "2026-09-28T15:00:00.000Z", value: 0 },
  { timestamp: "2026-09-28T16:00:00.000Z", value: 3.2 },
  { timestamp: "2026-09-28T17:00:00.000Z", value: 8.7 },
  { timestamp: "2026-09-28T18:00:00.000Z", value: 14.3 },
  { timestamp: "2026-09-28T19:00:00.000Z", value: 20.5 },
  { timestamp: "2026-09-28T20:00:00.000Z", value: 25.8 },
  { timestamp: "2026-09-28T21:00:00.000Z", value: 18.4 },
  { timestamp: "2026-09-28T22:00:00.000Z", value: 10.2 },
  { timestamp: "2026-09-28T23:00:00.000Z", value: 5.6 },
  { timestamp: "2026-09-29T00:00:00.000Z", value: 2.3 },
  { timestamp: "2026-09-29T01:00:00.000Z", value: 12.4 },
  { timestamp: "2026-09-29T02:00:00.000Z", value: 12.4 },
  { timestamp: "2026-09-29T03:00:00.000Z", value: 12.4 },
];
