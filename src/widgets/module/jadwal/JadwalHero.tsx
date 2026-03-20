import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Send } from "lucide-react";
import { staggerContainer, childFade } from "@/widgets/module/ui/Section";
import { ScheduleMockup } from "@/components/schedule-mockup";

const HERO_TRANSFORM = {
  rotateX: 12,
  rotateY: -8,
  rotateZ: 2,
  scale: 1.05,
};

export function JadwalHero() {
  const [heroYOffset, setHeroYOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setHeroYOffset(Math.min(window.scrollY / 400, 1) * -16);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="pt-28 pb-0 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer(0.12)} className="max-w-xl">
            <motion.div variants={childFade()}>
              <Badge variant="secondary" className="mb-4 text-xs font-semibold">
                Modul · Jadwal &amp; Kurikulum
              </Badge>
            </motion.div>
            <motion.div variants={childFade()}>
              <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.12] mb-5">
                Atur Jadwal Sekolah Tanpa Ribet, <span className="text-gradient">Tanpa Bentrok</span>
              </h1>
            </motion.div>
            <motion.div variants={childFade()}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                Generate jadwal otomatis dalam satu klik — perubahan langsung terlihat oleh semua pihak, real-time.
              </p>
            </motion.div>
            <motion.div variants={childFade()}>
              <Button size="lg" asChild className="bg-hero-gradient hover:opacity-90 transition-opacity text-lg px-8 h-14 rounded-xl">
                <a href="/#demo">
                  Jadwalkan Demo Gratis
                  <Send className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
            <motion.div variants={childFade()}>
              <p className="mt-4 text-sm text-muted-foreground">
                Harga mulai <span className="font-semibold text-foreground">Rp 2.000</span> / siswa / tahun
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div
        style={{
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          height: "520px",
          marginTop: "-40px",
          overflow: "hidden",
        }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
          style={{ height: "220px", background: "linear-gradient(to top, hsl(var(--background)) 20%, transparent 100%)" }}
        />
        <div
          className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
          style={{ height: "80px", background: "linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)" }}
        />

        <div
          style={{
            transform: `translateY(${heroYOffset}px)`,
            transition: "transform 0.1s ease-out",
            perspective: "3000px",
            perspectiveOrigin: "50% 20%",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: "1200px",
              height: "700px",
              position: "absolute",
              top: "60px",
              left: "50%",
              transform: `translateX(-50%) rotateX(${HERO_TRANSFORM.rotateX}deg) rotateY(${HERO_TRANSFORM.rotateY}deg) rotate(${HERO_TRANSFORM.rotateZ}deg) scale(${HERO_TRANSFORM.scale})`,
              transformOrigin: "center top",
              borderRadius: "16px",
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.06)",
              overflow: "hidden",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <ScheduleMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
