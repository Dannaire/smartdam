/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useCallback } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { AppBar } from "@/components/layout/AppBar";
import { Card } from "@/components/ui/Card";
import {
  Clock,
  Ticket,
  MapPin,
  Video as VideoIcon,
  Image as ImageIcon,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  Sparkles,
} from "lucide-react";

interface MediaItem {
  id: string;
  type: "image" | "video";
  title: string;
  category: "Struktur" | "Aerial / Lanskap" | "Aliran Air" | "Panorama" | "Video";
  src: string;
  poster?: string;
  description?: string;
}

const mediaItems: MediaItem[] = [
  {
    id: "vid-1",
    type: "video",
    title: "Video Dokumentasi Eksplorasi Bendungan",
    category: "Video",
    src: "/api/video",
    poster: "/assets/Front view.png",
    description: "Dokumentasi visual lanskap dan operasional kawasan bendungan secara komprehensif.",
  },
  {
    id: "img-1",
    type: "image",
    title: "Tampak Depan Bendungan (Front View)",
    category: "Struktur",
    src: "/assets/Front view.png",
    description: "Tampak depan dinding bendungan dan struktur utama dari hilir.",
  },
  {
    id: "img-2",
    type: "image",
    title: "Tampak Depan Sudut Rendah",
    category: "Struktur",
    src: "/assets/Front view 2.png",
    description: "Perspektif sudut elevasi mercu dan pelimpah bendungan.",
  },
  {
    id: "img-3",
    type: "image",
    title: "Tampak Atas Waduk & Lanskap (Top View)",
    category: "Aerial / Lanskap",
    src: "/assets/top voew 1.png",
    description: "Tangkapan udara memperlihatkan genangan waduk dan bentang alam sekitar.",
  },
  {
    id: "img-4",
    type: "image",
    title: "Tampak Atas Mercu Bendungan",
    category: "Aerial / Lanskap",
    src: "/assets/Top view 2.png",
    description: "Pemandangan udara lintasan puncak bendungan dan lanskap perbukitan.",
  },
  {
    id: "img-5",
    type: "image",
    title: "Limpasan Air Terjun (Spillway)",
    category: "Aliran Air",
    src: "/assets/terjun.png",
    description: "Aliran air dinamis pada saluran pelimpah menuju kolam olak.",
  },
  {
    id: "img-6",
    type: "image",
    title: "Kawasan Aliran & Air Terjun 2",
    category: "Aliran Air",
    src: "/assets/Air terjun 2.png",
    description: "Area hilir terjunan air dengan formasi batuan alami.",
  },

];

