// components/layout/Sidebar.tsx — Sidebar desktop (PRD §5.4 & §11)
"use client";

import { cn } from "@/lib/utils";
import {
  Home,
  Activity,
  Info,
  AlertTriangle,
  BarChart2,
  Settings,
  Image,
  Map,
  Bell,
  User,
  Droplets,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAlerts } from "@/hooks/useAlerts";
import { StatusBadge } from "@/components/ui/Badge";

const mainMenuItems = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/peta", label: "Peta", icon: Map },
  { href: "/notifikasi", label: "Notifikasi", icon: Bell },
  { href: "/profil", label: "Profil", icon: User },
];

const featureMenuItems = [
  { href: "/monitoring", label: "Monitoring Real-Time", icon: Activity },
  { href: "/bendungan", label: "Informasi Bendungan", icon: Info },
  { href: "/peringatan", label: "Peringatan Dini", icon: AlertTriangle },
  { href: "/grafik", label: "Grafik & Data", icon: BarChart2 },
  { href: "/operasi", label: "Operasi Waduk", icon: Settings },
  { href: "/galeri", label: "Galeri & Wisata", icon: Image },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: alertsData } = useAlerts();
  const unreadCount = alertsData?.unreadCount ?? 0;
  const alertLevel = alertsData?.currentLevel ?? "normal";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside
      className="hidden lg:flex flex-col w-64 h-screen bg-white border-r border-line fixed left-0 top-0 z-40"
      aria-label="Sidebar navigasi"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-line">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-800 text-white flex-shrink-0">
          <Droplets size={18} />
        </div>
        <div>
          <p className="text-base font-bold text-brand-900 leading-tight">Smart Dam</p>
          <p className="text-[11px] text-ink-500">Monitoring Bendungan</p>
        </div>
      </div>

      {/* Status mini */}
      <div className="px-4 py-3 border-b border-line">
        <div className="flex items-center justify-between">
          <span className="text-xs text-ink-500">Status Bendungan</span>
          <StatusBadge level={alertLevel} />
        </div>
      </div>

      {/* Menu utama */}
      <div className="flex-1 overflow-y-auto py-4 space-y-1">
        <div className="px-4 mb-2">
          <p className="text-[10px] font-semibold text-ink-500 uppercase tracking-wider">
            Navigasi
          </p>
        </div>
        {mainMenuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 mx-3 px-3 py-2.5 rounded-xl text-sm font-medium",
                "transition-all duration-150",
                active
                  ? "bg-brand-50 text-brand-800"
                  : "text-ink-500 hover:bg-gray-50 hover:text-ink-900"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon
                size={18}
                strokeWidth={active ? 2.5 : 1.8}
                className={active ? "text-brand-800" : "text-ink-500"}
              />
              <span className="flex-1">{item.label}</span>
              {item.href === "/notifikasi" && unreadCount > 0 && (
                <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-status-awas text-white text-[10px] font-bold">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>
          );
        })}

        <div className="px-4 mt-4 mb-2">
          <p className="text-[10px] font-semibold text-ink-500 uppercase tracking-wider">
            Fitur
          </p>
        </div>
        {featureMenuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 mx-3 px-3 py-2.5 rounded-xl text-sm font-medium",
                "transition-all duration-150",
                active
                  ? "bg-brand-50 text-brand-800"
                  : "text-ink-500 hover:bg-gray-50 hover:text-ink-900"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon
                size={18}
                strokeWidth={active ? 2.5 : 1.8}
                className={active ? "text-brand-800" : "text-ink-500"}
              />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Footer sidebar */}
      <div className="px-4 py-3 border-t border-line">
        <p className="text-[11px] text-ink-500 text-center">
          Smart Dam v1.0 · BBWS Nusa Tenggara
        </p>
      </div>
    </aside>
  );
}
