import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PillBadge } from "@/shared/ui/pill-badge";
import { LANDING_MODULES, type LandingModule } from "@/entities/landing";

/* ─── Sub-components ─────────────────────────────────────────────────────── */

const MiniScheduleMockup = () => {
  return (
    <div className="w-[120%] h-[120%] bg-surface text-[8px] flex flex-col transform origin-top-left scale-[0.85] rounded-tl-xl border-l-[3px] border-t-[3px] border-white shadow-2xl overflow-hidden" style={{ fontFamily: "inherit" }}>
      {/* Header */}
      <div className="flex items-center p-3 border-b border-border bg-white rounded-tr-xl">
        <span className="font-bold text-1 text-[11px] tracking-wider">X TITL 4</span>
        <span className="ml-2 px-2 py-0.5 bg-blue-pastel text-blue-pastel-text rounded-full font-medium text-[8px]">Pagi</span>
      </div>
      
      {/* Schedule Table */}
      <div className="p-2 flex-1 flex flex-col gap-1.5 overflow-hidden bg-surface/50">
        {/* Row 1 */}
        <div className="flex gap-1.5 h-14">
           <div className="w-8 shrink-0 flex items-start justify-center text-2 font-medium pt-1">07:00</div>
           <div className="flex-1 bg-blue-pastel text-blue-pastel-text rounded-lg p-1.5 shadow-sm flex flex-col justify-center border border-blue-pastel/20">
             <div className="font-bold text-[10px] mb-0.5 leading-tight">Upacara</div>
             <div className="bg-white/60 w-fit px-1 py-0.5 rounded text-[7px] shadow-sm mt-auto inline-block">07:00 - 07:30</div>
           </div>
           <div className="flex-[2] bg-green-pastel text-green-pastel-text rounded-lg p-1.5 shadow-sm border border-green-pastel/20 flex flex-col">
             <div className="font-bold text-[10px] line-clamp-1 mb-0.5 leading-tight">Dasar Mesin</div>
             <div className="text-[8px] opacity-70 mb-auto line-clamp-1">Yuandika S.T</div>
             <div className="bg-white/60 w-fit px-1 py-0.5 rounded text-[7px] shadow-sm mt-1 inline-block">07:30 - 08:46</div>
           </div>
        </div>
        
        {/* Row 2 */}
        <div className="flex gap-1.5 h-14">
           <div className="w-8 shrink-0 flex items-start justify-center text-2 font-medium pt-1">08:46</div>
           <div className="flex-[1.5] bg-purple-pastel text-purple-pastel-text rounded-lg p-1.5 shadow-sm border border-purple-pastel/20 flex flex-col">
             <div className="font-bold text-[10px] line-clamp-1 mb-0.5 leading-tight">B. Indonesia</div>
             <div className="text-[8px] opacity-70 mb-auto line-clamp-1">Dinda S.Pd</div>
             <div className="bg-white/60 w-fit px-1 py-0.5 rounded text-[7px] shadow-sm mt-1 inline-block">08:46 - 10:02</div>
           </div>
           <div className="flex-[1.5] bg-orange-pastel text-orange-pastel-text rounded-lg p-1.5 shadow-sm border border-orange-pastel/20 flex flex-col">
             <div className="font-bold text-[10px] line-clamp-1 mb-0.5 leading-tight">Koding AI</div>
             <div className="text-[8px] opacity-70 mb-auto line-clamp-1">Renaldi S.Kom</div>
             <div className="bg-white/60 w-fit px-1 py-0.5 rounded text-[7px] shadow-sm mt-1 inline-block">08:46 - 10:02</div>
           </div>
        </div>

        {/* Istirahat */}
         <div className="flex items-center w-full my-0.5">
           <div className="w-8 shrink-0 text-center text-2 font-medium text-[8px]">—</div>
           <div className="flex-1 text-center">
             <span className="inline-block bg-surface px-3 py-1 rounded-full text-[7px] font-medium text-2 shadow-sm border border-border uppercase tracking-widest">Istirahat · 20m</span>
           </div>
         </div>
      </div>
    </div>
  );
};

interface ModuleCardProps {
  mod: LandingModule;
  index: number;
}

