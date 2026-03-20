import {
  FileSpreadsheet,
  Unplug,
  Hourglass,
  CircleDollarSign,
  FileText,
  FileJson,
  File,
} from "lucide-react";
import type { FloatingTag, ChaosFile, ChecklistItem, UIButton, UITag } from "../model/problem.types";

export const floatingTags: FloatingTag[] = [
  {
    label: "Rekap Manual",
    icon: FileSpreadsheet,
    x: "25%",
    y: "25%",
    mobileX: "0%",
  },
  {
    label: "Tidak Terintegrasi",
    icon: Unplug,
    x: "52%",
    y: "20%",
  },
  {
    label: "Proses Lambat",
    icon: Hourglass,
    x: "30%",
    y: "65%",
    mobileX: "2%",
  },
  {
    label: "Sistem Mahal",
    icon: CircleDollarSign,
    x: "60%",
    y: "60%",
  },
];

export const FILES: ChaosFile[] = [
  {
    label: "siswa.xlsx",
    Icon: FileSpreadsheet,
    x: "3%",
    y: 18,
    rot: -14,
    dur: 3.2,
    delay: 0,
  },
  {
    label: "absensi.csv",
    Icon: FileText,
    x: "22%",
    y: 44,
    rot: 10,
    dur: 3.8,
    delay: 0.5,
  },
  {
    label: "jadwal.doc",
    Icon: File,
    x: "43%",
    y: 12,
    rot: -8,
    dur: 3.5,
    delay: 0.9,
  },
  {
    label: "nilai.xlsx",
    Icon: FileSpreadsheet,
    x: "65%",
    y: 40,
    rot: 20,
    dur: 4.0,
    delay: 0.3,
  },
  {
    label: "guru.pdf",
    Icon: FileText,
    x: "85%",
    y: 20,
    rot: -5,
    dur: 3.3,
    delay: 1.2,
  },
  {
    label: "rapor.docx",
    Icon: File,
    x: "8%",
    y: 68,
    rot: 12,
    dur: 3.7,
    delay: 1.6,
  },
  {
    label: "spp.csv",
    Icon: FileJson,
    x: "35%",
    y: 75,
    rot: -20,
    dur: 3.6,
    delay: 0.7,
  },
  {
    label: "kelas.xlsx",
    Icon: FileSpreadsheet,
    x: "59%",
    y: 72,
    rot: 8,
    dur: 4.1,
    delay: 1.0,
  },
];

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  { label: "Manajemen inventaris", delay: 0.3, highlight: false },
  { label: "Laporan keuangan lanjutan", delay: 0.8, highlight: false },
  { label: "Absensi siswa", delay: 1.3, highlight: true },
  { label: "Manajemen aset", delay: 1.8, highlight: false },
  { label: "Jadwal pelajaran", delay: 2.3, highlight: true },
];

export const PRICE_STEPS = [0, 50_000, 120_000, 200_000, 320_000, 450_000];

export const UI_BUTTONS: UIButton[] = [
  {
    label: "Tambah Siswa",
    variant: "fill",
    x: "17%",
    y: 8,
    ox: "0px",
    oy: "55px",
    delay: 0.2,
  },
  {
    label: "Laporan",
    variant: "outline",
    x: "57%",
    y: 6,
    ox: "0px",
    oy: "55px",
    delay: 0.45,
  },
  {
    label: "Ekspor Data",
    variant: "ghost",
    x: "2%",
    y: 42,
    ox: "-55px",
    oy: "30px",
    delay: 0.65,
  },
  {
    label: "Sinkronisasi",
    variant: "outline",
    x: "49%",
    y: 44,
    ox: "55px",
    oy: "30px",
    delay: 0.85,
  },
  {
    label: "Notifikasi",
    variant: "ghost",
    x: "18%",
    y: 78,
    ox: "-30px",
    oy: "-30px",
    delay: 1.05,
  },
  {
    label: "Pengaturan",
    variant: "fill",
    x: "57%",
    y: 80,
    ox: "30px",
    oy: "-30px",
    delay: 1.25,
  },
  {
    label: "Import",
    variant: "outline",
    x: "34%",
    y: 22,
    ox: "0px",
    oy: "-40px",
    delay: 1.4,
  },
  {
    label: "Backup",
    variant: "ghost",
    x: "32%",
    y: 62,
    ox: "-20px",
    oy: "20px",
    delay: 1.55,
  },
];

export const UI_TAGS: UITag[] = [
  { label: "BARU", color: "blue", x: "84%", y: 12, delay: 1.7 },
  { label: "BETA", color: "amber", x: "84%", y: 50, delay: 1.85 },
  { label: "PRO", color: "green", x: "84%", y: 86, delay: 2.0 },
];

export const TAG_COLORS: Record<string, string> = {
  blue: "bg-blue-100  text-blue-700  border-blue-200",
  amber: "bg-amber-100 text-amber-700 border-amber-200",
  green: "bg-green-100 text-green-700 border-green-200",
};
