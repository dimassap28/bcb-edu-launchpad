import { motion, useInView } from "framer-motion";
import { Users } from "lucide-react";
import { useRef, useState } from "react";

const personas = [
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
    name: "Ibu Ratna Dewi",
    role: "Kepala Sekolah · SMP Swasta Jakarta",
    quote: "BCB Edu membuat pengelolaan sekolah kami jauh lebih efisien dan terorganisir.",
    size: 112,
    position: { top: "5%", left: "8%" },
    zFront: true,
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    name: "Pak Arief Santoso",
    role: "Wakil Kepala Sekolah · SMA Swasta Surabaya",
    quote: "Jadwal tidak pernah bentrok lagi sejak pakai BCB Edu. Guru-guru lebih tenang.",
    size: 96,
    position: { top: "2%", left: "42%" },
    zFront: false,
  },
  {
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=200&h=200&fit=crop&crop=face",
    name: "Pak Budi Hartono",
    role: "Operator TU · SD Islam Bandung",
    quote: "Rekap absensi yang dulu makan waktu 2 jam, sekarang selesai otomatis.",
    size: 80,
    position: { top: "8%", right: "10%" },
    zFront: true,
  },
  {
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop&crop=face",
    name: "Ibu Sari Kusuma",
    role: "Guru Kelas · SD Swasta Yogyakarta",
    quote: "Input nilai dan absensi jadi satu tempat. Tidak perlu buka banyak aplikasi lagi.",
    size: 96,
    position: { bottom: "12%", left: "12%" },
    zFront: false,
  },
  {
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
    name: "Pak Denny Firmansyah",
    role: "Kepala Yayasan · Yayasan Pendidikan Nusantara",
    quote: "Harga yang transparan dan modular sangat membantu kami mengontrol budget sekolah.",
    size: 112,
    position: { bottom: "8%", right: "30%" },
    zFront: true,
  },
  {
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop&crop=face",
    name: "Ibu Mega Puspita",
    role: "Guru TIK · SMK Swasta Semarang",
    quote: "CBT-nya stabil banget. 500 siswa ujian bersamaan, tidak ada yang error.",
    size: 96,
    position: { bottom: "15%", right: "6%" },
    zFront: true,
  },
];

const ribbonTexts = [
  "Dipercaya sekolah swasta Indonesia",
  "Mulai dari 1 modul, berkembang sesuai kebutuhan",
  "Sistem modern untuk sekolah modern",
  "Absensi · Jadwal · CBT dalam satu platform",
  "Setup gratis, langsung pakai",
];

