import { motion } from "framer-motion";
import { PillBadge } from "@/shared/ui/pill-badge";
import { Cpu } from "lucide-react";
import { Section, sectionVariants, childFade } from "@/widgets/module/ui/Section";
import { cardHover } from "@/entities/module/data/module.data";

export function CBTFeatures() {
  return (
    <Section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div variants={sectionVariants} className="flex flex-col items-center">
          <PillBadge icon={<Cpu className="w-3 h-3" />}>Fitur Modul</PillBadge>
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-14">Semua yang Ada di Dalam Modul</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {[
            { emoji: "📱", title: "Ujian Full Digital", desc: "Menghilangkan kebutuhan ujian kertas — seluruh proses dilakukan secara online di platform." },
            { emoji: "📋", title: "Ujian Susulan Terintegrasi", desc: "Fitur ujian susulan tersedia dengan nilai yang langsung masuk ke rekap utama secara otomatis." },
            { emoji: "💻", title: "Manajemen Perangkat Siswa", desc: "Mendukung soft reset & hard reset jika perangkat siswa mengalami kendala saat ujian berlangsung." },
            { emoji: "🔑", title: "Manajemen Token Ujian", desc: "Token ujian dapat di-reset kapan saja oleh guru untuk mencegah kebocoran soal." },
          ].map((f) => (
            <motion.div key={f.title} variants={childFade()} className={`${cardHover} p-6`}>
              <span className="text-2xl mb-3 block">{f.emoji}</span>
              <h3 className="text-base font-bold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
