"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { AppBar } from "@/components/layout/AppBar";
import { AlertStatusCard } from "@/components/alerts/AlertStatusCard";
import { NotificationItem } from "@/components/alerts/NotificationItem";
import { LevelLegend } from "@/components/alerts/LevelLegend";
import { useAlerts } from "@/hooks/useAlerts";
import { mockDam } from "@/data/mock-dam";

export default function PeringatanPage() {
  const { data: alertsData, isLoading } = useAlerts();
  const [filter, setFilter] = useState<"semua" | "peringatan" | "operasi" | "info">("semua");

  const currentLevel = alertsData?.currentLevel ?? mockDam.status;
  const currentMessage = alertsData?.currentMessage ?? "Kondisi parameter aman, operasi berjalan normal.";
  
  // Dummy timestamp if not provided
  const updateTime = new Date().toISOString();

  const filteredAlerts = alertsData?.alerts?.filter(
    (item) => filter === "semua" || item.kind === filter
  ) ?? [];

  return (
    <>
      <AppBar title="Peringatan Dini" />
      <PageContainer>
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
          {/* Kolom Kiri: Status & Daftar Notifikasi */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <AlertStatusCard
              level={currentLevel}
              message={currentMessage}
              time={updateTime}
            />

            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                <h3 className="text-lg font-bold text-ink-900">Notifikasi Terbaru</h3>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide w-full md:w-auto">
                  {["semua", "peringatan", "operasi", "info"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f as "semua" | "peringatan" | "operasi" | "info")}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                        filter === f
                          ? "bg-brand-800 text-white"
                          : "bg-white border border-line text-ink-500 hover:bg-brand-50"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {isLoading ? (
                <div className="text-sm text-ink-500">Memuat notifikasi...</div>
              ) : filteredAlerts.length > 0 ? (
                <div className="space-y-3">
                  {filteredAlerts.map((item) => (
                    <NotificationItem key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-ink-500 text-sm">
                  Tidak ada notifikasi untuk filter ini.
                </div>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Panduan (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24">
              <LevelLegend />
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
