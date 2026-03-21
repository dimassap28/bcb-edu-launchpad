import { motion } from "framer-motion";
import { PillBadge } from "@/shared/ui/pill-badge";
import { Layout } from "lucide-react";
import { Section, sectionVariants, childFade } from "@/widgets/module/ui/Section";
import { cardHover, absensiFeatures } from "@/entities/module";

export function AbsensiFeatures() {
  return (
    <Section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div variants={sectionVariants} className="flex flex-col items-center">
          <PillBadge icon={<Layout className="w-3 h-3" />}>Fitur Modul</PillBadge>
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-14">
            Semua yang Ada di Dalam Modul
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {absensiFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              variants={childFade()}
              className={`${cardHover} p-6`}>
              <span className="text-2xl mb-3 block">{f.emoji}</span>
              <h3 className="text-base font-bold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
