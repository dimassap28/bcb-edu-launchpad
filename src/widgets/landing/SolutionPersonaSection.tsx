import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  CalendarDays,
  MonitorCheck,
  BarChart3,
  LayoutDashboard,
  Shield,
  FileText,
  BookMarked,
  GraduationCap,
  Users,
  Check,
} from "lucide-react";
import { PillBadge } from "@/shared/ui/pill-badge";
import { useIsMobile } from "@/shared/hooks/use-mobile";

import { type SolutionCardType, type PersonaCardType } from "./solution-persona.types";
import { DotGridAccent } from "./DotGridAccent";
import { GridSolutionCard } from "./GridSolutionCard";
import { GridPersonaCard } from "./GridPersonaCard";

const solutions: SolutionCardType[] = [
  {
    icon: LayoutDashboard,
    name: "Dashboard Admin",
    desc: "Pantau performa sekolah, kontrol modul aktif, dan kelola biaya dari satu tempat.",
    connectedPersonas: ["Kepala Sekolah & Yayasan", "Operator & Staf TU"],
  },
  {
    icon: CalendarDays,
    name: "Penjadwalan Otomatis",
    desc: "Generate jadwal sekali klik, anti bentrok, sinkron untuk semua pihak.",
    connectedPersonas: ["Operator & Staf TU", "Guru", "Siswa"],
  },
  {
    icon: MonitorCheck,
    name: "CBT Online",
    desc: "Ujian digital stabil untuk 1.000+ siswa, lockdown browser, rekap otomatis.",
    connectedPersonas: ["Guru", "Siswa", "Operator & Staf TU"],
  },
  {
    icon: BarChart3,
    name: "Manajemen Nilai",
    desc: "Input nilai, olah data, generate rapor digital — tanpa Excel, tanpa rekap manual.",
    connectedPersonas: [
      "Guru",
      "Kepala Sekolah & Yayasan",
      "Orang Tua",
      "Siswa",
    ],
  },
  {
    icon: ClipboardCheck,
    name: "Absensi Digital",
    desc: "Catat kehadiran real-time dari HP, lengkap dengan jurnal dan foto aktivitas.",
    connectedPersonas: [
      "Guru",
      "Operator & Staf TU",
      "Kepala Sekolah & Yayasan",
      "Orang Tua",
    ],
  },
];

const personas: PersonaCardType[] = [
  {
    icon: Shield,
    name: "Kepala Sekolah & Yayasan",
    tagline: "Kontrol penuh atas fitur aktif dan biaya.",
    benefits: [
      "Pantau performa sekolah dari satu dashboard",
      "Kontrol modul aktif sesuai kebutuhan & budget",
      "Laporan akreditasi siap kapan saja",
    ],
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FileText,
    name: "Operator & Staf TU",
    tagline: "Tidak ada lagi input manual yang melelahkan.",
    benefits: [
      "Laporan absensi & nilai otomatis, siap cetak",
      "Dashboard bersih, hanya yang relevan tampil",
      "Jadwal tersinkronisasi real-time",
    ],
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: BookMarked,
    name: "Guru",
    tagline: "Fokus mengajar — administrasi beres otomatis.",
    benefits: [
      "Input absensi & nilai dari HP dalam detik",
      "Jadwal mengajar selalu up-to-date",
      "Buat & kelola CBT tanpa keahlian teknis",
    ],
    color: "bg-accent/20 text-accent-foreground",
  },
  {
    icon: GraduationCap,
    name: "Siswa",
    tagline: "Akses jadwal, ujian, dan nilai dari satu tempat.",
    benefits: [
      "Lihat jadwal pelajaran real-time",
      "Ikuti ujian CBT dari perangkat sendiri",
      "Pantau nilai dan perkembangan belajar",
    ],
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    name: "Orang Tua",
    tagline: "Pantau anak tanpa harus ke sekolah.",
    benefits: [
      "Notifikasi otomatis jika anak tidak hadir",
      "Akses nilai dan rapor digital kapan saja",
      "Komunikasi dengan sekolah lebih mudah",
    ],
    color: "bg-secondary/10 text-secondary",
  },
];



/* ─── Connector Lines SVG ─── */
type LinePositions = {
  logo: { x: number; y: number } | null;
  solutions: ({ x: number; y: number } | null)[];
  personas: ({ x: number; y: number } | null)[];
};

interface ZigzagConnectorLinesProps {
  positions: LinePositions;
  hoveredSolution: number | null;
  hoveredPersona: number | null;
  connectedPersonaIndices: number[];
  connectedSolutionIndices: number[];
}

