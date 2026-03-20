"use client";

import { useRef, useEffect, useReducer } from "react";
import { motion, useInView } from "framer-motion";
import { Route, Users, CalendarDays, ClipboardCheck } from "lucide-react";
import { PillBadge } from "@/shared/ui/pill-badge";

// ─── Data ─────────────────────────────────────────────────────────────────────

const steps = [
  {
    label: "Step 1",
    title: "Pilih Modul",
    desc: "Pilih fitur yang benar-benar dibutuhkan sekolah Anda. Tidak perlu ambil semua.",
  },
  {
    label: "Step 2",
    title: "Aktifkan & Setup",
    desc: "Tim kami bantu setup, migrasi data, dan pelatihan. Gratis, tanpa biaya tambahan.",
  },
  {
    label: "Step 3",
    title: "Langsung Pakai",
    desc: "Dashboard siap. Guru, staf, dan kepala sekolah bisa mulai hari itu juga.",
  },
];

// ─── Cancellable runner ───────────────────────────────────────────────────────

function makeRunner() {
  const ids: ReturnType<typeof setTimeout>[] = [];
  const sleep = (ms: number) =>
    new Promise<void>((res) => {
      ids.push(setTimeout(res, ms));
    });
  const cancel = () => {
    ids.forEach(clearTimeout);
    ids.length = 0;
  };
  return { sleep, cancel };
}

// ─── Anim 1: Module Picker ────────────────────────────────────────────────────

const MODULES = [
  { label: "Absensi & Jurnaling", Icon: Users, active: true },
  { label: "Jadwal & Kurikulum", Icon: CalendarDays, active: true },
  { label: "CBT – Ujian Online", Icon: ClipboardCheck, active: false },
];

