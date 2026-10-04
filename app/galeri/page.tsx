"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { AppBar } from "@/components/layout/AppBar";
import { Card } from "@/components/ui/Card";
import { Clock, Ticket, MapPin } from "lucide-react";
import Image from "next/image";

const galleryImages = [
  "/assets/sumbawa1.jpg",
  "/assets/sumbawa2.jfif",
  "/assets/sumbawa3.jfif",
  "/assets/sumbawa4.jfif",
];

export default function GaleriPage() {
  return (
    <>
      <AppBar title="Galeri & Wisata" />
      <PageContainer>
        <div className="flex flex-col gap-6">
          
          {/* Info Wisata */}
          <section>
             <h2 className="text-lg font-bold text-ink-900 mb-3">Informasi Kunjungan</h2>
             <Card className="p-4 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                   <div className="p-2 bg-brand-50 rounded-full text-brand-600 mt-1"><Clock size={18} /></div>
                   <div>
                     <p className="font-semibold text-ink-900">Jam Operasional Wisata</p>
                     <p className="text-sm text-ink-500">Senin - Minggu: 08.00 - 17.00 WITA</p>
                   </div>
                </div>
                <div className="flex items-start gap-3">
                   <div className="p-2 bg-brand-50 rounded-full text-brand-600 mt-1"><Ticket size={18} /></div>
                   <div>
                     <p className="font-semibold text-ink-900">Tiket Masuk</p>
                     <p className="text-sm text-ink-500">Dewasa: Rp 10.000 | Anak-anak: Rp 5.000</p>
                   </div>
                </div>
                <div className="flex items-start gap-3">
                   <div className="p-2 bg-brand-50 rounded-full text-brand-600 mt-1"><MapPin size={18} /></div>
                   <div>
                     <p className="font-semibold text-ink-900">Lokasi</p>
                     <p className="text-sm text-ink-500">Kawasan Bendungan Sumbawa, NTB</p>
                   </div>
                </div>
             </Card>
          </section>

          {/* Galeri Foto */}
          <section>
             <h2 className="text-lg font-bold text-ink-900 mb-3">Galeri Bendungan</h2>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
               {galleryImages.map((src, idx) => (
                 <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-ink-100 shadow-sm">
                   <img 
                     src={src} 
                     alt={`Galeri ${idx + 1}`} 
                     className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                     loading="lazy"
                     onError={(e) => {
                       e.currentTarget.src = `https://placehold.co/800x800/e2e8f0/64748b?text=File+Belum+Ada\\n/assets/bendungan-${idx + 1}.jpg`;
                     }}
                   />
                 </div>
               ))}
             </div>
          </section>

        </div>
      </PageContainer>
    </>
  );
}
