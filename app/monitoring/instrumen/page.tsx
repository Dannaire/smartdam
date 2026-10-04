"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { AppBar } from "@/components/layout/AppBar";
import { useInstruments } from "@/hooks/useInstruments";
import { StatusBadge } from "@/components/ui/Badge";
import { formatDateWIB } from "@/lib/format";

export default function InstrumentasiPage() {
  const { data: instruments, isLoading } = useInstruments();

  return (
    <>
      <AppBar title="Data Instrumentasi" back="/monitoring" />
      <PageContainer>
        <div className="space-y-4">
          <p className="text-sm text-ink-500">
            Daftar lengkap pembacaan instrumen sensor di Bendungan Sumbawa.
          </p>

          {isLoading ? (
            <div className="text-sm text-ink-500">Memuat data...</div>
          ) : (
            <div className="bg-white rounded-2xl border border-line overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-brand-50 text-ink-900 border-b border-line">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Nama Instrumen</th>
                      <th className="px-4 py-3 font-semibold">Jenis</th>
                      <th className="px-4 py-3 font-semibold text-right">Nilai Terakhir</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Waktu Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {instruments?.map((inst) => (
                      <tr key={inst.id} className="border-b border-line last:border-0 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-ink-900">{inst.name}</td>
                        <td className="px-4 py-3 text-ink-500 uppercase text-xs">{inst.type}</td>
                        <td className="px-4 py-3 text-right font-medium text-ink-900">
                          {inst.value !== null ? `${inst.value} ${inst.unit}` : "-"}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge level={inst.status} />
                        </td>
                        <td className="px-4 py-3 text-ink-500 text-xs">
                          {formatDateWIB(inst.updatedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </PageContainer>
    </>
  );
}
