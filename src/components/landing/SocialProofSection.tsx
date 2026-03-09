import { motion, useInView } from "framer-motion";
import { Users } from "lucide-react";
import { useRef } from "react";

const tags = [
  { emoji: "✅", word: "Good", bg: "#D1FAE5", color: "#065F46", pos: { top: "8%", left: "12%" }, drift: { x: 10, y: -8, dur: 9 }, delay: 0 },
  { emoji: "🚀", word: "Great", bg: "#DBEAFE", color: "#1E40AF", pos: { top: "22%", left: "48%" }, drift: { x: -14, y: 10, dur: 11 }, delay: 1.2 },
  { emoji: "💯", word: "Perfect", bg: "#EDE9FE", color: "#5B21B6", pos: { top: "38%", left: "6%" }, drift: { x: 18, y: -6, dur: 8 }, delay: 2.4 },
  { emoji: "⭐", word: "Superb", bg: "#FEF3C7", color: "#92400E", pos: { top: "50%", left: "40%" }, drift: { x: -8, y: 14, dur: 13 }, delay: 3.6 },
  { emoji: "👍", word: "Helpful", bg: "#CCFBF1", color: "#0F766E", pos: { top: "62%", left: "18%" }, drift: { x: 12, y: -12, dur: 7 }, delay: 4.8 },
  { emoji: "🌊", word: "Smooth", bg: "#FCE7F3", color: "#9D174D", pos: { top: "74%", left: "50%" }, drift: { x: -16, y: 8, dur: 10 }, delay: 6 },
  { emoji: "🏆", word: "Recommended", bg: "#E0E7FF", color: "#3730A3", pos: { top: "86%", left: "10%" }, drift: { x: 14, y: -10, dur: 12 }, delay: 7.2 },
];

const featuredReview = {
  quote: "BCB Edu benar-benar mengubah cara kami mengelola sekolah. Absensi yang dulu manual dan memakan waktu sekarang selesai otomatis. Guru-guru kami tidak perlu belajar sistem yang rumit — langsung bisa pakai dari hari pertama.",
  name: "Ibu Ratna Dewi",
  role: "Kepala Sekolah · SMP Swasta Jakarta",
  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
  badge: { word: "Perfect", bg: "#EDE9FE", color: "#5B21B6" },
};

const smallReviews = [
  {
    quote: "Jadwal tidak pernah bentrok lagi. Sistem otomatisnya luar biasa membantu staf TU kami.",
    name: "Pak Arief Santoso",
    role: "Wakil Kepala Sekolah · SMA Swasta Surabaya",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    badge: { word: "Great", bg: "#DBEAFE", color: "#1E40AF" },
  },
  {
    quote: "CBT-nya stabil untuk ratusan siswa sekaligus. Tidak ada kendala teknis sama sekali saat ujian.",
    name: "Ibu Sari Kusuma",
    role: "Guru TIK · SMK Swasta Semarang",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=100&h=100&fit=crop&crop=face",
    badge: { word: "Smooth", bg: "#FCE7F3", color: "#9D174D" },
  },
  {
    quote: "Rekap absensi yang dulu makan waktu berjam-jam, sekarang selesai otomatis. Sangat membantu.",
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

const SentimentBadge = ({ word, bg, color }: { word: string; bg: string; color: string }) => (
  <span
    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
    style={{ backgroundColor: bg, color }}
  >
    {word}
  </span>
);

const AggregateRating = () => (
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
);

const ReviewCard = ({
  quote, name, role, image, badge, large = false,
}: {
  quote: string; name: string; role: string; image: string;
  badge: { word: string; bg: string; color: string }; large?: boolean;
}) => (
  <div
    className={`bg-card border border-border rounded-[20px] ${large ? "p-8" : "p-5"} shadow-card flex flex-col justify-between h-full`}
  >
    {large && (
      <span className="text-5xl font-serif leading-none text-primary mb-2 select-none">"</span>
    )}
    <p className={`${large ? "text-base" : "text-sm"} text-foreground leading-relaxed mb-4`}>
      {quote}
    </p>
    <div>
      <div className="h-px bg-border mb-4" />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <img src={image} alt={name} className="w-10 h-10 rounded-full object-cover shrink-0" loading="lazy" />
          <div className="min-w-0">
            <p className="text-sm font-bold text-foreground truncate">{name}</p>
            <p className="text-xs text-muted-foreground truncate">{role}</p>
          </div>
        </div>
        <SentimentBadge {...badge} />
      </div>
    </div>
  </div>
);

const SocialProofSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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

        {/* Mobile aggregate rating */}
        <div className="md:hidden mb-6 flex justify-center">
          <AggregateRating />
        </div>

        <div ref={ref} className="hidden md:grid grid-cols-[1fr_1.6fr_1.4fr] gap-8 items-stretch" style={{ minHeight: 440 }}>
          {/* Left column — floating tags */}
          <div className="relative">
            {tags.map((t, i) => (
              <motion.span
                key={i}
                className="absolute inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap"
                style={{
                  ...t.pos,
                  backgroundColor: t.bg,
                  color: t.color,
                  animation: `drift-${i} ${t.drift.dur}s ease-in-out ${t.delay}s infinite alternate`,
                }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.08 }}
              >
                {t.emoji} {t.word}
              </motion.span>
            ))}
            <div className="absolute bottom-0 left-0">
              <AggregateRating />
            </div>
          </div>

          {/* Center column — featured review */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
          >
            <ReviewCard {...featuredReview} large />
          </motion.div>

          {/* Right column — stacked cards */}
          <div className="flex flex-col gap-4">
            {smallReviews.map((r, i) => (
              <motion.div
                key={i}
                className="flex-1"
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 + i * 0.12 }}
              >
                <ReviewCard {...r} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile — horizontal snap scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 scrollbar-hide">
          {[{ ...featuredReview, large: false }, ...smallReviews].map((r, i) => (
            <motion.div
              key={i}
              className="snap-center shrink-0 w-[300px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ReviewCard {...r} />
            </motion.div>
          ))}
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

      {/* Drift keyframes injected via style tag */}
      <style>{tags.map((t, i) =>
        `@keyframes drift-${i} { from { transform: translate(0,0); } to { transform: translate(${t.drift.x}px, ${t.drift.y}px); } }`
      ).join("\n")}</style>
    </section>
  );
};

export default SocialProofSection;
