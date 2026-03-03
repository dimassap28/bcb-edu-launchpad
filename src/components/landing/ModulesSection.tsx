import { motion } from "framer-motion";
import { Database, CalendarDays, BookOpen, GraduationCap, ClipboardCheck } from "lucide-react";

const modules = [
  {
    icon: Database,
    name: "Core System",
    tag: "Gratis",
    desc: "Database siswa & guru, manajemen kelas, dan dashboard admin — tersedia tanpa biaya.",
    free: true,
  },
  {
    icon: ClipboardCheck,
    name: "Absensi & Jurnaling",
    tag: "Rp 5.000 / siswa / tahun",
    desc: "Catat kehadiran siswa dan guru secara digital, lengkap dengan jurnal harian dan foto aktivitas.",
  },
  {
    icon: CalendarDays,
    name: "Jadwal & Kurikulum",
    tag: "Rp 2.000 / siswa / tahun",
    desc: "Atur jadwal pelajaran dan struktur kurikulum — perubahan real-time, semua pihak langsung tahu.",
  },
  {
    icon: BookOpen,
    name: "Nilai & Rapor",
    tag: "Rp 3.000 / siswa / tahun",
    desc: "Input nilai, olah data, dan generate rapor digital — tidak perlu Excel, tidak perlu cetak manual.",
  },
  {
    icon: GraduationCap,
    name: "CBT — Ujian Online",
    tag: "Rp 3.000 / siswa / tahun",
    desc: "Selenggarakan ujian langsung di platform. Aman, terstruktur, dan hasil otomatis terekam.",
  },
];

const ModulesSection = () => {
  return (
    <section id="modul" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Modul yang Bisa Anda Pilih
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Setiap modul dapat diaktifkan terpisah. Bayar hanya untuk yang Anda gunakan.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {modules.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-card rounded-2xl p-6 border shadow-card hover:shadow-card-hover transition-shadow ${m.free ? 'ring-2 ring-secondary/40 relative' : ''}`}
            >
              {m.free && (
                <span className="absolute -top-3 right-4 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  GRATIS
                </span>
              )}
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <m.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-1">{m.name}</h3>
              <span className="text-xs font-semibold text-secondary mb-3 block">{m.tag}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
