import { Card } from "@/components/ui/Card";

export function OperationPlanTable() {
  const plans = [
    { date: "18 Okt 2026", targetElev: 82.35, realElev: 82.35, targetOutflow: 25.0, realOutflow: 24.5 },
    { date: "19 Okt 2026", targetElev: 82.30, realElev: 82.28, targetOutflow: 25.0, realOutflow: 25.1 },
    { date: "20 Okt 2026", targetElev: 82.25, realElev: 82.20, targetOutflow: 25.0, realOutflow: 25.0 },
    { date: "21 Okt 2026", targetElev: 82.20, realElev: null, targetOutflow: 25.0, realOutflow: null },
    { date: "22 Okt 2026", targetElev: 82.15, realElev: null, targetOutflow: 25.0, realOutflow: null },
    { date: "23 Okt 2026", targetElev: 82.10, realElev: null, targetOutflow: 25.0, realOutflow: null },
    { date: "24 Okt 2026", targetElev: 82.05, realElev: null, targetOutflow: 25.0, realOutflow: null },
  ];

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-brand-50 border-b border-line text-ink-500 font-medium">
            <tr>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3 text-right">Target Elevasi (m)</th>
              <th className="px-4 py-3 text-right">Realisasi Elevasi</th>
              <th className="px-4 py-3 text-right">Target Pelepasan (m³/s)</th>
              <th className="px-4 py-3 text-right">Realisasi Pelepasan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {plans.map((p, i) => (
              <tr key={i} className="hover:bg-brand-50/50 transition-colors">
                <td className="px-4 py-3 font-medium text-ink-900">{p.date}</td>
                <td className="px-4 py-3 text-right">{p.targetElev.toFixed(2)}</td>
                <td className="px-4 py-3 text-right font-medium text-brand-600">{p.realElev ? p.realElev.toFixed(2) : '-'}</td>
                <td className="px-4 py-3 text-right">{p.targetOutflow.toFixed(1)}</td>
                <td className="px-4 py-3 text-right font-medium text-brand-600">{p.realOutflow ? p.realOutflow.toFixed(1) : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
