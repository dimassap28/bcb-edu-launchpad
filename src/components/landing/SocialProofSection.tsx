import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Users } from "lucide-react";
import { useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const tags = [
  { emoji: "✅", word: "Good", bg: "#D1FAE5", color: "#065F46", pos: { top: "-8%", left: "5%" }, mPos: { top: "0%", left: "0%" }, drift: { x: 10, y: -8, dur: 9 }, delay: 0, rotate: -8 },
  { emoji: "🚀", word: "Great", bg: "#DBEAFE", color: "#1E40AF", pos: { top: "-2%", right: "2%" }, mPos: { top: "0%", right: "0%" }, drift: { x: -14, y: 10, dur: 11 }, delay: 1.2, rotate: 12 },
  { emoji: "💯", word: "Perfect", bg: "#EDE9FE", color: "#5B21B6", pos: { bottom: "18%", right: "8%" }, mPos: { top: "55%", right: "5%" }, drift: { x: 18, y: -6, dur: 8 }, delay: 2.4, rotate: -15 },
  { emoji: "⭐", word: "Superb", bg: "#FEF3C7", color: "#92400E", pos: { top: "40%", left: "-4%" }, mPos: { top: "30%", left: "0%" }, drift: { x: -8, y: 14, dur: 13 }, delay: 3.6, rotate: 6 },
  { emoji: "👍", word: "Helpful", bg: "#CCFBF1", color: "#0F766E", pos: { top: "48%", left: "30%" }, mPos: { top: "55%", left: "30%" }, drift: { x: 12, y: -12, dur: 7 }, delay: 4.8, rotate: -5 },
  { emoji: "🌊", word: "Smooth", bg: "#FCE7F3", color: "#9D174D", pos: { bottom: "2%", left: "15%" }, mPos: { bottom: "0%", left: "5%" }, drift: { x: -16, y: 8, dur: 10 }, delay: 6, rotate: 15 },
  { emoji: "🏆", word: "Recommended", bg: "#E0E7FF", color: "#3730A3", pos: { bottom: "8%", right: "-2%" }, mPos: { bottom: "0%", right: "0%" }, drift: { x: 14, y: -10, dur: 12 }, delay: 7.2, rotate: -10 },
];

const reviews = [
  {
    quote: "BCB Edu benar-benar mengubah cara kami mengelola sekolah. Absensi yang dulu manual sekarang selesai otomatis. Guru-guru langsung bisa pakai dari hari pertama.",
    name: "Ibu Ratna Dewi",
    role: "Kepala Sekolah · SMP Swasta Jakarta",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
    badge: { word: "Perfect", bg: "#EDE9FE", color: "#5B21B6" },
  },
  {
    quote: "Jadwal tidak pernah bentrok lagi. Sistem otomatisnya sangat membantu staf TU dan membuat semua pihak lebih tenang.",
    name: "Pak Arief Santoso",
    role: "Wakil Kepala Sekolah · SMA Swasta Surabaya",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    badge: { word: "Great", bg: "#DBEAFE", color: "#1E40AF" },
  },
  {
    quote: "CBT-nya stabil untuk ratusan siswa sekaligus. Tidak ada kendala teknis sama sekali saat ujian berlangsung.",
    name: "Ibu Sari Kusuma",
    role: "Guru TIK · SMK Swasta Semarang",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=100&h=100&fit=crop&crop=face",
    badge: { word: "Smooth", bg: "#FCE7F3", color: "#9D174D" },
  },
  {
    quote: "Rekap absensi yang dulu makan waktu berjam-jam sekarang selesai otomatis. Sangat membantu operasional harian kami.",
    name: "Pak Budi Hartono",
    role: "Operator TU · SD Islam Bandung",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
    badge: { word: "Helpful", bg: "#CCFBF1", color: "#0F766E" },
  },
];

const avatars = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=48&h=48&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=48&h=48&fit=crop&crop=face",
];

