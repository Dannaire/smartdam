# PRD — Smart Dam (Web App Monitoring Bendungan)

> Dokumen ini dibuat untuk dipakai sebagai acuan **vibecoding** (Cursor / Claude Code / Copilot / v0).
> Stack: **Next.js (App Router) + Tailwind CSS**. Desain mengikuti referensi UI mobile "Smart Dam" (Bendungan Sumbawa) yang diterjemahkan menjadi web **fully responsive** (mobile-first, tablet, desktop).

---

## 1. Ringkasan Produk

| Item | Detail |
|---|---|
| Nama produk | **Smart Dam** |
| Studi kasus data | Bendungan Sumbawa (data dummy/mock) |
| Tipe | Web app responsive (bisa di-install sebagai PWA, opsional) |
| Tujuan | Menyajikan informasi, monitoring real-time, peringatan dini, serta grafik data bendungan kepada operator, pengelola, masyarakat, dan wisatawan |
| Platform | Browser modern (Chrome, Safari, Edge, Firefox) di mobile, tablet, desktop |
| Bahasa UI | Bahasa Indonesia |

### 1.1 Latar Belakang
Pemantauan bendungan membutuhkan data dari banyak instrumen (muka air, curah hujan, tekanan air pori, deformasi, getaran gempa, CCTV). Data tersebut perlu ditampilkan dalam satu antarmuka yang mudah dibaca, memberi peringatan dini, dan dapat diakses oleh berbagai kalangan dengan level akses berbeda.

### 1.2 Tujuan & Sasaran
1. Menampilkan kondisi bendungan **secara real-time** dalam satu dashboard.
2. Memberi **peringatan dini** (Normal, Waspada, Siaga, Awas) dan notifikasi rencana operasi.
3. Menyediakan **grafik & data numerik** historis yang bisa diunduh.
4. Menyediakan **informasi bendungan** (profil, lokasi, fungsi, teknis) dan **galeri & wisata** untuk publik.
5. Tampilan **konsisten, modern, dan responsive** di semua ukuran layar.

### 1.3 Non-Goals (Fase 1)
- Integrasi sensor sungguhan (GPRS/4G/Radio) → Fase 1 memakai **mock data / API route dummy**.
- Autentikasi produksi penuh (Fase 1 cukup simulasi role/mode).
- Push notification native (diganti toast/in-app notification; Web Push opsional).

---

## 2. Arsitektur Sistem (Konteks Bisnis)

Mengikuti alur pada infografis referensi:

```
1. INSTRUMENTASI        2. TRANSMISI DATA       3. SERVER & PENGOLAHAN       4. AKSES PENGGUNA
 - AWLR (muka air)  →    - GPRS/4G/5G/Radio  →   - Validasi real-time    →   - Aplikasi Web/Mobile
 - ARG (curah hujan)     - Data Logger / RTU     - Analisis & peringatan      - Operator Bendungan
 - Piezometer            (mengumpulkan data        dini (DEWS/FEWS,           - Pihak Pengelola
 - Inclinometer           dari sensor)             rule curve, dsb)             (PUPR/BBWS)
 - Seismograph                                   - Database Bendungan         - Masyarakat
 - CCTV                                                                       - Wisatawan/Publik
```

**Untuk Fase 1 (frontend only):** layer 1–3 disimulasikan oleh `/data/*.ts` (mock) dan Next.js Route Handlers (`/app/api/*`) yang mengembalikan JSON. Struktur dibuat agar mudah diganti ke API backend sesungguhnya.

---

## 3. Persona & Hak Akses

| Persona | Kebutuhan Utama | Mode Akses |
|---|---|---|
| **Operator Bendungan** | Monitoring lengkap, input/lihat operasi waduk, terima alarm | Mode instansi (lengkap) |
| **Pihak Pengelola (PUPR/BBWS)** | Laporan, rekap, grafik, rencana pelepasan air | Mode instansi (monitoring & laporan) |
| **Masyarakat** | Status keamanan, peringatan, jadwal pelepasan air | Mode publik |
| **Wisatawan/Publik** | Info umum, galeri, lokasi, jam kunjung | Mode publik |

**Implementasi Fase 1:** toggle "Mode" di halaman Profil (Publik / Instansi) yang menyimpan state di `localStorage`/context. Fitur tertentu (data instrumen detail, operasi waduk lengkap) hanya tampil di mode Instansi.

