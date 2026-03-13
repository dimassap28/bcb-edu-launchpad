import { motion } from "framer-motion";
import {
  FileSpreadsheet,
  Unplug,
  Hourglass,
  CircleDollarSign,
  AlertTriangle,
} from "lucide-react";
import { PillBadge } from "@/components/ui/pill-badge";

const problems = [
  {
    icon: FileSpreadsheet,
    title: "Administrasi yang menyita waktu",
    desc: "Data siswa, absensi, dan jadwal masih dikelola manual atau tersebar di banyak file.",
  },
  {
    icon: CircleDollarSign,
    title: "Bayar mahal untuk fitur yang tidak dipakai",
    desc: "Sistem lain memaksa Anda membeli paket lengkap, meski hanya butuh 2–3 fitur.",
  },
  {
    icon: Hourglass,
    title: "Sistem baru yang malah membingungkan",
    desc: "Terlalu banyak fitur sekaligus membuat guru dan staf enggan menggunakannya.",
  },
];

const floatingTags = [
  { label: "Rekap Manual", icon: FileSpreadsheet, x: "8%", y: "25%" },
  { label: "Tidak Terintegrasi", icon: Unplug, x: "72%", y: "20%" },
  { label: "Proses Lambat", icon: Hourglass, x: "10%", y: "65%" },
  { label: "Sistem Mahal", icon: CircleDollarSign, x: "76%", y: "60%" },
];

const ProblemSection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      {/* Radial glow effects */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, hsl(210 80% 45% / 0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "30%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, hsl(175 60% 40% / 0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "45%",
          left: "70%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, hsl(270 60% 55% / 0.04) 0%, transparent 70%)",
        }}
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(220 25% 10%) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <PillBadge
            icon={<AlertTriangle className="h-3 w-3" />}
            className="border-destructive/20 bg-destructive/10 text-destructive"
          >
            Tantangan
          </PillBadge>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-foreground">
            Apakah Sekolah Anda Masih Menghadapi Ini?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Banyak sekolah terjebak dalam sistem yang justru menambah beban.
          </p>
        </motion.div>

        {/* Logo showcase with floating tags */}
        <div className="relative mx-auto max-w-3xl" style={{ height: 380 }}>
          {/* Center logo with perspective */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            {/* Glow ring behind logo */}
            <div
              className="absolute -inset-16 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, hsl(210 80% 45% / 0.15) 0%, hsl(175 60% 40% / 0.08) 40%, transparent 70%)",
              }}
            />

            {/* Logo container with 3D perspective — low opacity bg to let glow through */}
            <div
              className="relative w-48 h-48 rounded-[28px] flex items-center justify-center border border-border/50"
              style={{
                transform:
                  "perspective(800px) rotateX(6deg) rotateY(8deg) rotateZ(-9deg)",
                background: "hsl(0 0% 100% / 0.55)",
                backdropFilter: "blur(12px)",
                boxShadow:
                  "12px 16px 40px -8px hsl(220 25% 10% / 0.25), 4px 6px 16px -4px hsl(220 25% 10% / 0.15), 0 0 0 1px hsl(var(--border) / 0.3)",
              }}
            >
              {/* Inner highlight for light-facing effect */}
              <div
                className="absolute inset-0 rounded-[28px] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(0 0% 100% / 0.7) 0%, transparent 40%, hsl(220 25% 10% / 0.03) 100%)",
                }}
              />
              <img
                src="/kite.svg"
                alt="BCB Edu"
                className="w-20 h-20 relative z-10"
                style={{
                  filter: "drop-shadow(2px 4px 6px hsl(220 25% 10% / 0.2))",
                }}
              />
            </div>
          </motion.div>

          {/* Floating problem tags — 4 cards with icons */}
          {floatingTags.map((tag, i) => (
            <motion.div
              key={tag.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="absolute z-20"
              style={{ left: tag.x, top: tag.y }}
            >
              <div
                className="flex items-center gap-2 rounded-lg border border-border/60 px-4 py-2.5 text-sm font-medium backdrop-blur-sm cursor-default select-none transition-all duration-300 hover:scale-105 text-foreground hover:shadow-card-hover"
                style={{
                  background: "hsl(0 0% 100% / 0.6)",
                  animation: `float-bob ${3.5 + i * 0.7}s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                <tag.icon className="h-4 w-4 text-destructive shrink-0" />
                {tag.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Problem cards grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.12 }}
              className="group rounded-2xl p-8 border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-5 transition-colors group-hover:bg-destructive/20">
                <p.icon className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">
                {p.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
