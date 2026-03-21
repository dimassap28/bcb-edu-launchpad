import { useRef, useEffect } from "react";

function makeRunner() {
  const ids: ReturnType<typeof setTimeout>[] = [];
  const sleep = (ms: number) =>
    new Promise<void>((res) => { ids.push(setTimeout(res, ms)); });
  const cancel = () => { ids.forEach(clearTimeout); ids.length = 0; };
  return { sleep, cancel };
}

const DASH_ROWS = [
  { text: "18 guru aktif sekarang", blue: false },
  { text: "Soal CBT baru diunggah", blue: true },
  { text: "Jurnal kelas 9A selesai", blue: false },
];

const STATS = [
  { defaultVal: "0",  label: "Total siswa",    target: 247, suffix: ""  },
  { defaultVal: "0%", label: "Hadir hari ini", target: 94,  suffix: "%" },
];

export function DashboardLiveAnim({ run, playKey = 0 }: { run: boolean, playKey?: number }) {
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const runner   = useRef(makeRunner());

  useEffect(() => {
    runner.current.cancel();

    // Reset
    statRefs.current.forEach((el, i) => {
      if (el) el.textContent = STATS[i].defaultVal;
    });
    rowRefs.current.forEach((r) => {
      if (r) { r.style.opacity = "0"; r.style.transform = "translateX(8px)"; }
    });

    if (!run) return;
    runner.current = makeRunner();
    const { sleep, cancel } = runner.current;

    (async () => {
      const STEPS = 28;
      const DURATION = 900;
      for (let i = 1; i <= STEPS; i++) {
        await sleep(DURATION / STEPS);
        STATS.forEach((stat, si) => {
          const el = statRefs.current[si];
          if (el) el.textContent = String(Math.round((stat.target / STEPS) * i)) + stat.suffix;
        });
      }
      for (let i = 0; i < DASH_ROWS.length; i++) {
        await sleep(180);
        const r = rowRefs.current[i];
        if (r) { r.style.opacity = "1"; r.style.transform = "translateX(0)"; }
      }
    })();

    return cancel;
  }, [run, playKey]);

  return (
    <div className="w-full">
      <p className="text-[10px] font-medium text-muted-foreground tracking-[.5px] mb-[7px]">
        Dashboard
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-[6px] mb-[7px]">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="bg-background border border-border rounded-[8px] px-[10px] py-2">
            <div ref={(el) => { statRefs.current[i] = el; }} className="text-[20px] font-bold text-foreground">
              {stat.defaultVal}
            </div>
            <div className="text-[10px] text-muted-foreground mt-[1px]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Activity rows */}
      {DASH_ROWS.map((row, i) => (
        <div
          key={row.text}
          ref={(el) => { rowRefs.current[i] = el; }}
          className={`flex items-center gap-2 rounded-[8px] px-[10px] py-[7px] border mb-[5px] last:mb-0 ${
            row.blue ? "bg-primary/10 border-primary/30" : "bg-background border-border"
          }`}
          style={{ opacity: 0, transform: "translateX(8px)", transition: "all .35s ease" }}
        >
          <div className={`w-[7px] h-[7px] rounded-full flex-shrink-0 ${row.blue ? "bg-primary" : "bg-green-500 dot-pulse"}`} />
          <span className={`text-[11px] ${row.blue ? "text-primary" : "text-muted-foreground"}`}>
            {row.text}
          </span>
        </div>
      ))}
    </div>
  );
}
