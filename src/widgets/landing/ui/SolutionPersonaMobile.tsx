import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PillBadge } from "@/shared/ui/pill-badge";
import { Users } from "lucide-react";
import { PERSONAS } from "@/entities/landing";
import { DotGridAccent } from "../DotGridAccent";

interface SolutionPersonaMobileProps {
  tappedPersona: number | null;
  onTap: (i: number | null) => void;
}

export const SolutionPersonaMobile = ({
  tappedPersona,
  onTap,
}: SolutionPersonaMobileProps) => (
  <div className="md:hidden">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="text-center mb-10"
    >
      <PillBadge icon={<Users className="h-3 w-3" />}>Solusi untuk Semua</PillBadge>
      <h2 className="text-3xl font-extrabold mb-3 leading-tight mt-3">
        Satu Platform, Lima Peran,{" "}
        <span className="text-gradient">Nol Kebingungan</span>
      </h2>
      <p className="text-muted-foreground text-[15px] leading-relaxed max-w-[520px] mx-auto">
        Setiap fitur BCB Edu dirancang untuk menjawab kebutuhan spesifik setiap peran di sekolah.
      </p>
    </motion.div>

    <div className="space-y-0 border-t border-border">
      {PERSONAS.map((p, i) => {
        const expanded = tappedPersona === i;
        return (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className={`relative px-4 py-5 border-b border-border transition-colors duration-200 ${
              expanded ? "bg-primary/5" : ""
            }`}
            onClick={() => onTap(expanded ? null : i)}
          >
            <DotGridAccent bright={expanded} />
            <div className={`w-9 h-9 rounded-lg ${p.color} flex items-center justify-center mb-2.5`}>
              <p.icon className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-sm mb-0.5">{p.name}</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">{p.tagline}</p>

            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                expanded ? "max-h-40 opacity-100 mt-2.5" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="space-y-1.5">
                {p.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-1.5 text-xs flex-nowrap leading-relaxed text-foreground">
                    <Check className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);