const BRAND_COLOR = "hsl(210, 80%, 45%)"; // Kept static for inline SVG rendering

const ZigzagConnectorLines = ({
  positions,
  hoveredSolution,
  hoveredPersona,
  connectedPersonaIndices,
  connectedSolutionIndices,
}: ZigzagConnectorLinesProps) => {
  const { logo, solutions: solCenters, personas: perCenters } = positions;
  if (!logo) return null;

  const isSolActive = hoveredSolution !== null;
  const isPerActive = hoveredPersona !== null;
  if (!isSolActive && !isPerActive) return null;

  // Helper for smooth-cornered circuit paths
  const getSmoothStepPath = (p1: { x: number; y: number }, p2: { x: number; y: number }, isRight: boolean) => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    
    // Constant horizontal "exit" from the card
    const hExit = isRight ? 45 : -45;
    const cornerRadius = 24; // Smoothness factor
    
    const x1 = p1.x;
    const y1 = p1.y;
    const x2 = p2.x;
    const y2 = p2.y;
    
    const midX = x1 + hExit;
    const sweep = dy > 0 ? (isRight ? 1 : 0) : (isRight ? 0 : 1);
    
    // Simple S-curve with 2 arcs for smoothness
    return `M ${x1} ${y1} 
            L ${midX - (isRight ? cornerRadius : -cornerRadius)} ${y1}
            Q ${midX} ${y1} ${midX} ${y1 + (dy > 0 ? cornerRadius : -cornerRadius)}
            L ${midX} ${y2 - (dy > 0 ? cornerRadius : -cornerRadius)}
            Q ${midX} ${y2} ${midX + (isRight ? cornerRadius : -cornerRadius)} ${y2}
            L ${x2} ${y2}`;
  };

  const linePairs: { si: number; pi: number }[] = [];
  const activeSolIndices: number[] = [];

  if (isSolActive) {
    const si = hoveredSolution!;
    activeSolIndices.push(si);
    for (const pi of connectedPersonaIndices) {
      linePairs.push({ si, pi });
    }
  } else if (isPerActive) {
    const pi = hoveredPersona!;
    for (const si of connectedSolutionIndices) {
      linePairs.push({ si, pi });
      activeSolIndices.push(si);
    }
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {/* Glow shadow for lines */}
      <defs>
        <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Solution → Logo Trace */}
      {activeSolIndices.map((si) => {
        const sc = solCenters[si];
        if (!sc) return null;
        const path = getSmoothStepPath(sc, logo, true);
        
        return (
          <g key={`sol-g-${si}`}>
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              d={path}
              stroke="currentColor"
              className="text-primary"
              strokeWidth="2"
              fill="none"
              style={{ filter: "url(#line-glow)" }}
            />
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              cx={sc.x} cy={sc.y} r="3.5"
              className="fill-primary"
            />
          </g>
        );
      })}

      {/* Logo → Persona Trace */}
      {linePairs.map(({ si, pi }) => {
        const pc = perCenters[pi];
        if (!pc) return null;
        const path = getSmoothStepPath(logo, pc, true);
        
        return (
          <g key={`per-g-${si}-${pi}`}>
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              d={path}
              stroke="currentColor"
              className="text-primary"
              strokeWidth="2"
              fill="none"
              style={{ filter: "url(#line-glow)" }}
            />
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
              cx={pc.x} cy={pc.y} r="3.5"
              className="fill-primary"
            />
          </g>
        );
      })}
    </svg>
  );
};