export default function GaleriPage() {
  const [filter, setFilter] = useState<"semua" | "foto" | "video">("semua");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const imagesOnly = mediaItems.filter((m) => m.type === "image");
  const videoItem = mediaItems.find((m) => m.type === "video");

  const filteredItems = mediaItems.filter((item) => {
    if (filter === "foto") return item.type === "image";
    if (filter === "video") return item.type === "video";
    return true;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : imagesOnly.length - 1));
  }, [lightboxIndex, imagesOnly.length]);

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! < imagesOnly.length - 1 ? prev! + 1 : 0));
  }, [lightboxIndex, imagesOnly.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, prevImage, nextImage]);

  return (
    <>
      <AppBar title="Galeri & Wisata" />
      <PageContainer>
        <div className="flex flex-col gap-6">

          {/* Section Video Dokumentasi */}
          {videoItem && (filter === "semua" || filter === "video") && (
            <section className="max-w-4xl mx-auto w-full">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-brand-50 text-brand-600 rounded-lg">
                    <VideoIcon size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-ink-900 leading-tight">
                      Video Dokumentasi Bendungan
                    </h2>
                    <p className="text-xs text-ink-500">
                      Eksplorasi visual dan panorama kawasan bendungan
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200">
                  <Sparkles size={14} /> Video HD
                </span>
              </div>

              <Card className="p-3 sm:p-4 bg-white border border-line shadow-sm rounded-2xl overflow-hidden">
                <div className="relative rounded-xl overflow-hidden bg-black aspect-video w-full shadow-inner">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={videoItem.poster}
                    className="w-full h-full object-cover bg-black"
                  >
                    <source src="/api/video" type="video/mp4" />
                    <source src="/assets/bendungan.mp4" type="video/mp4" />
                    Browser Anda tidak mendukung pemutaran video langsung.
                  </video>
                </div>
                <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
                  <div>
                    <h3 className="font-semibold text-ink-900 text-sm sm:text-base">
                      {videoItem.title}
                    </h3>
                    <p className="text-xs text-ink-500 mt-0.5">
                      {videoItem.description}
                    </p>
                  </div>
                  <span className="self-start sm:self-auto text-[11px] font-medium text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
                    31 Detik · HD 1080p
                  </span>
                </div>
              </Card>
            </section>
          )}

          {/* Galeri Foto & Filter */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-brand-50 text-brand-600 rounded-lg">
                  <ImageIcon size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-ink-900 leading-tight">
                    Galeri Foto Bendungan
                  </h2>
                  <p className="text-xs text-ink-500">
                    Koleksi dokumentasi struktur, aerial, dan keindahan alam
                  </p>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-1.5 bg-ink-100 p-1 rounded-xl self-start sm:self-auto">
                <button
                  onClick={() => setFilter("semua")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filter === "semua"
                      ? "bg-white text-brand-900 shadow-sm"
                      : "text-ink-500 hover:text-ink-900"
                  }`}
                >
                  Semua ({mediaItems.length})
                </button>
                <button
                  onClick={() => setFilter("foto")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filter === "foto"
                      ? "bg-white text-brand-900 shadow-sm"
                      : "text-ink-500 hover:text-ink-900"
                  }`}
                >
                  Foto ({imagesOnly.length})
                </button>
                <button
                  onClick={() => setFilter("video")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filter === "video"
                      ? "bg-white text-brand-900 shadow-sm"
                      : "text-ink-500 hover:text-ink-900"
                  }`}
                >
                  Video (1)
                </button>
              </div>
            </div>

            {/* Grid Galeri */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems
                .filter((item) => item.type === "image")
                .map((item) => {
                  const imageIdx = imagesOnly.findIndex((img) => img.id === item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => openLightbox(imageIdx)}
                      className="group cursor-pointer rounded-2xl bg-white border border-line overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                    >
                      <div className="relative aspect-[4/3] bg-ink-100 overflow-hidden">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                          <span className="text-white text-xs font-medium flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                            <Maximize2 size={12} /> Perbesar
                          </span>
                        </div>
                        <span className="absolute top-3 left-3 text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-ink-900 shadow-sm">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-3.5 flex flex-col justify-between flex-1">
                        <h4 className="font-semibold text-ink-900 text-sm group-hover:text-brand-600 transition-colors">
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="text-xs text-ink-500 mt-1 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>

          {/* Info Wisata & Kunjungan */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-brand-50 text-brand-600 rounded-lg">
                <Info size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-ink-900 leading-tight">
                  Informasi Wisata & Kunjungan
                </h2>
                <p className="text-xs text-ink-500">
                  Panduan bagi wisatawan dan pengunjung umum
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-brand-50 rounded-xl text-brand-600">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-ink-500 font-medium">Jam Operasional</p>
                    <p className="font-bold text-ink-900 text-sm mt-0.5">08.00 - 17.00 WITA</p>
                  </div>
                </div>
                <p className="text-xs text-ink-500 border-t border-line pt-2.5 leading-relaxed">
                  Buka setiap hari (Senin - Minggu). Akses mercu bendungan ditutup saat kondisi operasi khusus/siaga.
                </p>
              </Card>

              <Card className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-brand-50 rounded-xl text-brand-600">
                    <Ticket size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-ink-500 font-medium">Tiket Masuk</p>
                    <p className="font-bold text-ink-900 text-sm mt-0.5">Rp 10.000 / orang</p>
                  </div>
                </div>
                <p className="text-xs text-ink-500 border-t border-line pt-2.5 leading-relaxed">
                  Dewasa: Rp 10.000 | Anak-anak: Rp 5.000. Parkir kendaraan roda dua Rp 3.000, roda empat Rp 5.000.
                </p>
              </Card>

              <Card className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-brand-50 rounded-xl text-brand-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-ink-500 font-medium">Lokasi</p>
                    <p className="font-bold text-ink-900 text-sm mt-0.5">Kecamatan Utan, Sumbawa</p>
                  </div>
                </div>
                <p className="text-xs text-ink-500 border-t border-line pt-2.5 leading-relaxed">
                  Akses jalan beraspal mulus dengan spot pemandangan perbukitan dan gardu pandang waduk.
                </p>
              </Card>
            </div>
          </section>

        </div>
      </PageContainer>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && imagesOnly[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6"
          onClick={closeLightbox}
        >
          {/* Header Lightbox */}
          <div
            className="w-full max-w-5xl flex items-center justify-between text-white py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-xs text-white/60 font-medium">
                {lightboxIndex + 1} / {imagesOnly.length}
              </span>
              <h3 className="font-semibold text-sm sm:text-base text-white">
                {imagesOnly[lightboxIndex].title}
              </h3>
            </div>
            <button
              onClick={closeLightbox}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Tutup"
            >
              <X size={22} />
            </button>
          </div>

          {/* Main Image & Navigation */}
          <div
            className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-4 z-10 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-all"
              aria-label="Foto Sebelumnya"
            >
              <ChevronLeft size={24} />
            </button>

            <img
              src={imagesOnly[lightboxIndex].src}
              alt={imagesOnly[lightboxIndex].title}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
            />

            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 z-10 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-all"
              aria-label="Foto Selanjutnya"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Footer Caption */}
          <div
            className="w-full max-w-2xl text-center text-xs text-white/70 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            {imagesOnly[lightboxIndex].description}
          </div>
        </div>
      )}
    </>
  );
}
