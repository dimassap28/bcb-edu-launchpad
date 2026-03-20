import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { PillBadge } from "@/shared/ui/pill-badge";
import { ShieldCheck } from "lucide-react";
import { Section, sectionVariants, childFade } from "@/widgets/module/ui/Section";
import { cardHover } from "@/entities/module/data/module.data";

const floatingIcons = [
  { emoji: "🔒", label: "Lockdown", x: "-145%", y: "-130%" },
  { emoji: "📝", label: "Soal", x: "45%", y: "-190%" },
  { emoji: "⏱️", label: "Timer", x: "65%", y: "10%" },
  { emoji: "📊", label: "Hasil", x: "45%", y: "235%" },
  { emoji: "🔑", label: "Token", x: "-130%", y: "175%" },
];

function FloatingIcons() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCycle((c) => c + 1), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
        <span className="text-[150px]">🖥️</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={cycle} className="absolute inset-0">
          {floatingIcons.map((icon, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ x: icon.x, y: icon.y }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [icon.y, `calc(${icon.y} - 6px)`, icon.y],
              }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{
                scale: { delay: i * 0.3, duration: 0.4, ease: "easeOut" },
                opacity: { delay: i * 0.3, duration: 0.4 },
                y: { delay: i * 0.3 + 1.5, duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
              }}
            >
              <div className="flex items-center gap-1.5 bg-card rounded-full px-3 py-1.5 shadow-card border text-xs font-medium whitespace-nowrap">
                <span>{icon.emoji}</span>
                <span className="text-foreground">{icon.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function CBTHighlights() {
  return (
    <Section className="py-24 bg-foreground/[0.03] relative overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--primary) / 0.18) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div variants={sectionVariants} className="flex flex-col items-center">
          <PillBadge icon={<ShieldCheck className="w-3 h-3" />}>Keunggulan Modul</PillBadge>
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-14">Kenapa Memilih Modul Ini?</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <motion.div variants={childFade()} className={`${cardHover} p-8 md:col-span-2 lg:row-span-3 flex flex-col`}>
            <span className="text-3xl mb-4">🛡️</span>
            <h3 className="text-xl font-bold mb-2">Anti Kecurangan</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Dilengkapi Lockdown Browser — siswa tidak bisa membuka aplikasi atau tab lain selama ujian berlangsung.
            </p>
            <div className="flex-1 min-h-[200px] relative">
              <FloatingIcons />
            </div>
          </motion.div>

          <motion.div variants={childFade()} className={`${cardHover} p-6 md:col-span-2 lg:col-span-1`}>
            <span className="text-3xl mb-3 block">🚀</span>
            <h3 className="text-lg font-bold mb-1">Akses Massal Stabil</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dapat diakses oleh 1.000+ siswa secara bersamaan tanpa kendala performa atau lag.
            </p>
          </motion.div>

          <motion.div variants={childFade()} className={`${cardHover} p-6`}>
            <span className="text-3xl mb-3 block">🔄</span>
            <h3 className="text-lg font-bold mb-1">Rekap Otomatis Sesuai Absen</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hasil ujian otomatis terekam dan tersinkronisasi dengan data kehadiran siswa.
            </p>
          </motion.div>

          <motion.div variants={childFade()} className={`${cardHover} p-6`}>
            <span className="text-3xl mb-3 block">👁️</span>
            <h3 className="text-lg font-bold mb-1">Monitoring Real-Time</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Guru dapat memantau kehadiran dan progres ujian setiap siswa secara langsung dari dashboard.
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