---

## 4. Tech Stack & Library

| Kebutuhan | Pilihan |
|---|---|
| Framework | **Next.js 14/15 (App Router)**, TypeScript |
| Styling | **Tailwind CSS** (+ `clsx`, `tailwind-merge`) |
| Ikon | `lucide-react` |
| Grafik | `recharts` (area/line/bar, reference line NWL/LWL) |
| Peta | `react-leaflet` + `leaflet` (OpenStreetMap), dynamic import (`ssr: false`) |
| State/data | `@tanstack/react-query` (polling simulasi real-time) atau SWR |
| Animasi | `framer-motion` (ringan, opsional) |
| Tanggal | `date-fns` + locale `id` |
| Export | `papaparse` (CSV) & `jspdf` + `jspdf-autotable` (PDF) |
| Font | `Inter` via `next/font/google` |
| Linting | ESLint + Prettier + `prettier-plugin-tailwindcss` |

---

## 5. Design System (Mengikuti Referensi UI)

### 5.1 Warna (tambahkan di `tailwind.config.ts`)

| Token | Hex | Penggunaan |
|---|---|---|
| `brand-900` | `#0B2A5B` | Header section/judul tab gelap |
| `brand-800` | `#12408A` | App bar, tombol utama, tab aktif |
| `brand-600` | `#1E63C6` | Hover, link, ikon aktif |
| `brand-500` | `#2F80ED` | Aksen, tombol CTA "Lihat Semua Data Instrumentasi" |
| `brand-100` | `#DCEBFF` | Area air, background chip |
| `brand-50` | `#F2F7FF` | Background halaman |
| `status-normal` | `#22A55B` | Badge "Kondisi Normal" |
| `status-waspada` | `#F5B700` | Peringatan kuning |
| `status-siaga` | `#F08A24` | Siaga (orange) |
| `status-awas` | `#E5322D` | Awas (merah) |
| `danger-bg` | `#FDE8E8` | Kartu peringatan aktif (Siaga/Awas) |
| `ink-900` | `#101828` | Teks utama |
| `ink-500` | `#667085` | Teks sekunder |
| `line` | `#E4E7EC` | Border/divider |

Warna kartu fitur (pastel) sesuai section "Fitur Utama": biru muda, hijau muda, kuning muda, ungu muda, merah muda, cyan muda.

### 5.2 Tipografi
- Font: **Inter**.
- Judul halaman: `text-lg md:text-2xl font-semibold`.
- Angka besar (TMA): `text-4xl md:text-5xl font-bold` (contoh: **+82.35 m**).
- Label kecil: `text-xs text-ink-500`.

### 5.3 Komponen Visual
- **Card**: `rounded-2xl bg-white border border-line shadow-sm p-4`.
- **Tombol utama**: `rounded-xl bg-brand-800 text-white h-11 px-4 font-medium hover:bg-brand-600`.
- **Tab pill**: kontainer `bg-brand-50 rounded-xl p-1`, tab aktif `bg-brand-800 text-white`.
- **Badge status**: pill dengan titik warna + teks.
- **App bar** (mobile): `bg-brand-800 text-white h-14`, tombol back kiri, judul tengah.
- **Ikon menu Beranda**: kotak putih rounded, ikon berwarna di atas, label 2 baris.
- **Elevasi/spacing**: grid 4px; radius 12–16px; transisi 150–200ms.

### 5.4 Breakpoint & Layout Responsif

| Breakpoint | Layout |
|---|---|
| `< 640px` (mobile) | Single column, **bottom navigation** 4 item (Beranda, Peta, Notifikasi, Profil), app bar atas dengan back |
| `640–1023px` (tablet) | Grid 2 kolom, bottom nav tetap atau rail ikon kiri |
| `≥ 1024px` (desktop) | **Sidebar kiri** (logo + menu penuh), topbar (search, status, notifikasi, avatar), konten grid 12 kolom |
| `≥ 1536px` | Konten dibatasi `max-w-[1440px]` dan dipusatkan |

Aturan: **mobile-first**. Di desktop, komponen yang di mobile berupa tab (Waduk/Struktur/Cuaca) boleh ditampilkan **berdampingan** sebagai grid agar memanfaatkan ruang.

