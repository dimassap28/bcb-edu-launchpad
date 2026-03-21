export interface HowItWorksStep {
  label: string;
  title: string;
  desc: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    label: "Step 1",
    title: "Pilih Modul",
    desc: "Pilih fitur yang benar-benar dibutuhkan sekolah Anda. Tidak perlu ambil semua.",
  },
  {
    label: "Step 2",
    title: "Aktifkan & Setup",
    desc: "Tim kami bantu setup, migrasi data, dan pelatihan. Gratis, tanpa biaya tambahan.",
  },
  {
    label: "Step 3",
    title: "Langsung Pakai",
    desc: "Dashboard siap. Guru, staf, dan kepala sekolah bisa mulai hari itu juga.",
  },
];

// Modul untuk animasi step 1
export interface AnimModule {
  label: string;
  active: boolean;
}

export const ANIM_MODULES: AnimModule[] = [
  { label: "Absensi & Jurnaling", active: true },
  { label: "Jadwal & Kurikulum", active: true },
  { label: "CBT – Ujian Online", active: false },
];
