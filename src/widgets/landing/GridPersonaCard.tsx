import { Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { GRID_ROW_CLASSES } from "@/shared/lib/grid-utils";
import { type PersonaCardType } from "@/entities/landing";
import DotGridAccent from "./DotGridAccent";

interface GridPersonaCardProps {
  persona: PersonaCardType;
  index: number;
  isHovered: boolean;
  highlighted: boolean;
  dimmed: boolean;
  isVisible: boolean;
  onHover: (i: number | null) => void;
  cardRef: (el: HTMLDivElement | null) => void;
}

const GridPersonaCard = ({
  persona,
  index,
  isHovered,
  highlighted,
  dimmed,
  isVisible,
  onHover,
  cardRef,
}: GridPersonaCardProps) => {
  const p = persona;
  const expanded = isHovered || highlighted;
  const isOdd = index % 2 === 0;
  const colClass = isOdd ? "col-start-1" : "col-start-2";
  const rowClass = GRID_ROW_CLASSES[index] || "";

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative cursor-pointer transition-all duration-300 ease-out",
        colClass,
        rowClass,
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4",
        dimmed && "opacity-35",
      )}
      style={{
        transitionDelay: isVisible ? `${index * 80}ms` : "0ms",
        zIndex: expanded ? 20 : 10,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Main Visible Card */}
      <div
        className={cn(
          "relative rounded-2xl border bg-card p-5 transition-all duration-200 z-10",
          expanded
            ? "shadow-card-hover -translate-y-0.5 border-border rounded-b-none"
            : "shadow-card border-border",
        )}
      >
        <DotGridAccent bright={expanded} />
        <div
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center mb-3",
            p.color,
          )}
        >
          <p.icon className="h-4 w-4" />
        </div>
        <h3 className="font-bold text-sm mb-1 leading-tight">{p.name}</h3>
        <p className="text-muted-foreground text-xs leading-relaxed">
          {p.tagline}
        </p>
      </div>

      {/* Absolutely Positioned Benefits Dropdown */}
      <div
        className={cn(
          "absolute left-0 right-0 top-full bg-card border border-t-0 border-border rounded-b-2xl p-5 pt-3 shadow-card-hover transition-all duration-200 origin-top pointer-events-none",
          expanded
            ? "opacity-100 scale-y-100 translate-y-[-2px]"
            : "opacity-0 scale-y-95 -translate-y-2",
        )}
      >
        <ul className="space-y-1.5">
          {p.benefits.map((b) => (
            <li
              key={b}
              className="flex items-start gap-1.5 text-[11px] leading-relaxed text-foreground"
            >
              <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GridPersonaCard;
