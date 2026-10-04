// data/mock-dam.ts — Mock data Bendungan Sumbawa (sesuai PRD §9)
import { Dam } from "@/types";

export const mockDam: Dam = {
  id: "dam-sumbawa-001",
  name: "Bendungan Sumbawa",
  status: "normal",
  lastUpdate: "2026-09-29T02:40:00.000Z", // 29 Sep 2026 09.40 WIB
  coverImage:
    "/assets/sumbawa1.jpg",
  description:
    "Bendungan Sumbawa merupakan bendungan multipurpose yang dibangun untuk mendukung ketahanan air, irigasi, penyediaan air baku, pembangkit listrik, serta pariwisata.",
  location: {
    lat: -8.5789,
    lng: 117.4231,
    address: "Kabupaten Sumbawa, Nusa Tenggara Barat",
  },
  technical: {
    type: "Urugan Zona (Zonal)",
    height: 82,
    crestLength: 520,
    totalStorage: 33.35,
    effectiveStorage: 27.46,
    deadStorage: 5.15,
    reservoirArea: 320,
    functions: [
      "Irigasi (3.500 ha)",
      "Air Baku (76 l/det)",
      "PLTMH (1,40 MW)",
      "Pariwisata",
      "Perikanan",
    ],
    completionYear: "2018",
    operator: "BWS Nusa Tenggara I",
  },
  levels: {
    nwl: 85.0,
    lwl: 75.0,
    rwl: 85.0,
  },
};
