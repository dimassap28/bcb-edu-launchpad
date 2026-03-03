import { motion } from "framer-motion";
import { Quote, Users } from "lucide-react";

const SocialProofSection = () => {
  return (
    <section id="testimoni" className="py-24 bg-section-alt">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Dipercaya oleh <span className="text-gradient">Sekolah di Indonesia</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card-hover border relative">
            <Quote className="absolute top-6 left-6 h-8 w-8 text-primary/10" />
            <p className="text-lg md:text-xl leading-relaxed mb-8 italic text-foreground/90">
              "Dengan BCB Edu, kami tidak lagi kerepotan mengurus absensi dan jadwal secara manual. Sistemnya mudah dipahami oleh seluruh guru kami."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-hero-gradient flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">KS</span>
              </div>
              <div>
                <p className="font-bold text-sm">Kepala Sekolah</p>
                <p className="text-muted-foreground text-sm">Pilot School BCB Edu</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mt-10 text-muted-foreground"
        >
          <Users className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">Telah digunakan oleh sekolah swasta dengan 1.000+ siswa aktif</span>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
