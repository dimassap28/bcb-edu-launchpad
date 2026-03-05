import { motion, useInView, AnimatePresence } from "framer-motion";
import { Database, ClipboardCheck, CalendarDays, GraduationCap } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

/* ── data ─────────────────────────────────────────────────── */

const modules = [
  {
    id: "absensi",
    icon: ClipboardCheck,
    name: "Absensi & Jurnaling",
    price: "Rp 5.000 / siswa / tahun",
    href: "/modul/absensi",
    position: "top" as const,
    tips: [
      "Monitoring kehadiran guru real-time dari dashboard",
      "Anti jurnal fiktif — wajib selfie + lokasi langsung",
      "Notifikasi otomatis ke orang tua jika siswa tidak hadir",
    ],
  },
  {
    id: "jadwal",
    icon: CalendarDays,
    name: "Jadwal & Kurikulum",
    price: "Rp 2.000 / siswa / tahun",
    href: "/modul/jadwal",
    position: "left" as const,
    tips: [
      "Auto generate jadwal cukup satu klik",
      "AI optimasi ruangan, anti bentrok otomatis",
      "Jadwal real-time bisa dilihat guru & siswa",
    ],
  },
  {
    id: "cbt",
    icon: GraduationCap,
    name: "CBT – Ujian Online",
    price: "Rp 3.000 / siswa / tahun",
    href: "/modul/cbt",
    position: "right" as const,
    tips: [
      "Stabil untuk 1.000+ siswa bersamaan",
      "Lockdown Browser anti kecurangan",
      "Skor & rekap otomatis setelah ujian selesai",
    ],
  },
];

/* ── animated dashed connector ────────────────────────────── */

const ConnectorLine = ({
  x1, y1, x2, y2, active, drawn, delay,
}: {
  x1: number; y1: number; x2: number; y2: number;
  active: boolean; drawn: boolean; delay: number;
}) => {
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="hsl(var(--primary))"
      strokeWidth={active ? 3 : 2}
      strokeDasharray="8 6"
      strokeLinecap="round"
      initial={{ strokeDashoffset: length, opacity: 0 }}
      animate={drawn ? {
        strokeDashoffset: [0, -28],
        opacity: active ? 1 : 0.4,
      } : { strokeDashoffset: length, opacity: 0 }}
      transition={drawn ? {
        strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear", delay },
        opacity: { duration: 0.3 },
      } : { duration: 0.6, delay }}
    />
  );
};

/* ── tooltip card ─────────────────────────────────────────── */

const TooltipCard = ({ mod, side }: { mod: typeof modules[0]; side: "top" | "left" | "right" }) => {
  const origin = side === "top" ? "bottom" : side === "left" ? "right" : "left";
  const pos = side === "top"
    ? "bottom-full left-1/2 -translate-x-1/2 mb-3"
    : side === "left"
    ? "right-full top-1/2 -translate-y-1/2 mr-3"
    : "left-full top-1/2 -translate-y-1/2 ml-3";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      style={{ transformOrigin: origin }}
      className={`absolute ${pos} z-50 w-64 bg-card border border-border rounded-xl p-4 shadow-card-hover pointer-events-none`}
    >
      <h4 className="font-bold text-sm text-card-foreground mb-2">{mod.name}</h4>
      <ul className="space-y-1.5 mb-3">
        {mod.tips.map((t) => (
          <li key={t} className="flex items-start gap-2 text-xs text-muted-foreground leading-snug">
            <span className="text-secondary mt-0.5 shrink-0">•</span>
            {t}
          </li>
        ))}
      </ul>
      <span className="text-[11px] text-primary font-semibold">Klik untuk detail lengkap →</span>
    </motion.div>
  );
};

/* ── mobile expandable node ───────────────────────────────── */

