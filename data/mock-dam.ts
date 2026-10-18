// data/mock-dam.ts — Mock data Bendungan Sumbawa (sesuai PRD §9)
import { Dam } from "@/types";

export const mockDam: Dam = {
  id: "dam-utan-001",
  name: "Bendungan Utan",
  status: "siaga",
  lastUpdate: "2026-10-20T00:00:00.000Z", // 20 Okt 2026 08.00 WITA
  coverImage:
    "/assets/sumbawa1.jpg",
  description:
    "Bendungan Utan merupakan bendungan yang dibangun untuk mengelola sumber daya air di wilayah Sumbawa. Bendungan ini memiliki peran vital dalam mendukung ketahanan pangan, energi, dan penyediaan air bersih.",
  location: {
    lat: -8.5789,
    lng: 117.4231,
    address: "Kecamatan Utan, Kabupaten Sumbawa, Nusa Tenggara Barat",
  },
  technical: {
    type: "Urugan Batu",
    height: 80,
    crestWidth: 10,
    totalStorage: 29.37,
    effectiveStorage: 24.22,
    deadStorage: 5.15,
    functions: [
      "Irigasi (3.500 ha)",
      "Air Baku (76 l/det)",
      "PLTA_S",
      "Pariwisata",
      "Perikanan",
    ],
    completionYear: "2026",
    operator: "BWS Nusa Tenggara I",
  },
  levels: {
    nwl: 98.03,
    lwl: 77.19,
    rwl: 98.03,
  },
};
