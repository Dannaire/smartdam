// lib/export.ts — Export CSV & PDF (papaparse + jspdf)
import Papa from "papaparse";

export function exportCSV<T extends object>(data: T[], filename: string): void {
  const csv = Papa.unparse(data);
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export async function exportPDF(
  title: string,
  headers: string[],
  rows: (string | number)[][],
  filename: string
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF();
  doc.setFont("helvetica");
  doc.setFontSize(16);
  doc.text(title, 14, 20);
  doc.setFontSize(10);
  doc.text(`Diekspor: ${new Date().toLocaleDateString("id-ID")}`, 14, 28);

  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 35,
    styles: { font: "helvetica", fontSize: 9 },
    headStyles: { fillColor: [18, 64, 138] }, // brand-800
  });

  doc.save(`${filename}.pdf`);
}
