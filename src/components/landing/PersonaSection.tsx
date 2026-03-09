import { motion } from "framer-motion";
import { Shield, FileText, BookMarked, Users } from "lucide-react";
import { PillBadge } from "@/components/ui/pill-badge";

const personas = [
  {
    icon: Shield,
    role: "Kepala Sekolah & Yayasan",
    desc: "Pantau performa sekolah dari satu dashboard. Kontrol penuh atas fitur yang aktif dan biaya yang dikeluarkan.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FileText,
    role: "Operator & Staf TU",
    desc: "Tidak ada lagi input manual yang melelahkan. Laporan otomatis, siap cetak kapan saja.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: BookMarked,
    role: "Guru",
    desc: "Fokus mengajar — absensi, nilai, dan jadwal ujian tersedia di satu tempat yang mudah diakses.",
    color: "bg-accent/20 text-accent-foreground",
  },
];

const PersonaSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Pill badge */}
          <PillBadge icon={<Users className="h-3 w-3" />}>
            Pengguna
          </PillBadge>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            BCB Edu untuk <span className="text-gradient">Semua Peran</span> di Sekolah
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {personas.map((p, i) => (
            <motion.div
              key={p.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-2xl p-8 shadow-card border hover:shadow-card-hover transition-shadow text-center"
            >
              <div className={`w-14 h-14 rounded-2xl ${p.color} flex items-center justify-center mx-auto mb-5`}>
                <p.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold mb-3">{p.role}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonaSection;