const ModuleCard = ({ mod, index }: ModuleCardProps) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(mod.href)}
      className="group relative flex flex-col bg-card border border-border cursor-pointer transition-all duration-300 ease-out"
      style={{
        borderRadius: 20,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 40px -8px hsl(210 80% 45% / 0.15)"
          : "0 4px 12px -4px hsl(0 0% 0% / 0.05)",
      }}
    >
      {/* Background SVG Gradient */}
      <div 
        className="absolute inset-x-0 top-0 z-0 pointer-events-none transition-opacity duration-700 ease-in-out overflow-hidden" 
        style={{ height: "360px", opacity: hovered ? 1 : 0.4, borderRadius: 20 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-full">
          <ellipse 
            cx="200" cy="100" rx="250" ry="150" 
            fill={`url(#grad1-${mod.id})`} 
            style={{ 
              transform: hovered ? "scale(1.15) rotate(10deg)" : "scale(1) rotate(0deg)", 
              transformOrigin: "200px 100px", 
              transition: "transform 1s cubic-bezier(0.2, 0.8, 0.2, 1)" 
            }} 
          />
          <ellipse 
            cx="300" cy="200" rx="200" ry="200" 
            fill={`url(#grad2-${mod.id})`} 
            style={{ 
              transform: hovered ? "scale(1.2) rotate(-15deg)" : "scale(1) rotate(0deg)", 
              transformOrigin: "300px 200px", 
              transition: "transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)" 
            }} 
          />
          <defs>
            <radialGradient id={`grad1-${mod.id}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 100) rotate(90) scale(150 250)">
              <stop offset="0%" stopColor={mod.blobs[0]} stopOpacity="0.5" />
              <stop offset="100%" stopColor={mod.blobs[0]} stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`grad2-${mod.id}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(300 200) rotate(90) scale(200 200)">
              <stop offset="0%" stopColor={mod.blobs[1] || mod.blobs[0]} stopOpacity="0.6" />
              <stop offset="100%" stopColor={mod.blobs[1] || mod.blobs[0]} stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between p-6 pb-0">
        <h3 className="text-xl font-bold tracking-tight text-card-foreground">
          {mod.name}
        </h3>
        <div
          className="w-8 h-8 rounded-full bg-surface shadow-sm border border-border flex items-center justify-center transition-all duration-300"
          style={{
            transform: hovered ? "translate(2px, -2px) scale(1.1)" : "translate(0, 0) scale(1)",
            color: hovered ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
            backgroundColor: hovered ? "hsl(var(--primary) / 0.1)" : "var(--bg-surface)",
            borderColor: hovered ? "hsl(var(--primary) / 0.2)" : "var(--border-default)",
          }}
        >
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Mockup wrapper */}
      <div
        className="relative z-10 mx-6 mt-6 mb-2 flex items-center justify-center pointer-events-none h-[220px]"
        style={{ perspective: "1000px" }}
      >
        <div
          className="w-full h-full transition-transform duration-700 ease-out flex justify-center items-start pt-[20px]"
          style={{
            transformStyle: "preserve-3d",
            transform: hovered 
              ? "scale(1.05) translateY(-8px) rotateX(2deg) rotateY(-4deg)" 
              : "scale(1) translateY(0) rotateX(12deg) rotateY(-8deg)",
          }}
        >
           <MiniScheduleMockup />
        </div>
      </div>

      {/* Features list */}
      <div className="relative z-10 p-6 pt-4 flex-1 flex flex-col justify-end bg-card/60 backdrop-blur-md rounded-b-[20px] border-t border-border/50">
        <div className="space-y-4">
          <p className="text-sm font-medium text-primary">{mod.price}</p>
          <ul className="space-y-2.5">
            {mod.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-snug">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          
          {/* CTA Button (appears on hover) */}
          <div 
            className="overflow-hidden transition-all duration-300 ease-out" 
            style={{ 
              maxHeight: hovered ? "50px" : "0px", 
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(10px)",
              marginTop: hovered ? "16px" : "0px"
            }}
          >
            <span className="text-primary font-semibold text-sm flex items-center gap-1.5">
              Pelajari {mod.name.split(" ")[0]}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Section ────────────────────────────────────────────────────────────── */

const ModulesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="modul" ref={sectionRef} className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <PillBadge icon={<Package className="h-3 w-3" />}>Fitur & Modul</PillBadge>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-foreground">
            Modul yang Bisa Anda Pilih
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Setiap modul dapat diaktifkan terpisah. Bayar hanya untuk yang Anda gunakan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {LANDING_MODULES.map((mod, i) => (
            <ModuleCard key={mod.id} mod={mod} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
