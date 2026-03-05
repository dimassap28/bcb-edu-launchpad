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
    pulseDur: 3,
  },
  {
    icon: Settings,
    label: "Step 2",
    title: "Aktifkan & Setup",
    desc: "Tim kami bantu setup, migrasi data, dan pelatihan. Gratis, tanpa biaya tambahan.",
    shape: "circle" as const,
    pulseDur: 4,
  },
  {
    icon: Rocket,
    label: "Step 3",
    title: "Langsung Pakai",
    desc: "Dashboard siap. Guru, staf, dan kepala sekolah bisa mulai hari itu juga.",
    shape: "chevron" as const,
    pulseDur: 3.5,
  },
];

const ShapeBackground = ({ shape, pulseDur }: { shape: string; pulseDur: number }) => {
  const shapeStyles: Record<string, React.CSSProperties> = {
    star: {
      clipPath: "polygon(50% 0%, 61% 35%, 100% 38%, 68% 59%, 79% 100%, 50% 75%, 21% 100%, 32% 59%, 0% 38%, 39% 35%)",
    },
    circle: {
      borderRadius: "50%",
    },
    chevron: {
      clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%)",
    },
  };

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <motion.div
        className="bg-primary"
        style={{
          width: 80,
          height: 80,
          opacity: 0.3,
          filter: "blur(8px)",
          ...shapeStyles[shape],
        }}
        animate={
          shape === "circle"
            ? { scale: [0.9, 1.1, 0.9], rotate: [0, 360] }
            : { scale: [0.9, 1.1, 0.9] }
        }
        transition={
          shape === "circle"
            ? {
                scale: { duration: pulseDur, ease: "easeInOut", repeat: Infinity },
                rotate: { duration: 12, ease: "linear", repeat: Infinity },
              }
            : { duration: pulseDur, ease: "easeInOut", repeat: Infinity }
        }
      />
    </motion.div>
  );
};

const HowItWorksSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cara-kerja" className="py-24 bg-section-alt overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Mulai dalam <span className="text-gradient">3 Langkah Mudah</span>
          </h2>
        </motion.div>

        {/* Desktop */}
        <div ref={ref} className="hidden md:block relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="absolute top-[40px] left-0 right-0 h-[2px]">
            <motion.div
              className="h-full border-t-2 border-dashed border-primary/25"
              initial={{ width: "0%" }}
              animate={inView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.label} className="flex flex-col items-center text-center">
                {/* Node */}
                <motion.div
                  className="relative w-20 h-20 flex items-center justify-center mb-6"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.8 + i * 0.15 }}
                >
                  <ShapeBackground shape={s.shape} pulseDur={s.pulseDur} />
                  <div className="relative z-10 w-12 h-12 rounded-[14px] bg-card shadow-card flex items-center justify-center">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                </motion.div>

                {/* Text */}
                <motion.span
                  className="text-xs font-semibold text-primary mb-1"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 1.25 + i * 0.1 }}
                >
                  {s.label}
                </motion.span>
                <motion.h3
                  className="text-xl font-bold mb-2"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 1.35 + i * 0.1 }}
                >
                  {s.title}
                </motion.h3>
                <motion.p
                  className="text-muted-foreground text-sm leading-relaxed max-w-[240px]"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 1.45 + i * 0.1 }}
                >
                  {s.desc}
                </motion.p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div ref={inView ? undefined : ref} className="md:hidden relative pl-16">
          {/* Vertical line */}
          <motion.div
            className="absolute left-[39px] top-0 w-[2px] border-l-2 border-dashed border-primary/25"
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <div className="space-y-12">
            {steps.map((s, i) => (
              <motion.div
                key={s.label}
                className="relative flex items-start gap-5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.8 + i * 0.15 }}
              >
                {/* Node */}
                <div className="absolute -left-16 w-20 h-20 flex items-center justify-center shrink-0">
                  <ShapeBackground shape={s.shape} pulseDur={s.pulseDur} />
                  <div className="relative z-10 w-12 h-12 rounded-[14px] bg-card shadow-card flex items-center justify-center">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>

                {/* Text */}
                <div className="pt-3">
                  <span className="text-xs font-semibold text-primary">{s.label}</span>
                  <h3 className="text-lg font-bold mt-1 mb-1">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
