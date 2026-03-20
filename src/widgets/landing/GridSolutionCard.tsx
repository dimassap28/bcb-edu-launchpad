import { cn } from "@/shared/lib/utils";
import { type SolutionCardType } from "./solution-persona.types";

interface GridSolutionCardProps {
  solution: SolutionCardType;
  index: number;
  isHovered: boolean;
  dimmed: boolean;
  isVisible: boolean;
  onHover: (i: number | null) => void;
  cardRef: (el: HTMLDivElement | null) => void;
}

const ROW_CLASSES = [
  "row-start-1",
  "row-start-2",
  "row-start-3",
  "row-start-4",
  "row-start-5",
];

export const GridSolutionCard = ({
  solution,
  index,
  isHovered,
  dimmed,
  isVisible,
  onHover,
  cardRef,
}: GridSolutionCardProps) => {
  const isOdd = index % 2 === 0;
  const colClass = isOdd ? "col-start-2" : "col-start-1";
  const rowClass = ROW_CLASSES[index] || "";

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative cursor-pointer transition-all duration-300 ease-out",
        colClass,
        rowClass,
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
        dimmed && "opacity-35"
      )}
      style={{
        transitionDelay: isVisible ? `${index * 80}ms` : "0ms",
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className={cn(
          "relative rounded-2xl bg-card p-5 border border-border transition-all duration-200",
          isHovered ? "shadow-card-hover -translate-y-0.5" : "shadow-card"
        )}
      >
        <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
          <solution.icon className="h-4 w-4" />
        </div>
        <h3 className="font-bold text-sm mb-1 leading-tight">
          {solution.name}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed">
          {solution.desc}
        </p>
      </div>
    </div>
  );
};
