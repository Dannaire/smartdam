// lib/format.ts — Format tanggal & angka sesuai PRD §13
// Format: "29 Sep 2026 09.40 WIB", angka desimal koma

/**
 * Format tanggal ke "20 Okt 2026 08.00 WITA" (UTC+8)
 */
export function formatDateWIB(isoString: string): string {
  try {
    const date = new Date(isoString);
    // Tambah 8 jam untuk WITA (UTC+8)
    const witaDate = new Date(date.getTime() + 8 * 60 * 60 * 1000);
    const day = witaDate.getUTCDate();
    const month = witaDate.toLocaleString("id-ID", {
      month: "short",
      timeZone: "UTC",
    });
    const year = witaDate.getUTCFullYear();
    const hours = String(witaDate.getUTCHours()).padStart(2, "0");
    const minutes = String(witaDate.getUTCMinutes()).padStart(2, "0");
    return `${day} ${month} ${year} ${hours}.${minutes} WITA`;
  } catch {
    return "-";
  }
}

export const formatDateWITA = formatDateWIB;

/**
 * Format angka desimal dengan koma (ID style)
 * Contoh: 1.40 → "1,40"
 */
export function formatNumber(
  value: number,
  decimals: number = 2,
  locale: string = "id-ID"
): string {
  return value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format nilai + satuan dengan desimal koma
 * Contoh: formatValue(82.35, "m") → "82,35 m"
 */
export function formatValue(value: number, unit: string, decimals: number = 2): string {
  return `${formatNumber(value, decimals)} ${unit}`;
}

/**
 * Format tren TMA: "+0,12 m" atau "-0,05 m"
 */
export function formatTrend(trend: number): string {
  const sign = trend >= 0 ? "+" : "";
  return `${sign}${formatNumber(trend, 2)} m`;
}

/**
 * Format angka besar: "82,35 m" (tanpa ribuan separator)
 */
export function formatTMA(value: number): string {
  return `${value.toFixed(2).replace(".", ",")} m`;
}

/**
 * Format relatif waktu: "2 jam lalu"
 */
export function formatRelativeTime(isoString: string): string {
  const now = new Date();
  const past = new Date(isoString);
  const diffMs = now.getTime() - past.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 1) return "Baru saja";
  if (diffMin < 60) return `${diffMin} menit lalu`;
  if (diffHour < 24) return `${diffHour} jam lalu`;
  return `${diffDay} hari lalu`;
}