---

## 6. Navigasi & Sitemap

```
/                         → Beranda
/monitoring               → Monitoring Real-Time
/monitoring/instrumen     → Semua Data Instrumentasi
/bendungan                → Informasi Bendungan (tab: Profil, Lokasi, Fungsi, Teknis)
/peringatan               → Peringatan Dini & Notifikasi
/grafik                   → Grafik & Data (tab: TMA, Curah Hujan, Inflow/Outflow)
/operasi                  → Operasi Waduk
/galeri                   → Galeri & Wisata
/peta                     → Peta
/notifikasi               → Daftar Notifikasi
/profil                   → Profil & Pengaturan (mode akses)
```

**Menu utama (bottom nav / sidebar):** Beranda, Peta, Notifikasi (badge merah jika ada baru), Profil.
**Menu fitur (grid Beranda / sidebar desktop):** Monitoring Real-Time, Informasi Bendungan, Peringatan Dini, Grafik & Data, Operasi Waduk, Galeri & Wisata.

---

## 7. Spesifikasi Halaman

### 7.1 Beranda (`/`)

**Tujuan:** Gambaran cepat kondisi bendungan + akses ke semua fitur.

**Komponen:**
1. **Hero Bendungan** — foto bendungan full-width (tinggi `h-56 md:h-72 lg:h-80`), overlay gradient gelap bawah, nama **"Bendungan Sumbawa"**, badge status (**Kondisi Normal** hijau), teks "Update: 29 Sep 2026 09.40 WIB". Header transparan berisi logo tetesan air + "Smart Dam" dan ikon lonceng.
2. **Grid Menu Fitur** — kartu overlap hero (`-mt-6`), 3 kolom × 2 baris di mobile; 6 kolom (1 baris) atau 3×2 lebih besar di desktop:
   - Monitoring Real-Time (ikon jam, biru)
   - Informasi Bendungan (dokumen, biru)
   - Peringatan Dini (segitiga merah)
   - Grafik & Data (bar chart, biru)
   - Operasi Waduk (gembok/pintu air, biru)
   - Galeri & Wisata (foto, biru)
3. **(Desktop tambahan)** Panel ringkasan di bawah menu: kartu mini TMA, curah hujan, status peringatan, dan grafik TMA 7 hari agar dashboard terasa kaya.
4. **Section "Fitur Utama Aplikasi"** (opsional, tampil di desktop/landing) — 6 kartu pastel sesuai infografis (lihat bagian 8).

**Interaksi:** klik kartu menu → navigasi halaman terkait; klik lonceng → `/notifikasi`.

**Acceptance criteria:**
- Status badge berubah warna sesuai data level peringatan.
- Menu grid responsif tanpa overflow pada lebar 320px.

---

### 7.2 Monitoring Real-Time (`/monitoring`)

**Tab:** `Waduk` | `Struktur` | `Cuaca` (di desktop tampil sebagai grid 3 panel + tab tetap tersedia).

**Tab Waduk:**
- **Kartu TMA (Tinggi Muka Air):**
  - Nilai besar `+82.35 m`
  - Indikator tren `▲ (+0,12 m) dari kemarin` (hijau naik / merah turun)
  - `NWL : +85.00 m`, `LWL : +75.00 m`
  - **Ilustrasi penampang bendungan** (SVG): dinding bendungan abu-abu + air biru dengan tinggi mengikuti persentase `(TMA - LWL) / (NWL - LWL)`, animasi naik saat nilai berubah.
- **Parameter Instrumen** (grid 2×2 mobile, 4 kolom desktop):
  - Curah Hujan — `12.4 mm/jam`
  - Tekanan Air Pori — `145 kPa`
  - Deformasi — `0.8 mm`
  - Getaran (Seismograph) — `0.02 g`
  - Tiap kartu: ikon berwarna, label, nilai, indikator status warna (normal/waspada).
- **CTA:** tombol biru lebar "Lihat Semua Data Instrumentasi" → `/monitoring/instrumen`.

**Tab Struktur:** Piezometer (tekanan air pori), Inclinometer (pergerakan lereng/deformasi), Seismograph, tabel per titik sensor + status.

**Tab Cuaca:** Curah hujan (ARG) per jam, akumulasi harian, suhu, kelembapan, angin (mock); mini chart batang curah hujan 24 jam.

