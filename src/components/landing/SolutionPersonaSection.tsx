import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
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
import { PillBadge } from "@/components/ui/pill-badge";
import { useIsMobile } from "@/hooks/use-mobile";

/* ─── Data ─── */

interface SolutionCard {
  icon: React.ElementType;
  name: string;
  desc: string;
  connectedPersonas: string[];
}

interface PersonaCard {
  icon: React.ElementType;
  name: string;
  tagline: string;
  benefits: string[];
  color: string;
}

const solutions: SolutionCard[] = [
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

const personas: PersonaCard[] = [
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

/* ─── Dot grid accent ─── */
const DotGridAccent = ({ bright }: { bright: boolean }) => (
  <svg
    className={`absolute top-2 right-2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] transition-opacity duration-200 ${bright ? "opacity-30" : "opacity-10"}`}
    viewBox="0 0 60 60"
    fill="none">
    {Array.from({ length: 5 }).map((_, row) =>
      Array.from({ length: 5 - row }).map((_, col) => (
        <circle
          key={`${row}-${col}`}
          cx={60 - col * 12 - 6}
          cy={row * 12 + 6}
          r={1.8}
          className="fill-primary"
        />
      )),
    )}
  </svg>
);

/* ─── Grid Solution Card ─── */
interface GridSolutionCardProps {
  solution: SolutionCard;
  index: number;
  isHovered: boolean;
  dimmed: boolean;
  isVisible: boolean;
  onHover: (i: number | null) => void;
  cardRef: (el: HTMLDivElement | null) => void;
}

// Map index to strict tailwind row classes for static analysis tracking
const ROW_CLASSES = ["row-start-1", "row-start-2", "row-start-3", "row-start-4", "row-start-5"];

const GridSolutionCard = ({
  solution,
  index,
  isHovered,
  dimmed,
  isVisible,
  onHover,
  cardRef,
}: GridSolutionCardProps) => {
  // Odd index (0, 2, 4) → col 2 (right, close to spine)
  // Even index (1, 3) → col 1 (left, far from spine)
  const isOdd = index % 2 === 0;
  const colClass = isOdd ? "col-start-2" : "col-start-1";
  const rowClass = ROW_CLASSES[index] || "";

  return (
    <div
      ref={cardRef}
      className={`relative cursor-pointer transition-all duration-300 ease-out ${colClass} ${rowClass} ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      } ${dimmed ? "opacity-35" : ""}`}
      style={{ transitionDelay: isVisible ? `${index * 80}ms` : "0ms", zIndex: isHovered ? 20 : 10 }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}>
      <div
        className={`relative rounded-2xl bg-card p-5 border border-border transition-all duration-200 ${
          isHovered ? "shadow-card-hover -translate-y-0.5" : "shadow-card"
        }`}>
        <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
          <solution.icon className="h-4 w-4" />
        </div>
        <h3 className="font-bold text-sm mb-1 leading-tight">
          {solution.name}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed">
          {solution.desc}
        </p>
      </div>
    </div>
  );
};

/* ─── Grid Persona Card ─── */
interface GridPersonaCardProps {
  persona: PersonaCard;
  index: number;
  isHovered: boolean;
  highlighted: boolean;
  dimmed: boolean;
  isVisible: boolean;
  onHover: (i: number | null) => void;
  cardRef: (el: HTMLDivElement | null) => void;
}

const GridPersonaCard = ({
  persona,
  index,
  isHovered,
  highlighted,
  dimmed,
  isVisible,
  onHover,
  cardRef,
}: GridPersonaCardProps) => {
  const p = persona;
  const expanded = isHovered || highlighted;
  // Odd index (0, 2, 4) → col 1 (left, close to spine)
  // Even index (1, 3) → col 2 (right, far from spine)
  const isOdd = index % 2 === 0;
  const colClass = isOdd ? "col-start-1" : "col-start-2";
  const rowClass = ROW_CLASSES[index] || "";

  return (
    <div
      ref={cardRef}
      className={`relative cursor-pointer transition-all duration-300 ease-out ${colClass} ${rowClass} ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
      } ${dimmed ? "opacity-35" : ""}`}
      style={{ transitionDelay: isVisible ? `${index * 80}ms` : "0ms", zIndex: expanded ? 20 : 10 }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}>
      
      {/* Main Visible Card */}
      <div
        className={`relative rounded-2xl border bg-card p-5 transition-all duration-200 z-10 ${
          expanded ? "shadow-card-hover -translate-y-0.5 border-border rounded-b-none" : "shadow-card border-border"
        }`}>
        <DotGridAccent bright={expanded} />
        <div
          className={`w-9 h-9 rounded-lg ${p.color} flex items-center justify-center mb-3`}>
          <p.icon className="h-4 w-4" />
        </div>
        <h3 className="font-bold text-sm mb-1 leading-tight">{p.name}</h3>
        <p className="text-muted-foreground text-xs leading-relaxed">
          {p.tagline}
        </p>
      </div>

      {/* Absolutely Positioned Benefits Dropdown (avoiding layout shift) */}
      <div
        className={`absolute left-0 right-0 top-full bg-card border border-t-0 border-border rounded-b-2xl p-5 pt-3 shadow-card-hover transition-all duration-200 origin-top pointer-events-none ${
          expanded ? "opacity-100 scale-y-100 translate-y-[-2px]" : "opacity-0 scale-y-95 -translate-y-2"
        }`}>
        <ul className="space-y-1.5">
          {p.benefits.map((b) => (
            <li
              key={b}
              className="flex items-start gap-1.5 text-[11px] leading-relaxed text-foreground">
              <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

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

  // Which solution→persona pairs to draw
  const linePairs: { si: number; pi: number }[] = [];
  const activeSolIndices: number[] = [];
  const activePerIndices: number[] = [];

  if (isSolActive) {
    const si = hoveredSolution!;
    activeSolIndices.push(si);
    for (const pi of connectedPersonaIndices) {
      linePairs.push({ si, pi });
      activePerIndices.push(pi);
    }
  } else if (isPerActive) {
    const pi = hoveredPersona!;
    activePerIndices.push(pi);
    for (const si of connectedSolutionIndices) {
      linePairs.push({ si, pi });
      activeSolIndices.push(si);
    }
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <defs>
        {/* solution → logo gradients */}
        {activeSolIndices.map((si) => {
          const sc = solCenters[si];
          if (!sc) return null;
          return (
            <linearGradient
              key={`grad-sol-${si}`}
              id={`grad-sol-${si}`}
              x1={sc.x}
              y1={sc.y}
              x2={logo.x}
              y2={logo.y}
              gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={BRAND_COLOR} stopOpacity="0.8" />
              <stop offset="100%" stopColor={BRAND_COLOR} stopOpacity="0.8" />
            </linearGradient>
          );
        })}
        {/* unique per-pair logo→persona gradients */}
        {linePairs.map(({ si, pi }) => {
          const pc = perCenters[pi];
          if (!pc) return null;
          return (
            <linearGradient
              key={`grad-per-${si}-${pi}`}
              id={`grad-per-${si}-${pi}`}
              x1={logo.x}
              y1={logo.y}
              x2={pc.x}
              y2={pc.y}
              gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={BRAND_COLOR} stopOpacity="0.8" />
              <stop
                offset="100%"
                stopColor={BRAND_COLOR}
                stopOpacity={isPerActive ? "0.8" : "0"}
              />
            </linearGradient>
          );
        })}
      </defs>

      {/* solution → logo lines (Bezier) */}
      {activeSolIndices.map((si) => {
        const sc = solCenters[si];
        if (!sc) return null;
        
        // Control points for smooth horizontal curve
        const dx = Math.abs(logo.x - sc.x) * 0.5;
        const cp1x = sc.x + dx;
        const cp2x = logo.x - dx;
        
        return (
          <path
            key={`sol-line-${si}`}
            d={`M ${sc.x} ${sc.y} C ${cp1x} ${sc.y}, ${cp2x} ${logo.y}, ${logo.x} ${logo.y}`}
            stroke={`url(#grad-sol-${si})`}
            strokeWidth="1.5"
            fill="none"
            className="transition-opacity duration-300 ease-in-out"
          />
        );
      })}

      {/* logo → persona lines (Bezier) */}
      {linePairs.map(({ si, pi }) => {
        const pc = perCenters[pi];
        if (!pc) return null;
        
        const dx = Math.abs(pc.x - logo.x) * 0.5;
        const cp1x = logo.x + dx;
        const cp2x = pc.x - dx;
        
        return (
          <path
            key={`per-line-${si}-${pi}`}
            d={`M ${logo.x} ${logo.y} C ${cp1x} ${logo.y}, ${cp2x} ${pc.y}, ${pc.x} ${pc.y}`}
            stroke={`url(#grad-per-${si}-${pi})`}
            strokeWidth="1.5"
            fill="none"
            className="transition-opacity duration-300 ease-in-out"
          />
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

  // Connected persona indices for hovered solution
  const connectedPersonaIndices = useMemo(
    () =>
      hoveredSolution !== null
        ? solutions[hoveredSolution].connectedPersonas
            .map((name) => personas.findIndex((p) => p.name === name))
            .filter((i) => i !== -1)
        : [],
    [hoveredSolution],
  );

  // Connected solution indices for hovered persona
  const connectedSolutionIndices = useMemo(
    () =>
      hoveredPersona !== null
        ? solutions.reduce<number[]>((acc, sol, si) => {
            if (
              sol.connectedPersonas.includes(personas[hoveredPersona].name)
            ) {
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

  // Logo glow on any hover
  useEffect(() => {
    setLogoGlow(hoveredSolution !== null || hoveredPersona !== null);
  }, [hoveredSolution, hoveredPersona]);

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
      return false;
    },
    [hoveredSolution, hoveredPersona, connectedSolutionIndices],
  );

  const isPersonaDimmed = useCallback(
    (i: number) => {
      if (hoveredSolution !== null) return !connectedPersonaIndices.includes(i);
      if (hoveredPersona !== null) return hoveredPersona !== i;
      return false;
    },
    [hoveredSolution, hoveredPersona, connectedPersonaIndices],
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
            className="text-center mb-16">
            <PillBadge icon={<Users className="h-3 w-3" />}>
              Solusi untuk Semua Peran
            </PillBadge>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight mt-4">
              Satu Platform, Lima Peran,{" "}
              <span className="text-gradient">Nol Kebingungan</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-[500px] mx-auto">
              Setiap fitur BCB Edu dirancang untuk menjawab kebutuhan spesifik
              setiap peran di sekolah.
            </p>
          </motion.div>

          {/* 3-column overall grid */}
          <div ref={sectionRef} className="relative grid grid-cols-[2fr_120px_2fr] gap-4 w-full">
            {/* SVG Connector Lines overlay */}
            <ZigzagConnectorLines
              positions={linePositions}
              hoveredSolution={hoveredSolution}
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
                  isHovered={hoveredSolution === i}
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
                  }}>
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
            className="text-center mb-10">
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
                  onClick={() => setTappedPersona(expanded ? null : i)}>
                  <DotGridAccent bright={expanded} />
                  <div
                    className={`w-9 h-9 rounded-lg ${p.color} flex items-center justify-center mb-2.5`}>
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
                    }`}>
                    <ul className="space-y-1.5">
                      {p.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-1.5 text-xs flex-nowrap leading-relaxed text-foreground">
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
