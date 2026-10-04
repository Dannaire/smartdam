"use client";

import { motion } from "framer-motion";

interface DamCrossSectionProps {
  percent: number; // 0 to 1
}

export function DamCrossSection({ percent }: DamCrossSectionProps) {
  // Batasi persentase antara 0% - 100%
  const validPercent = Math.min(Math.max(percent, 0), 1);
  const waterHeight = validPercent * 100;

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-brand-50 border border-brand-100 flex items-end">
      {/* Air Waduk (Animasi Ketinggian) */}
      <motion.div
        className="absolute left-0 bottom-0 bg-brand-500/80 backdrop-blur-sm"
        style={{ right: "40%" }} // Air hanya sampai dinding bendungan
        initial={{ height: 0 }}
        animate={{ height: `${waterHeight}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Riak air */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-100/50" />
      </motion.div>

      {/* Dinding Bendungan SVG */}
      <div className="absolute bottom-0 right-0 w-[60%] h-full flex justify-end">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-full w-full fill-ink-500"
        >
          {/* Urugan Zonal / Trapezoid */}
          <polygon points="20,100 40,20 60,20 100,100" className="fill-[#667085]" />
          <polygon points="40,20 60,20 70,50 30,50" className="fill-[#475467]" />
        </svg>
      </div>

      {/* Label Ketinggian Air (Opsional) */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[10px] font-semibold text-brand-800 bg-white/80 px-2 py-1 rounded-md backdrop-blur-md">
          {Math.round(validPercent * 100)}% Kapasitas
        </span>
      </div>
    </div>
  );
}
