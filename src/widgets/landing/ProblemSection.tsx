
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileSpreadsheet,
  Hourglass,
  CircleDollarSign,
  AlertTriangle,
} from "lucide-react";
import { PillBadge } from "@/shared/ui/pill-badge";

import { floatingTags } from "@/entities/landing";
import { FileChaosAnimation } from "./ui/animations/FileChaosAnimation";
import { ChecklistAnimation } from "./ui/animations/ChecklistAnimation";
import { UIOverloadAnimation } from "./ui/animations/UIOverloadAnimation";

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
