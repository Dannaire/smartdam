// components/layout/Topbar.tsx — Topbar desktop (PRD §5.4 & §11)
"use client";

import { Bell, Search, User } from "lucide-react";
import Link from "next/link";
import { useAlerts } from "@/hooks/useAlerts";
import { StatusBadge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function Topbar() {
  const { data: alertsData } = useAlerts();
  const unreadCount = alertsData?.unreadCount ?? 0;
  const alertLevel = alertsData?.currentLevel ?? "normal";

  return (
    <header className="hidden lg:flex items-center gap-4 h-16 bg-white border-b border-line px-6 sticky top-0 z-30">
      {/* Search */}
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500"
          />
          <input
            type="search"
            placeholder="Cari fitur..."
            className={cn(
              "w-full h-9 pl-9 pr-4 rounded-xl text-sm",
              "bg-brand-50 border border-line",
              "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
              "placeholder:text-ink-500"
            )}
          />
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <span className="hidden xl:block">Update:</span>
        <StatusBadge level={alertLevel} />
      </div>

      {/* Notifikasi */}
      <Link
        href="/notifikasi"
        className="relative flex items-center justify-center w-9 h-9 rounded-xl hover:bg-brand-50 transition-colors"
        aria-label={`Notifikasi${unreadCount > 0 ? ` (${unreadCount} belum dibaca)` : ""}`}
      >
        <Bell size={20} className="text-ink-500" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 rounded-full bg-status-awas text-white text-[9px] font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Link>

      {/* Avatar/Profil */}
      <Link
        href="/profil"
        className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-100 text-brand-800 hover:bg-brand-200 transition-colors"
        aria-label="Profil pengguna"
      >
        <User size={18} />
      </Link>
    </header>
  );
}
