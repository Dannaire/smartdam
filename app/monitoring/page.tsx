"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { AppBar } from "@/components/layout/AppBar";
import { Tabs } from "@/components/ui/Tabs";
import { WaterLevelCard } from "@/components/monitoring/WaterLevelCard";
import { InstrumentCard } from "@/components/monitoring/InstrumentCard";
import { WeatherPanel } from "@/components/monitoring/WeatherPanel";
import { Button } from "@/components/ui/Button";
import { useReadings } from "@/hooks/useReadings";
import { useInstruments } from "@/hooks/useInstruments";
import { instrumentSummary } from "@/data/mock-instruments";
import { CloudRain, Activity, TrendingUp } from "lucide-react";
import Link from "next/link";
import { LiveIndicator } from "@/components/ui/LiveIndicator";
import { formatRelativeTime } from "@/lib/format";

export default function MonitoringPage() {
  const [activeTab, setActiveTab] = useState("waduk");
  const { data: readingsData, isFetching: isReadingsFetching } = useReadings();
  const { data: instrumentsData } = useInstruments();

  const tma = readingsData?.current.tma ?? 82.35;
  const trend = readingsData?.current.trend ?? 0.12;
  const nwl = readingsData?.current.nwl ?? 85.0;
  const lwl = readingsData?.current.lwl ?? 75.0;
  const updatedAt = readingsData?.updatedAt;

  return (
    <>
      <AppBar title="Monitoring Real-Time" />
      <PageContainer>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
             <Tabs
              items={[
                { value: "waduk", label: "Waduk" },
                { value: "struktur", label: "Struktur" },
                { value: "cuaca", label: "Cuaca" },
              ]}
              value={activeTab}
              onChange={setActiveTab}
            />
            {isReadingsFetching ? (
              <span className="text-xs text-ink-500">Memperbarui...</span>
            ) : (
              <div className="flex flex-col items-end">
                <LiveIndicator />
                {updatedAt && (
                   <span className="text-[10px] text-ink-500 mt-0.5">
                     {formatRelativeTime(updatedAt)}
                   </span>
                )}
              </div>
            )}
          </div>

          <div className="lg:grid lg:grid-cols-3 lg:gap-6">
            {/* Tampilan Desktop: Tampilkan semua panel jika layar lebar */}
            
            {/* Panel Waduk */}
            <div className={`space-y-4 ${activeTab !== "waduk" ? "hidden lg:block" : ""}`}>
              <WaterLevelCard tma={tma} trend={trend} nwl={nwl} lwl={lwl} />
              
              <div className="mt-4">
                 <h3 className="text-sm font-semibold text-ink-900 mb-2">Parameter Instrumen</h3>
                 <div className="grid grid-cols-2 gap-3">
                   <InstrumentCard
                     label="Curah Hujan"
                     value={instrumentSummary.rainfall.value}
                     unit={instrumentSummary.rainfall.unit}
                     icon={CloudRain}
                     status={instrumentSummary.rainfall.status}
                   />
                   <InstrumentCard
                     label="Tekanan Air Pori"
                     value={instrumentSummary.porePressure.value}
                     unit={instrumentSummary.porePressure.unit}
                     icon={Activity}
                     status={instrumentSummary.porePressure.status}
                   />
                   <InstrumentCard
                     label="Deformasi"
                     value={instrumentSummary.deformation.value}
                     unit={instrumentSummary.deformation.unit}
                     icon={TrendingUp}
                     status={instrumentSummary.deformation.status}
                   />
                   <InstrumentCard
                     label="Getaran (Seismograph)"
                     value={instrumentSummary.seismic.value}
                     unit={instrumentSummary.seismic.unit}
                     icon={Activity}
                     status={instrumentSummary.seismic.status}
                   />
                 </div>
              </div>

              <div className="mt-6 mb-24">
                 <Link href="/monitoring/instrumen" className="w-full block">
                   <Button variant="primary" fullWidth>
                     Lihat Semua Data Instrumentasi
                   </Button>
                 </Link>
              </div>
            </div>

            {/* Panel Struktur */}
            <div className={`space-y-4 ${activeTab !== "struktur" ? "hidden lg:block" : ""}`}>
               {/* Gunakan data instrumen asli di sini jika ada */}
               <div className="bg-white rounded-2xl border border-line p-4">
                  <h3 className="text-sm font-semibold text-ink-900 mb-4">Status Struktur Bendungan</h3>
                  <div className="space-y-3">
                     {instrumentsData?.filter(i => i.type === "piezometer" || i.type === "inclinometer").map(inst => (
                        <div key={inst.id} className="flex justify-between items-center pb-2 border-b border-line last:border-0 last:pb-0">
                           <div>
                              <p className="text-sm font-medium text-ink-900">{inst.name}</p>
                              <p className="text-xs text-ink-500">Nilai: {inst.value} {inst.unit}</p>
                           </div>
                           <span className={`text-[10px] px-2 py-1 rounded-full ${inst.status === 'normal' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {inst.status.toUpperCase()}
                           </span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Panel Cuaca */}
            <div className={`space-y-4 ${activeTab !== "cuaca" ? "hidden lg:block" : ""}`}>
              <WeatherPanel />
              <div className="bg-white rounded-2xl border border-line p-4">
                  <h3 className="text-sm font-semibold text-ink-900 mb-4">Status Operasi</h3>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <p className="text-xs text-ink-500 mb-1">Inflow</p>
                        <p className="text-lg font-bold text-brand-800">{readingsData?.current.inflow.toFixed(1)} <span className="text-xs font-normal text-ink-500">m³/s</span></p>
                     </div>
                     <div>
                        <p className="text-xs text-ink-500 mb-1">Outflow</p>
                        <p className="text-lg font-bold text-brand-800">{readingsData?.current.outflow.toFixed(1)} <span className="text-xs font-normal text-ink-500">m³/s</span></p>
                     </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