**Tambahan:**
- Panel **CCTV** (gambar placeholder / stream URL mock) di tab Struktur atau halaman instrumen.
- **Status Operasi**: inflow, outflow, pembangkit (nilai m³/det).
- Auto-refresh tiap 30 detik (polling mock) + label "Terakhir diperbarui hh:mm WIB" dan tombol refresh manual.
- Loading skeleton & empty/error state.

**Halaman `/monitoring/instrumen`:** tabel semua instrumen (nama, jenis, lokasi, nilai terakhir, satuan, ambang batas, status, waktu), filter per jenis, pencarian, sort.

---

### 7.3 Informasi Bendungan (`/bendungan`)

**Tab:** `Profil` | `Lokasi` | `Fungsi` | `Teknis`.

**Tab Profil:**
- Foto bendungan (rounded, aspect 16:9).
- Judul "Bendungan Sumbawa" + paragraf deskripsi: bendungan multipurpose untuk mendukung ketahanan air, irigasi, penyediaan air baku, pembangkit listrik, serta pariwisata.
- **Tabel data teknis (key-value, zebra):**

| Parameter | Nilai |
|---|---|
| Tipe Bendungan | Urugan Zona (Zonal) |
| Tinggi Bendungan | 82 m |
| Panjang Puncak | 520 m |
| Tampungan Total | 33,35 juta m³ |
| Tampungan Efektif | 27,46 juta m³ |
| Tampungan Mati | 5,15 juta m³ |
| Luas Genangan | 320 ha |
| Fungsi | Irigasi (3.500 ha), Air Baku (76 l/det), PLTMH (1,40 MW), Pariwisata, Perikanan |

**Tab Lokasi:** peta Leaflet dengan marker bendungan, alamat, koordinat, tombol "Buka di Google Maps", informasi akses/jarak.
**Tab Fungsi:** kartu per fungsi (irigasi, air baku, PLTMH, pariwisata, perikanan) dengan ikon dan angka.
**Tab Teknis:** detail lengkap: pelimpah (spillway), bangunan pengambilan, dimensi, elevasi (NWL, LWL, puncak), dokumen unduhan (opsional).

---

### 7.4 Peringatan Dini & Notifikasi (`/peringatan`)

**Komponen:**
1. **Kartu "Status Saat Ini"** — background merah muda (`danger-bg`) bila Siaga/Awas, ikon segitiga peringatan besar, label level (**Siaga**), deskripsi "Potensi peningkatan inflow akibat hujan lebat di hulu.", timestamp `29 Sep 2026 08.30 WIB`. Warna berubah mengikuti level:
   - Normal (hijau), Waspada (kuning), Siaga (orange), Awas (merah).
2. **Notifikasi Terbaru** (+ link "Lihat Semua >"): daftar kartu dengan ikon bulat berwarna:
   - 🔴 **Rencana Pelepasan Air** — "Pelepasan air melalui spillway mulai 30 Sep 2026 pukul 10.00 WIB. Debit rencana: 150 m³/det." — 29 Sep 08.30
   - 🟡 **Peningkatan Curah Hujan** — "Curah hujan tinggi di DAS hulu (> 50 mm/jam)." — 29 Sep 06.15
   - 🔵 **Kondisi Normal** — "Semua parameter dalam batas aman." — 28 Sep 18.00
3. **(Desktop)** Kolom kanan: legenda level peringatan + panduan tindakan per level, serta timeline riwayat.
4. **Filter notifikasi:** semua / peringatan / operasi / info; tandai sudah dibaca.

**Level peringatan & tindakan (konten statis):**

| Level | Warna | Arti singkat |
|---|---|---|
| Normal | Hijau | Semua parameter aman |
| Waspada | Kuning | Ada indikasi peningkatan, pantau intensif |
| Siaga | Orange | Potensi bahaya, siapkan langkah mitigasi |
| Awas | Merah | Kondisi berbahaya, evakuasi/tindakan darurat |

**Toast/in-app alert:** saat data baru berstatus ≥ Waspada, tampilkan banner di atas halaman.

---

### 7.5 Grafik & Data (`/grafik`)

**Tab:** `TMA` | `Curah Hujan` | `Inflow/Outflow`.

