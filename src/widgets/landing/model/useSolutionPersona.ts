import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { SOLUTIONS, PERSONAS } from "@/entities/landing";

export interface LinePositions {
  logo: { x: number; y: number } | null;
  solutions: ({ x: number; y: number } | null)[];
  personas: ({ x: number; y: number } | null)[];
}

export interface UseSolutionPersonaReturn {
  // refs
  sectionRef: React.RefObject<HTMLDivElement>;
  logoRef: React.RefObject<HTMLDivElement>;
  spineRef: React.RefObject<HTMLDivElement>;
  solutionCardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  personaCardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  // state
  hoveredSolution: number | null;
  hoveredPersona: number | null;
  tappedPersona: number | null;
  setTappedPersona: (i: number | null) => void;
  activeSolutionIndex: number | null;
  connectedPersonaIndices: number[];
  connectedSolutionIndices: number[];
  linePositions: LinePositions;
  isVisible: boolean;
  logoGlow: boolean;
  // handlers
  handleSolutionHover: (i: number | null) => void;
  handlePersonaHover: (i: number | null) => void;
  isSolutionDimmed: (i: number) => boolean;
  isPersonaDimmed: (i: number) => boolean;
}

export const useSolutionPersona = (): UseSolutionPersonaReturn => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const solutionCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const personaCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [hoveredSolution, setHoveredSolution] = useState<number | null>(null);
  const [hoveredPersona, setHoveredPersona] = useState<number | null>(null);
  const [autoplayIndex, setAutoplayIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [logoGlow, setLogoGlow] = useState(false);
  const [linePositions, setLinePositions] = useState<LinePositions>({
    logo: null,
    solutions: [],
    personas: [],
  });
  const [tappedPersona, setTappedPersona] = useState<number | null>(
    typeof window !== "undefined" && window.innerWidth < 768 ? 0 : null,
  );

  const activeSolutionIndex = useMemo(() => {
    if (hoveredSolution !== null) return hoveredSolution;
    if (hoveredPersona !== null) return null;
    return autoplayIndex;
  }, [hoveredSolution, hoveredPersona, autoplayIndex]);

  const connectedPersonaIndices = useMemo(
    () =>
      activeSolutionIndex !== null
        ? SOLUTIONS[activeSolutionIndex].connectedPersonas
            .map((name) => PERSONAS.findIndex((p) => p.name === name))
            .filter((i) => i !== -1)
        : [],
    [activeSolutionIndex],
  );

  const connectedSolutionIndices = useMemo(
    () =>
      hoveredPersona !== null
        ? SOLUTIONS.reduce<number[]>((acc, sol, si) => {
            if (sol.connectedPersonas.includes(PERSONAS[hoveredPersona].name)) {
              acc.push(si);
            }
            return acc;
          }, [])
        : [],
    [hoveredPersona],
  );

  const recalculate = useCallback(() => {
    if (!sectionRef.current || !logoRef.current) return;
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const logoRect = logoRef.current.getBoundingClientRect();

    setLinePositions({
      logo: {
        x: logoRect.left - sectionRect.left + logoRect.width / 2,
        y: logoRect.top - sectionRect.top + logoRect.height / 2,
      },
      solutions: solutionCardRefs.current.map((ref) => {
        if (!ref) return null;
        const r = ref.getBoundingClientRect();
        return {
          x: r.left - sectionRect.left + r.width / 2,
          y: r.top - sectionRect.top + r.height / 2,
        };
      }),
      personas: personaCardRefs.current.map((ref) => {
        if (!ref) return null;
        const r = ref.getBoundingClientRect();
        return {
          x: r.left - sectionRect.left + r.width / 2,
          y: r.top - sectionRect.top + r.height / 2,
        };
      }),
    });
  }, []);

  useEffect(() => {
    recalculate();
    const ro = new ResizeObserver(recalculate);
    if (sectionRef.current) ro.observe(sectionRef.current);
    window.addEventListener("resize", recalculate);
    window.addEventListener("scroll", recalculate, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalculate);
      window.removeEventListener("scroll", recalculate);
    };
  }, [recalculate]);

  // Autoplay — cycle every 7s when no hover
  useEffect(() => {
    if (!isVisible || hoveredSolution !== null || hoveredPersona !== null) return;
    const interval = setInterval(() => {
      setAutoplayIndex((prev) => (prev + 1) % SOLUTIONS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isVisible, hoveredSolution, hoveredPersona]);

  // Logo glow
  useEffect(() => {
    setLogoGlow(activeSolutionIndex !== null || hoveredPersona !== null);
  }, [activeSolutionIndex, hoveredPersona]);

  // IntersectionObserver
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSolutionHover = useCallback(
    (i: number | null) => {
      setHoveredSolution(i);
      setHoveredPersona(null);
      if (i !== null) recalculate();
    },
    [recalculate],
  );

  const handlePersonaHover = useCallback(
    (i: number | null) => {
      setHoveredPersona(i);
      setHoveredSolution(null);
      if (i !== null) recalculate();
    },
    [recalculate],
  );

  const isSolutionDimmed = useCallback(
    (i: number) => {
      if (hoveredSolution !== null) return hoveredSolution !== i;
      if (hoveredPersona !== null) return !connectedSolutionIndices.includes(i);
      if (autoplayIndex !== null) return autoplayIndex !== i;
      return false;
    },
    [hoveredSolution, hoveredPersona, connectedSolutionIndices, autoplayIndex],
  );

  const isPersonaDimmed = useCallback(
    (i: number) => {
      if (hoveredSolution !== null) return !connectedPersonaIndices.includes(i);
      if (hoveredPersona !== null) return hoveredPersona !== i;
      if (activeSolutionIndex !== null) return !connectedPersonaIndices.includes(i);
      return false;
    },
    [hoveredSolution, hoveredPersona, connectedPersonaIndices, activeSolutionIndex],
  );

  return {
    sectionRef,
    logoRef,
    spineRef,
    solutionCardRefs,
    personaCardRefs,
    hoveredSolution,
    hoveredPersona,
    tappedPersona,
    setTappedPersona,
    activeSolutionIndex,
    connectedPersonaIndices,
    connectedSolutionIndices,
    linePositions,
    isVisible,
    logoGlow,
    handleSolutionHover,
    handlePersonaHover,
    isSolutionDimmed,
    isPersonaDimmed,
  };
};
