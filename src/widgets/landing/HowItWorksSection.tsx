import { useRef, useReducer, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Route } from "lucide-react";
import { PillBadge } from "@/shared/ui/pill-badge";
import { HOW_IT_WORKS_STEPS } from "@/entities/landing";
import { ModulePickerAnim } from "./ui/animations/ModulePickerAnim";
import { ProgressSetupAnim } from "./ui/animations/ProgressSetupAnim";
import { DashboardLiveAnim } from "./ui/animations/DashboardLiveAnim";

/* ─── Types ──────────────────────────────────────────────────────────────── */

type AnimComponent = React.ComponentType<{ run: boolean }>;

const ANIM_COMPONENTS: AnimComponent[] = [
  ModulePickerAnim,
  ProgressSetupAnim,
  DashboardLiveAnim,
];

/* ─── StepCard ───────────────────────────────────────────────────────────── */

interface StepCardProps {
  index: number;
  label: string;
  title: string;
  desc: string;
  globalRun: boolean;
  motionDelay: number;
}

const StepCard = ({ index, label, title, desc, globalRun, motionDelay }: StepCardProps) => {
  const Anim = ANIM_COMPONENTS[index];
  // Incrementing runKey forces the anim child to fully remount → clean reset + replay
  const [runKey, bump] = useReducer((n: number) => n + 1, 0);
  const started = useRef(false);

  useEffect(() => {
    if (globalRun && !started.current) {
      started.current = true;
      bump();
    }
  }, [globalRun]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={globalRun ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: motionDelay, ease: "easeOut" }}
      className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden cursor-default z-10 shadow-card hover:shadow-card-hover transition-all duration-300"
      onMouseEnter={bump}
    >
      {/* Animation zone — fixed height keeps all cards equal */}
      <div className="h-[240px] place-content-center p-4 border-b border-border overflow-hidden">
        <Anim key={runKey} run={runKey > 0} />
      </div>

      {/* Text */}
      <div className="flex-1 flex flex-col justify-end p-4">
        <p className="text-xs font-semibold text-primary mb-1">{label}</p>
        <h3 className="text-xl font-bold text-foreground mb-1.5">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
};

/* ─── Section ────────────────────────────────────────────────────────────── */

const HowItWorksSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="cara-kerja" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <PillBadge icon={<Route className="h-3 w-3" />}>Cara Kerja</PillBadge>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Mulai dalam <span className="text-gradient">3 Langkah Mudah</span>
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {/* Dashed connector — desktop only */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none z-0">
            <motion.div
              className="w-full border-t-2 border-dashed border-primary/20"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              style={{ transformOrigin: "left" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <StepCard
              key={step.title}
              index={i}
              label={step.label}
              title={step.title}
              desc={step.desc}
              globalRun={inView}
              motionDelay={0.2 + i * 0.12}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
