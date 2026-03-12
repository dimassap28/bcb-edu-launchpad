import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { PillBadge } from "@/components/ui/pill-badge";

/* ─── SVG Accent: × (cross) ─── */
const CrossAccent = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    className={`text-primary ${className}`}
    style={{ opacity: 0.18 }}
  >
    <line x1="4" y1="4" x2="36" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="36" y1="4" x2="4" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ─── SVG Accent: + (plus) ─── */
const PlusAccent = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    className={`text-primary ${className}`}
    style={{ opacity: 0.18 }}
  >
    <line x1="20" y1="4" x2="20" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="4" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ─── Animated Counter ─── */
const AnimatedNumber = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

/* ─── Problem Data ─── */
const problems = [
  {
    stat: 85,
    statSuffix: "%",
    statLabel: "sekolah masih input data manual",
    title: "Administrasi yang menyita waktu",
    desc: "Data siswa, absensi, dan jadwal masih dikelola manual atau tersebar di banyak file.",
  },
  {
    stat: 3,
    statSuffix: "×",
    statLabel: "biaya lebih mahal dari yang dibutuhkan",
    title: "Bayar mahal untuk fitur yang tidak dipakai",
    desc: "Sistem lain memaksa Anda membeli paket lengkap, meski hanya butuh 2–3 fitur.",
  },
  {
    stat: 60,
    statSuffix: "%",
    statLabel: "guru enggan pakai sistem baru",
    title: "Sistem baru yang malah membingungkan",
    desc: "Terlalu banyak fitur sekaligus membuat guru dan staf enggan menggunakannya.",
  },
];

/* ─── Bento grid layout config ─── */
// Row 1: [× accents] [stat card 1 - wide] [× accents]
// Row 2: [stat card 2 - wide] [+ accent] [stat card 3 - gradient]

const ProblemSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 bg-section-alt" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <PillBadge icon={<AlertTriangle className="h-3 w-3" />}>
            Tantangan
          </PillBadge>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Apakah Sekolah Anda{" "}
            <span className="text-gradient">Masih Menghadapi Ini?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Banyak sekolah terjebak dalam sistem yang justru menambah beban.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">

          {/* Row 1 — Col 1: × × × accents */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="hidden md:flex items-center justify-center md:col-span-1 rounded-[2rem] border border-border bg-card p-6"
          >
            <div className="flex gap-3">
              <CrossAccent className="w-10 h-10" />
              <CrossAccent className="w-10 h-10" />
              <CrossAccent className="w-10 h-10" />
            </div>
          </motion.div>

          {/* Row 1 — Col 2: Stat Card 1 (main, wide) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="md:col-span-4 rounded-[2rem] border border-border bg-primary/[0.04] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6"
          >
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-primary text-lg">↑</span>
              <span className="text-5xl md:text-6xl font-extrabold text-primary tracking-tight">
                <AnimatedNumber target={problems[0].stat} suffix={problems[0].statSuffix} />
              </span>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">{problems[0].statLabel}</p>
              <h3 className="text-lg font-bold mb-1">{problems[0].title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{problems[0].desc}</p>
            </div>
          </motion.div>

          {/* Row 1 — Col 3: × × × × accents */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hidden md:flex items-center justify-center md:col-span-1 rounded-[2rem] border border-border bg-card p-6"
          >
            <div className="grid grid-cols-2 gap-2">
              <CrossAccent className="w-8 h-8" />
              <CrossAccent className="w-8 h-8" />
              <CrossAccent className="w-8 h-8" />
              <CrossAccent className="w-8 h-8" />
            </div>
          </motion.div>

          {/* Row 2 — Col 1: Stat Card 2 (wide) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="md:col-span-3 rounded-[2rem] border border-border bg-card p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6"
          >
            <span className="text-5xl md:text-6xl font-extrabold text-primary tracking-tight shrink-0">
              <AnimatedNumber target={problems[1].stat} suffix={problems[1].statSuffix} />
            </span>
            <div>
              <p className="text-muted-foreground text-sm mb-1">{problems[1].statLabel}</p>
              <h3 className="text-lg font-bold mb-1">{problems[1].title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{problems[1].desc}</p>
            </div>
          </motion.div>

          {/* Row 2 — Col 2: + accent (small square) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="hidden md:flex items-center justify-center md:col-span-1 rounded-[2rem] border border-border bg-card p-6"
          >
            <PlusAccent className="w-12 h-12" />
          </motion.div>

          {/* Row 2 — Col 3: Stat Card 3 (gradient, accent) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="md:col-span-2 rounded-[2rem] bg-hero-gradient text-primary-foreground p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-5"
          >
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-lg opacity-80">↑</span>
              <span className="text-5xl md:text-6xl font-extrabold tracking-tight">
                <AnimatedNumber target={problems[2].stat} suffix={problems[2].statSuffix} />
              </span>
            </div>
            <div>
              <p className="text-sm opacity-80 mb-1">{problems[2].statLabel}</p>
              <h3 className="text-lg font-bold mb-1">{problems[2].title}</h3>
              <p className="text-sm opacity-80 leading-relaxed">{problems[2].desc}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
