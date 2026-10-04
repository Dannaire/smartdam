import { Dam } from "@/types";

interface ProfileTableProps {
  technical: Dam["technical"];
}

export function ProfileTable({ technical }: ProfileTableProps) {
  const data = [
    { label: "Tipe Bendungan", value: technical.type },
    { label: "Tinggi Bendungan", value: `${technical.height} m` },
    { label: "Panjang Puncak", value: `${technical.crestLength} m` },
    { label: "Tampungan Total", value: `${technical.totalStorage.toString().replace('.', ',')} juta m³` },
    { label: "Tampungan Efektif", value: `${technical.effectiveStorage.toString().replace('.', ',')} juta m³` },
    { label: "Tampungan Mati", value: `${technical.deadStorage.toString().replace('.', ',')} juta m³` },
    { label: "Luas Genangan", value: `${technical.reservoirArea} ha` },
    { label: "Fungsi", value: technical.functions.join(", ") },
  ];

  return (
    <div className="bg-white rounded-2xl border border-line overflow-hidden mt-4">
      <table className="w-full text-sm text-left">
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`border-b border-line last:border-0 ${
                index % 2 === 0 ? "bg-white" : "bg-brand-50/50"
              }`}
            >
              <td className="px-4 py-3 font-medium text-ink-900 w-1/3 align-top">
                {item.label}
              </td>
              <td className="px-4 py-3 text-ink-500">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
