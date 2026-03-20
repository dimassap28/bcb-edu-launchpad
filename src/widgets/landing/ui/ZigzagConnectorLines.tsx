import { motion } from "framer-motion";
import type { LinePositions } from "../model/useSolutionPersona";

interface ZigzagConnectorLinesProps {
  positions: LinePositions;
  hoveredSolution: number | null;
  hoveredPersona: number | null;
  connectedPersonaIndices: number[];
  connectedSolutionIndices: number[];
}

const getSmoothStepPath = (
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  isRight: boolean,
): string => {
  const dy = p2.y - p1.y;
  const hExit = isRight ? 45 : -45;
  const cornerRadius = 24;
  const midX = p1.x + hExit;

  return `M ${p1.x} ${p1.y}
          L ${midX - (isRight ? cornerRadius : -cornerRadius)} ${p1.y}
          Q ${midX} ${p1.y} ${midX} ${p1.y + (dy > 0 ? cornerRadius : -cornerRadius)}
          L ${midX} ${p2.y - (dy > 0 ? cornerRadius : -cornerRadius)}
          Q ${midX} ${p2.y} ${midX + (isRight ? cornerRadius : -cornerRadius)} ${p2.y}
          L ${p2.x} ${p2.y}`;
};

export const ZigzagConnectorLines = ({
  positions,
  hoveredSolution,
  hoveredPersona,
  connectedPersonaIndices,
  connectedSolutionIndices,
}: ZigzagConnectorLinesProps) => {
  const { logo, solutions: solCenters, personas: perCenters } = positions;

  if (!logo) return null;

  const isSolActive = hoveredSolution !== null;
  const isPerActive = hoveredPersona !== null;
  if (!isSolActive && !isPerActive) return null;

  const activeSolIndices: number[] = [];
  const linePairs: { si: number; pi: number }[] = [];

  if (isSolActive) {
    const si = hoveredSolution!;
    activeSolIndices.push(si);
    connectedPersonaIndices.forEach((pi) => linePairs.push({ si, pi }));
  } else if (isPerActive) {
    connectedSolutionIndices.forEach((si) => {
      linePairs.push({ si, pi: hoveredPersona! });
      activeSolIndices.push(si);
    });
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <defs>
        <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Solution → Logo */}
      {activeSolIndices.map((si) => {
        const sc = solCenters[si];
        if (!sc) return null;
        return (
          <g key={`sol-g-${si}`}>
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              d={getSmoothStepPath(sc, logo, true)}
              stroke="currentColor"
              className="text-primary"
              strokeWidth="2"
              fill="none"
              style={{ filter: "url(#line-glow)" }}
            />
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              cx={sc.x} cy={sc.y} r="3.5"
              className="fill-primary"
            />
          </g>
        );
      })}

      {/* Logo → Persona */}
      {linePairs.map(({ si, pi }) => {
        const pc = perCenters[pi];
        if (!pc) return null;
        return (
          <g key={`per-g-${si}-${pi}`}>
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              d={getSmoothStepPath(logo, pc, true)}
              stroke="currentColor"
              className="text-primary"
              strokeWidth="2"
              fill="none"
              style={{ filter: "url(#line-glow)" }}
            />
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
              cx={pc.x} cy={pc.y} r="3.5"
              className="fill-primary"
            />
          </g>
        );
      })}
    </svg>
  );
};
