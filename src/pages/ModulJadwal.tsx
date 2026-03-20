// ModulJadwal.tsx — updated hero section only
// Replace the existing hero <section> with this block.
// Import ScheduleMockup at the top of your file:
//   import { ScheduleMockup } from "@/widgets/landing/schedule-mockup"

// ─── Add this hook inside ModulJadwal component (alongside pricingRef) ──────
//
//   const [heroYOffset, setHeroYOffset] = useState(0)
//   useEffect(() => {
//     const onScroll = () => {
//       setHeroYOffset(Math.min(window.scrollY / 400, 1) * -16)
//     }
//     window.addEventListener("scroll", onScroll, { passive: true })
//     return () => window.removeEventListener("scroll", onScroll)
//   }, [])

// ─── Hero 3D transform config ────────────────────────────────────────────────
//   const heroTransform = {
//     rotateX: 12,
//     rotateY: -8,
//     rotateZ: 2,
//     scale: 1.05,
//   }

// ─── Replace the SECTION 1: HERO block with the JSX below ───────────────────

/*
<section className="pt-28 pb-0 overflow-hidden relative">
  <div className="container mx-auto px-4">
    <div className="max-w-5xl mx-auto">

      {/* Left: headline copy *\/}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.12)}
        className="max-w-xl"
      >
        <motion.div variants={childFade()}>
          <Badge variant="secondary" className="mb-4 text-xs font-semibold">
            Modul · Jadwal &amp; Kurikulum
          </Badge>
        </motion.div>
        <motion.div variants={childFade()}>
          <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.12] mb-5">
            Atur Jadwal Sekolah Tanpa Ribet,{" "}
            <span className="text-gradient">Tanpa Bentrok</span>
          </h1>
        </motion.div>
        <motion.div variants={childFade()}>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
            Generate jadwal otomatis dalam satu klik — perubahan langsung
            terlihat oleh semua pihak, real-time.
          </p>
        </motion.div>
        <motion.div variants={childFade()}>
          <Button
            size="lg"
            asChild
            className="bg-hero-gradient hover:opacity-90 transition-opacity text-lg px-8 h-14 rounded-xl"
          >
            <a href="/#demo">
              Jadwalkan Demo Gratis
              <Send className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
        <motion.div variants={childFade()}>
          <p className="mt-4 text-sm text-muted-foreground">
            Harga mulai{" "}
            <span className="font-semibold text-foreground">Rp 2.000</span> / siswa / tahun
          </p>
        </motion.div>
      </motion.div>
    </div>
  </div>

  {/* ── 3D mockup stage — full bleed ── *\/}
  <div
    style={{
      width: "100vw",
      position: "relative",
      left: "50%",
      right: "50%",
      marginLeft: "-50vw",
      marginRight: "-50vw",
      height: "520px",
      marginTop: "-40px",
      overflow: "hidden",
    }}
  >
    {/* Fade gradient at bottom *\/}
    <div
      className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
      style={{
        height: "200px",
        background: "linear-gradient(to top, var(--color-background) 20%, transparent 100%)",
      }}
    />
    {/* Fade gradient at top *\/}
    <div
      className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
      style={{
        height: "80px",
        background: "linear-gradient(to bottom, var(--color-background) 0%, transparent 100%)",
      }}
    />

    {/* Perspective wrapper *\/}
    <div
      style={{
        transform: `translateY(${heroYOffset}px)`,
        transition: "transform 0.1s ease-out",
        perspective: "3000px",
        perspectiveOrigin: "50% 20%",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "1200px",
          height: "700px",
          position: "absolute",
          top: "60px",
          left: "50%",
          transform: `translateX(-50%) rotateX(${heroTransform.rotateX}deg) rotateY(${heroTransform.rotateY}deg) rotate(${heroTransform.rotateZ}deg) scale(${heroTransform.scale})`,
          transformOrigin: "center top",
          borderRadius: "16px",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)",
          overflow: "hidden",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <ScheduleMockup />
      </motion.div>
    </div>
  </div>
</section>
*/

// ─── Full file with all changes applied ──────────────────────────────────────

import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Navbar from "@/widgets/landing/Navbar";
import Footer from "@/widgets/landing/Footer";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { PillBadge } from "@/shared/ui/pill-badge";
import { Send, Calendar, CreditCard } from "lucide-react";
import { ScheduleMockup } from "@/components/schedule-mockup";
import { AnimatePresence } from "framer-motion";

/* ─── animation helpers ─── */
const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const staggerContainer = (stagger = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});

