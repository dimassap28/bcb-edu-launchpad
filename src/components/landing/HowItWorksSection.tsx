import { motion, useInView } from "framer-motion";
import { MousePointerClick, Settings, Rocket } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    icon: MousePointerClick,
    label: "Step 1",
    title: "Pilih Modul",
    desc: "Pilih fitur yang benar-benar dibutuhkan sekolah Anda. Tidak perlu ambil semua.",
    shape: "star" as const,
    pulseDuration: 3,
  },
  {
    icon: Settings,
    label: "Step 2",
    title: "Aktifkan & Setup",
    desc: "Tim kami bantu setup, migrasi data, dan pelatihan. Gratis, tanpa biaya tambahan.",
    shape: "circle" as const,
    pulseDuration: 4,
  },
  {
    icon: Rocket,
    label: "Step 3",
    title: "Langsung Pakai",
    desc: "Dashboard siap. Guru, staf, dan kepala sekolah bisa mulai hari itu juga.",
    shape: "chevron" as const,
    pulseDuration: 3.5,
  },
];

const ShapeBackground = ({ shape, pulseDuration }: { shape: string; pulseDuration: number }) => {
  const shapeStyles: Record<string, string> = {
    star: "polygon(50% 0%, 61% 35%, 100% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 0% 35%, 39% 35%)",
    circle: "",
    chevron: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%)",
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className="w-20 h-20 opacity-35"
        style={{
          background: "hsl(var(--primary))",
          clipPath: shape !== "circle" ? shapeStyles[shape] : undefined,
          borderRadius: shape === "circle" ? "50%" : undefined,
          filter: "blur(4px)",
          animation: `hiw-pulse ${pulseDuration}s ease-in-out infinite${shape === "circle" ? `, hiw-spin 12s linear infinite` : ""}`,
        }}
      />
    </div>
  );
};

const HowItWorksSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Timeline: 0ms line draws (800ms), 800ms node1, 950ms node2, 1100ms node3, then text staggers
  const lineDelay = 0;
  const lineDuration = 0.8;
  const nodeBase = 0.8;
  const nodeStagger = 0.15;
  const textBase = nodeBase + nodeStagger * 2 + 0.3;
  const textStagger = 0.1;

  return (
    <section id="cara-kerja" className="py-24 bg-section-alt overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Mulai dalam <span className="text-gradient">3 Langkah Mudah</span>
          </h2>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="absolute top-10 left-0 right-0 h-px">
            <motion.div
              className="h-full border-t-2 border-dashed"
              style={{ borderColor: "hsl(var(--primary) / 0.25)" }}
              initial={{ width: "0%" }}
              animate={inView ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: lineDuration, delay: lineDelay, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                {/* Node */}
                <motion.div
                  className="relative w-20 h-20 flex items-center justify-center mb-6"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: nodeBase + i * nodeStagger }}
                >
                  <ShapeBackground shape={s.shape} pulseDuration={s.pulseDuration} />
                  <div className="relative z-10 w-12 h-12 rounded-[14px] bg-card shadow-card flex items-center justify-center">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                </motion.div>

                {/* Text content */}
                <motion.span
                  className="text-sm font-semibold text-primary mb-1"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: textBase + i * 3 * textStagger }}
                >
                  {s.label}
                </motion.span>
                <motion.h3
                  className="text-xl font-bold mb-2"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: textBase + (i * 3 + 1) * textStagger }}
                >
                  {s.title}
                </motion.h3>
                <motion.p
                  className="text-muted-foreground text-sm leading-relaxed max-w-[260px]"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: textBase + (i * 3 + 2) * textStagger }}
                >
                  {s.desc}
                </motion.p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative pl-14">
          {/* Vertical line */}
          <motion.div
            className="absolute left-[2.25rem] top-0 w-px border-l-2 border-dashed"
            style={{ borderColor: "hsl(var(--primary) / 0.25)" }}
            initial={{ height: "0%" }}
            animate={inView ? { height: "100%" } : { height: "0%" }}
            transition={{ duration: lineDuration, delay: lineDelay, ease: "easeInOut" }}
          />

          <div className="flex flex-col gap-14">
            {steps.map((s, i) => (
              <div key={i} className="relative flex items-start gap-5">
                {/* Node on the line */}
                <motion.div
                  className="absolute -left-14 top-0 w-16 h-16 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: nodeBase + i * nodeStagger }}
                >
                  <ShapeBackground shape={s.shape} pulseDuration={s.pulseDuration} />

                </motion.div>

                {/* Text */}
                <div className="ml-10 md:ml-0 pt-1">
                  <motion.span
                    className="text-sm font-semibold text-primary"
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: textBase + i * 3 * textStagger }}
                  >
                    {s.label}
                  </motion.span>
                  <motion.h3
                    className="text-lg font-bold mb-1"
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: textBase + (i * 3 + 1) * textStagger }}
                  >
                    {s.title}
                  </motion.h3>
                  <motion.p
                    className="text-muted-foreground text-sm leading-relaxed"
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: textBase + (i * 3 + 2) * textStagger }}
                  >
                    {s.desc}
                  </motion.p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
