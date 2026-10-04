"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Instrument } from "@/types";

// Fix Leaflet's default icon path issues in Next.js
// Custom icons based on status
const createIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
};

const getIconColor = (status: string) => {
  switch (status) {
    case 'normal': return '#22C55E';
    case 'waspada': return '#EAB308';
    case 'siaga': return '#F97316';
    case 'awas': return '#EF4444';
    default: return '#6B7280';
  }
};

interface MapViewerProps {
  instruments: Instrument[];
  onSelect: (inst: Instrument) => void;
}

export default function MapViewer({ instruments, onSelect }: MapViewerProps) {
  const center: [number, number] = [-8.5789, 117.4231];

  return (
    <MapContainer 
      center={center} 
      zoom={16} 
      style={{ width: "100%", height: "100%", zIndex: 0 }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {instruments.filter(i => i.lat !== undefined && i.lng !== undefined).map(inst => (
        <Marker 
          key={inst.id} 
          position={[inst.lat as number, inst.lng as number]}
          icon={createIcon(getIconColor(inst.status))}
          eventHandlers={{
            click: () => onSelect(inst),
          }}
        >
          <Popup>
            <div className="text-center font-semibold text-sm">{inst.name}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
