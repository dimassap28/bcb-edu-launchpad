import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";

const PricingSection = () => {
  return (
    <section id="harga" className="py-24 bg-section-alt">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(220 25% 8%) 0%, hsl(220 20% 14%) 50%, hsl(25 60% 15%) 100%)",
          }}
        >
          {/* Subtle warm glow corners */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: "hsl(25 80% 40%)" }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15 blur-3xl" style={{ background: "hsl(25 70% 35%)" }} />

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
            {/* Headline */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-6">
              Investasi Cerdas untuk Sekolah Anda
            </h2>

            {/* Price highlight */}
            <p className="text-sm font-semibold text-secondary mb-2">Mulai dari</p>
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">Rp 2.000</span>
              <span className="text-base md:text-lg text-white/60 font-medium" style={{ fontFamily: "'Caveat', cursive" }}>/ siswa / tahun</span>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-white/70 max-w-lg mx-auto mb-8 leading-relaxed">
              Core System <span className="font-bold text-white">Gratis Selamanya</span>. Bayar <span className="underline decoration-white/40">hanya modul tambahan</span> yang digunakan dengan sistem kuota per siswa.
            </p>

            {/* Discount badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-2.5 mb-8">
              <Tag className="h-4 w-4 text-accent" />
              <span className="text-sm text-white/80">
                Diskon hingga <span className="font-bold text-accent">20%</span> untuk aktivasi paket modul lengkap.
              </span>
            </div>

            {/* CTA */}
            <div>
              <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all px-10 h-13 rounded-xl text-base font-bold shadow-lg shadow-accent/20">
                <a href="/pricing">Cek Simulasi Harga</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