**Tab TMA:**
- Kartu grafik "Tinggi Muka Air Waduk" — periode default **1 Minggu Terakhir** (selector: 1 hari, 1 minggu, 1 bulan, 1 tahun, custom range).
- Area chart (garis biru + fill gradasi), sumbu X tanggal (23/9 … 29/9), sumbu Y elevasi (m) 70–90.
- **Reference line:** NWL (85.00, merah putus-putus) & LWL (75.00, kuning putus-putus) dengan label.
- Legend: TMA Waduk, NWL, LWL. Tooltip interaktif.
- **Data Numerik** (tabel kartu): Elevasi Saat Ini `82.35 m`, RWL `85.00 m`, LWL `75.00 m`.
- Tombol **Unduh CSV / PDF**.
- Fitur **perbandingan dengan rule curve** (toggle: tampilkan garis rule curve).

**Tab Curah Hujan:** bar chart per jam/harian, total akumulasi, intensitas maksimum.
**Tab Inflow/Outflow:** line chart ganda (inflow biru, outflow oranye), neraca air.

**Responsif:** tinggi chart `h-64 md:h-80 lg:h-96`; di desktop tampilkan chart + tabel data berdampingan; tabel riwayat (harian/mingguan/bulanan) dengan pagination.

---

### 7.6 Operasi Waduk (`/operasi`)

- **Status pintu pelimpah & bangunan pengeluaran:** terbuka/tertutup, bukaan (%), debit.
- **Jadwal operasi:** daftar/kalender pelepasan air terencana.
- **Rencana pelepasan air & volume tampungan:** kartu ringkas + form simulasi (mode instansi).
- **Rule curve:** grafik rule curve vs TMA aktual (rencana tahunan).
- Mode publik: hanya jadwal & rencana pelepasan (read-only).

### 7.7 Galeri & Wisata (`/galeri`)

- Galeri foto & video (masonry/grid responsif, lightbox).
- Info pariwisata: jam kunjung, tiket, fasilitas, aktivitas (memancing, perahu, spot foto), aturan keselamatan.
- Info kontak & peta lokasi singkat.

### 7.8 Peta (`/peta`)

- Peta Leaflet fullscreen dengan marker: bendungan, titik instrumen (AWLR, ARG, piezometer, dll.), pos pantau.
- Popup berisi nama, nilai terakhir, status; filter layer per jenis instrumen.
- Panel samping (desktop) / bottom sheet (mobile) untuk daftar titik.

### 7.9 Notifikasi (`/notifikasi`)

Daftar lengkap notifikasi, filter, tandai dibaca, pencarian.

### 7.10 Profil (`/profil`)

Pilihan **mode akses** (Publik/Instansi), preferensi (tema terang/gelap opsional, satuan), tentang aplikasi, kontak bantuan, versi aplikasi.

---

## 8. Section "Fitur Utama Aplikasi" (Landing/Info Block)

Tampilkan 6 kartu pastel (grid `1 → 2 → 3` kolom):

1. **Informasi Bendungan** (biru) — Profil umum; Lokasi & peta; Data teknis (dimensi, tampungan, fungsi); Galeri foto & video; Informasi pariwisata.
2. **Monitoring Real-Time** (hijau) — Tinggi muka air waduk; Curah hujan; Data instrumentasi (piezometer, inclinometer, seismograph, dsb); Cuaca terkini; Status operasi (inflow, outflow, pembangkit).
3. **Peringatan Dini & Notifikasi** (kuning) — Peringatan potensi banjir/kekeringan; Notifikasi rencana pelepasan air; Peringatan anomali instrumentasi (deformasi, tekanan pori, getaran); Level peringatan (Normal, Waspada, Siaga, Awas); Push notification ke HP.
4. **Data & Grafik** (ungu) — Grafik TMA, curah hujan, inflow/outflow; Riwayat data (harian, mingguan, bulanan); Unduh data (CSV/PDF); Perbandingan dengan rule curve.
5. **Operasi Waduk** (merah muda) — Status pintu pelimpah & bangunan pengeluaran; Jadwal operasi; Rencana pelepasan air; Rule curve & volume tampungan.
6. **Akses Pengguna** (cyan) — Mode operator (fitur lengkap); Mode instansi (monitoring & laporan); Mode publik (informasi umum, peringatan, wisata).

---

