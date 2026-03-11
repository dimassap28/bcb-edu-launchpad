import { useState, useRef, useEffect, useCallback } from "react";
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

/* ─── Data ─── */

interface Solution {
  icon: React.ElementType;
  title: string;
  desc: string;
  connectedPersonas: number[]; // indices into personas[]
}

interface Persona {
  icon: React.ElementType;
  name: string;
  tagline: string;
  benefits: string[];
  color: string;
}

const solutions: Solution[] = [
  {
    icon: ClipboardCheck,
    title: "Absensi Digital",
    desc: "Catat kehadiran real-time dari HP, lengkap dengan jurnal dan foto aktivitas.",
    connectedPersonas: [2, 1, 0, 4], // Guru, Operator, Kepsek, Ortu
  },
  {
    icon: CalendarDays,
    title: "Penjadwalan Otomatis",
    desc: "Generate jadwal sekali klik, anti bentrok, sinkron untuk semua pihak.",
    connectedPersonas: [1, 2, 3], // Operator, Guru, Siswa
  },
  {
    icon: MonitorCheck,
    title: "CBT Online",
    desc: "Ujian digital stabil untuk 1.000+ siswa, dengan lockdown browser dan rekap otomatis.",
    connectedPersonas: [2, 3, 1], // Guru, Siswa, Operator
  },
  {
    icon: BarChart3,
    title: "Manajemen Nilai",
    desc: "Input nilai, olah data, generate rapor digital — tanpa Excel, tanpa rekap manual.",
    connectedPersonas: [2, 0, 4], // Guru, Kepsek, Ortu
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard Admin",
    desc: "Pantau performa sekolah, kontrol modul aktif, dan kelola biaya dari satu tempat.",
    connectedPersonas: [0, 1], // Kepsek, Operator
  },
];