/* ─── Main Section ─── */
const SolutionPersonaSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const solutionCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const personaCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [hoveredSolution, setHoveredSolution] = useState<number | null>(null);
  const [hoveredPersona, setHoveredPersona] = useState<number | null>(null);
  const [autoplayIndex, setAutoplayIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [logoGlow, setLogoGlow] = useState(false);
  const [linePositions, setLinePositions] = useState<LinePositions>({
    logo: null,
    solutions: [],
    personas: [],
  });

  const [tappedPersona, setTappedPersona] = useState<number | null>(
    typeof window !== "undefined" && window.innerWidth < 768 ? 0 : null,
  );

  // Determine the effective active solution (manual hover overrides autoplay)
  const activeSolutionIndex = useMemo(() => {
    if (hoveredSolution !== null) return hoveredSolution;
    if (hoveredPersona !== null) return null; // Persona hover takes over with its own logic
    return autoplayIndex;
  }, [hoveredSolution, hoveredPersona, autoplayIndex]);

  // Connected persona indices for active solution
  const connectedPersonaIndices = useMemo(
    () =>
      activeSolutionIndex !== null
        ? solutions[activeSolutionIndex].connectedPersonas
            .map((name) => personas.findIndex((p) => p.name === name))
            .filter((i) => i !== -1)
        : [],
    [activeSolutionIndex],
  );

  // Connected solution indices for hovered persona
  const connectedSolutionIndices = useMemo(
    () =>
      hoveredPersona !== null
        ? solutions.reduce<number[]>((acc, sol, si) => {
            if (sol.connectedPersonas.includes(personas[hoveredPersona].name)) {
              acc.push(si);
            }
            return acc;
          }, [])
        : [],
    [hoveredPersona],
  );

  // Recalculate connector line positions (scroll-aware via getBoundingClientRect)
  const recalculate = useCallback(() => {
    if (!sectionRef.current || !logoRef.current) return;
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const logoRect = logoRef.current.getBoundingClientRect();
    const logoCenter = {
      x: logoRect.left - sectionRect.left + logoRect.width / 2,
      y: logoRect.top - sectionRect.top + logoRect.height / 2,
    };
    const solCenters = solutionCardRefs.current.map((ref) => {
      if (!ref) return null;
      const r = ref.getBoundingClientRect();
      return {
        x: r.left - sectionRect.left + r.width / 2,
        y: r.top - sectionRect.top + r.height / 2,
      };
    });
    const perCenters = personaCardRefs.current.map((ref) => {
      if (!ref) return null;
      const r = ref.getBoundingClientRect();
      return {
        x: r.left - sectionRect.left + r.width / 2,
        y: r.top - sectionRect.top + r.height / 2,
      };
    });
    setLinePositions({
      logo: logoCenter,
      solutions: solCenters,
      personas: perCenters,
    });
  }, []);

  useEffect(() => {
    recalculate();
    const ro = new ResizeObserver(recalculate);
    if (sectionRef.current) ro.observe(sectionRef.current);
    window.addEventListener("resize", recalculate);
    window.addEventListener("scroll", recalculate, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalculate);
      window.removeEventListener("scroll", recalculate);
    };
  }, [recalculate]);

  // Autoplay Effect: Cycle solution index every 7 seconds if not hovering
  useEffect(() => {
    if (!isVisible || hoveredSolution !== null || hoveredPersona !== null)
      return;

    const interval = setInterval(() => {
      setAutoplayIndex((prev) => (prev + 1) % solutions.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [isVisible, hoveredSolution, hoveredPersona]);

  // Logo glow on any hover or autoplay activity
  useEffect(() => {
    setLogoGlow(activeSolutionIndex !== null || hoveredPersona !== null);
  }, [activeSolutionIndex, hoveredPersona]);

  // IntersectionObserver for entrance animation
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Hover handlers
  const handleSolutionHover = useCallback(
    (i: number | null) => {
      setHoveredSolution(i);
      setHoveredPersona(null);
      if (i !== null) recalculate();
    },
    [recalculate],
  );

  const handlePersonaHover = useCallback(
    (i: number | null) => {
      setHoveredPersona(i);
      setHoveredSolution(null);
      if (i !== null) recalculate();
    },
    [recalculate],
  );

  // Dimmed states
  const isSolutionDimmed = useCallback(
    (i: number) => {
      if (hoveredSolution !== null) return hoveredSolution !== i;
      if (hoveredPersona !== null) return !connectedSolutionIndices.includes(i);
      if (autoplayIndex !== null) return autoplayIndex !== i;
      return false;
    },
    [hoveredSolution, hoveredPersona, connectedSolutionIndices, autoplayIndex],
  );

  const isPersonaDimmed = useCallback(
    (i: number) => {
      if (hoveredSolution !== null) return !connectedPersonaIndices.includes(i);
      if (hoveredPersona !== null) return hoveredPersona !== i;
      if (activeSolutionIndex !== null)
        return !connectedPersonaIndices.includes(i);
      return false;
    },
    [
      hoveredSolution,
      hoveredPersona,
      connectedPersonaIndices,
      activeSolutionIndex,
    ],
  );

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* ── Desktop: Zigzag Grid Layout ── */}
        <div className="hidden md:block">
          {/* Section Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <PillBadge icon={<Users className="h-3 w-3" />}>
              Solusi untuk Semua Peran
            </PillBadge>
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight mt-4">
              Satu Platform, Lima Peran,{" "}
              <span className="text-gradient">Nol Kebingungan</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Setiap fitur BCB Edu dirancang untuk menjawab kebutuhan spesifik
              setiap peran di sekolah.
            </p>
          </motion.div>

          {/* 3-column overall grid */}
          <div
            ref={sectionRef}
            className="relative grid grid-cols-[2fr_120px_2fr] gap-4 w-full"
          >
            {/* SVG Connector Lines overlay */}
            <ZigzagConnectorLines
              positions={linePositions}
              hoveredSolution={activeSolutionIndex}
              hoveredPersona={hoveredPersona}
              connectedPersonaIndices={connectedPersonaIndices}
              connectedSolutionIndices={connectedSolutionIndices}
            />

            {/* ── Left Column: Solution Cards Zigzag (5 rows) ── */}
            <div className="grid grid-cols-2 grid-rows-5 gap-6 py-10 pr-4">
              {solutions.map((sol, i) => (
                <GridSolutionCard
                  key={sol.name}
                  solution={sol}
                  index={i}
                  isHovered={activeSolutionIndex === i}
                  dimmed={isSolutionDimmed(i)}
                  isVisible={isVisible}
                  onHover={handleSolutionHover}
                  cardRef={(el) => {
                    solutionCardRefs.current[i] = el;
                  }}
                />
              ))}
            </div>

            {/* ── Center Column: Spine + Sticky Logo ── */}
            <div className="relative flex justify-center w-full">
              {/* Spine line */}
              <div
                ref={spineRef}
                className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-border to-transparent origin-top transition-transform duration-700 ease-out ${
                  isVisible ? "scale-y-100" : "scale-y-0"
                }`}
              />
              {/* Sticky BCB Edu Logo */}
              <div className="sticky top-[calc(50vh-40px)] z-20 flex items-center justify-center h-20 w-20">
                <div
                  ref={logoRef}
                  className={`flex items-center justify-center w-20 h-20 rounded-[18px] bg-slate-900 transition-all duration-300 ${
                    isVisible
                      ? "opacity-100 scale-100 delay-300"
                      : "opacity-0 scale-75"
                  }`}
                  style={{
                    boxShadow: logoGlow
                      ? "0 0 0 12px hsl(210 80% 45% / 0.2), 0 8px 32px rgba(0,0,0,0.2)"
                      : "0 0 0 8px hsl(210 80% 45% / 0.08), 0 8px 24px rgba(0,0,0,0.15)",
                  }}
                >
                  <span className="text-sm font-bold text-white tracking-tight">
                    BCB{" "}
                    <span className="bg-gradient-to-br from-blue-400 to-teal-400 bg-clip-text text-transparent">
                      Edu
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* ── Right Column: Persona Cards Zigzag (5 rows) ── */}
            <div className="grid grid-cols-2 grid-rows-5 gap-x-6 py-10 pl-4">
              {personas.map((persona, i) => (
                <GridPersonaCard
                  key={persona.name}
                  persona={persona}
                  index={i}
                  isHovered={hoveredPersona === i}
                  highlighted={connectedPersonaIndices.includes(i)}
                  dimmed={isPersonaDimmed(i)}
                  isVisible={isVisible}
                  onHover={handlePersonaHover}
                  cardRef={(el) => {
                    personaCardRefs.current[i] = el;
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile Layout ── */}
        <div className="md:hidden">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <PillBadge icon={<Users className="h-3 w-3" />}>
              Solusi untuk Semua
            </PillBadge>
            <h2 className="text-3xl font-extrabold mb-3 leading-tight mt-3">
              Satu Platform, Lima Peran,{" "}
              <span className="text-gradient">Nol Kebingungan</span>
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed max-w-[520px] mx-auto">
              Setiap fitur BCB Edu dirancang untuk menjawab kebutuhan spesifik
              setiap peran di sekolah.
            </p>
          </motion.div>

          <div className="space-y-0 border-t border-border">
            {personas.map((p, i) => {
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
                  onClick={() => setTappedPersona(expanded ? null : i)}
                >
                  <DotGridAccent bright={expanded} />
                  <div
                    className={`w-9 h-9 rounded-lg ${p.color} flex items-center justify-center mb-2.5`}
                  >
                    <p.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-sm mb-0.5">{p.name}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {p.tagline}
                  </p>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      expanded
                        ? "max-h-40 opacity-100 mt-2.5"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="space-y-1.5">
                      {p.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-1.5 text-xs flex-nowrap leading-relaxed text-foreground"
                        >
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
      </div>
    </section>
  );
};

export default SolutionPersonaSection;
