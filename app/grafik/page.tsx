"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { AppBar } from "@/components/layout/AppBar";
import { Tabs } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";
import dynamic from "next/dynamic";
import { mockChartData } from "@/data/mock-instruments";
import { Skeleton } from "@/components/ui/Skeleton";

const WaterLevelChart = dynamic(() => import("@/components/charts/WaterLevelChart"), { ssr: false, loading: () => <Skeleton className="w-full h-64 md:h-80 lg:h-96" /> });
const RainfallChart = dynamic(() => import("@/components/charts/RainfallChart"), { ssr: false, loading: () => <Skeleton className="w-full h-64 md:h-80 lg:h-96" /> });
const FlowChart = dynamic(() => import("@/components/charts/FlowChart"), { ssr: false, loading: () => <Skeleton className="w-full h-64 md:h-80 lg:h-96" /> });

export default function GrafikPage() {
  const [activeTab, setActiveTab] = useState("tma");
  const [period, setPeriod] = useState("minggu");
  const [showRuleCurve, setShowRuleCurve] = useState(false);

  return (
    <>
      <AppBar title="Grafik & Data" />
      <PageContainer>
        <div className="flex flex-col gap-6">
          <Tabs
            items={[
              { value: "tma", label: "TMA" },
              { value: "hujan", label: "Curah Hujan" },
              { value: "flow", label: "Inflow/Outflow" },
            ]}
            value={activeTab}
            onChange={setActiveTab}
          />

          {/* Controls */}
          <div className="flex flex-wrap gap-3 items-center justify-between bg-white p-3 rounded-xl border border-line shadow-sm">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
               {["hari", "minggu", "bulan", "tahun"].map(p => (
                 <button 
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                      period === p ? "bg-brand-800 text-white" : "bg-brand-50 text-ink-500"
                    }`}
                 >
                   1 {p}
                 </button>
               ))}
            </div>
            <div className="flex items-center gap-3">
              {activeTab === 'tma' && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-brand-600 focus:ring-brand-500" checked={showRuleCurve} onChange={(e) => setShowRuleCurve(e.target.checked)} />
                  <span className="text-xs font-medium text-ink-900">Rule Curve</span>
                </label>
              )}
              <Button variant="outline" size="sm" className="gap-2 text-xs h-8">
                <Download size={14} /> CSV/PDF
              </Button>
            </div>
          </div>

          {/* Chart Card */}
          <Card className="p-4 md:p-6">
            <h2 className="text-base font-bold text-ink-900 mb-6">
              {activeTab === 'tma' ? 'Grafik Tinggi Muka Air Waduk' : 
               activeTab === 'hujan' ? 'Grafik Curah Hujan' : 'Grafik Inflow & Outflow'}
            </h2>
            
            {activeTab === 'tma' && (
              <div className="mb-4">
                 <WaterLevelChart data={mockChartData.tma} showRuleCurve={showRuleCurve} nwl={85.0} lwl={75.0} height={350} />
              </div>
            )}

            {activeTab === 'hujan' && (
              <div className="mb-4">
                 <RainfallChart data={mockChartData.rainfall} />
              </div>
            )}

            {activeTab === 'flow' && (
              <div className="mb-4">
                 <FlowChart data={mockChartData.flow} />
              </div>
            )}
          </Card>

          {/* Data Numerik */}
          <div>
            <h3 className="text-lg font-bold text-ink-900 mb-3">Data Numerik</h3>
            <Card className="flex flex-col divide-y divide-line">
              {activeTab === 'tma' && (
                <>
                  <div className="flex justify-between p-4">
                    <span className="text-ink-600 font-medium">Elevasi Saat Ini</span>
                    <span className="text-brand-600 font-bold">82.35 m</span>
                  </div>
                  <div className="flex justify-between p-4">
                    <span className="text-ink-600 font-medium">NWL</span>
                    <span className="text-brand-600 font-bold">85.00 m</span>
                  </div>
                  <div className="flex justify-between p-4">
                    <span className="text-ink-600 font-medium">LWL</span>
                    <span className="text-brand-600 font-bold">75.00 m</span>
                  </div>
                  <div className="flex justify-between p-4">
                    <span className="text-ink-600 font-medium">Volume Tersedia</span>
                    <span className="text-brand-600 font-bold">12.5 Jt m³</span>
                  </div>
                </>
              )}
              {activeTab === 'hujan' && (
                <>
                  <div className="flex justify-between p-4">
                    <span className="text-ink-600 font-medium">Total Akumulasi</span>
                    <span className="text-brand-600 font-bold">45.2 mm</span>
                  </div>
                  <div className="flex justify-between p-4">
                    <span className="text-ink-600 font-medium">Intensitas Maksimum</span>
                    <span className="text-status-waspada font-bold">12.4 mm/jam</span>
                  </div>
                </>
              )}
              {activeTab === 'flow' && (
                <>
                  <div className="flex justify-between p-4">
                    <span className="text-ink-600 font-medium">Rata-rata Inflow</span>
                    <span className="text-brand-600 font-bold">12.5 m³/s</span>
                  </div>
                  <div className="flex justify-between p-4">
                    <span className="text-ink-600 font-medium">Rata-rata Outflow</span>
                    <span className="text-brand-600 font-bold">10.2 m³/s</span>
                  </div>
                  <div className="flex justify-between p-4">
                    <span className="text-ink-600 font-medium">Neraca Air</span>
                    <span className="text-status-normal font-bold">+ 2.3 m³/s</span>
                  </div>
                </>
              )}
            </Card>
          </div>

        </div>
      </PageContainer>
    </>
  );
}
