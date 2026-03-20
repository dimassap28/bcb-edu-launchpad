import { motion } from "framer-motion";
import { Button } from "@/shared/ui/button";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { PillBadge } from "@/shared/ui/pill-badge";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PillBadge icon={<Sparkles className="h-3 w-3" />}>
              Smart Platform for Smart Schools
            </PillBadge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6"
          >
            Kelola Sekolah Lebih Cerdas,{" "}
            <span className="text-gradient">Mulai dari Fitur yang Anda Butuhkan</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            BCB Edu adalah platform manajemen sekolah modular — pilih modul sesuai kebutuhan, bayar sesuai skala, dan nikmati kemudahan dalam satu sistem modern.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button size="lg" asChild className="bg-hero-gradient hover:opacity-90 transition-opacity text-lg px-8 h-14 rounded-xl">
              <a href="#demo">
                Jadwalkan Demo Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 h-14 rounded-xl">
              <a href="#modul">Lihat Fitur</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
          >
            {["Gratis setup", "Gratis migrasi data", "Gratis pelatihan"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-secondary" />
                {item}
              </span>
            ))}
          </motion.div>

          {/* Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 relative"
          >
            <div className="bg-card rounded-2xl shadow-card-hover border p-2 md:p-4">
              <div className="bg-muted rounded-xl aspect-video flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="flex justify-center gap-3 mb-6">
                    {["Absensi", "Jadwal", "Nilai", "CBT"].map((mod, i) => (
                      <div key={mod} className={`px-4 py-2 rounded-lg text-sm font-semibold ${i === 0 ? 'bg-hero-gradient text-primary-foreground' : 'bg-card border text-foreground'}`}>
                        {mod}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-16 bg-card rounded-lg border animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-primary/10 blur-2xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
