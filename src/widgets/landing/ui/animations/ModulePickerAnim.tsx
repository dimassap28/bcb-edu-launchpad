import { useRef, useEffect } from "react";
import { Users, CalendarDays, ClipboardCheck } from "lucide-react";
import { ANIM_MODULES } from "@/entities/landing";

function makeRunner() {
  const ids: ReturnType<typeof setTimeout>[] = [];
  const sleep = (ms: number) =>
    new Promise<void>((res) => { ids.push(setTimeout(res, ms)); });
  const cancel = () => { ids.forEach(clearTimeout); ids.length = 0; };
  return { sleep, cancel };
}

const MODULE_ICONS = [Users, CalendarDays, ClipboardCheck];

export const ModulePickerAnim = ({ run }: { run: boolean }) => {
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
      for (let i = 0; i < ANIM_MODULES.length; i++) {
        await sleep(i * 160);
        const el = itemRefs.current[i];
        if (!el) return;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        if (ANIM_MODULES[i].active) {
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
    <div className="flex flex-col gap-[7px] w-full">
      {ANIM_MODULES.map((m, i) => {
        const Icon = MODULE_ICONS[i];
        return (
          <div
            key={m.label}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="mod-el flex items-center gap-[9px] rounded-[9px] px-[10px] py-[9px] border border-border bg-background"
            style={{ opacity: 0, transform: "translateY(6px)", transition: "opacity 0.25s, transform 0.25s" }}
          >
            <div className="mod-ico w-[30px] h-[30px] rounded-[8px] bg-muted flex items-center justify-center flex-shrink-0 transition-colors duration-300">
              <Icon className="w-[14px] h-[14px] text-muted-foreground mod-icon transition-colors duration-300" />
            </div>
            <span className="mod-label text-[12px] font-medium text-foreground/80 transition-colors duration-300">
              {m.label}
            </span>
            <div className="mod-check ml-auto w-[18px] h-[18px] rounded-full border-2 border-border flex items-center justify-center flex-shrink-0 transition-all duration-300">
              <svg className="mod-tick w-[10px] h-[10px] opacity-0 transition-opacity duration-200" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
};