function ModulePickerAnim({ run }: { run: boolean }) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const runner = useRef(makeRunner());

  useEffect(() => {
    runner.current.cancel();
    itemRefs.current.forEach((el) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(6px)";
      el.dataset.state = "";
    });
    if (!run) return;

    runner.current = makeRunner();
    const { sleep, cancel } = runner.current;

    (async () => {
      for (let i = 0; i < MODULES.length; i++) {
        await sleep(i * 160);
        const el = itemRefs.current[i];
        if (!el) return;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        if (MODULES[i].active) {
          await sleep(180);
          el.dataset.state = "active";
        }
      }
      await sleep(350);
      if (itemRefs.current[2]) itemRefs.current[2].dataset.state = "dim";
    })();

    return cancel;
  }, [run]);

  return (
    <>
      <div className="flex flex-col gap-[7px] w-full">
        {MODULES.map((m, i) => (
          <div
            key={m.label}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="mod-el flex items-center gap-[9px] rounded-[9px] px-[10px] py-[9px] border border-border bg-background"
            style={{ opacity: 0, transform: "translateY(6px)" }}
          >
            <div className="mod-ico w-[30px] h-[30px] rounded-[8px] bg-muted flex items-center justify-center flex-shrink-0 transition-colors duration-300">
              <m.Icon
                style={{ width: 14, height: 14 }}
                className={m.active ? "text-primary" : "text-muted-foreground"}
              />
            </div>
            <span className="mod-lbl text-[11px] font-medium text-muted-foreground flex-1 leading-snug transition-colors duration-300">
              {m.label}
            </span>
            <div
              className="mod-chk w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center flex-shrink-0"
              style={{
                opacity: 0,
                transform: "scale(0)",
                transition: "opacity .25s, transform .25s",
              }}
            >
              <svg
                width="9"
                height="9"
                viewBox="0 0 10 10"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
              >
                <polyline points="2,5 4,7 8,3" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Anim 2: Progress Setup ───────────────────────────────────────────────────

const CHECKLIST = [
  "Import data siswa",
  "Buat akun guru & staf",
  "Buat tahun ajaran",
  "Jadwal pelajaran",
];

function ProgressSetupAnim({ run }: { run: boolean }) {
  const fillRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const doneRef = useRef<HTMLDivElement>(null);
  const runner = useRef(makeRunner());

  useEffect(() => {
    runner.current.cancel();
    if (fillRef.current) fillRef.current.style.width = "0%";
    if (pctRef.current) pctRef.current.textContent = "0%";
    if (doneRef.current) {
      doneRef.current.style.opacity = "0";
      doneRef.current.style.transform = "translateY(4px)";
    }
    rowRefs.current.forEach((r) => {
      if (r) {
        r.style.opacity = "0";
        r.style.transform = "translateX(-8px)";
      }
    });
    cbRefs.current.forEach((c) => {
      if (c) {
        c.className = "cbox-base";
        c.innerHTML = "";
      }
    });
    if (!run) return;

    runner.current = makeRunner();
    const { sleep, cancel } = runner.current;
    const pcts = [0, 25, 50, 75, 100];

    (async () => {
      for (let i = 0; i < CHECKLIST.length; i++) {
        await sleep(i === 0 ? 100 : 720);
        const row = rowRefs.current[i];
        const cb = cbRefs.current[i];
        if (!row || !cb) return;
        row.style.opacity = "1";
        row.style.transform = "translateX(0)";
        cb.classList.add("cbox-spin");
        if (fillRef.current) fillRef.current.style.width = pcts[i] + "%";
        if (pctRef.current) pctRef.current.textContent = pcts[i] + "%";
        await sleep(650);
        cb.classList.remove("cbox-spin");
        cb.classList.add("cbox-done");
        cb.innerHTML = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="hsl(var(--primary))" stroke-width="2"><polyline points="2,5 4,7 8,3"/></svg>`;
        if (fillRef.current) fillRef.current.style.width = pcts[i + 1] + "%";
        if (pctRef.current) pctRef.current.textContent = pcts[i + 1] + "%";
      }
      await sleep(400);
      if (doneRef.current) {
        doneRef.current.style.opacity = "1";
        doneRef.current.style.transform = "translateY(0)";
      }
    })();

    return cancel;
  }, [run]);

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] font-medium text-muted-foreground">
            Setup progress
          </span>
          <span ref={pctRef} className="text-[12px] font-semibold text-primary">
            0%
          </span>
        </div>
        <div className="h-[5px] bg-border rounded-full overflow-hidden mb-3">
          <div
            ref={fillRef}
            className="h-full bg-primary rounded-full"
            style={{
              width: "0%",
              transition: "width .7s cubic-bezier(.4,0,.2,1)",
            }}
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          {CHECKLIST.map((label, i) => (
            <div
              key={label}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="flex items-center gap-2"
              style={{
                opacity: 0,
                transform: "translateX(-8px)",
                transition: "all .35s ease",
              }}
            >
              <div
                ref={(el) => {
                  cbRefs.current[i] = el;
                }}
                className="cbox-base"
              />
              <span className="text-[11px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
        <div
          ref={doneRef}
          className="mt-[10px] flex items-center gap-[6px] bg-green-500/10 border border-green-500/30 rounded-[7px] px-[10px] py-[6px]"
          style={{
            opacity: 0,
            transform: "translateY(4px)",
            transition: "all .4s ease",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4ade80"
            strokeWidth="2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="text-[11px] font-medium text-green-400">
            Siap digunakan
          </span>
        </div>
      </div>
    </>
  );
}

// ─── Anim 3: Dashboard Live ───────────────────────────────────────────────────

const DASH_ROWS = [
  { text: "18 guru aktif sekarang", blue: false },
  { text: "Soal CBT baru diunggah", blue: true },
  { text: "Jurnal kelas 9A selesai", blue: false },
];

function DashboardLiveAnim({ run }: { run: boolean }) {
  const s0Ref = useRef<HTMLDivElement>(null);
  const s1Ref = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const runner = useRef(makeRunner());

  useEffect(() => {
    runner.current.cancel();
    if (s0Ref.current) s0Ref.current.textContent = "0";
    if (s1Ref.current) s1Ref.current.textContent = "0%";
    rowRefs.current.forEach((r) => {
      if (r) {
        r.style.opacity = "0";
        r.style.transform = "translateX(8px)";
      }
    });
    if (!run) return;

    runner.current = makeRunner();
    const { sleep, cancel } = runner.current;

    (async () => {
      const steps = 28,
        dur = 900;
      for (let i = 1; i <= steps; i++) {
        await sleep(dur / steps);
        if (s0Ref.current)
          s0Ref.current.textContent = String(Math.round((247 / steps) * i));
        if (s1Ref.current)
          s1Ref.current.textContent = Math.round((94 / steps) * i) + "%";
      }
      for (let i = 0; i < 3; i++) {
        await sleep(180);
        const r = rowRefs.current[i];
        if (r) {
          r.style.opacity = "1";
          r.style.transform = "translateX(0)";
        }
      }
    })();

    return cancel;
  }, [run]);

  return (
    <>
      <div className="w-full">
        <p className="text-[10px] font-medium text-muted-foreground tracking-[.5px] mb-[7px]">
          Dashboard
        </p>
        <div className="grid grid-cols-2 gap-[6px] mb-[7px]">
          {[
            { ref: s0Ref, lbl: "Total siswa" },
            { ref: s1Ref, lbl: "Hadir hari ini" },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-background border border-border rounded-[8px] px-[10px] py-2"
            >
              <div
                ref={s.ref}
                className="text-[20px] font-bold text-foreground"
              >
                {i === 0 ? "0" : "0%"}
              </div>
              <div className="text-[10px] text-muted-foreground mt-[1px]">
                {s.lbl}
              </div>
            </div>
          ))}
        </div>
        {DASH_ROWS.map((row, i) => (
          <div
            key={row.text}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className={`flex items-center gap-2 rounded-[8px] px-[10px] py-[7px] border mb-[5px] last:mb-0 ${row.blue ? "bg-primary/10 border-primary/30" : "bg-background border-border"}`}
            style={{
              opacity: 0,
              transform: "translateX(8px)",
              transition: "all .35s ease",
            }}
          >
            <div
              className={`w-[7px] h-[7px] rounded-full flex-shrink-0 ${row.blue ? "bg-primary" : "bg-green-500 dot-pulse"}`}
            />
            <span
              className={`text-[11px] ${row.blue ? "text-primary" : "text-muted-foreground"}`}
            >
              {row.text}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Step Card ────────────────────────────────────────────────────────────────

const animComponents = [ModulePickerAnim, ProgressSetupAnim, DashboardLiveAnim];

function StepCard({
  index,
  label,
  title,
  desc,
  globalRun,
  motionDelay,
}: {
  index: number;
  label: string;
  title: string;
  desc: string;
  globalRun: boolean;
  motionDelay: number;
}) {
  const Anim = animComponents[index];
  // runKey: increment forces child useEffect to re-fire (reset → play)
  const [runKey, bump] = useReducer((n: number) => n + 1, 0);
  const started = useRef(false);

  // Fire once when section enters view
  useEffect(() => {
    if (globalRun && !started.current) {
      started.current = true;
      bump();
    }
  }, [globalRun]);

  const handleMouseEnter = () => bump();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={globalRun ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: motionDelay, ease: "easeOut" }}
      className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden cursor-default z-10 shadow-card hover:shadow-card-hover transition-all duration-300"
      onMouseEnter={handleMouseEnter}
    >
      {/* Mockup zone — fixed height keeps all cards equal */}
      <div className="h-[240px] place-content-center p-4 border-b border-border overflow-hidden">
        {/* runKey as key forces anim component to fully remount = clean reset */}
        <Anim key={runKey} run={runKey > 0} />
      </div>

      {/* Text — flex-1 stretches card to tallest sibling height */}
      <div className="flex-1 flex flex-col justify-end p-4">
        <p className="text-xs font-semibold text-primary mb-1">{label}</p>
        <h3 className="text-xl font-bold text-foreground mb-1.5">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

const HowItWorksSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="cara-kerja" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Headline */}
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

        {/* Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {/* Dashed connector line — desktop only */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none z-0">
            <motion.div
              className="w-full border-t-2 border-dashed border-primary/20"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              style={{ transformOrigin: "left" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          {steps.map((s, i) => (
            <StepCard
              key={s.title}
              index={i}
              label={s.label}
              title={s.title}
              desc={s.desc}
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
