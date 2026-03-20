import { motion } from "framer-motion";
import { PillBadge } from "@/shared/ui/pill-badge";
import { Sparkles } from "lucide-react";
import { Section, sectionVariants, childFade } from "@/widgets/module/ui/Section";
import { FloatingIcons } from "@/widgets/module/ui/FloatingIcons";
import { cardHover } from "@/entities/module";

export function AbsensiHighlights() {
  return (
    <Section className="py-24 bg-foreground/[0.03] relative overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--primary) / 0.18) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div variants={sectionVariants} className="flex flex-col items-center">
          <PillBadge icon={<Sparkles className="w-3 h-3" />}>Keunggulan Modul</PillBadge>
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-14">
            Kenapa Memilih Modul Ini?
          </h2>
        </motion.div>

        {/* bento grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* large card */}
          <motion.div variants={childFade()} className={`${cardHover} p-8 md:col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col`}>
            <span className="text-3xl mb-4">📍</span>
            <h3 className="text-xl font-bold mb-2">Live Location</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Periksa lokasi guru secara real-time saat membuat jurnal — tidak bisa dimanipulasi.
            </p>
            <div className="flex-1 min-h-[200px] relative">
              <FloatingIcons />
            </div>
          </motion.div>

          {/* card 2 */}
          <motion.div variants={childFade()} className={`${cardHover} p-6 lg:row-start-2`}>
            <span className="text-3xl mb-3 block">🔔</span>
            <h3 className="text-lg font-bold mb-1">Reminder Otomatis</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Guru piket dan kepala sekolah dapat memantau aktivitas seluruh guru langsung dari dashboard.
            </p>
          </motion.div>

          {/* card 3 */}
          <motion.div variants={childFade()} className={`${cardHover} p-6 lg:row-start-2`}>
            <span className="text-3xl mb-3 block">🤖</span>
            <h3 className="text-lg font-bold mb-1">Rekap KPI Guru Otomatis</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sistem otomatis menghitung jumlah jam mengajar dan performa guru — tanpa input manual.
            </p>
          </motion.div>

          {/* card 4 */}
          <motion.div variants={childFade()} className={`${cardHover} p-6 md:col-span-2 lg:col-span-2 lg:row-start-1 `}>
            <span className="text-3xl mb-3 block">📊</span>
            <h3 className="text-lg font-bold mb-1">Monitoring Kehadiran Guru Real-Time</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Guru piket dan kepala sekolah dapat memantau aktivitas seluruh guru langsung dari dashboard.
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