const childFade = () => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
});

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer(0.1)}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── floating icon badges ─── */
const floatingIcons = [
  { emoji: "📅", label: "Jadwal", x: "-145%", y: "-130%" },
  { emoji: "🔄", label: "Auto Generate", x: "45%", y: "-190%" },
  { emoji: "🚫", label: "Anti Bentrok", x: "65%", y: "10%" },
  { emoji: "🏫", label: "Ruangan", x: "45%", y: "235%" },
  { emoji: "👨‍🏫", label: "Preferensi", x: "-130%", y: "175%" },
];

function FloatingIcons() {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setCycle((c) => c + 1), 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
        <span className="text-[150px]">📅</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={cycle} className="absolute inset-0">
          {floatingIcons.map((icon, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ x: icon.x, y: icon.y }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [icon.y, `calc(${icon.y} - 6px)`, icon.y],
              }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{
                scale: { delay: i * 0.3, duration: 0.4, ease: "easeOut" },
                opacity: { delay: i * 0.3, duration: 0.4 },
                y: {
                  delay: i * 0.3 + 1.5,
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
            >
              <div className="flex items-center gap-1.5 bg-card rounded-full px-3 py-1.5 shadow-card border text-xs font-medium whitespace-nowrap">
                <span>{icon.emoji}</span>
                <span className="text-foreground">{icon.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const cardHover =
  "bg-card rounded-2xl border shadow-card transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-card-hover hover:border-primary/30";

/* ─── count-up hook ─── */
function useCountUp(target: number, duration = 1200, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, target, duration]);
  return value;
}

/* ─── 3D transform config ─── */
const HERO_TRANSFORM = {
  rotateX: 12,
  rotateY: -8,
  rotateZ: 2,
  scale: 1.05,
};

const ModulJadwal = () => {
  const pricingRef = useRef<HTMLDivElement>(null);
  const pricingInView = useInView(pricingRef, { once: true, margin: "-80px" });
  const countedPrice = useCountUp(2000, 1200, pricingInView);

  // Parallax scroll for hero mockup
  const [heroYOffset, setHeroYOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      setHeroYOffset(Math.min(window.scrollY / 400, 1) * -16);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── SECTION 1: HERO ── */}
      <section className="pt-28 pb-0 overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Headline copy */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer(0.12)}
              className="max-w-xl"
            >
              <motion.div variants={childFade()}>
                <Badge
                  variant="secondary"
                  className="mb-4 text-xs font-semibold"
                >
                  Modul · Jadwal &amp; Kurikulum
                </Badge>
              </motion.div>
              <motion.div variants={childFade()}>
                <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.12] mb-5">
                  Atur Jadwal Sekolah Tanpa Ribet,{" "}
                  <span className="text-gradient">Tanpa Bentrok</span>
                </h1>
              </motion.div>
              <motion.div variants={childFade()}>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                  Generate jadwal otomatis dalam satu klik — perubahan langsung
                  terlihat oleh semua pihak, real-time.
                </p>
              </motion.div>
              <motion.div variants={childFade()}>
                <Button
                  size="lg"
                  asChild
                  className="bg-hero-gradient hover:opacity-90 transition-opacity text-lg px-8 h-14 rounded-xl"
                >
                  <a href="/#demo">
                    Jadwalkan Demo Gratis
                    <Send className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
              <motion.div variants={childFade()}>
                <p className="mt-4 text-sm text-muted-foreground">
                  Harga mulai{" "}
                  <span className="font-semibold text-foreground">
                    Rp 2.000
                  </span>{" "}
                  / siswa / tahun
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── 3D Mockup Stage — full bleed ── */}
        <div
          style={{
            width: "100vw",
            position: "relative",
            left: "50%",
            right: "50%",
            marginLeft: "-50vw",
            marginRight: "-50vw",
            height: "520px",
            marginTop: "-40px",
            overflow: "hidden",
          }}
        >
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
            style={{
              height: "220px",
              background:
                "linear-gradient(to top, hsl(var(--background)) 20%, transparent 100%)",
            }}
          />
          {/* Top fade */}
          <div
            className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
            style={{
              height: "80px",
              background:
                "linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)",
            }}
          />

          {/* Perspective wrapper */}
          <div
            style={{
              transform: `translateY(${heroYOffset}px)`,
              transition: "transform 0.1s ease-out",
              perspective: "3000px",
              perspectiveOrigin: "50% 20%",
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                width: "1200px",
                height: "700px",
                position: "absolute",
                top: "60px",
                left: "50%",
                transform: `
                  translateX(-50%)
                  rotateX(${HERO_TRANSFORM.rotateX}deg)
                  rotateY(${HERO_TRANSFORM.rotateY}deg)
                  rotate(${HERO_TRANSFORM.rotateZ}deg)
                  scale(${HERO_TRANSFORM.scale})
                `,
                transformOrigin: "center top",
                borderRadius: "16px",
                border: "1px solid rgba(0,0,0,0.07)",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.06)",
                overflow: "hidden",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <ScheduleMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: MODULE HIGHLIGHTS ── */}
      <Section className="py-24 bg-foreground/[0.03] relative overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(var(--primary) / 0.18) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={sectionVariants}
            className="flex flex-col items-center"
          >
            <PillBadge icon={<Calendar className="w-3 h-3" />}>
              Keunggulan Modul
            </PillBadge>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-14">
              Kenapa Memilih Modul Ini?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              variants={childFade()}
              className={`${cardHover} p-8 md:col-span-2 lg:row-span-2 flex flex-col`}
            >
              <span className="text-3xl mb-4">⚡</span>
              <h3 className="text-xl font-bold mb-2">Auto Generate Jadwal</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Penyusunan jadwal otomatis cukup satu klik — selesai dalam
                hitungan detik, tidak perlu drag manual satu per satu.
              </p>
              <div className="flex-1 min-h-[200px] relative">
                <FloatingIcons />
              </div>
            </motion.div>

            <motion.div variants={childFade()} className={`${cardHover} p-6`}>
              <span className="text-3xl mb-3 block">🤖</span>
              <h3 className="text-lg font-bold mb-1">
                Optimasi Ruangan dengan AI
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sistem AI cerdas mengatur jadwal meski jumlah ruangan terbatas —
                tidak ada ruang yang terbuang sia-sia.
              </p>
            </motion.div>

            <motion.div variants={childFade()} className={`${cardHover} p-6`}>
              <span className="text-3xl mb-3 block">🚫</span>
              <h3 className="text-lg font-bold mb-1">Anti Bentrok Jadwal</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sistem menjamin tidak ada jadwal yang tabrakan — semua kelas dan
                guru mendapatkan slot jam mereka.
              </p>
            </motion.div>

            <motion.div
              variants={childFade()}
              className={`${cardHover} p-6 lg:col-span-3 md:col-span-2`}
            >
              <span className="text-3xl mb-3 block">🎯</span>
              <h3 className="text-lg font-bold mb-1">Penjadwalan Fleksibel</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Jadwal disesuaikan dengan preferensi guru dan kebutuhan spesifik
                sekolah — bukan template kaku.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── SECTION 4: PRICING ── */}
      <Section className="py-24 bg-section-alt" id="harga">
        <div className="container mx-auto px-4">
          <motion.div
            variants={sectionVariants}
            className="flex flex-col items-center"
          >
            <PillBadge icon={<CreditCard className="w-3 h-3" />}>
              Harga Modul
            </PillBadge>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12">
              Harga Transparan, Bayar Sesuai Siswa Aktif
            </h2>
          </motion.div>
          <motion.div variants={childFade()} className="max-w-lg mx-auto">
            <div
              ref={pricingRef}
              className={`${cardHover} p-8 md:p-10 text-center`}
            >
              <p className="text-sm text-muted-foreground mb-2 font-medium">
                Mulai dari
              </p>
              <p className="text-5xl md:text-6xl font-extrabold text-gradient mb-1">
                Rp {countedPrice.toLocaleString("id-ID")}
              </p>
              <p className="text-muted-foreground text-sm mb-8">
                / siswa / tahun
              </p>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">500 siswa</span>
                  <span className="font-semibold">Rp 1.000.000 / tahun</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">1.000 siswa</span>
                  <span className="font-semibold">Rp 2.000.000 / tahun</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Hemat 5–15% jika dikombinasikan dengan modul lain
              </p>
              <Link
                to="/pricing"
                className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1"
              >
                Lihat detail harga lengkap →
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ── SECTION 5: BOTTOM CTA ── */}
      <section className="bg-hero-gradient py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
            Tertarik dengan Modul Ini?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
            Jadwalkan demo gratis dan lihat langsung cara kerja modul Jadwal
            &amp; Kurikulum di sekolah Anda.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-card text-foreground hover:bg-card/90 h-14 rounded-xl text-base px-8 shadow-lg"
          >
            <a href="/#demo">
              Jadwalkan Demo Sekarang
              <Send className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <p className="mt-4 text-sm text-primary-foreground/70">
            Tidak ada komitmen. Tim kami menghubungi Anda dalam 1×24 jam.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default ModulJadwal;
