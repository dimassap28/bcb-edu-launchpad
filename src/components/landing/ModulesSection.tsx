import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const modules = [
  {
    id: "absensi",
    name: "Absensi & Jurnaling",
    price: "Rp 5.000 / siswa / tahun",
    href: "/modul/absensi",
    features: [
      "Absensi langsung dari HP guru, real-time",
      "Anti jurnal fiktif — selfie + lokasi wajib",
      "Notifikasi otomatis ke orang tua",
    ],
    blobs: ["#38BDF8", "#06B6D4", "#0EA5E9", "#67E8F9", "#BAE6FD"],
  },
  {
    id: "jadwal",
    name: "Jadwal & Kurikulum",
    price: "Rp 2.000 / siswa / tahun",
    href: "/modul/jadwal",
    features: [
      "Auto generate jadwal satu klik",
      "AI optimasi ruangan, anti bentrok",
      "Jadwal real-time untuk guru & siswa",
    ],
    blobs: ["#818CF8", "#A78BFA", "#6366F1", "#C4B5FD", "#E0E7FF"],
  },
  {
    id: "cbt",
    name: "CBT – Ujian Online",
    price: "Rp 3.000 / siswa / tahun",
    href: "/modul/cbt",
    features: [
      "Stabil untuk 1.000+ siswa bersamaan",
      "Lockdown Browser anti kecurangan",
      "Skor & rekap otomatis setelah ujian",
    ],
    blobs: ["#FB923C", "#F472B6", "#FBBF24", "#FCA5A5", "#FED7AA"],
  },
];

/* blob movement patterns — each blob gets unique animation */
const blobAnimations = [
  { tx: 30, ty: -25, dur: 7 },
  { tx: -35, ty: 20, dur: 9 },
  { tx: 20, ty: 35, dur: 11 },
  { tx: -25, ty: -30, dur: 8 },
  { tx: 30, ty: 15, dur: 10 },
];

const Blob = ({
  color,
  index,
  hovered,
}: {
  color: string;
  index: number;
  hovered: boolean;
}) => {
  const anim = blobAnimations[index];
  const speed = hovered ? anim.dur * 0.7 : anim.dur;

  /* position each blob differently */
  const positions = [
    { top: "10%", left: "20%" },
    { top: "50%", left: "60%" },
    { top: "30%", left: "10%" },
    { top: "60%", left: "40%" },
    { top: "20%", left: "70%" },
  ];

  return (
    <div
      className="absolute w-32 h-32 rounded-full"
      style={{
        backgroundColor: color,
        filter: "blur(50px)",
        ...positions[index],
        animation: `blob-move-${index} ${speed}s ease-in-out infinite alternate`,
        animationDelay: `${index * -1.5}s`,
      }}
    />
  );
};

const ModuleCard = ({
  mod,
  index,
}: {
  mod: (typeof modules)[0];
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(mod.href)}
      className="relative flex flex-col bg-card border border-border cursor-pointer overflow-hidden transition-all duration-250 ease-out"
      style={{
        borderRadius: 20,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 16px 48px -8px hsl(210 80% 45% / 0.18)"
          : "0 2px 12px -4px hsl(0 0% 0% / 0.06)",
      }}
    >
      {/* top bar: title + arrow */}
      <div className="flex items-start justify-between p-5 pb-0">
        <h3 className="text-lg font-bold text-card-foreground">{mod.name}</h3>
        <div
          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center transition-all duration-250"
          style={{
            transform: hovered
              ? "translate(2px, -2px)"
              : "translate(0, 0)",
            color: hovered
              ? "hsl(var(--primary))"
              : "hsl(var(--muted-foreground))",
          }}
        >
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* swirl zone */}
      <div
        className="relative mx-5 mt-4 overflow-hidden flex items-center justify-center"
        style={{
          height: 280,
          borderRadius: 16,
          opacity: 0.85,
        }}
      >
        {mod.blobs.map((color, i) => (
          <Blob key={i} color={color} index={i} hovered={hovered} />
        ))}

        {/* mockup placeholder */}
        <div
          className="relative z-10 w-40 bg-white flex items-center justify-center"
          style={{
            height: 280,
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            animation: "float-bob 3s ease-in-out infinite",
          }}
        >
          <span className="text-xs text-gray-400 select-none">
            [ Screenshot ]
          </span>
        </div>
      </div>

      {/* bottom content */}
      <div className="p-5 pt-4 flex-1 flex flex-col">
        <span className="text-xs text-secondary text-semibold mb-3">{mod.price}</span>
        <ul className="space-y-1.5">
          {mod.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-sm text-muted-foreground leading-snug"
            >
              <span className="text-primary mt-0.5 shrink-0">–</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const ModulesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="modul" ref={sectionRef} className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-foreground">
            Modul yang Bisa Anda Pilih
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Setiap modul dapat diaktifkan terpisah. Bayar hanya untuk yang Anda gunakan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {modules.map((mod, i) => (
            <ModuleCard key={mod.id} mod={mod} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
