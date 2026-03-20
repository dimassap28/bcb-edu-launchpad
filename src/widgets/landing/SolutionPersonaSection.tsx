import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { PillBadge } from "@/shared/ui/pill-badge";
import { SOLUTIONS, PERSONAS } from "@/entities/landing";
import { useSolutionPersona } from "./model/useSolutionPersona";
import { ZigzagConnectorLines } from "./ui/ZigzagConnectorLines";
import { SolutionPersonaMobile } from "./ui/SolutionPersonaMobile";
import { GridSolutionCard } from "./GridSolutionCard";
import { GridPersonaCard } from "./GridPersonaCard";
import { DotGridAccent } from "./DotGridAccent";

const SolutionPersonaSection = () => {
  const {
    sectionRef, logoRef, spineRef,
    solutionCardRefs, personaCardRefs,
    hoveredPersona, tappedPersona, setTappedPersona,
    activeSolutionIndex, connectedPersonaIndices, connectedSolutionIndices,
    linePositions, isVisible, logoGlow,
    handleSolutionHover, handlePersonaHover,
    isSolutionDimmed, isPersonaDimmed,
  } = useSolutionPersona();

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">

        {/* ── Desktop Layout ── */}
        <div className="hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <PillBadge icon={<Users className="h-3 w-3" />}>Solusi untuk Semua Peran</PillBadge>
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight mt-4">
              Satu Platform, Lima Peran,{" "}
              <span className="text-gradient">Nol Kebingungan</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Setiap fitur BCB Edu dirancang untuk menjawab kebutuhan spesifik setiap peran di sekolah.
            </p>
          </motion.div>

          <div
            ref={sectionRef}
            className="relative grid grid-cols-[2fr_120px_2fr] gap-4 w-full"
          >
            <ZigzagConnectorLines
              positions={linePositions}
              hoveredSolution={activeSolutionIndex}
              hoveredPersona={hoveredPersona}
              connectedPersonaIndices={connectedPersonaIndices}
              connectedSolutionIndices={connectedSolutionIndices}
            />

            {/* Left: Solution Cards */}
            <div className="grid grid-cols-2 grid-rows-5 gap-6 py-10 pr-4">
              {SOLUTIONS.map((sol, i) => (
                <GridSolutionCard
                  key={sol.name}
                  solution={sol}
                  index={i}
                  isHovered={activeSolutionIndex === i}
                  dimmed={isSolutionDimmed(i)}
                  isVisible={isVisible}
                  onHover={handleSolutionHover}
                  cardRef={(el) => { solutionCardRefs.current[i] = el; }}
                />
              ))}
            </div>

            {/* Center: Spine + Logo */}
            <div className="relative flex justify-center w-full">
              <div
                ref={spineRef}
                className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-border to-transparent origin-top transition-transform duration-700 ease-out ${
                  isVisible ? "scale-y-100" : "scale-y-0"
                }`}
              />
              <div className="sticky top-[calc(50vh-40px)] z-20 flex items-center justify-center h-20 w-20">
                <div
                  ref={logoRef}
                  className={`flex items-center justify-center w-20 h-20 rounded-[18px] bg-slate-900 transition-all duration-300 ${
                    isVisible ? "opacity-100 scale-100 delay-300" : "opacity-0 scale-75"
                  }`}
                  style={{
                    boxShadow: logoGlow
                      ? "0 0 0 12px hsl(210 80% 45% / 0.2), 0 8px 32px rgba(0,0,0,0.2)"
                      : "0 0 0 8px hsl(210 80% 45% / 0.08), 0 8px 24px rgba(0,0,0,0.15)",
                  }}
                >
                  <span className="text-sm font-bold text-white tracking-tight">
                    BCB{" "}
                    <span className="bg-gradient-to-br from-blue-400 to-teal-400 bg-clip-text text-transparent">
                      Edu
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Persona Cards */}
            <div className="grid grid-cols-2 grid-rows-5 gap-x-6 py-10 pl-4">
              {PERSONAS.map((persona, i) => (
                <GridPersonaCard
                  key={persona.name}
                  persona={persona}
                  index={i}
                  isHovered={hoveredPersona === i}
                  highlighted={connectedPersonaIndices.includes(i)}
                  dimmed={isPersonaDimmed(i)}
                  isVisible={isVisible}
                  onHover={handlePersonaHover}
                  cardRef={(el) => { personaCardRefs.current[i] = el; }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile Layout ── */}
        <SolutionPersonaMobile
          tappedPersona={tappedPersona}
          onTap={setTappedPersona}
        />
      </div>
    </section>
  );
};

export default SolutionPersonaSection;