## 9. Model Data (TypeScript)

```ts
// types/index.ts
export type AlertLevel = "normal" | "waspada" | "siaga" | "awas";

export interface Dam {
  id: string;
  name: string;               // "Bendungan Sumbawa"
  status: AlertLevel;
  lastUpdate: string;         // ISO
  coverImage: string;
  description: string;
  location: { lat: number; lng: number; address: string };
  technical: {
    type: string; height: number; crestLength: number;
    totalStorage: number; effectiveStorage: number; deadStorage: number;
    reservoirArea: number; functions: string[];
  };
  levels: { nwl: number; lwl: number; rwl: number };
}

export interface WaterLevelReading {
  timestamp: string;
  tma: number;                // meter
  inflow?: number;            // m3/s
  outflow?: number;           // m3/s
}

export interface Instrument {
  id: string;
  type: "awlr" | "arg" | "piezometer" | "inclinometer" | "seismograph" | "cctv";
  name: string;
  value: number | null;
  unit: string;               // mm/jam, kPa, mm, g
  status: AlertLevel;
  lat?: number; lng?: number;
  updatedAt: string;
}

export interface AlertItem {
  id: string;
  kind: "peringatan" | "operasi" | "info";
  level: AlertLevel;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface OperationSchedule {
  id: string;
  title: string;
  startAt: string;
  plannedDischarge: number;   // m3/s
  status: "terjadwal" | "berlangsung" | "selesai";
}
```

**Mock data awal (harus cocok dengan UI referensi):**
- TMA saat ini `82.35`, tren `+0.12`, NWL `85.00`, LWL `75.00`, RWL `85.00`.
- Instrumen: curah hujan `12.4 mm/jam`, tekanan air pori `145 kPa`, deformasi `0.8 mm`, getaran `0.02 g`.
- Status: `siaga` di halaman peringatan; badge Beranda "Kondisi Normal" (gunakan data yang sama dengan variasi via toggle demo di Profil agar semua level bisa dilihat).
- Seri TMA 7 hari (23/9–29/9) naik bertahap dari ±77 ke 82.35.
- Tiga notifikasi sesuai bagian 7.4.

---

## 10. Struktur Folder

```
smart-dam/
├─ app/
│  ├─ layout.tsx                # font, provider, AppShell
│  ├─ page.tsx                  # Beranda
│  ├─ monitoring/
│  │  ├─ page.tsx
│  │  └─ instrumen/page.tsx
│  ├─ bendungan/page.tsx
│  ├─ peringatan/page.tsx
│  ├─ grafik/page.tsx
│  ├─ operasi/page.tsx
│  ├─ galeri/page.tsx
│  ├─ peta/page.tsx
│  ├─ notifikasi/page.tsx
│  ├─ profil/page.tsx
│  └─ api/
│     ├─ dam/route.ts
│     ├─ readings/route.ts
│     ├─ instruments/route.ts
│     └─ alerts/route.ts
├─ components/
│  ├─ layout/ (AppShell, Sidebar, Topbar, BottomNav, AppBar, PageContainer)
│  ├─ ui/ (Card, Button, Tabs, Badge, Skeleton, Toast, Modal, Table)
│  ├─ home/ (HeroDam, MenuGrid, SummaryCards, FeatureHighlights)
│  ├─ monitoring/ (WaterLevelCard, DamCrossSection, InstrumentCard, WeatherPanel)
│  ├─ dam/ (ProfileTable, DamMap, FunctionCards)
│  ├─ alerts/ (AlertStatusCard, NotificationItem, LevelLegend)
│  ├─ charts/ (WaterLevelChart, RainfallChart, FlowChart)
│  └─ map/ (LeafletMap)
├─ data/ (mock-dam.ts, mock-readings.ts, mock-instruments.ts, mock-alerts.ts)
├─ hooks/ (useReadings, useInstruments, useAlerts, useMediaQuery)
├─ lib/ (utils.ts, format.ts, alert-level.ts, export.ts)
├─ types/index.ts
├─ public/images/ (hero-dam.jpg, dam-1.jpg, gallery/*)
└─ tailwind.config.ts
```

---

## 11. Komponen Kunci (Spesifikasi)

