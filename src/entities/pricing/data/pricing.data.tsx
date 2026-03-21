import { Monitor, BookOpen, FileText, Star, Wallet, Code2 } from "lucide-react";
import type { SizePreset, PricingModule, FaqItem } from "@/entities/pricing";

export const SIZE_PRESETS: SizePreset[] = [
  { label: "Kecil", range: "< 300 Siswa", value: 200 },
  { label: "Menengah", range: "301–800 Siswa", value: 550 },
  { label: "Besar", range: "> 800 Siswa", value: 1200 },
];

export const MODULES: PricingModule[] = [
  {
    id: "core",
    name: "Core System (Server Uptime)",
    description: "Mencakup Database Siswa/Guru, Manajemen Kelas, Absensi, dan Dashboard Admin.",
    pricePerStudent: 0,
    icon: <Monitor className="h-5 w-5" />,
    free: true,
  },
  {
    id: "lms",
    name: "Bahan Ajar & LMS",
    description: "Distribusi materi, tugas online, dan manajemen PR siswa.",
    pricePerStudent: 4000,
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    id: "cbt",
    name: "Ujian Online (CBT)",
    description: "Platform ujian berbasis komputer/HP dengan fitur acak soal dan analisis nilai otomatis.",
    pricePerStudent: 2000,
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: "rapor",
    name: "E-Rapor Kurikulum Merdeka",
    description: "Pembuatan rapor otomatis sesuai standar Diknas terbaru (K13 & Merdeka).",
    pricePerStudent: 3500,
    icon: <Star className="h-5 w-5" />,
  },
  {
    id: "keuangan",
    name: "Keuangan & Tagihan SPP",
    description: "Manajemen pembayaran siswa, tunggakan, dan laporan arus kas sekolah.",
    pricePerStudent: 5000,
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    id: "kurikulum",
    name: "Pengembangan Kurikulum",
    description: "Penyusunan materi ajar dan perencanaan pembelajaran.",
    pricePerStudent: 0,
    icon: <Code2 className="h-5 w-5" />,
    comingSoon: true,
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Apakah data sekolah kami aman?",
    a: "Tentu. Kami menggunakan enkripsi end-to-end dan server berlokasi di Indonesia. Data Anda dilindungi sesuai standar keamanan industri dan tidak akan dibagikan ke pihak ketiga.",
  },
  {
    q: "Apa saya bisa menambah modul di tengah jalan?",
    a: "Tentu saja. Anda bisa menambahkan modul kapan saja. Biaya akan dihitung pro-rata untuk sisa masa aktif kontrak Anda.",
  },
  {
    q: "Bagaimana jika jumlah siswa naik melebihi range yang dipilih?",
    a: "Sistem akan otomatis menyesuaikan. Kami akan menghubungi Anda untuk membahas penyesuaian paket dengan harga terbaik.",
  },
  {
    q: "Apakah setup fee benar-benar gratis?",
    a: "Ya, 100% gratis. Kami membantu proses setup, migrasi data, dan pelatihan guru tanpa biaya tambahan.",
  },
  {
    q: "Apakah sekolah perlu menyediakan server sendiri?",
    a: "Tidak. BCB Edu adalah solusi berbasis cloud, sehingga sekolah tidak perlu menyediakan server atau infrastruktur IT tambahan.",
  },
];
