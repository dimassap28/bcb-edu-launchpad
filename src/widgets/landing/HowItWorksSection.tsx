import { useRef, useReducer, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Route } from "lucide-react";
import { PillBadge } from "@/shared/ui/pill-badge";
import { HOW_IT_WORKS_STEPS } from "@/entities/landing";
import { ModulePickerAnim } from "./ui/animations/ModulePickerAnim";
import { ProgressSetupAnim } from "./ui/animations/ProgressSetupAnim";
import { DashboardLiveAnim } from "./ui/animations/DashboardLiveAnim";

/* ─── Types ──────────────────────────────────────────────────────────────── */

type AnimComponent = React.ComponentType<{ run: boolean; playKey?: number }>;

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
      initial={{ opacity: 0, y: 30 }}
      animate={globalRun ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: motionDelay, ease: "easeOut" }}
      className="group relative flex flex-col rounded-[20px] bg-card overflow-hidden cursor-default z-10 
                 border border-border/50 shadow-sm 
                 hover:shadow-card-hover hover:border-primary/20 
                 hover:-translate-y-1.5 transition-all duration-300"
      onMouseEnter={bump}
    >
      {/* Background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />

      {/* Animation zone — fixed height keeps all cards equal */}
      <div className="relative z-10 h-[240px] place-content-center p-4 border-b border-border/50 overflow-hidden bg-background/50">
        <Anim run={runKey > 0} playKey={runKey} />
      </div>

      {/* Text */}
      <div className="relative z-10 flex-1 flex flex-col justify-end p-5 md:p-6 bg-card/80 backdrop-blur-sm">
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2 opacity-80 group-hover:opacity-100 transition-opacity">{label}</p>
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{title}</h3>
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

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Dashed connector — desktop only */}
          <div className="hidden md:block absolute top-[120px] left-0 right-0 pointer-events-none z-0">
            <motion.div
              className="w-full border-t-[3px] border-dashed border-primary/20"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              style={{ transformOrigin: "left" }}
              transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
            />
            {/* Connector dots */}
            <div className="absolute top-[-5px] left-[15%] w-3 h-3 rounded-full bg-primary/40 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <div className="absolute top-[-5px] left-[50%] w-3 h-3 rounded-full bg-primary/40 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <div className="absolute top-[-5px] right-[15%] w-3 h-3 rounded-full bg-primary/40 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
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