| Komponen | Props utama | Catatan |
|---|---|---|
| `AppShell` | `children` | Mobile: AppBar + BottomNav. Desktop: Sidebar + Topbar |
| `AppBar` | `title`, `back?`, `right?` | Biru tua, tombol back, judul tengah |
| `BottomNav` | — | 4 item, aktif biru + label, badge merah di Notifikasi, `fixed bottom-0`, safe-area padding, `lg:hidden` |
| `Sidebar` | — | `hidden lg:flex w-64`, logo, menu fitur, status mini |
| `Tabs` | `items`, `value`, `onChange` | Pill style, scrollable horizontal di mobile |
| `StatusBadge` | `level` | Warna otomatis dari `alert-level.ts` |
| `WaterLevelCard` | `tma`, `trend`, `nwl`, `lwl` | Angka besar + `DamCrossSection` |
| `DamCrossSection` | `percent` | SVG responsif, animasi tinggi air |
| `InstrumentCard` | `icon`, `label`, `value`, `unit`, `status` | Grid 2×2 / 4 kolom |
| `AlertStatusCard` | `level`, `message`, `time` | Background mengikuti level |
| `NotificationItem` | `item` | Ikon bulat berwarna + judul + isi + waktu |
| `WaterLevelChart` | `data`, `nwl`, `lwl`, `range` | Recharts AreaChart + ReferenceLine |
| `ExportMenu` | `data`, `filename` | Dropdown CSV/PDF |
| `LeafletMap` | `markers` | Dynamic import, `ssr: false` |

---

## 12. Perilaku Real-Time (Simulasi)

- `useReadings()` memakai React Query `refetchInterval: 30_000`.
- Route Handler menambah variasi acak kecil (±0.02 m) pada TMA agar terasa hidup.
- Tampilkan `LiveIndicator` (titik hijau berkedip + "Live").
- Jika offline: banner "Koneksi terputus, menampilkan data terakhir".

---

## 13. Aksesibilitas, Performa, SEO

- Kontras warna minimal WCAG AA; status **tidak hanya dengan warna** (tambahkan ikon + teks).
- Target sentuh minimal 44×44 px; focus ring terlihat; `aria-label` pada tombol ikon; tab memakai role `tablist`.
- Gunakan `next/image` dengan `sizes` benar, `priority` pada hero.
- Lazy load Leaflet & Recharts (`next/dynamic`).
- Lighthouse target: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95.
- Metadata per halaman, `manifest.json` & ikon (opsional PWA).
- Bahasa dokumen `lang="id"`; format tanggal `29 Sep 2026 09.40 WIB`, angka desimal koma pada teks (mis. `1,40 MW`).

---

## 14. Rencana Pengembangan (Milestone)

| Fase | Output |
|---|---|
| **M0 — Setup** | Next.js + TS + Tailwind, font, token warna, AppShell, BottomNav/Sidebar, struktur folder, mock data & types |
| **M1 — Beranda** | HeroDam, MenuGrid, ringkasan desktop, FeatureHighlights |
| **M2 — Monitoring** | Tab Waduk/Struktur/Cuaca, WaterLevelCard + cross section, InstrumentCard, halaman instrumen |
| **M3 — Informasi Bendungan** | 4 tab, tabel profil, peta lokasi |
| **M4 — Peringatan** | Status card level, notifikasi list, filter, legenda, banner/toast |
| **M5 — Grafik & Data** | 3 tab chart, range selector, rule curve, tabel numerik, export CSV/PDF |
| **M6 — Operasi, Galeri, Peta, Profil** | Halaman sisanya + mode akses |
| **M7 — Polish** | Skeleton, animasi, dark mode (opsional), a11y, Lighthouse, QA responsif |

---

## 15. Kriteria Penerimaan (Definition of Done)

1. Semua halaman pada sitemap tersedia dan bisa dinavigasi.
2. Visual mengikuti referensi: warna biru tua, kartu rounded, badge status, tab pill, bottom nav.
3. Responsif tanpa horizontal scroll pada 320px, 375px, 768px, 1024px, 1440px.
4. Mobile memakai bottom nav; desktop memakai sidebar + topbar.
5. Grafik menampilkan garis NWL & LWL, tooltip, dan selector periode.
6. Level peringatan mengubah warna & ikon di Beranda, Peringatan, dan badge.
7. Data mock sesuai nilai pada UI referensi.
8. Tidak ada error TypeScript/ESLint; build `next build` sukses.
9. Loading skeleton, empty state, dan error state tersedia di halaman berdata.

