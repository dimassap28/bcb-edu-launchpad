import { motion } from "framer-motion";
import { Puzzle, Link2, Zap, Lightbulb } from "lucide-react";
import { PillBadge } from "@/components/ui/pill-badge";

const points = [
  { icon: Puzzle, title: "Modular", desc: "Pilih sendiri modul yang dibutuhkan sekolah Anda" },
  { icon: Link2, title: "Terintegrasi", desc: "Semua data terhubung dalam satu sistem" },
  { icon: Zap, title: "Modern", desc: "Antarmuka intuitif, langsung pakai tanpa training panjang" },
];

const SolutionSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Pill badge */}
            <PillBadge icon={<Lightbulb className="h-3 w-3" />}>
              Solusi Cerdas
            </PillBadge>

            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
              Satu Platform,{" "}
              <span className="text-gradient">Sesuai Kebutuhan Anda</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              BCB Edu hadir dengan pendekatan berbeda — modular dan fleksibel. Aktifkan hanya fitur yang relevan, semua tetap terhubung dalam satu dashboard yang bersih dan mudah digunakan.
            </p>

            <div className="space-y-5">
              {points.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <p.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-card rounded-2xl shadow-card border p-6">
              <div className="space-y-3">
                {["Core System", "Absensi & Jurnaling", "Jadwal & Kurikulum", "Nilai & Rapor", "CBT"].map((mod, i) => (
                  <div key={mod} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${i < 3 ? 'bg-primary/5 border-primary/20' : 'bg-muted'}`}>
                    <span className="font-semibold text-sm">{mod}</span>
                    <div className={`w-10 h-6 rounded-full flex items-center ${i < 3 ? 'bg-secondary justify-end' : 'bg-muted-foreground/20 justify-start'} px-1`}>
                      <div className="w-4 h-4 rounded-full bg-card shadow-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-hero-gradient rounded-2xl opacity-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
