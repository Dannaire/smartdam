import { Card } from "@/components/ui/Card";
import { Info } from "lucide-react";

const legends = [
  { level: "Normal", color: "bg-status-normal", desc: "Semua parameter aman, operasi berjalan sesuai rencana." },
  { level: "Waspada", color: "bg-status-waspada", desc: "Ada indikasi peningkatan TMA/curah hujan. Pantau intensif." },
  { level: "Siaga", color: "bg-status-siaga", desc: "Potensi bahaya. Siapkan langkah mitigasi & koordinasi." },
  { level: "Awas", color: "bg-status-awas", desc: "Kondisi berbahaya! Evakuasi & tindakan darurat diperlukan." },
];

export function LevelLegend() {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-line pb-3">
        <Info className="text-brand-600" size={20} />
        <h3 className="font-semibold text-ink-900">Panduan Level Peringatan</h3>
      </div>
      <div className="space-y-4">
        {legends.map((item) => (
          <div key={item.level} className="flex gap-3 items-start">
            <span className={`flex-shrink-0 w-3 h-3 mt-1.5 rounded-full ${item.color}`} />
            <div>
              <p className="font-semibold text-ink-900 mb-0.5">{item.level}</p>
              <p className="text-sm text-ink-500 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
