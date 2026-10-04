// app/api/alerts/route.ts — Route Handler data peringatan
import { NextResponse } from "next/server";
import { mockAlerts, currentAlertStatus } from "@/data/mock-alerts";

export async function GET() {
  const unreadCount = mockAlerts.filter((a) => !a.read).length;

  return NextResponse.json({
    currentLevel: currentAlertStatus.level,
    currentMessage: currentAlertStatus.message,
    currentTimestamp: currentAlertStatus.timestamp,
    alerts: mockAlerts,
    unreadCount,
  });
}
