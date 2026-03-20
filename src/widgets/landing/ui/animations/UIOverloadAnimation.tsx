import { UI_BUTTONS, UI_TAGS, TAG_COLORS } from "../../../../entities/landing/data/problem.data";

export function UIOverloadAnimation({ inView }: { inView: boolean }) {
  return (
    <div
      className="relative h-[140px] overflow-hidden"
      style={{
        animation: inView ? "stage-shake 0.4s 2.8s ease-in-out" : "none",
      }}
    >
      {UI_BUTTONS.map((btn) => (
        <button
          key={btn.label}
          className={`absolute text-[10px] font-semibold px-2.5 py-1.5 rounded-md whitespace-nowrap border cursor-default
            ${
              btn.variant === "fill"
                ? "bg-destructive text-white border-destructive"
                : btn.variant === "outline"
                  ? "bg-background text-destructive border-destructive/50"
                  : "bg-destructive/10 text-destructive border-destructive/20"
            }`}
          style={{
            left: btn.x,
            top: btn.y,
            ["--ox" as string]: btn.ox,
            ["--oy" as string]: btn.oy,
            opacity: 0,
            animation: inView
              ? `btn-explode 0.5s ${btn.delay}s forwards cubic-bezier(0.34,1.56,0.64,1),
                 btn-pulse 2s ${btn.delay + 0.5}s infinite ease-in-out`
              : "none",
          }}
        >
          {btn.label}
        </button>
      ))}

      {UI_TAGS.map((tag) => (
        <span
          key={tag.label}
          className={`absolute text-[9px] font-bold px-2 py-1 rounded-full border whitespace-nowrap ${TAG_COLORS[tag.color]}`}
          style={{
            left: tag.x,
            top: tag.y,
            ["--ox" as string]: "40px",
            ["--oy" as string]: "0px",
            opacity: 0,
            animation: inView
              ? `btn-explode 0.4s ${tag.delay}s forwards cubic-bezier(0.34,1.56,0.64,1)`
              : "none",
          }}
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
}
