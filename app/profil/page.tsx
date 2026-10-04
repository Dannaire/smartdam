"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { AppBar } from "@/components/layout/AppBar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Settings, Globe, Moon, LogOut, ChevronRight, Activity } from "lucide-react";
import Image from "next/image";

export default function ProfilPage() {
  return (
    <>
      <AppBar title="Profil & Pengaturan" />
      <PageContainer>
        <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
          
          {/* Header Profil */}
          <Card className="p-6 flex flex-col items-center text-center">
             <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-brand-50 bg-brand-100 flex items-center justify-center">
                <img 
                  src="https://ui-avatars.com/api/?name=Budi+Santoso&background=2F80ED&color=fff&size=256" 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
             </div>
             <h2 className="text-xl font-bold text-ink-900 mb-1">Ir. Budi Santoso, MT</h2>
             <p className="text-sm text-ink-500 mb-1">Kepala Unit Pengelola Bendungan</p>
             <p className="text-xs bg-ink-100 text-ink-600 px-3 py-1 rounded-full inline-block mt-2 font-medium">NIP: 19800512 200501 1 003</p>
          </Card>

          {/* Statistik Aktivitas */}
          <section>
             <h3 className="text-sm font-bold text-ink-900 mb-3 px-1">Aktivitas Anda</h3>
             <div className="grid grid-cols-2 gap-3">
                <Card className="p-4 flex items-center gap-3">
                   <div className="p-2 bg-brand-50 text-brand-600 rounded-lg"><Activity size={20} /></div>
                   <div>
                      <p className="text-2xl font-bold text-ink-900">142</p>
                      <p className="text-xs text-ink-500">Laporan Dilihat</p>
                   </div>
                </Card>
                <Card className="p-4 flex items-center gap-3">
                   <div className="p-2 bg-status-siaga/10 text-status-siaga rounded-lg"><Activity size={20} /></div>
                   <div>
                      <p className="text-2xl font-bold text-ink-900">12</p>
                      <p className="text-xs text-ink-500">Aksi Operasi</p>
                   </div>
                </Card>
             </div>
          </section>

          {/* Pengaturan */}
          <section>
             <h3 className="text-sm font-bold text-ink-900 mb-3 px-1">Pengaturan Aplikasi</h3>
             <Card className="flex flex-col divide-y divide-line">
                <button className="flex items-center justify-between p-4 hover:bg-ink-50 transition-colors">
                   <div className="flex items-center gap-3">
                      <Globe size={20} className="text-ink-500" />
                      <div className="text-left">
                         <p className="font-semibold text-ink-900 text-sm">Bahasa</p>
                         <p className="text-xs text-ink-500">Indonesia (ID)</p>
                      </div>
                   </div>
                   <ChevronRight size={18} className="text-ink-400" />
                </button>
                <button className="flex items-center justify-between p-4 hover:bg-ink-50 transition-colors">
                   <div className="flex items-center gap-3">
                      <Moon size={20} className="text-ink-500" />
                      <div className="text-left">
                         <p className="font-semibold text-ink-900 text-sm">Tema Tampilan</p>
                         <p className="text-xs text-ink-500">Mode Terang</p>
                      </div>
                   </div>
                   <div className="w-10 h-5 bg-ink-200 rounded-full relative">
                      <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all" />
                   </div>
                </button>
                <button className="flex items-center justify-between p-4 hover:bg-ink-50 transition-colors">
                   <div className="flex items-center gap-3">
                      <Settings size={20} className="text-ink-500" />
                      <div className="text-left">
                         <p className="font-semibold text-ink-900 text-sm">Preferensi Notifikasi</p>
                         <p className="text-xs text-ink-500">Push, Email</p>
                      </div>
                   </div>
                   <ChevronRight size={18} className="text-ink-400" />
                </button>
             </Card>
          </section>

          {/* Logout */}
          <Button variant="outline" className="w-full text-status-awas border-status-awas hover:bg-danger-bg mt-4 gap-2">
             <LogOut size={18} /> Keluar Akun
          </Button>
          
          <p className="text-center text-xs text-ink-400 mt-2 mb-8">
             Smart Dam App v1.0.0
          </p>
        </div>
      </PageContainer>
    </>
  );
}
