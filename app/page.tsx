"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { HeroDam } from "@/components/home/HeroDam";
import { MenuGrid } from "@/components/home/MenuGrid";
import { SummaryCards } from "@/components/home/SummaryCards";
import { FeatureHighlights } from "@/components/home/FeatureHighlights";
import { useReadings } from "@/hooks/useReadings";
import { useAlerts } from "@/hooks/useAlerts";
import { mockDam } from "@/data/mock-dam";

export default function BerandaPage() {
  const { data: readingsData } = useReadings();
  const { data: alertsData } = useAlerts();

  // Fallback to mock data while loading
  const tma = readingsData?.current.tma ?? mockDam.levels.nwl;
  const trend = readingsData?.current.trend ?? 0;
  const nwl = mockDam.levels.nwl;
  const lwl = mockDam.levels.lwl;
  const rainfall = 12.4; // Fixed for now, can come from instrument hook
  const alertLevel = alertsData?.currentLevel ?? mockDam.status;
  const chartData = readingsData?.series ?? [];
  const lastUpdate = readingsData?.updatedAt ?? mockDam.lastUpdate;

  return (
    <PageContainer noPadding className="pb-24 lg:pb-8">
      {/* Hero Section */}
      <HeroDam
        name={mockDam.name}
        status={alertLevel} // Pakai status dari alert
        lastUpdate={lastUpdate}
        image={mockDam.coverImage}
      />

      {/* Grid Menu Fitur (Overlap hero) */}
      <MenuGrid />

      {/* Panel Ringkasan (Desktop) */}
      <SummaryCards
        tma={tma}
        trend={trend}
        nwl={nwl}
        lwl={lwl}
        rainfall={rainfall}
        alertLevel={alertLevel}
        chartData={chartData}
      />

      {/* Feature Highlights (Desktop/Landing) */}
      <FeatureHighlights />
    </PageContainer>
  );
}
