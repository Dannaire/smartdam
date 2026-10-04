// components/layout/AppShell.tsx — Shell layout responsif (PRD §11)
// Mobile: AppBar + BottomNav
// Desktop: Sidebar + Topbar
"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { BottomNav } from "./BottomNav";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-brand-50">
      {/* Desktop: Sidebar kiri */}
      <Sidebar />

      {/* Konten utama — geser ke kanan saat desktop untuk sidebar */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Desktop: Topbar */}
        <Topbar />

        {/* Konten halaman */}
        {children}
      </div>

      {/* Mobile: Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
