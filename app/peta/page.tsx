"use client";

import { useState } from "react";
import { AppBar } from "@/components/layout/AppBar";
import { Navigation, X } from "lucide-react";
import dynamic from "next/dynamic";
import { mockInstruments } from "@/data/mock-instruments";
import { Instrument } from "@/types";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

// Dynamically import MapViewer to avoid window/SSR issues with Leaflet
const MapViewer = dynamic(() => import("@/components/map/MapViewer"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full rounded-none" />
});

export default function PetaPage() {
  const [selectedSensor, setSelectedSensor] = useState<Instrument | null>(null);

  return (
    <>
      <AppBar title="Peta Interaktif" />
      <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-brand-50">
         
         <div className="absolute inset-0 z-0">
           <MapViewer instruments={mockInstruments} onSelect={setSelectedSensor} />
         </div>

         {/* Selected Sensor Overlay */}
         {selectedSensor && (
           <div className="absolute bottom-24 lg:bottom-8 left-4 right-4 lg:left-1/2 lg:-translate-x-1/2 lg:w-96 z-[1000] animate-in slide-in-from-bottom-8 fade-in duration-300">
             <Card className="p-4 shadow-xl border-2 border-brand-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-ink-900">{selectedSensor.name}</h3>
                    <p className="text-xs text-ink-500 uppercase tracking-wider">{selectedSensor.type}</p>
                  </div>
                  <button onClick={() => setSelectedSensor(null)} className="p-1 rounded-full hover:bg-ink-100 text-ink-500">
                    <X size={18} />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                   <div className="bg-brand-50 p-3 rounded-xl border border-brand-100">
                     <p className="text-xs text-brand-700 mb-1">Nilai Pembacaan</p>
                     <p className="font-bold text-lg text-brand-900">
                       {selectedSensor.value !== null ? `${selectedSensor.value} ${selectedSensor.unit}` : '-'}
                     </p>
                   </div>
                   <div className="bg-ink-50 p-3 rounded-xl border border-line">
                     <p className="text-xs text-ink-600 mb-1">Status</p>
                     <p className="font-bold text-sm uppercase">
                       <span className={
                         selectedSensor.status === 'normal' ? 'text-status-normal' :
                         selectedSensor.status === 'waspada' ? 'text-status-waspada' :
                         selectedSensor.status === 'siaga' ? 'text-status-siaga' : 'text-status-awas'
                       }>{selectedSensor.status}</span>
                     </p>
                   </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[10px] text-ink-500 border-t border-line pt-3">
                   <span>Koordinat: {selectedSensor.lat.toFixed(4)}, {selectedSensor.lng.toFixed(4)}</span>
                   <span>Update: Hari Ini</span>
                </div>
             </Card>
           </div>
         )}
         
         {/* Floating Actions */}
         <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
            <button className="p-3 bg-white rounded-full shadow-lg border border-line text-ink-700 hover:text-brand-600 transition-colors">
               <Navigation size={20} />
            </button>
         </div>
      </div>
    </>
  );
}
