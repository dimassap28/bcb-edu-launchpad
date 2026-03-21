import { useRef, useEffect } from "react";

function makeRunner() {
  const ids: ReturnType<typeof setTimeout>[] = [];
  const sleep = (ms: number) =>
    new Promise<void>((res) => { ids.push(setTimeout(res, ms)); });
  const cancel = () => { ids.forEach(clearTimeout); ids.length = 0; };
  return { sleep, cancel };
}

const SETUP_ROWS = [
  { label: "Import data siswa" },
  { label: "Konfigurasi kelas" },
  { label: "Buat tahun ajaran" },
  { label: "Setup akun guru" },
];

export function ProgressSetupAnim({ run, playKey = 0 }: { run: boolean, playKey?: number }) {
  const fillRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const runner = useRef(makeRunner());

  useEffect(() => {
    runner.current.cancel();

    // Reset
    if (fillRef.current) { fillRef.current.style.width = "0%"; fillRef.current.style.transition = "none"; }
    if (pctRef.current) pctRef.current.textContent = "0%";
    rowRefs.current.forEach((r) => { if (r) { r.style.opacity = "0"; r.style.transform = "translateY(4px)"; } });
    cbRefs.current.forEach((c) => { if (c) c.dataset.done = ""; });

    if (!run) return;
    runner.current = makeRunner();
    const { sleep, cancel } = runner.current;

    (async () => {
      await sleep(200);
      
      const ROW_DELAY = 180;
      const CHECK_DELAY = 220;

      if (fillRef.current) {
        fillRef.current.style.transition = `width 0.3s ease-out`;
      }

      // Reveal rows exactly synced with progress steps
      for (let i = 0; i < SETUP_ROWS.length; i++) {
        await sleep(ROW_DELAY);
        const r = rowRefs.current[i];
        if (!r) return;
        r.style.opacity = "1";
        r.style.transform = "translateY(0)";
        
        await sleep(CHECK_DELAY);
        if (cbRefs.current[i]) cbRefs.current[i]!.dataset.done = "true";

        // Step-by-step progress (25%, 50%, 75%, 100%)
        const pct = Math.round(((i + 1) / SETUP_ROWS.length) * 100);
        if (fillRef.current) fillRef.current.style.width = `${pct}%`;
        if (pctRef.current) pctRef.current.textContent = `${pct}%`;
      }
    })();

    return cancel;
  }, [run, playKey]);

  return (
    <div className="flex flex-col gap-[7px] w-full">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex-1 h-[6px] rounded-full bg-muted overflow-hidden">
          <div
            ref={fillRef}
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            style={{ width: "0%" }}
          />
        </div>
        <span ref={pctRef} className="text-[11px] font-semibold text-primary tabular-nums w-8 text-right">
          0%
        </span>
      </div>

      {/* Setup rows */}
      {SETUP_ROWS.map((row, i) => (
        <div
          key={row.label}
          ref={(el) => { rowRefs.current[i] = el; }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border"
          style={{ opacity: 0, transform: "translateY(4px)", transition: "opacity 0.25s, transform 0.25s" }}
        >
          <div
            ref={(el) => { cbRefs.current[i] = el; }}
            className="setup-cb w-4 h-4 rounded border-2 border-border flex items-center justify-center flex-shrink-0 transition-colors duration-300"
            data-done=""
          >
            <svg className="w-2.5 h-2.5 opacity-0 setup-tick transition-opacity duration-300" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-[12px] text-foreground/80">{row.label}</span>
        </div>
      ))}
    </div>
  );
}