const MobileModuleNode = ({ mod, coreDrawn }: { mod: typeof modules[0]; coreDrawn: boolean }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const Icon = mod.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={coreDrawn ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full bg-[hsl(220_20%_12%)] border border-[hsl(220_15%_20%)] rounded-xl p-4 flex items-center gap-3 transition-all duration-200 hover:border-primary/50"
      >
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="text-left flex-1">
          <h3 className="font-bold text-sm text-[hsl(210_20%_95%)]">{mod.name}</h3>
          <span className="text-xs text-secondary">{mod.price}</span>
        </div>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          className="text-muted-foreground text-xs"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-2 space-y-2">
              <ul className="space-y-1.5">
                {mod.tips.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-xs text-muted-foreground leading-snug">
                    <span className="text-secondary mt-0.5 shrink-0">•</span>
                    {t}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate(mod.href)}
                className="text-xs text-primary font-semibold hover:underline"
              >
                Lihat detail lengkap →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── main section ─────────────────────────────────────────── */

const ModulesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [phase, setPhase] = useState(0); // 0=hidden, 1=core, 2=lines, 3=nodes

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 600);
    const t3 = setTimeout(() => setPhase(3), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isInView]);

  /* ── desktop node positions (relative to center of SVG viewBox) ── */
  const cx = 400, cy = 280;
  const nodePositions = {
    top: { x: cx, y: 80 },
    left: { x: 120, y: cy },
    right: { x: 680, y: cy },
  };

  /* slide direction per position */
  const slideFrom = {
    top: { y: -40, x: 0 },
    left: { x: -40, y: 0 },
    right: { x: 40, y: 0 },
  };

  /* ── desktop node component ── */
  const DesktopModuleNode = useCallback(({ mod, idx }: { mod: typeof modules[0]; idx: number }) => {
    const Icon = mod.icon;
    const pos = nodePositions[mod.position];
    const isHovered = hoveredModule === mod.id;

    return (
      <motion.g
        initial={{ opacity: 0, ...slideFrom[mod.position] }}
        animate={phase >= 3 ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.3, delay: idx * 0.1 }}
        style={{ cursor: "pointer" }}
        onMouseEnter={() => setHoveredModule(mod.id)}
        onMouseLeave={() => setHoveredModule(null)}
        onClick={() => navigate(mod.href)}
      >
        <foreignObject
          x={pos.x - 100}
          y={pos.y - 45}
          width={200}
          height={90}
          className="overflow-visible"
        >
          <div className="relative group">
            <motion.div
              animate={isHovered ? { y: -4, boxShadow: "0 12px 32px -8px hsl(210 80% 45% / 0.4)" } : { y: 0, boxShadow: "0 4px 16px -4px hsl(0 0% 0% / 0.3)" }}
              transition={{ duration: 0.2 }}
              className={`bg-[hsl(220_20%_12%)] border rounded-xl p-3 flex items-center gap-3 transition-colors duration-200 ${
                isHovered ? "border-primary" : "border-[hsl(220_15%_20%)]"
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[hsl(210_20%_95%)] leading-tight">{mod.name}</h3>
                <span className="text-[11px] text-secondary">{mod.price}</span>
              </div>
            </motion.div>

            <AnimatePresence>
              {isHovered && <TooltipCard mod={mod} side={mod.position} />}
            </AnimatePresence>
          </div>
        </foreignObject>
      </motion.g>
    );
  }, [hoveredModule, phase, navigate]);

  /* ── mobile layout ── */
  if (isMobile) {
    return (
      <section id="modul" ref={sectionRef} className="py-20 bg-[hsl(220_30%_6%)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-extrabold mb-4 text-[hsl(210_20%_95%)]">
              Modul yang Bisa Anda Pilih
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Setiap modul dapat diaktifkan terpisah. Bayar hanya untuk yang Anda gunakan.
            </p>
          </motion.div>

          {/* Core System */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="mx-auto mb-4 max-w-sm"
          >
            <div className="bg-hero-gradient rounded-xl p-4 text-center relative shadow-lg">
              <span className="absolute -top-2 right-3 bg-secondary text-secondary-foreground text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                GRATIS
              </span>
              <Database className="h-6 w-6 text-primary-foreground mx-auto mb-2" />
              <h3 className="font-bold text-primary-foreground">Core System</h3>
              <p className="text-primary-foreground/70 text-xs mt-1">Database siswa & guru, manajemen kelas, dashboard admin</p>
            </div>
          </motion.div>

          {/* Dashed connector line (vertical, animated) */}
          <div className="flex justify-center mb-4">
            <svg width="2" height="32" className="overflow-visible">
              <motion.line
                x1={1} y1={0} x2={1} y2={32}
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                strokeDasharray="6 4"
                initial={{ opacity: 0 }}
                animate={phase >= 2 ? { opacity: 0.4, strokeDashoffset: [0, -20] } : {}}
                transition={{ strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.3 } }}
              />
            </svg>
          </div>

          {/* Module nodes */}
          <div className="space-y-3 max-w-sm mx-auto">
            {modules.map((mod) => (
              <MobileModuleNode key={mod.id} mod={mod} coreDrawn={phase >= 3} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── desktop layout ── */
  return (
    <section id="modul" ref={sectionRef} className="py-24 bg-[hsl(220_30%_6%)]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-[hsl(210_20%_95%)]">
            Modul yang Bisa Anda Pilih
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Setiap modul dapat diaktifkan terpisah. Bayar hanya untuk yang Anda gunakan.
          </p>
        </motion.div>

        {/* diagram */}
        <div className="max-w-3xl mx-auto">
          <svg
            viewBox="0 0 800 380"
            className="w-full overflow-visible"
            style={{ maxHeight: 420 }}
          >
            {/* connector lines */}
            {modules.map((mod, i) => {
              const pos = nodePositions[mod.position];
              return (
                <ConnectorLine
                  key={mod.id}
                  x1={cx} y1={cy}
                  x2={pos.x} y2={pos.y}
                  active={hoveredModule === mod.id}
                  drawn={phase >= 2}
                  delay={i * 0.15}
                />
              );
            })}

            {/* Core System node */}
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4 }}
            >
              <foreignObject
                x={cx - 90}
                y={cy - 50}
                width={180}
                height={100}
                className="overflow-visible"
              >
                <div className="relative">
                  <div className="bg-hero-gradient rounded-xl p-4 text-center shadow-lg shadow-primary/20">
                    <span className="absolute -top-2.5 right-2 bg-secondary text-secondary-foreground text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      GRATIS
                    </span>
                    <Database className="h-6 w-6 text-primary-foreground mx-auto mb-1.5" />
                    <h3 className="font-bold text-primary-foreground text-sm">Core System</h3>
                    <p className="text-primary-foreground/70 text-[10px] mt-0.5 leading-snug">
                      Database, kelas &amp; dashboard
                    </p>
                  </div>
                </div>
              </foreignObject>
            </motion.g>

            {/* Module nodes */}
            {modules.map((mod, i) => (
              <DesktopModuleNode key={mod.id} mod={mod} idx={i} />
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
