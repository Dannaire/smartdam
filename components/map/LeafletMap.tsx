"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapMarker } from "@/types";

// Fix icon issue in Leaflet with Next.js
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}

interface LeafletMapProps {
  center: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
}

export default function LeafletMap({
  center,
  zoom = 13,
  markers = [],
  className,
}: LeafletMapProps) {
  return (
    <div className={className} style={{ width: "100%", height: "100%", minHeight: "300px", zIndex: 0 }}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", borderRadius: "inherit", zIndex: 0 }}
      >
        <MapResizer />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Render Center Marker (Dam) */}
        <Marker position={center} icon={customIcon}>
          <Popup>
            <div className="font-sans text-sm">
              <strong className="block mb-1 text-brand-900">Lokasi Bendungan</strong>
              <span className="text-ink-500">{center[0]}, {center[1]}</span>
            </div>
          </Popup>
        </Marker>

        {/* Render Additional Markers if any */}
        {markers.map((marker) => (
          <Marker key={marker.id} position={[marker.lat, marker.lng]} icon={customIcon}>
             <Popup>
               <div className="font-sans text-sm">
                 <strong className="block mb-1 text-brand-900">{marker.name}</strong>
                 {marker.value && <span className="block text-ink-500">Nilai: {marker.value} {marker.unit}</span>}
                 <span className="block text-xs uppercase mt-1 text-brand-600">{marker.type}</span>
               </div>
             </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
