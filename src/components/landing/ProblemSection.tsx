import { motion } from "framer-motion";
import { Clock, DollarSign, Frown, AlertTriangle } from "lucide-react";
import { PillBadge } from "@/components/ui/pill-badge";

const problems = [
  {
    icon: Clock,
    title: "Administrasi yang menyita waktu",
    desc: "Data siswa, absensi, dan jadwal masih dikelola manual atau tersebar di banyak file.",
  },
  {
    icon: DollarSign,
    title: "Bayar mahal untuk fitur yang tidak dipakai",
    desc: "Sistem lain memaksa Anda membeli paket lengkap, meski hanya butuh 2–3 fitur.",
  },
  {
    icon: Frown,
    title: "Sistem baru yang malah membingungkan",
    desc: "Terlalu banyak fitur sekaligus membuat guru dan staf enggan menggunakannya.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-24 bg-section-alt">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Pill badge */}
          <PillBadge icon={<AlertTriangle className="h-3 w-3" />}>
            Tantangan
          </PillBadge>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Apakah Sekolah Anda{" "}
            <span className="text-gradient">Masih Menghadapi Ini?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Banyak sekolah terjebak dalam sistem yang justru menambah beban.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-2xl p-8 shadow-card border hover:shadow-card-hover transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-5">
                <p.icon className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-lg font-bold mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
