import { StatusBadge } from "@/components/ui/Badge";
import { AlertLevel } from "@/types";
import { formatDateWIB } from "@/lib/format";
import Image from "next/image";
import { Bell, Droplets } from "lucide-react";
import Link from "next/link";

interface HeroDamProps {
  name: string;
  status: AlertLevel;
  lastUpdate: string;
  image: string;
}

export function HeroDam({ name, status, lastUpdate, image }: HeroDamProps) {
  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[450px]">
      {/* Background Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src = "https://placehold.co/1200x800/e2e8f0/64748b?text=File+Belum+Ada\\n/assets/cover.jpg";
        }}
      />
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/30 to-black/40" />

      {/* Header Mobile (Logo + Bell) */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between lg:hidden z-10">
        <div className="flex items-center gap-2">
          <Droplets className="text-white" size={24} />
          <span className="text-white font-bold">Smart Dam</span>
        </div>
        <Link href="/notifikasi" className="text-white">
          <Bell size={24} />
        </Link>
      </div>

      {/* Content */}
      <div className="absolute bottom-20 md:bottom-28 left-0 right-0 p-4 lg:p-8 z-10 flex flex-col justify-end">
        <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
          {name}
        </h1>
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <StatusBadge level={status} />
          <span className="text-white/80 text-xs md:text-sm">
            Update: {formatDateWIB(lastUpdate)}
          </span>
        </div>
      </div>
    </div>
  );
}
