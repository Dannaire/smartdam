// components/layout/BottomNav.tsx — Bottom navigation mobile (PRD §5.4 & §11)
"use client";

import { cn } from "@/lib/utils";
import { Home, Map, Bell, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAlerts } from "@/hooks/useAlerts";

const navItems = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/peta", label: "Peta", icon: Map },
  { href: "/notifikasi", label: "Notifikasi", icon: Bell },
  { href: "/profil", label: "Profil", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const { data: alertsData } = useAlerts();
  const unreadCount = alertsData?.unreadCount ?? 0;

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 lg:hidden",
        "bg-white border-t border-line",
        "pb-[env(safe-area-inset-bottom)]"
      )}
      aria-label="Navigasi utama"
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 flex-1 h-full",
                "min-w-[44px] transition-colors duration-150",
                isActive ? "text-brand-800" : "text-ink-500 hover:text-ink-900"
              )}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                {/* Badge merah untuk Notifikasi */}
                {item.href === "/notifikasi" && unreadCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 flex items-center justify-center
                      w-4 h-4 rounded-full bg-status-awas text-white text-[10px] font-bold"
                    aria-label={`${unreadCount} notifikasi belum dibaca`}
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </div>
              <span className={cn("text-[10px] font-medium", isActive && "text-brand-800")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
