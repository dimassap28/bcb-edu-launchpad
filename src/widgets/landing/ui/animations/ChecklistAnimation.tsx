import { useState, useRef, useEffect } from "react";
import { CHECKLIST_ITEMS, PRICE_STEPS } from "../../../../entities/landing/data/problem.data";

export function ChecklistAnimation({ inView }: { inView: boolean }) {
  const [price, setPrice] = useState(0);
  const stepRef = useRef(0);

  useEffect(() => {
    if (!inView) return;
    stepRef.current = 0;
    setPrice(0);

    function tick() {
      stepRef.current += 1;
      if (stepRef.current < PRICE_STEPS.length) {
        setPrice(PRICE_STEPS[stepRef.current]);
        setTimeout(tick, stepRef.current === 1 ? 900 : 580);
      }
    }
    const t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <div className="relative h-[140px] overflow-hidden">
      {/* Checklist rows */}
      <div className="absolute top-2 left-2 flex flex-col gap-[8px] w-[calc(100%-72px)]">
        {CHECKLIST_ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2"
            style={{
              opacity: 0,
              animation: inView
                ? `row-in 0.4s ${item.delay}s forwards ease-out`
                : "none",
            }}
          >
            {/* Checkbox */}
            <div
              className="w-4 h-4 rounded-[4px] border-2 border-destructive/30 bg-background flex-shrink-0 relative overflow-hidden"
              style={{
                animation: inView
                  ? `check-fill 0.3s ${item.delay + 0.55}s forwards ease-out`
                  : "none",
              }}
            >
              <span
                className="absolute"
                style={{
                  top: 1,
                  left: 3,
                  width: 6,
                  height: 9,
                  borderRight: "2.5px solid hsl(var(--destructive))",
                  borderBottom: "2.5px solid hsl(var(--destructive))",
                  transform: "rotate(40deg) scale(0)",
                  transformOrigin: "center",
                  animation: inView
                    ? `check-mark 0.25s ${item.delay + 0.65}s forwards ease-out`
                    : "none",
                }}
              />
            </div>

            <span
              className={`text-[11px] leading-tight ${
                item.highlight
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground/60"
              }`}
            >
              {item.label}
            </span>

            {item.highlight && (
              <span className="text-[9px] font-bold text-destructive bg-destructive/10 px-1.5 py-0.5 rounded-full">
                dipakai
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Price badge */}
      <div className="absolute top-2 right-2 bg-destructive/10 border border-destructive/25 rounded-xl px-3 py-2 text-center min-w-[60px]">
        <p className="text-[9px] font-bold text-destructive tracking-wider mb-0.5">
          /BULAN
        </p>
        <p
          className="text-base font-bold text-destructive tabular-nums leading-none"
          key={price}
          style={{
            animation: "price-pop 0.3s ease-out",
          }}
        >
          {price === 0 ? "Rp 0" : `Rp ${(price / 1000).toFixed(0)}rb`}
        </p>
      </div>
    </div>
  );
}
