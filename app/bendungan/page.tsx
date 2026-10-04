"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { AppBar } from "@/components/layout/AppBar";
import { Tabs } from "@/components/ui/Tabs";
import { mockDam } from "@/data/mock-dam";
import { ProfileTable } from "@/components/dam/ProfileTable";
import { DamMap } from "@/components/dam/DamMap";
import { FunctionCards } from "@/components/dam/FunctionCards";
import Image from "next/image";

export default function InformasiBendunganPage() {
  const [activeTab, setActiveTab] = useState("profil");

  return (
    <>
      <AppBar title="Informasi Bendungan" />
      <PageContainer>
        <div className="flex flex-col gap-4">
          <Tabs
            items={[
              { value: "profil", label: "Profil" },
              { value: "lokasi", label: "Lokasi" },
              { value: "fungsi", label: "Fungsi" },
              { value: "teknis", label: "Teknis" },
            ]}
            value={activeTab}
            onChange={setActiveTab}
          />

          {/* Desktop Layout: 2 kolom (Kiri: Profil/Foto, Kanan: Tab Content) */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 mt-2">
            
            {/* Kolom Kiri: Info Utama (Desktop) / Hidden if not profil on mobile */}
            <div className={`lg:col-span-5 space-y-4 ${activeTab !== "profil" ? "hidden lg:block" : ""}`}>
               <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-sm">
                 <Image
                   src={mockDam.coverImage}
                   alt={mockDam.name}
                   fill
                   className="object-cover"
                 />
               </div>
               <div className="bg-white p-5 rounded-2xl border border-line shadow-sm">
                 <h2 className="text-2xl font-bold text-brand-900 mb-2">{mockDam.name}</h2>
                 <p className="text-ink-500 text-sm leading-relaxed mb-4">
                    Bendungan Sumbawa adalah infrastruktur strategis yang dibangun untuk mengelola sumber daya air di wilayah Sumbawa. Bendungan ini memiliki peran vital dalam mendukung ketahanan pangan, energi, dan penyediaan air bersih.
                 </p>
                 <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-line pb-2">
                       <span className="text-ink-500">Tahun Selesai</span>
                       <span className="font-medium text-ink-900">{mockDam.technical.completionYear}</span>
                    </div>
                    <div className="flex justify-between border-b border-line pb-2">
                       <span className="text-ink-500">Pengelola</span>
                       <span className="font-medium text-ink-900">BBWS Nusa Tenggara</span>
                    </div>
                    <div className="flex justify-between pb-2">
                       <span className="text-ink-500">Kondisi Saat Ini</span>
                       <span className="font-medium text-status-normal">Beroperasi Normal</span>
                    </div>
                 </div>
               </div>
               
               {/* Tabel Profil dimasukkan ke sini sesuai PRD untuk tab Profil */}
               <div className="lg:hidden">
                 <ProfileTable technical={mockDam.technical} />
               </div>
               <div className="hidden lg:block">
                 <ProfileTable technical={mockDam.technical} />
               </div>
            </div>

            {/* Kolom Kanan: Tab Content */}
            <div className="lg:col-span-7">
               {/* Tab Profil (Mobile Only) - Sudah di-handle di kolom kiri untuk Desktop */}
               <div className={`lg:hidden ${activeTab !== "profil" ? "hidden" : ""}`}>
                  {/* Kosong karena sudah tampil di atas (kolom kiri) pada mobile */}
               </div>

               {/* Tab Lokasi */}
               <div className={`${activeTab !== "lokasi" ? "hidden" : "block lg:block"} ${activeTab === 'profil' ? 'lg:hidden' : ''}`}>
                 <h3 className="text-lg font-bold text-brand-900 mb-3 hidden lg:block">Lokasi Bendungan</h3>
                 <DamMap location={mockDam.location} />
               </div>

               {/* Tab Fungsi */}
               <div className={`${activeTab !== "fungsi" ? "hidden" : "block lg:block"} ${activeTab === 'profil' ? 'lg:hidden' : ''}`}>
                 <h3 className="text-lg font-bold text-brand-900 mb-3 hidden lg:block">Fungsi & Manfaat</h3>
                 <FunctionCards functions={mockDam.technical.functions} />
               </div>

               {/* Tab Teknis */}
               <div className={`${activeTab !== "teknis" ? "hidden" : "block lg:block"} ${activeTab === 'profil' ? 'lg:hidden' : ''}`}>
                 <h3 className="text-lg font-bold text-brand-900 mb-3 hidden lg:block">Data Teknis Detail</h3>
                 <div className="bg-white p-5 rounded-2xl border border-line shadow-sm space-y-4">
                    <div>
                      <h4 className="font-semibold text-ink-900 mb-2">Pelimpah (Spillway)</h4>
                      <p className="text-sm text-ink-500">Tipe: Ogee tanpa pintu. Lebar mercu: 40 m. Elevasi mercu: +85.00 m.</p>
                    </div>
                    <div className="border-t border-line pt-4">
                      <h4 className="font-semibold text-ink-900 mb-2">Bangunan Pengambilan</h4>
                      <p className="text-sm text-ink-500">Tipe: Menara (Drop Inlet). Elevasi dasar: +65.00 m. Kapasitas maksimum: 15 m³/s.</p>
                    </div>
                    <div className="border-t border-line pt-4">
                      <h4 className="font-semibold text-ink-900 mb-2">Dimensi & Elevasi</h4>
                      <p className="text-sm text-ink-500">Elevasi Puncak: +90.00 m. Elevasi NWL: +85.00 m. Elevasi LWL: +75.00 m.</p>
                    </div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </PageContainer>
    </>
  );
}
