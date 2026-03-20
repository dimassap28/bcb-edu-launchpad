import { cn } from "@/shared/lib/utils";

export const DotGridAccent = ({ bright }: { bright: boolean }) => (
  <svg
    className={cn(
      "absolute top-2 right-2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] transition-opacity duration-200",
      bright ? "opacity-30" : "opacity-10"
    )}
    viewBox="0 0 60 60"
    fill="none"
  >
    {Array.from({ length: 5 }).map((_, row) =>
      Array.from({ length: 5 - row }).map((_, col) => (
        <circle
          key={`${row}-${col}`}
          cx={60 - col * 12 - 6}
          cy={row * 12 + 6}
          r={1.8}
          className="fill-primary"
        />
      ))
    )}
  </svg>
);