const ReviewCard = ({ quote, name, role, image, badge }: typeof reviews[0]) => {
  const [jabatan, sekolah] = role.split(" · ");

  return (
    <div className="bg-card border border-border rounded-[20px] p-6 md:p-8 shadow-card flex flex-col justify-between h-full">
      <div>
        <span className="text-4xl font-serif leading-none text-primary mb-2 block select-none">"</span>
        <p className="text-sm md:text-base text-foreground leading-relaxed mb-6">{quote}</p>
      </div>
      <div>
        <div className="h-px bg-border mb-4" />
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img src={image} alt={name} className="w-10 h-10 rounded-full object-cover shrink-0" loading="lazy" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground truncate">{name}</p>
              <p className="text-xs text-muted-foreground truncate">{jabatan}</p>
              {sekolah && <p className="text-xs font-bold text-foreground truncate mt-0.5">{sekolah}</p>}
            </div>
          </div>
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-serif italic font-bold shrink-0"
            style={{ backgroundColor: badge.bg, color: badge.color }}
          >
            {badge.word}
          </span>
        </div>
      </div>
    </div>
  );
};

const SocialProofSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();
  const [slide, setSlide] = useState(0);

  const perSlide = isMobile ? 1 : 2;
  const maxSlide = Math.ceil(reviews.length / perSlide) - 1;

  const visibleTags = isMobile ? tags.slice(0, 4) : tags;

  return (
    <section id="testimoni" ref={ref} className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-12">
          {/* LEFT COLUMN */}
          <motion.div
            className="md:w-[35%] shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            {/* Pill badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
              <Quote className="h-3 w-3" /> Testimoni
            </span>

            {/* Headline + floating tags */}
            <div className="relative mb-8" style={{ minHeight: isMobile ? 180 : 220 }}>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.15] relative z-0">
                <span className="text-foreground">Apa Kata</span>
                <br />
                <span className="text-primary">Mereka?</span>
              </h2>

              {/* Floating tags */}
              {visibleTags.map((t, i) => (
                <motion.span
                  key={i}
                  className="absolute inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap z-10"
                  style={{
                    ...(isMobile ? t.mPos : t.pos),
                    backgroundColor: t.bg,
                    color: t.color,
                    animation: `drift-${i} ${t.drift.dur}s ease-in-out ${t.delay}s infinite alternate`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                >
                  {t.emoji} {t.word}
                </motion.span>
              ))}
            </div>

            {/* Aggregate rating */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {avatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-card object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">4.9 / 5</p>
                <p className="text-xs text-muted-foreground">Dari 1 sekolah pilot aktif</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — SLIDER */}
          <div className="md:w-[65%] min-w-0">
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-4"
                animate={{ x: `-${slide * (100 / perSlide * perSlide + (perSlide > 1 ? 1 : 0))}%` }}
                style={{ x: `-${slide * 100}%` }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                {/* Group cards into slides */}
                {Array.from({ length: Math.ceil(reviews.length / perSlide) }).map((_, slideIdx) => (
                  <div
                    key={slideIdx}
                    className="flex flex-col lg:flex-row gap-4 shrink-0"
                    style={{ width: "100%" }}
                  >
                    {reviews.slice(slideIdx * perSlide, slideIdx * perSlide + perSlide).map((r, ci) => (
                      <motion.div
                        key={ci}
                        className="flex-1 min-w-0"
                        initial={{ opacity: 0, y: 32 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.5 + (slideIdx * perSlide + ci) * 0.12 }}
                      >
                        <ReviewCard {...r} />
                      </motion.div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex justify-end md:justify-end justify-center gap-3 mt-6">
              <button
                onClick={() => setSlide(Math.max(0, slide - 1))}
                disabled={slide === 0}
                className="w-10 h-10 rounded-full border border-border bg-card shadow-sm flex items-center justify-center transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary disabled:opacity-40 disabled:hover:bg-card disabled:hover:text-foreground disabled:hover:border-border"
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setSlide(Math.min(maxSlide, slide + 1))}
                disabled={slide === maxSlide}
                className="w-10 h-10 rounded-full border border-border bg-card shadow-sm flex items-center justify-center transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary disabled:opacity-40 disabled:hover:bg-card disabled:hover:text-foreground disabled:hover:border-border"
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom stat */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mt-14 text-muted-foreground"
        >
          <Users className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">
            Telah digunakan oleh sekolah swasta dengan 1.000+ siswa aktif
          </span>
        </motion.div>
      </div>

      {/* Drift keyframes */}
      <style>{tags.map((t, i) =>
        `@keyframes drift-${i} { from { transform: translate(0,0) rotate(${t.rotate}deg); } to { transform: translate(${t.drift.x}px, ${t.drift.y}px) rotate(${t.rotate}deg); } }`
      ).join("\n")}</style>
    </section>
  );
};

export default SocialProofSection;
