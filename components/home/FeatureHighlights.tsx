import { Card } from "@/components/ui/Card";
import { Info, Activity, AlertTriangle, BarChart2, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Informasi Bendungan",
    description: "Profil umum, Lokasi & peta, Data teknis (dimensi, tampungan, fungsi), Galeri foto & video, Informasi pariwisata.",
    icon: Info,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Monitoring Real-Time",
    description: "Tinggi muka air waduk, Curah hujan, Data instrumentasi (piezometer, inclinometer, seismograph, dsb), Cuaca terkini, Status operasi.",
    icon: Activity,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Peringatan Dini & Notifikasi",
    description: "Peringatan potensi banjir/kekeringan, Notifikasi rencana pelepasan air, Peringatan anomali instrumentasi, Level peringatan.",
    icon: AlertTriangle,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    title: "Data & Grafik",
    description: "Grafik TMA, curah hujan, inflow/outflow, Riwayat data (harian, mingguan, bulanan), Unduh data (CSV/PDF), Perbandingan dengan rule curve.",
    icon: BarChart2,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    title: "Operasi Waduk",
    description: "Status pintu pelimpah & bangunan pengeluaran, Jadwal operasi, Rencana pelepasan air, Rule curve & volume tampungan.",
    icon: Settings,
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    title: "Akses Pengguna",
    description: "Mode operator (fitur lengkap), Mode instansi (monitoring & laporan), Mode publik (informasi umum, peringatan, wisata).",
    icon: Users,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
];

export function FeatureHighlights() {
  return (
    <section className="py-12 px-4 lg:px-8 max-w-content mx-auto hidden lg:block">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-brand-900 mb-2">Fitur Utama Aplikasi</h2>
        <p className="text-ink-500">Sistem terintegrasi untuk pemantauan dan pengelolaan bendungan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <Card key={idx} className={cn("flex flex-col gap-4 border-none shadow-md", feature.bg)}>
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg bg-white", feature.color)}>
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-ink-900">{feature.title}</h3>
              </div>
              <p className="text-sm text-ink-500 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
