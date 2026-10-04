"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { MapPin } from "lucide-react";

const Map = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[300px] md:h-[400px] rounded-2xl" />,
});

interface DamMapProps {
  location: { lat: number; lng: number; address: string };
}

export function DamMap({ location }: DamMapProps) {
  const openGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`, "_blank");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl overflow-hidden border border-line h-[300px] md:h-[400px] relative">
        <Map center={[location.lat, location.lng]} />
      </div>
      
      <div className="bg-white p-4 rounded-xl border border-line flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-ink-900 mb-1">Koordinat Lokasi</h4>
          <p className="text-sm text-ink-500 font-mono">
            {location.lat}, {location.lng}
          </p>
          <p className="text-sm text-ink-500 mt-1">
            {location.address}
          </p>
        </div>
        <Button variant="outline" onClick={openGoogleMaps} className="shrink-0 w-full sm:w-auto">
          <MapPin size={18} /> Buka di Google Maps
        </Button>
      </div>
    </div>
  );
}
