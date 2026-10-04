"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { AppBar } from "@/components/layout/AppBar";
import { WaterGateCard } from "@/components/operasi/WaterGateCard";
import { OperationPlanTable } from "@/components/operasi/OperationPlanTable";

export default function OperasiWadukPage() {
  return (
    <>
      <AppBar title="Operasi Waduk" />
      <PageContainer>
        <div className="flex flex-col gap-6">
          
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-ink-900">Rencana Operasi Mingguan</h2>
              <p className="text-sm text-ink-500">Periode: 29 Sep - 05 Okt 2026</p>
            </div>
            <OperationPlanTable />
          </section>

          <section className="mt-4">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-ink-900">Status Pintu Air</h2>
              <p className="text-sm text-ink-500">Kondisi terkini spillway dan intake.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               <WaterGateCard 
                 id="g1" 
                 name="Spillway Gate 1" 
                 type="spillway" 
                 status="terbuka" 
                 openingPercent={50} 
               />
               <WaterGateCard 
                 id="g2" 
                 name="Spillway Gate 2" 
                 type="spillway" 
                 status="tertutup" 
                 openingPercent={0} 
               />
               <WaterGateCard 
                 id="i1" 
                 name="Intake Irigasi Utama" 
                 type="intake" 
                 status="terbuka" 
                 openingPercent={75} 
               />
               <WaterGateCard 
                 id="i2" 
                 name="Intake Air Baku" 
                 type="intake" 
                 status="terbuka" 
                 openingPercent={100} 
               />
            </div>
          </section>

        </div>
      </PageContainer>
    </>
  );
}
