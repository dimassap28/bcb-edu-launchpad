import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, FileText, BookMarked, GraduationCap, Users, Check, ArrowRight } from "lucide-react";
import { PillBadge } from "@/components/ui/pill-badge";

interface Persona {
  icon: React.ElementType;
  role: string;
  tagline: string;
  benefits: string[];
  color: string;
}

const personas: Persona[] = [
  {
    icon: Shield,
    role: "Kepala Sekolah & Yayasan",
    tagline: "Kontrol penuh atas fitur aktif dan biaya yang dikeluarkan.",
    benefits: [
      "Pantau performa sekolah dari satu dashboard",
      "Kontrol modul yang aktif sesuai kebutuhan & budget",
      "Laporan akreditasi siap kapan saja",
    ],
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FileText,
    role: "Operator & Staf TU",
    tagline: "Tidak ada lagi input manual yang melelahkan.",
    benefits: [
      "Laporan absensi & nilai otomatis, siap cetak",
      "Dashboard bersih — hanya tampilkan yang relevan",
      "Jadwal tersinkronisasi real-time tanpa input ulang",
    ],
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: BookMarked,
    role: "Guru",
    tagline: "Fokus mengajar — administrasi tidak lagi menyita waktu.",
    benefits: [
      "Input absensi & nilai dari HP dalam hitungan detik",
      "Jadwal mengajar selalu up-to-date di satu tempat",
      "Buat & kelola ujian CBT tanpa keahlian teknis",
    ],
    color: "bg-accent/20 text-accent-foreground",
  },
  {
    icon: GraduationCap,
    role: "Siswa",
    tagline: "Akses jadwal, ujian, dan nilai dari satu tempat.",
    benefits: [
      "Lihat jadwal pelajaran real-time kapan saja",
      "Ikuti ujian CBT langsung dari perangkat sendiri",
      "Pantau nilai dan perkembangan belajar secara mandiri",
    ],
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    role: "Orang Tua",
    tagline: "Pantau kehadiran dan perkembangan anak tanpa harus ke sekolah.",
    benefits: [
      "Notifikasi otomatis jika anak tidak hadir",
      "Akses nilai dan rapor digital kapan saja",
      "Komunikasi langsung dengan pihak sekolah lebih mudah",
    ],
    color: "bg-secondary/10 text-secondary",
  },
];

// Dot grid pattern as SVG for top-right corner
const DotGridAccent = ({ hovered }: { hovered: boolean }) => (
  <svg
    className="absolute top-3 right-3 w-[60px] h-[60px] md:w-[80px] md:h-[80px] transition-opacity duration-200"
    style={{ opacity: hovered ? 0.3 : 0.12 }}
    viewBox="0 0 80 80"
    fill="none"
  >
    {Array.from({ length: 6 }).map((_, row) =>
      Array.from({ length: 6 - row }).map((_, col) => (
        <circle
          key={`${row}-${col}`}
          cx={80 - col * 14 - 7}
          cy={row * 14 + 7}
          r={2}
          className="fill-primary"
        />
      ))
    )}
  </svg>
);

const PersonaCard = ({
  persona,
  isFullWidth,
  delay,
}: {
  persona: Persona;
  isFullWidth?: boolean;
  delay: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const expanded = hovered || tapped;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className={`relative p-6 md:p-8 transition-colors duration-200 cursor-pointer ${
        expanded ? "bg-primary/[0.04]" : "bg-background"
      } ${isFullWidth ? "col-span-1 md:col-span-2" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setTapped((v) => !v)}
    >
      <DotGridAccent hovered={expanded} />

      <div className={isFullWidth ? "md:flex md:items-start md:gap-10" : ""}>
        <div className={isFullWidth ? "md:flex-shrink-0 md:min-w-[280px]" : ""}>
          <div className={`w-11 h-11 rounded-xl ${persona.color} flex items-center justify-center mb-4`}>
            <persona.icon className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold mb-1.5">{persona.role}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{persona.tagline}</p>
        </div>

        {/* Benefits - expand on hover/tap */}
        <div
          className={`overflow-hidden transition-all duration-200 ease-out ${
            expanded ? "max-h-40 opacity-100 mt-4 md:mt-0" : "max-h-0 opacity-0"
          } ${isFullWidth ? "md:flex-1 md:pt-11" : ""}`}
        >
          <ul className="space-y-2">
            {persona.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-[13px] leading-relaxed text-foreground">
                <Check className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Arrow indicator */}
      <div
        className={`absolute bottom-5 right-5 transition-opacity duration-200 ${
          expanded ? "opacity-100" : "opacity-0"
        }`}
      >
        <ArrowRight className="h-4 w-4 text-primary" />
      </div>
    </motion.div>
  );
};

const PersonaSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* Left column - sticky intro */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="md:w-[35%] md:pr-10 mb-10 md:mb-0"
            >
              <div className="md:sticky md:top-20">
                <PillBadge icon={<Users className="h-3 w-3" />}>
                  BCB Edu untuk Semua Peran
                </PillBadge>

                <h2 className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight">
                  Satu Platform,
                  <br />
                  Semua Peran
                  <br />
                  <span className="text-primary">Terlayani</span>
                </h2>

                <p className="text-muted-foreground text-[15px] leading-relaxed max-w-[280px] mb-4">
                  Setiap peran di sekolah mendapatkan tampilan dan fitur yang relevan — tidak lebih, tidak kurang.
                </p>

                <p className="text-muted-foreground/70 text-[13px] leading-relaxed max-w-[280px]">
                  Modul yang tidak diaktifkan tidak muncul di dashboard pengguna.
                </p>
              </div>
            </motion.div>

            {/* Vertical divider */}
            <div className="hidden md:block w-px bg-border flex-shrink-0" />

            {/* Right column - persona grid */}
            <div className="md:w-[65%] grid grid-cols-1 md:grid-cols-2">
              {/* Row 1 */}
              <div className="border-b border-border md:border-r">
                <PersonaCard persona={personas[0]} delay={0.08} />
              </div>
              <div className="border-b border-border">
                <PersonaCard persona={personas[1]} delay={0.16} />
              </div>

              {/* Row 2 */}
              <div className="border-b border-border md:border-r">
                <PersonaCard persona={personas[2]} delay={0.24} />
              </div>
              <div className="border-b border-border">
                <PersonaCard persona={personas[3]} delay={0.32} />
              </div>

              {/* Row 3 - full width */}
              <div className="md:col-span-2">
                <PersonaCard persona={personas[4]} isFullWidth delay={0.4} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonaSection;