const PersonaPhoto = ({
  persona,
  index,
  inView,
}: {
  persona: (typeof personas)[0];
  index: number;
  inView: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const offsets = [
    { x: -15, y: 12 },
    { x: 18, y: -8 },
    { x: -10, y: -18 },
    { x: 14, y: 10 },
    { x: -20, y: -5 },
    { x: 8, y: 15 },
  ];

  const isNearRight = persona.position.right && parseInt(persona.position.right) < 20;
  const isNearTop = persona.position.top && parseInt(persona.position.top) < 15;

  return (
    <motion.div
      className="absolute"
      style={{
        ...persona.position,
        zIndex: persona.zFront ? 20 : 5,
      }}
      initial={{ opacity: 0, x: offsets[index].x, y: offsets[index].y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
    >
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Photo */}
        <div
          className="rounded-full overflow-hidden border-[3px] border-card shadow-lg transition-transform duration-200 ease-out"
          style={{
            width: persona.size,
            height: persona.size,
            transform: hovered ? "scale(1.12)" : "scale(1)",
          }}
        >
          <img
            src={persona.image}
            alt={persona.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Quote card on hover */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18 }}
            className="absolute z-50 w-[220px] p-4 rounded-xl shadow-xl"
            style={{
              background: "#1a1a2e",
              color: "white",
              ...(isNearRight
                ? { right: 0, bottom: persona.size + 12 }
                : isNearTop
                  ? { left: persona.size + 8, top: 0 }
                  : { left: "50%", bottom: persona.size + 12, transform: "translateX(-50%) scale(1)" }),
              transformOrigin: "bottom center",
            }}
          >
            <p className="text-[13px] italic leading-snug mb-3 opacity-90">
              "{persona.quote}"
            </p>
            <div className="border-t border-white/20 pt-2">
              <p className="text-[13px] font-bold">{persona.name}</p>
              <p className="text-[11px] opacity-60">{persona.role}</p>
            </div>
            {/* Triangle pointer */}
            {!isNearTop && (
              <div
                className="absolute w-0 h-0"
                style={{
                  bottom: -6,
                  left: isNearRight ? "auto" : "50%",
                  right: isNearRight ? 20 : "auto",
                  transform: isNearRight ? "none" : "translateX(-50%)",
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "6px solid #1a1a2e",
                }}
              />
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const SocialProofSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const repeatedText = [...ribbonTexts, ...ribbonTexts, ...ribbonTexts]
    .join("  ✦  ");

  return (
    <section id="testimoni" className="py-24 bg-section-alt">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Dipercaya oleh{" "}
            <span className="text-gradient">Sekolah di Indonesia</span>
          </h2>
        </motion.div>

        {/* Desktop layout */}
        <div ref={ref} className="hidden md:block relative" style={{ height: 560 }}>
          {/* Curved ribbon via SVG */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            <svg
              viewBox="0 0 1200 560"
              className="w-full h-full"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <path
                  id="ribbonPath"
                  d="M-100,320 C100,100 300,450 600,280 C900,110 1100,400 1300,250"
                  fill="none"
                />
              </defs>
              {/* Ribbon background */}
              <motion.path
                d="M-100,320 C100,100 300,450 600,280 C900,110 1100,400 1300,250"
                fill="none"
                stroke="hsl(210 80% 45%)"
                strokeWidth="88"
                strokeLinecap="round"
                opacity="0.9"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              {/* Animated text on path */}
              <text
                fill="white"
                fontSize="14"
                fontWeight="600"
                fontFamily="'Plus Jakarta Sans', sans-serif"
                letterSpacing="0.5"
              >
                <textPath href="#ribbonPath" startOffset="0%">
                  <animate
                    attributeName="startOffset"
                    from="0%"
                    to="-100%"
                    dur="25s"
                    repeatCount="indefinite"
                  />
                  {repeatedText}
                </textPath>
              </text>
              <text
                fill="white"
                fontSize="14"
                fontWeight="600"
                fontFamily="'Plus Jakarta Sans', sans-serif"
                letterSpacing="0.5"
              >
                <textPath href="#ribbonPath" startOffset="100%">
                  <animate
                    attributeName="startOffset"
                    from="100%"
                    to="0%"
                    dur="25s"
                    repeatCount="indefinite"
                  />
                  {repeatedText}
                </textPath>
              </text>
            </svg>
          </div>

          {/* Persona photos */}
          {personas.map((p, i) => (
            <PersonaPhoto key={i} persona={p} index={i} inView={inView} />
          ))}
        </div>

        {/* Mobile layout */}
        <div className="md:hidden">
          {/* Horizontal scrollable cards */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 scrollbar-hide">
            {personas.slice(0, 3).map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="snap-center shrink-0 w-[280px] bg-card rounded-2xl p-5 border shadow-card"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-bold">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  "{p.quote}"
                </p>
              </motion.div>
            ))}
          </div>

          {/* Simple horizontal marquee */}
          <div className="mt-6 overflow-hidden">
            <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
              <span className="text-sm font-semibold text-primary/70 mx-4">
                {ribbonTexts.join("  ✦  ")}
              </span>
              <span className="text-sm font-semibold text-primary/70 mx-4">
                {ribbonTexts.join("  ✦  ")}
              </span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mt-10 text-muted-foreground"
        >
          <Users className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">
            Telah digunakan oleh sekolah swasta dengan 1.000+ siswa aktif
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