const personas: Persona[] = [
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

/* ─── Connections flat list ─── */
type Connection = { sIdx: number; pIdx: number };
const connections: Connection[] = solutions.flatMap((s, sIdx) =>
  s.connectedPersonas.map((pIdx) => ({ sIdx, pIdx }))
);

/* ─── Dot grid accent ─── */
const DotGridAccent = ({ bright }: { bright: boolean }) => (
  <svg
    className="absolute top-2 right-2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] transition-opacity duration-200"
    style={{ opacity: bright ? 0.3 : 0.12 }}
    viewBox="0 0 60 60"
    fill="none"
  >
    {Array.from({ length: 5 }).map((_, row) =>
      Array.from({ length: 5 - row }).map((_, col) => (
        <circle
          key={`${row}-${col}`}
          cx={60 - col * 12 - 6}
          cy={row * 12 + 6}
          r={1.8}
          className="fill-primary"
        />
      ))
    )}
  </svg>
);

/* ─── Main Section ─── */
const SolutionPersonaSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSolution, setHoveredSolution] = useState<number | null>(null);
  const [hoveredPersona, setHoveredPersona] = useState<number | null>(null);
  const [tappedPersona, setTappedPersona] = useState<number | null>(null);
  const [colWidth, setColWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.offsetWidth;
    setContainerWidth(w);
    setColWidth(w / 5);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const colCenter = (i: number) => colWidth * i + colWidth / 2;
  const svgH = 120;

  const isLineHighlighted = (c: Connection) => {
    if (hoveredSolution !== null) return c.sIdx === hoveredSolution;
    if (hoveredPersona !== null || tappedPersona !== null) {
      const active = hoveredPersona ?? tappedPersona;
      return c.pIdx === active;
    }
    return false;
  };

  const isLineDimmed = (c: Connection) => {
    if (hoveredSolution === null && hoveredPersona === null && tappedPersona === null) return false;
    return !isLineHighlighted(c);
  };

  const isSolutionHighlighted = (idx: number) => {
    if (hoveredSolution === idx) return true;
    if (hoveredPersona !== null || tappedPersona !== null) {
      const active = hoveredPersona ?? tappedPersona;
      return connections.some((c) => c.pIdx === active && c.sIdx === idx);
    }
    return false;
  };

  const isPersonaHighlighted = (idx: number) => {
    if (hoveredPersona === idx || tappedPersona === idx) return true;
    if (hoveredSolution !== null) {
      return connections.some((c) => c.sIdx === hoveredSolution && c.pIdx === idx);
    }
    return false;
  };

  const anyHover = hoveredSolution !== null || hoveredPersona !== null || tappedPersona !== null;

  const personaExpanded = (idx: number) => hoveredPersona === idx || tappedPersona === idx;

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* ── Headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14 md:mb-20"
        >
          <PillBadge icon={<Users className="h-3 w-3" />}>Solusi untuk Semua</PillBadge>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            Satu Platform, Lima Peran,{" "}
            <span className="text-primary">Nol Kebingungan</span>
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed max-w-[520px] mx-auto">
            Setiap fitur BCB Edu dirancang untuk menjawab kebutuhan spesifik setiap peran di sekolah.
          </p>
        </motion.div>

        {/* ── Grid container (measures column widths) ── */}
        <div ref={containerRef} className="max-w-6xl mx-auto">
          {/* ── Solution Row ── */}
          <div className="hidden md:grid grid-cols-5 border-y border-border">
            {solutions.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className={`px-5 py-6 transition-all duration-200 ${
                  i < 4 ? "border-r border-border" : ""
                } ${isSolutionHighlighted(i) ? "bg-primary/5" : ""} ${
                  anyHover && !isSolutionHighlighted(i) ? "opacity-50" : ""
                }`}
                onMouseEnter={() => setHoveredSolution(i)}
                onMouseLeave={() => setHoveredSolution(null)}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <s.icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3
                    className={`font-bold text-[15px] transition-colors duration-200 ${
                      isSolutionHighlighted(i) ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {s.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-[13px] leading-relaxed line-clamp-2">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── Mobile Solution Grid ── */}
          <div className="grid grid-cols-2 gap-px md:hidden bg-border border border-border rounded-xl overflow-hidden mb-8">
            {solutions.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`bg-background px-4 py-5 ${i === 4 ? "col-span-2" : ""}`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
                    <s.icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">{s.title}</h3>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* ── SVG Connector Zone (desktop only) ── */}
          {containerWidth > 0 && (
            <svg
              width={containerWidth}
              height={svgH}
              className="hidden md:block"
              style={{ overflow: "visible" }}
            >
              {connections.map((c, i) => {
                const x1 = colCenter(c.sIdx);
                const x2 = colCenter(c.pIdx);
                const highlighted = isLineHighlighted(c);
                const dimmed = isLineDimmed(c);
                const d = `M ${x1} 0 C ${x1} ${svgH * 0.45}, ${x2} ${svgH * 0.55}, ${x2} ${svgH}`;
                return (
                  <motion.path
                    key={i}
                    d={d}
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: dimmed ? 0.15 : highlighted ? 1 : 0.6 }}
                    viewport={{ once: true }}
                    transition={{
                      pathLength: { delay: 0.6 + i * 0.04, duration: 0.4, ease: "easeOut" },
                      opacity: { duration: 0.2 },
                    }}
                    stroke={highlighted ? "hsl(var(--primary))" : "hsl(var(--border))"}
                    strokeWidth={highlighted ? 2 : 1.5}
                    strokeDasharray={highlighted ? "none" : "4 4"}
                    className="transition-all duration-200"
                  />
                );
              })}
            </svg>
          )}

          {/* ── Persona Row (desktop) ── */}
          <div className="hidden md:grid grid-cols-5 border-y border-border">
            {personas.map((p, i) => {
              const highlighted = isPersonaHighlighted(i);
              const expanded = personaExpanded(i);
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.08, duration: 0.35 }}
                  className={`relative px-5 py-7 transition-all duration-200 cursor-pointer ${
                    i < 4 ? "border-r border-border" : ""
                  } ${highlighted ? "bg-primary/[0.04]" : ""} ${
                    anyHover && !highlighted ? "opacity-50" : ""
                  }`}
                  onMouseEnter={() => setHoveredPersona(i)}
                  onMouseLeave={() => setHoveredPersona(null)}
                >
                  <DotGridAccent bright={highlighted} />
                  <div
                    className={`w-9 h-9 rounded-lg ${p.color} flex items-center justify-center mb-3`}
                  >
                    <p.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-[15px] mb-1">{p.name}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed">{p.tagline}</p>

                  {/* Benefits expand */}
                  <div
                    className={`overflow-hidden transition-all duration-200 ease-out ${
                      expanded ? "max-h-36 opacity-100 mt-3" : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="space-y-1.5">
                      {p.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-1.5 text-[12px] leading-relaxed text-foreground"
                        >
                          <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Persona Cards (mobile) ── */}
          <div className="md:hidden space-y-0 border-t border-border">
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
                    expanded ? "bg-primary/[0.04]" : ""
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
                  <p className="text-muted-foreground text-xs leading-relaxed">{p.tagline}</p>
                  <div
                    className={`overflow-hidden transition-all duration-200 ease-out ${
                      expanded ? "max-h-36 opacity-100 mt-2.5" : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="space-y-1.5">
                      {p.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-1.5 text-xs leading-relaxed text-foreground"
                        >
                          <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
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
