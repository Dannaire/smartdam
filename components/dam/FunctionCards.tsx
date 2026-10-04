import { Card } from "@/components/ui/Card";
import { Droplet, Zap, Sprout, Tent, Waves } from "lucide-react";
import { Dam } from "@/types";

interface FunctionCardsProps {
  functions: Dam["technical"]["functions"];
}

const functionDetails = [
  {
    keyword: "Irigasi",
    icon: Sprout,
    title: "Irigasi Pertanian",
    desc: "Menyediakan pasokan air untuk areal persawahan dan pertanian di hilir bendungan.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    keyword: "Air Baku",
    icon: Droplet,
    title: "Penyediaan Air Baku",
    desc: "Menyuplai kebutuhan air bersih untuk masyarakat dan industri sekitar.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    keyword: "PLTA",
    icon: Zap,
    title: "Pembangkit Listrik (PLTA)",
    desc: "Memanfaatkan energi potensial air untuk menghasilkan energi listrik.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    keyword: "Pariwisata",
    icon: Tent,
    title: "Pariwisata & Olahraga Air",
    desc: "Menjadi destinasi wisata alam dan tempat rekreasi masyarakat.",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    keyword: "Banjir",
    icon: Waves,
    title: "Pengendali Banjir",
    desc: "Mereduksi debit banjir di daerah hilir saat musim penghujan.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
];

export function FunctionCards({ functions }: FunctionCardsProps) {
  // Mapping fungsi dari teks sederhana ke detail
  const activeFunctions = functions.map(fn => {
    const detail = functionDetails.find(d => fn.toLowerCase().includes(d.keyword.toLowerCase()));
    if (detail) return detail;
    return {
      keyword: fn,
      icon: Droplet,
      title: fn,
      desc: "Fungsi operasional bendungan.",
      color: "text-brand-600",
      bg: "bg-brand-50",
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {activeFunctions.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Card key={idx} className={`flex items-start gap-4 border-none shadow-sm ${item.bg}`}>
            <div className={`p-3 rounded-xl bg-white shadow-sm ${item.color}`}>
              <Icon size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-ink-900 mb-1">{item.title}</h4>
              <p className="text-sm text-ink-500 leading-relaxed">{item.desc}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
