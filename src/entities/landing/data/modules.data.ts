export interface LandingModule {
  id: string;
  name: string;
  price: string;
  href: string;
  features: string[];
  blobs: string[];
}

export const LANDING_MODULES: LandingModule[] = [
  {
    id: "absensi",
    name: "Absensi & Jurnaling",
    price: "Rp 5.000 / siswa / tahun",
    href: "/modul/absensi",
    features: [
      "Absensi langsung dari HP guru, real-time",
      "Anti jurnal fiktif — selfie + lokasi wajib",
      "Notifikasi otomatis ke orang tua",
    ],
    blobs: ["#38BDF8", "#06B6D4", "#0EA5E9", "#67E8F9", "#BAE6FD"],
  },
  {
    id: "jadwal",
    name: "Jadwal & Kurikulum",
    price: "Rp 2.000 / siswa / tahun",
    href: "/modul/jadwal",
    features: [
      "Auto generate jadwal satu klik",
      "AI optimasi ruangan, anti bentrok",
      "Jadwal real-time untuk guru & siswa",
    ],
    blobs: ["#818CF8", "#A78BFA", "#6366F1", "#C4B5FD", "#E0E7FF"],
  },
  {
    id: "cbt",
    name: "CBT – Ujian Online",
    price: "Rp 3.000 / siswa / tahun",
    href: "/modul/cbt",
    features: [
      "Stabil untuk 1.000+ siswa bersamaan",
      "Lockdown Browser anti kecurangan",
      "Skor & rekap otomatis setelah ujian",
    ],
    blobs: ["#FB923C", "#F472B6", "#FBBF24", "#FCA5A5", "#FED7AA"],
  },
];
