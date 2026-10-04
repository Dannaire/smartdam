"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { AppBar } from "@/components/layout/AppBar";
import { NotificationItem } from "@/components/alerts/NotificationItem";
import { useAlerts } from "@/hooks/useAlerts";

export default function NotifikasiPage() {
  const { data: alertsData, isLoading } = useAlerts();
  const [filter, setFilter] = useState<"semua" | "peringatan" | "operasi" | "info">("semua");

  const filteredAlerts = alertsData?.alerts?.filter(
    (item) => filter === "semua" || item.kind === filter
  ) ?? [];

  return (
    <>
      <AppBar title="Pusat Notifikasi" />
      <PageContainer>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide w-full">
            {["semua", "peringatan", "operasi", "info"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as "semua" | "peringatan" | "operasi" | "info")}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                  filter === f
                    ? "bg-brand-800 text-white"
                    : "bg-white border border-line text-ink-500 hover:bg-brand-50"
                }`}
              >
                {f}
              </button>
            ))}
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
            <div className="text-center py-12 text-ink-500 text-sm">
              Tidak ada notifikasi untuk filter ini.
            </div>
          )}
        </div>
      </PageContainer>
    </>
  );
}
