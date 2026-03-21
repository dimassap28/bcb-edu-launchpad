import { FILES } from "../../../../entities/landing/data/problem.data";

export function FileChaosAnimation() {
  return (
    <div className="relative h-[140px] overflow-hidden mx-[-4px]">
      {FILES.map((f) => (
        <div
          key={f.label}
          className="absolute flex flex-col items-center gap-[3px]"
          style={{
            left: f.x,
            top: f.y,
            // CSS custom props for the keyframe
            ["--r" as string]: `${f.rot}deg`,
            ["--w" as string]: `${f.rot > 0 ? 10 : -10}deg`,
            opacity: 0,
            animation: `file-float ${f.dur}s ${f.delay}s infinite ease-in-out`,
            willChange: "transform, opacity",
          }}
        >
          <div className="w-8 h-9 rounded-md bg-destructive/10 border border-destructive/25 flex items-center justify-center">
            <f.Icon className="h-4 w-4 text-destructive/60" />
          </div>
          <span className="text-[8px] font-semibold text-destructive/60 whitespace-nowrap tracking-wide">
            {f.label}
          </span>
        </div>
      ))}
    </div>
  );
}