---

## 16. Prompt Siap Pakai untuk Vibecoding

**Prompt 0 — Setup**
```
Buat project Next.js (App Router, TypeScript, Tailwind) bernama smart-dam.
Install: lucide-react, recharts, @tanstack/react-query, clsx, tailwind-merge,
date-fns, react-leaflet, leaflet, papaparse, jspdf, jspdf-autotable.
Konfigurasi font Inter, warna brand/status sesuai PRD bagian 5.1, buat types di
types/index.ts dan mock data di /data sesuai PRD bagian 9. Buat AppShell responsif:
mobile = AppBar + BottomNav (Beranda, Peta, Notifikasi, Profil), desktop (lg) = Sidebar + Topbar.
```

**Prompt 1 — Beranda**
```
Implementasikan halaman Beranda sesuai PRD 7.1: hero foto bendungan dengan overlay gradient,
nama "Bendungan Sumbawa", badge "Kondisi Normal", teks update, dan grid 6 menu fitur
(overlap hero). Di desktop tambahkan kartu ringkasan TMA, curah hujan, status peringatan,
dan mini chart TMA 7 hari. Pastikan responsif mulai 320px.
```

**Prompt 2 — Monitoring**
```
Buat halaman /monitoring dengan tab Waduk/Struktur/Cuaca sesuai PRD 7.2. Buat komponen
WaterLevelCard dengan nilai +82.35 m, tren +0,12 m, NWL/LWL, dan DamCrossSection SVG yang
tinggi airnya dihitung dari persentase. Tambah grid InstrumentCard 2x2 (4 kolom di desktop)
dan tombol "Lihat Semua Data Instrumentasi". Gunakan React Query polling 30 detik.
```

**Prompt 3 — Informasi Bendungan**
```
Buat /bendungan dengan tab Profil/Lokasi/Fungsi/Teknis sesuai PRD 7.3, termasuk tabel
data teknis zebra dan peta Leaflet (dynamic import, ssr false).
```

**Prompt 4 — Peringatan**
```
Buat /peringatan: AlertStatusCard (warna sesuai level Normal/Waspada/Siaga/Awas),
daftar "Notifikasi Terbaru" dengan 3 item sesuai PRD 7.4, filter, tandai dibaca,
dan panel legenda level di desktop.
```

**Prompt 5 — Grafik & Data**
```
Buat /grafik dengan tab TMA/Curah Hujan/Inflow-Outflow memakai Recharts. Tab TMA: AreaChart
gradasi biru, ReferenceLine NWL (merah putus-putus) dan LWL (kuning putus-putus), selector
periode, tabel Data Numerik (Elevasi Saat Ini, RWL, LWL), serta tombol unduh CSV/PDF.
```

**Prompt 6 — Sisanya & Polish**
```
Buat halaman Operasi Waduk, Galeri & Wisata, Peta, Notifikasi, dan Profil (toggle mode
Publik/Instansi) sesuai PRD. Tambahkan skeleton loading, empty/error state, animasi halus,
dan audit aksesibilitas. Pastikan seluruh halaman lolos kriteria penerimaan PRD bagian 15.
```

---

## 17. Risiko & Catatan

| Risiko | Mitigasi |
|---|---|
| Leaflet bermasalah di SSR | Dynamic import `ssr: false` |
| Ukuran bundle grafik | Lazy load per tab |
| Aset foto bendungan belum ada | Gunakan placeholder (Unsplash/gradient) lalu ganti aset asli |
| Data sensor nyata belum tersedia | Abstraksi lewat `/app/api/*` agar mudah diganti |
| Informasi keselamatan sensitif | Batasi detail instrumen di mode publik |

---

## 18. Pengembangan Lanjutan (Backlog)

- Autentikasi nyata (NextAuth/Clerk) + role-based access.
- Integrasi backend/IoT (MQTT/WebSocket/SSE) untuk real-time sesungguhnya.
- Web Push Notification & integrasi WhatsApp/SMS alert.
- Multi-bendungan (selector bendungan, peta nasional).
- Dark mode penuh, multi-bahasa (ID/EN), PWA offline.
- Laporan otomatis harian/mingguan (PDF terjadwal).
