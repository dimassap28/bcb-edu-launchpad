import { motion } from "framer-motion";
import { MousePointerClick, Settings, Rocket } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    num: "01",
    title: "Pilih Modul",
    desc: "Pilih fitur yang benar-benar dibutuhkan sekolah Anda. Tidak perlu ambil semua.",
  },
  {
    icon: Settings,
    num: "02",
    title: "Aktifkan & Setup",
    desc: "Tim kami bantu setup, migrasi data, dan pelatihan. Gratis, tanpa biaya tambahan.",
  },
  {
    icon: Rocket,
    num: "03",
    title: "Langsung Pakai",
    desc: "Dashboard siap. Guru, staf, dan kepala sekolah bisa mulai hari itu juga.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="cara-kerja" className="py-24 bg-section-alt">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Mulai dalam <span className="text-gradient">3 Langkah Mudah</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-hero-gradient mb-6">
                <s.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <span className="absolute top-0 right-1/4 text-6xl font-extrabold text-primary/5">{s.num}</span>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>

              {i < 2 && (
                <div className="hidden md:block absolute top-8 -right-4 w-8 text-primary/20">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
