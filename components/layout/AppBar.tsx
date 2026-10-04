// components/layout/AppBar.tsx — App bar mobile (PRD §5.3 & §11)
"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface AppBarProps {
  title: string;
  back?: string; // href untuk tombol back
  right?: ReactNode;
  transparent?: boolean;
}

export function AppBar({ title, back, right, transparent = false }: AppBarProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between h-14 px-4 sticky top-0 z-30",
        transparent
          ? "bg-transparent"
          : "bg-brand-800 text-white"
      )}
    >
      {/* Tombol back atau spacer */}
      <div className="w-10">
        {back && (
          <Link
            href={back}
            className={cn(
              "inline-flex items-center justify-center w-9 h-9 rounded-full",
              "hover:bg-white/10 transition-colors",
              transparent ? "text-white" : "text-white"
            )}
            aria-label="Kembali"
          >
            <ArrowLeft size={20} />
          </Link>
        )}
      </div>

      {/* Judul tengah */}
      <h1
        className={cn(
          "text-base font-semibold truncate text-center flex-1",
          transparent ? "text-white" : "text-white"
        )}
      >
        {title}
      </h1>

      {/* Slot kanan */}
      <div className="w-10 flex justify-end">
        {right}
      </div>
    </header>
  );
}
