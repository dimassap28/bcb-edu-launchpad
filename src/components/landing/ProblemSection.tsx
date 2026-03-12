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
    statLabel: "Sekolah terjebak administrasi manual",
    title: "Administrasi yang Melumpuhkan Waktu",
    desc: "Guru menghabiskan 40% waktu mereka hanya untuk input data manual yang repetitif, bukan untuk mendidik siswa.",
  },
  {
    stat: 3,
    statSuffix: "×",
    statLabel: "Biaya membengkak tanpa manfaat nyata",
    title: "Bayar Mahal untuk Fitur Mubazir",
    desc: "Sistem kaku memaksa Anda membayar paket 'All-in-One' yang 70% fiturnya tidak pernah menyentuh kebutuhan sekolah Anda.",
  },
  {
    stat: 60,
    statSuffix: "%",
    statLabel: "Tingkat penolakan adopsi sistem baru",
    title: "Kompleksitas yang Membingungkan",
    desc: "User interface yang berantakan membuat staf enggan beralih, menjadikan investasi teknologi Anda sia-sia.",
  },
];

/* ─── Bento grid layout config ─── */
// Layout 8-column:
// Row 1: [Accent (2 col)] [Card 1 (4 col)] [Accent (2 col)]
// Row 2: [Card 2 (3 col)] [Accent (2 col)] [Card 3 (3 col)]

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
          className="text-center mb-16">
          <PillBadge icon={<AlertTriangle className="h-3 w-3" />}>
            Tantangan Sekolah Modern
          </PillBadge>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Hentikan Pemborosan Sumber Daya
            <br />
            <span className="text-gradient">Di Sistem yang Salah</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Teknologi seharusnya mempermudah, bukan menjadi beban baru. BCB EDU
            hadir untuk menyelesaikan masalah yang diabaikan sistem
            konvensional.
          </p>
        </motion.div>

        {/* Bento Grid — 8 column base */}
        <div className="mx-auto grid grid-cols-1 md:grid-cols-8">
          {/* Row 1 — Col 1: × × × accents (2 units) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="hidden md:flex items-center justify-center md:col-span-2 rounded-full border border-border bg-card p-6">
            <div className="flex gap-4">
              <CrossAccent className="w-8 h-8" />
              <CrossAccent className="w-8 h-8" />
              <CrossAccent className="w-8 h-8" />
            </div>
          </motion.div>

          {/* Row 1 — Col 2: Stat Card 1 (main, 4 units) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="md:col-span-4 rounded-full border border-border bg-primary/[0.04] p-3 md:p-5 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-primary text-2xl font-bold">↑</span>
              <span className="text-6xl md:text-7xl font-extrabold text-primary tracking-tight">
                <AnimatedNumber
                  target={problems[0].stat}
                  suffix={problems[0].statSuffix}
                />
              </span>
            </div>
            <div>
              <p className="text-primary font-semibold text-sm mb-2 uppercase tracking-wider">
                {problems[0].statLabel}
              </p>
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                {problems[0].title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                {problems[0].desc}
              </p>
            </div>
          </motion.div>

          {/* Row 1 — Col 3: × × accents (2 units) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hidden md:flex items-center justify-center md:col-span-2 rounded-full border border-border bg-card p-6">
            <div className="flex gap-4">
              <CrossAccent className="w-8 h-8" />
              <CrossAccent className="w-8 h-8" />
              <CrossAccent className="w-8 h-8" />
            </div>
          </motion.div>

          {/* Row 2 — Col 1: Stat Card 2 (3 units) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="md:col-span-3 rounded-full border border-border bg-card py-3 md:py-5 px-9 md:px-12 flex flex-col justify-center gap-2">
            <span className="text-5xl md:text-6xl font-extrabold text-primary tracking-tight shrink-0">
              <AnimatedNumber
                target={problems[1].stat}
                suffix={problems[1].statSuffix}
              />
            </span>
            <div>
              <p className="text-muted-foreground font-medium text-sm mb-2 uppercase tracking-wider">
                {problems[1].statLabel}
              </p>
              <h3 className="text-xl font-bold mb-2">{problems[1].title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {problems[1].desc}
              </p>
            </div>
          </motion.div>

          {/* Row 2 — Col 2: + accent (2 units) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="hidden md:flex items-center justify-center md:col-span-2 rounded-full border border-border bg-card p-6">
            <PlusAccent className="w-16 h-16" />
          </motion.div>

          {/* Row 2 — Col 3: Stat Card 3 (gradient, 3 units) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="md:col-span-3 rounded-[2.5rem] bg-hero-gradient text-primary-foreground p-8 md:p-10 flex flex-col gap-6">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-2xl font-bold opacity-80">↑</span>
              <span className="text-5xl md:text-6xl font-extrabold tracking-tight">
                <AnimatedNumber
                  target={problems[2].stat}
                  suffix={problems[2].statSuffix}
                />
              </span>
            </div>
            <div>
              <p className="text-primary-foreground/80 font-medium text-sm mb-2 uppercase tracking-wider">
                {problems[2].statLabel}
              </p>
              <h3 className="text-xl font-bold mb-2">{problems[2].title}</h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                {problems[2].desc}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
