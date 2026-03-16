"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileSpreadsheet,
  Unplug,
  Hourglass,
  CircleDollarSign,
  AlertTriangle,
  FileText,
  FileJson,
  File,
} from "lucide-react";
import { PillBadge } from "@/components/ui/pill-badge";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Problem {
  icon: React.ElementType;
  title: string;
  desc: string;
  animation: React.ReactNode;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const floatingTags = [
  {
    label: "Rekap Manual",
    icon: FileSpreadsheet,
    x: "25%",
    y: "25%",
    mobileX: "0%",
  },
  {
    label: "Tidak Terintegrasi",
    icon: Unplug,
    x: "52%",
    y: "20%",
  },
  {
    label: "Proses Lambat",
    icon: Hourglass,
    x: "30%",
    y: "65%",
    mobileX: "2%",
  },
  {
    label: "Sistem Mahal",
    icon: CircleDollarSign,
    x: "60%",
    y: "60%",
  },
];

// ─── Animation: Card 1 — File Chaos ──────────────────────────────────────────

const FILES = [
  {
    label: "siswa.xlsx",
    Icon: FileSpreadsheet,
    x: "3%",
    y: 18,
    rot: -14,
    dur: 3.2,
    delay: 0,
  },
  {
    label: "absensi.csv",
    Icon: FileText,
    x: "22%",
    y: 44,
    rot: 10,
    dur: 3.8,
    delay: 0.5,
  },
  {
    label: "jadwal.doc",
    Icon: File,
    x: "43%",
    y: 12,
    rot: -8,
    dur: 3.5,
    delay: 0.9,
  },
  {
    label: "nilai.xlsx",
    Icon: FileSpreadsheet,
    x: "65%",
    y: 40,
    rot: 20,
    dur: 4.0,
    delay: 0.3,
  },
  {
    label: "guru.pdf",
    Icon: FileText,
    x: "85%",
    y: 20,
    rot: -5,
    dur: 3.3,
    delay: 1.2,
  },
  {
    label: "rapor.docx",
    Icon: File,
    x: "8%",
    y: 68,
    rot: 12,
    dur: 3.7,
    delay: 1.6,
  },
  {
    label: "spp.csv",
    Icon: FileJson,
    x: "35%",
    y: 75,
    rot: -20,
    dur: 3.6,
    delay: 0.7,
  },
  {
    label: "kelas.xlsx",
    Icon: FileSpreadsheet,
    x: "59%",
    y: 72,
    rot: 8,
    dur: 4.1,
    delay: 1.0,
  },
];

function FileChaosAnimation() {
  return (
    <div className="relative h-[140px] overflow-hidden mx-[-4px]">
      {FILES.map((f) => (
        <div
          key={f.label}
          className="absolute flex flex-col items-center gap-[3px]"
          style={{
            left: f.x,
            top: f.y,
            // CSS custom props for the keyframe
            ["--r" as string]: `${f.rot}deg`,
            ["--w" as string]: `${f.rot > 0 ? 10 : -10}deg`,
            opacity: 0,
            animation: `file-float ${f.dur}s ${f.delay}s infinite ease-in-out`,
          }}
        >
          <div className="w-8 h-9 rounded-md bg-destructive/10 border border-destructive/25 flex items-center justify-center">
            <f.Icon className="h-4 w-4 text-destructive/60" />
          </div>
          <span className="text-[8px] font-semibold text-destructive/60 whitespace-nowrap tracking-wide">
            {f.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Animation: Card 2 — Forced Checklist + Price Ticker ─────────────────────

const CHECKLIST_ITEMS = [
  { label: "Manajemen inventaris", delay: 0.3, highlight: false },
  { label: "Laporan keuangan lanjutan", delay: 0.8, highlight: false },
  { label: "Absensi siswa", delay: 1.3, highlight: true },
  { label: "Manajemen aset", delay: 1.8, highlight: false },
  { label: "Jadwal pelajaran", delay: 2.3, highlight: true },
];

const PRICE_STEPS = [0, 50_000, 120_000, 200_000, 320_000, 450_000];

function ChecklistAnimation({ inView }: { inView: boolean }) {
  const [price, setPrice] = useState(0);
  const stepRef = useRef(0);

  useEffect(() => {
    if (!inView) return;
    stepRef.current = 0;
    setPrice(0);

    function tick() {
      stepRef.current += 1;
      if (stepRef.current < PRICE_STEPS.length) {
        setPrice(PRICE_STEPS[stepRef.current]);
        setTimeout(tick, stepRef.current === 1 ? 900 : 580);
      }
    }
    const t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <div className="relative h-[140px] overflow-hidden">
      {/* Checklist rows */}
      <div className="absolute top-2 left-2 flex flex-col gap-[8px] w-[calc(100%-72px)]">
        {CHECKLIST_ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2"
            style={{
              opacity: 0,
              animation: inView
                ? `row-in 0.4s ${item.delay}s forwards ease-out`
                : "none",
            }}
          >
            {/* Checkbox */}
            <div
              className="w-4 h-4 rounded-[4px] border-2 border-destructive/30 bg-background flex-shrink-0 relative overflow-hidden"
              style={{
                animation: inView
                  ? `check-fill 0.3s ${item.delay + 0.55}s forwards ease-out`
                  : "none",
              }}
            >
              {/* Checkmark tick */}
              <span
                className="absolute"
                style={{
                  top: 1,
                  left: 3,
                  width: 6,
                  height: 9,
                  borderRight: "2.5px solid hsl(var(--destructive))",
                  borderBottom: "2.5px solid hsl(var(--destructive))",
                  transform: "rotate(40deg) scale(0)",
                  transformOrigin: "center",
                  animation: inView
                    ? `check-mark 0.25s ${item.delay + 0.65}s forwards ease-out`
                    : "none",
                }}
              />
            </div>

            <span
              className={`text-[11px] leading-tight ${
                item.highlight
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground/60"
              }`}
            >
              {item.label}
            </span>

            {item.highlight && (
              <span className="text-[9px] font-bold text-destructive bg-destructive/10 px-1.5 py-0.5 rounded-full">
                dipakai
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Price badge */}
      <div className="absolute top-2 right-2 bg-destructive/10 border border-destructive/25 rounded-xl px-3 py-2 text-center min-w-[60px]">
        <p className="text-[9px] font-bold text-destructive tracking-wider mb-0.5">
          /BULAN
        </p>
        <p
          className="text-base font-bold text-destructive tabular-nums leading-none"
          key={price}
          style={{
            animation: "price-pop 0.3s ease-out",
          }}
        >
          {price === 0 ? "Rp 0" : `Rp ${(price / 1000).toFixed(0)}rb`}
        </p>
      </div>
    </div>
  );
}

// ─── Animation: Card 3 — UI Overload ─────────────────────────────────────────

const UI_BUTTONS = [
  {
    label: "Tambah Siswa",
    variant: "fill",
    x: "17%",
    y: 8,
    ox: "0px",
    oy: "55px",
    delay: 0.2,
  },
  {
    label: "Laporan",
    variant: "outline",
    x: "57%",
    y: 6,
    ox: "0px",
    oy: "55px",
    delay: 0.45,
  },
  {
    label: "Ekspor Data",
    variant: "ghost",
    x: "2%",
    y: 42,
    ox: "-55px",
    oy: "30px",
    delay: 0.65,
  },
  {
    label: "Sinkronisasi",
    variant: "outline",
    x: "49%",
    y: 44,
    ox: "55px",
    oy: "30px",
    delay: 0.85,
  },
  {
    label: "Notifikasi",
    variant: "ghost",
    x: "18%",
    y: 78,
    ox: "-30px",
    oy: "-30px",
    delay: 1.05,
  },
  {
    label: "Pengaturan",
    variant: "fill",
    x: "57%",
    y: 80,
    ox: "30px",
    oy: "-30px",
    delay: 1.25,
  },
  {
    label: "Import",
    variant: "outline",
    x: "34%",
    y: 22,
    ox: "0px",
    oy: "-40px",
    delay: 1.4,
  },
  {
    label: "Backup",
    variant: "ghost",
    x: "32%",
    y: 62,
    ox: "-20px",
    oy: "20px",
    delay: 1.55,
  },
];

const UI_TAGS = [
  { label: "BARU", color: "blue", x: "84%", y: 12, delay: 1.7 },
  { label: "BETA", color: "amber", x: "84%", y: 50, delay: 1.85 },
  { label: "PRO", color: "green", x: "84%", y: 86, delay: 2.0 },
];

const TAG_COLORS: Record<string, string> = {
  blue: "bg-blue-100  text-blue-700  border-blue-200",
  amber: "bg-amber-100 text-amber-700 border-amber-200",
  green: "bg-green-100 text-green-700 border-green-200",
};

function UIOverloadAnimation({ inView }: { inView: boolean }) {
  return (
    <div
      className="relative h-[140px] overflow-hidden"
      style={{
        animation: inView ? "stage-shake 0.4s 2.8s ease-in-out" : "none",
      }}
    >
      {UI_BUTTONS.map((btn) => (
        <button
          key={btn.label}
          className={`absolute text-[10px] font-semibold px-2.5 py-1.5 rounded-md whitespace-nowrap border cursor-default
            ${
              btn.variant === "fill"
                ? "bg-destructive text-white border-destructive"
                : btn.variant === "outline"
                  ? "bg-background text-destructive border-destructive/50"
                  : "bg-destructive/10 text-destructive border-destructive/20"
            }`}
          style={{
            left: btn.x,
            top: btn.y,
            ["--ox" as string]: btn.ox,
            ["--oy" as string]: btn.oy,
            opacity: 0,
            animation: inView
              ? `btn-explode 0.5s ${btn.delay}s forwards cubic-bezier(0.34,1.56,0.64,1),
                 btn-pulse 2s ${btn.delay + 0.5}s infinite ease-in-out`
              : "none",
          }}
        >
          {btn.label}
        </button>
      ))}

      {UI_TAGS.map((tag) => (
        <span
          key={tag.label}
          className={`absolute text-[9px] font-bold px-2 py-1 rounded-full border whitespace-nowrap ${TAG_COLORS[tag.color]}`}
          style={{
            left: tag.x,
            top: tag.y,
            ["--ox" as string]: "40px",
            ["--oy" as string]: "0px",
            opacity: 0,
            animation: inView
              ? `btn-explode 0.4s ${tag.delay}s forwards cubic-bezier(0.34,1.56,0.64,1)`
              : "none",
          }}
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
}

// ─── Problem Cards with inView trigger ───────────────────────────────────────

function ProblemCard({
  title,
  desc,
  animation,
  delay,
}: {
  title: string;
  desc: string;
  animation: React.ReactNode;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="group rounded-2xl p-6 border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      {/* Animation stage — rendered with inView state */}
      <div className="mb-4">
        {/* Pass inView so stateful animations know when to start */}
        {inView ? animation : <div className="h-[120px]" />}
      </div>

      {/* Text */}
      <h3 className="text-lg font-bold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed min-h-[70px]">
        {desc}
      </p>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

const ProblemSection = () => {
  // Separate inView ref for checklist & overload (need to reset on re-enter)
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card2InView = useInView(card2Ref, { once: true, margin: "-60px" });
  const card3InView = useInView(card3Ref, { once: true, margin: "-60px" });

  const problems = [
    {
      icon: FileSpreadsheet,
      title: "Administrasi yang menyita waktu",
      desc: "Data siswa, absensi, dan jadwal masih dikelola manual atau tersebar di banyak file.",
      animation: <FileChaosAnimation />,
      extraRef: null,
    },
    {
      icon: CircleDollarSign,
      title: "Bayar mahal untuk fitur yang tidak dipakai",
      desc: "Sistem lain memaksa Anda membeli paket lengkap, meski hanya butuh 2–3 fitur.",
      animation: <ChecklistAnimation inView={card2InView} />,
      extraRef: card2Ref,
    },
    {
      icon: Hourglass,
      title: "Sistem baru yang malah membingungkan",
      desc: "Terlalu banyak fitur sekaligus membuat guru dan staf enggan menggunakannya.",
      animation: <UIOverloadAnimation inView={card3InView} />,
      extraRef: card3Ref,
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-background">
      {/* ── Radial glow effects ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, hsl(210 80% 45% / 0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "30%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, hsl(175 60% 40% / 0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "45%",
          left: "70%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, hsl(270 60% 55% / 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* ── Headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <PillBadge
            icon={<AlertTriangle className="h-3 w-3" />}
            className="border-destructive/20 bg-destructive/10 text-destructive"
          >
            Tantangan
          </PillBadge>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-foreground">
            Apakah Sekolah Anda{" "}
            <span className="text-gradient">Masih Menghadapi Ini?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Banyak sekolah terjebak dalam sistem yang justru menambah beban.
          </p>
        </motion.div>

        {/* ── Logo showcase with floating tags ── */}
        <div
          className="relative mx-auto max-w-5xl flex items-center justify-center rounded-[48px] border border-border overflow-hidden"
          style={{ height: 460 }}
        >
          {/* Dot grid corners */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, hsl(var(--destructive)) 2px, transparent 2px)",
                backgroundSize: "24px 24px",
                maskImage:
                  "radial-gradient(circle at 40% 90%, black 10%, transparent 50%), radial-gradient(circle at 80% 100%, black 10%, transparent 40%)",
                WebkitMaskImage:
                  "radial-gradient(circle at 40% 90%, black 10%, transparent 50%), radial-gradient(circle at 80% 100%, black 10%, transparent 40%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.5]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, hsl(var(--primary)) 2px, transparent 2px)",
                backgroundSize: "24px 24px",
                maskImage:
                  "radial-gradient(circle at 20% 0%, white 0%, transparent 15%)",
                WebkitMaskImage:
                  "radial-gradient(circle at 20% 0%, white 0%, transparent 15%)",
              }}
            />
          </div>

          {/* Center logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 -translate-y-8"
          >
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-[300px] h-[300px] rounded-full blur-[80px]"
                style={{
                  background:
                    "radial-gradient(circle, hsl(210 80% 45% / 0.25) 0%, transparent 70%)",
                }}
              />
              <motion.div
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute w-[250px] h-[250px] rounded-full blur-[60px]"
                style={{
                  background:
                    "radial-gradient(circle, hsl(175 60% 40% / 0.2) 0%, transparent 70%)",
                }}
              />
            </div>

            <div
              className="relative w-60 h-60 rounded-[40px] bg-slate-900/90 flex items-center justify-center border border-white/30 overflow-hidden"
              style={{
                transform:
                  "perspective(1000px) rotateX(8deg) rotateY(12deg) rotateZ(-6deg)",
                boxShadow:
                  "0 30px 60px -12px rgba(0,0,0,0.6), 0 0 40px 10px hsl(210 80% 45% / 0.2)",
              }}
            >
              <div
                className="absolute inset-0 rounded-[40px] border-[1.5px] border-white/20 pointer-events-none"
                style={{
                  maskImage:
                    "linear-gradient(135deg, black 0%, transparent 50%)",
                  WebkitMaskImage:
                    "linear-gradient(135deg, black 0%, transparent 50%)",
                }}
              />
              <motion.div
                animate={{ x: ["-150%", "150%"] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.2, 1],
                  repeatDelay: 3,
                }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.08) 50%, transparent 100%)",
                  transform: "skewX(-25deg) scaleY(2)",
                }}
              />
              <span className="text-5xl text-center font-bold text-white tracking-tighter relative z-10">
                Sistem{" "}
                <span className="bg-gradient-to-br from-red-500 to-yellow-400 bg-clip-text text-transparent">
                  Sekolah Lain
                </span>
              </span>
            </div>
          </motion.div>

          {/* Floating problem tags */}
          {floatingTags.map((tag, i) => (
            <motion.div
              key={tag.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="absolute z-20 left-[var(--tag-x-mobile)] md:left-[var(--tag-x-desktop)]"
              style={
                {
                  "--tag-x-mobile": (tag as any).mobileX || tag.x,
                  "--tag-x-desktop": tag.x,
                  top: tag.y,
                } as any
              }
            >
              <div
                className="flex items-center gap-2 rounded-lg border border-border/60 px-4 py-2.5 text-sm font-medium backdrop-blur-sm cursor-default select-none transition-all duration-300 hover:scale-105 text-foreground hover:shadow-card-hover"
                style={{
                  background: "hsl(0 0% 100% / 0.6)",
                  animation: `float-bob ${3.5 + i * 0.7}s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                <tag.icon className="h-4 w-4 text-destructive shrink-0" />
                {tag.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Problem cards grid ── */}
        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto mt-16">
          {problems.map((p, i) => (
            <div key={p.title} ref={p.extraRef ?? undefined}>
              <ProblemCard
                title={p.title}
                desc={p.desc}
                animation={p.animation}
                delay={0.1 + i * 0.12}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
