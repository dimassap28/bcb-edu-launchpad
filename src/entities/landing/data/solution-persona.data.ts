import {
  ClipboardCheck,
  CalendarDays,
  MonitorCheck,
  BarChart3,
  LayoutDashboard,
  Shield,
  FileText,
  BookMarked,
  GraduationCap,
  Users,
} from "lucide-react";
import type { SolutionCardType, PersonaCardType } from "../model/solution-persona.types";

export const SOLUTIONS: SolutionCardType[] = [
  {
    icon: LayoutDashboard,
    name: "Dashboard Admin",
    desc: "Pantau performa sekolah, kontrol modul aktif, dan kelola biaya dari satu tempat.",
    connectedPersonas: ["Kepala Sekolah & Yayasan", "Operator & Staf TU"],
  },
  {
    icon: CalendarDays,
    name: "Penjadwalan Otomatis",
    desc: "Generate jadwal sekali klik, anti bentrok, sinkron untuk semua pihak.",
    connectedPersonas: ["Operator & Staf TU", "Guru", "Siswa"],
  },
  {
    icon: MonitorCheck,
    name: "CBT Online",
    desc: "Ujian digital stabil untuk 1.000+ siswa, lockdown browser, rekap otomatis.",
    connectedPersonas: ["Guru", "Siswa", "Operator & Staf TU"],
  },
  {
    icon: BarChart3,
    name: "Manajemen Nilai",
    desc: "Input nilai, olah data, generate rapor digital — tanpa Excel, tanpa rekap manual.",
    connectedPersonas: ["Guru", "Kepala Sekolah & Yayasan", "Orang Tua", "Siswa"],
  },
  {
    icon: ClipboardCheck,
    name: "Absensi Digital",
    desc: "Catat kehadiran real-time dari HP, lengkap dengan jurnal dan foto aktivitas.",
    connectedPersonas: ["Guru", "Operator & Staf TU", "Kepala Sekolah & Yayasan", "Orang Tua"],
  },
];

export const PERSONAS: PersonaCardType[] = [
  {
    icon: Shield,
    name: "Kepala Sekolah & Yayasan",
    tagline: "Kontrol penuh atas fitur aktif dan biaya.",
    benefits: [
      "Pantau performa sekolah dari satu dashboard",
      "Kontrol modul aktif sesuai kebutuhan & budget",
      "Laporan akreditasi siap kapan saja",
    ],
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FileText,
    name: "Operator & Staf TU",
    tagline: "Tidak ada lagi input manual yang melelahkan.",
    benefits: [
      "Laporan absensi & nilai otomatis, siap cetak",
      "Dashboard bersih, hanya yang relevan tampil",
      "Jadwal tersinkronisasi real-time",
    ],
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: BookMarked,
    name: "Guru",
    tagline: "Fokus mengajar — administrasi beres otomatis.",
    benefits: [
      "Input absensi & nilai dari HP dalam detik",
      "Jadwal mengajar selalu up-to-date",
      "Buat & kelola CBT tanpa keahlian teknis",
    ],
    color: "bg-accent/20 text-accent-foreground",
  },
  {
    icon: GraduationCap,
    name: "Siswa",
    tagline: "Akses jadwal, ujian, dan nilai dari satu tempat.",
    benefits: [
      "Lihat jadwal pelajaran real-time",
      "Ikuti ujian CBT dari perangkat sendiri",
      "Pantau nilai dan perkembangan belajar",
    ],
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    name: "Orang Tua",
    tagline: "Pantau anak tanpa harus ke sekolah.",
    benefits: [
      "Notifikasi otomatis jika anak tidak hadir",
      "Akses nilai dan rapor digital kapan saja",
      "Komunikasi dengan sekolah lebih mudah",
    ],
    color: "bg-secondary/10 text-secondary",
  },
];
