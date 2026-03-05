import { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send } from "lucide-react";

/* ─── animation helpers ─── */
const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const staggerContainer = (stagger = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});

const childFade = () => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
});

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
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

const MChild = motion.div;

/* ─── dot decoration ─── */
const DotLabel = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2 justify-center mb-3">
    <span className="flex gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
      <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
      <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
    </span>
    <span className="text-xs font-semibold tracking-widest uppercase text-primary">{text}</span>
    <span className="flex gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
      <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
      <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
    </span>
  </div>
);

/* ─── floating icon badges ─── */
const floatingIcons = [
  { emoji: "🔔", label: "Notifikasi", x: "-145%", y: "-130%" },
  { emoji: "✅", label: "Approval", x: "45%", y: "-190%" },
  { emoji: "⏰", label: "Reminder", x: "65%", y: "10%" },
  { emoji: "📍", label: "Live Loc", x: "45%", y: "235%" },
  { emoji: "📸", label: "Foto Bukti", x: "-130%", y: "175%" },
];

function FloatingIcons() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCycle((c) => c + 1), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* center phone icon */}
      <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
        <span className="text-[150px]">📱</span>
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
                y: { delay: i * 0.3 + 1.5, duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
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

/* ─── card hover class ─── */
const cardHover = "bg-card rounded-2xl border shadow-card transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-card-hover hover:border-primary/30";

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

/* ═══════════════════════════════════════════════ */
/* PAGE                                            */
/* ═══════════════════════════════════════════════ */
const ModulAbsensi = () => {
  const pricingRef = useRef<HTMLDivElement>(null);
  const pricingInView = useInView(pricingRef, { once: true, margin: "-80px" });
  const countedPrice = useCountUp(5000, 1200, pricingInView);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── SECTION 1: HERO ── */}
      <section className="pt-28 pb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto relative">
            <div className="grid lg:flex gap-12 items-center">
              {/* left */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer(0.12)}>
                <MChild variants={childFade()}>
                  <Badge
                    variant="secondary"
                    className="mb-4 text-xs font-semibold">
                    Modul · Absensi &amp; Jurnaling
                  </Badge>
                </MChild>

                <MChild variants={childFade()}>
                  <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.12] mb-5">
                    Absensi Digital yang Simpel —{" "}
                    <span className="text-gradient">Langsung dari HP Guru</span>
                  </h1>
                </MChild>

                <MChild variants={childFade()}>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                    Tidak perlu lagi kertas, tanda tangan, atau rekap manual.
                    Catat kehadiran dan aktivitas kelas dalam hitungan detik —
                    di mana saja, kapan saja.
                  </p>
                </MChild>

                <MChild variants={childFade()}>
                  <Button
                    size="lg"
                    asChild
                    className="bg-hero-gradient hover:opacity-90 transition-opacity text-lg px-8 h-14 rounded-xl">
                    <a href="/#demo">
                      Jadwalkan Demo Gratis
                      <Send className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </MChild>

                <MChild variants={childFade()}>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Harga mulai{" "}
                    <span className="font-semibold text-foreground">
                      Rp 5.000
                    </span>{" "}
                    / siswa / tahun
                  </p>
                </MChild>
              </motion.div>

              {/* right — phone mockup */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="right-0 -translate-y-1/2 lg:translate-y-0 lg:right-auto flex justify-center">
                <div
                  className="relative rounded-[2.5rem] border-2 border-border bg-muted/50 flex items-center justify-center"
                  style={{ width: 280, aspectRatio: "9/19.5" }}>
                  <span className="text-xs text-muted-foreground font-medium">
                    [ Screenshot Produk ]
                  </span>
                  {/* notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full bg-border/60" />
                </div>
              </motion.div>
            </div>
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
          <MChild variants={sectionVariants}>
            <DotLabel text="Keunggulan Modul" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-14">
              Kenapa Memilih Modul Ini?
            </h2>
          </MChild>

          {/* bento grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* large card */}
            <MChild variants={childFade()} className={`${cardHover} p-8 md:col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col`}>
              <span className="text-3xl mb-4">📍</span>
              <h3 className="text-xl font-bold mb-2">Live Location</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Periksa lokasi guru secara real-time saat membuat jurnal — tidak bisa dimanipulasi.
              </p>
              <div className="flex-1 min-h-[200px] relative">
                <FloatingIcons />
              </div>
            </MChild>

            {/* card 2 */}
            <MChild variants={childFade()} className={`${cardHover} p-6 lg:row-start-2`}>
              <span className="text-3xl mb-3 block">🔔</span>
              <h3 className="text-lg font-bold mb-1">Reminder Otomatis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Guru piket dan kepala sekolah dapat memantau aktivitas seluruh guru langsung dari dashboard.
              </p>
            </MChild>

            {/* card 3 */}
            <MChild variants={childFade()} className={`${cardHover} p-6 lg:row-start-2`}>
              <span className="text-3xl mb-3 block">🤖</span>
              <h3 className="text-lg font-bold mb-1">Rekap KPI Guru Otomatis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sistem otomatis menghitung jumlah jam mengajar dan performa guru — tanpa input manual.
              </p>
            </MChild>

            {/* card 4 */}
            <MChild variants={childFade()} className={`${cardHover} p-6 md:col-span-2 lg:col-span-2 lg:row-start-1 `}>
              <span className="text-3xl mb-3 block">📊</span>
              <h3 className="text-lg font-bold mb-1">Monitoring Kehadiran Guru Real-Time</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Guru piket dan kepala sekolah dapat memantau aktivitas seluruh guru langsung dari dashboard.
              </p>
            </MChild>
          </div>
        </div>
      </Section>

      {/* ── SECTION 3: MODULE FEATURES ── */}
      <Section className="py-24">
        <div className="container mx-auto px-4">
          <MChild variants={sectionVariants}>
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 justify-center"
            >
            <div className="flex items-center gap-3 mb-4 px-4 py-1.5 rounded-full bg-primary/10">
              <span
              className="w-2 h-2 rounded-full bg-primary"
              />
              <span className="text-primary text-xs font-semibold">
              Fitur Modul
              </span>
            </div>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-14">
              Semua yang Ada di Dalam Modul
            </h2>
          </MChild>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                emoji: "🤳",
                title: "Anti Jurnal Fiktif",
                desc: "Input jurnal wajib selfie langsung dari kamera — tidak bisa dari galeri foto. Disertai lokasi real-time.",
              },
              {
                emoji: "☁️",
                title: "Hemat Biaya Server",
                desc: "Sekolah tidak perlu memikirkan storage. Server dan penyimpanan data ditangani sepenuhnya oleh sistem.",
              },
              {
                emoji: "📸",
                title: "Double Check",
                desc: "Selain lokasi, ada bukti foto langsung dari kamera sebagai verifikasi kehadiran guru.",
              },
              {
                emoji: "🔗",
                title: "Sinkron dengan Jadwal",
                desc: "Jadwal guru yang sedang on duty terintegrasi otomatis — tidak perlu input ulang.",
              },
              {
                emoji: "👨‍🏫",
                title: "Guru Pengganti",
                desc: "Jika guru berhalangan hadir, bisa digantikan guru piket atau guru lain — tercatat di sistem.",
              },
              {
                emoji: "✅",
                title: "Approval Jurnal",
                desc: "Guru piket dapat mereject hasil jurnal yang tidak sesuai — ada lapisan verifikasi manual.",
              },
            ].map((f, i) => (
              <MChild
                key={f.title}
                variants={childFade()}
                className={`${cardHover} p-6`}>
                <span className="text-2xl mb-3 block">{f.emoji}</span>
                <h3 className="text-base font-bold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </MChild>
            ))}
          </div>
        </div>
      </Section>

      {/* ── SECTION 4: PRICING ── */}
      <Section className="py-24 bg-section-alt" id="harga">
        <div className="container mx-auto px-4">
          <MChild variants={sectionVariants}>
            <DotLabel text="Harga Modul" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12">
              Harga Transparan, Bayar Sesuai Siswa Aktif
            </h2>
          </MChild>

          <MChild variants={childFade()} className="max-w-lg mx-auto">
            <div
              ref={pricingRef}
              className={`${cardHover} p-8 md:p-10 text-center`}>
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
                  <span className="font-semibold">Rp 2.500.000 / tahun</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">1.000 siswa</span>
                  <span className="font-semibold">Rp 5.000.000 / tahun</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-4">
                Hemat 5–15% jika dikombinasikan dengan modul lain
              </p>

              <Link
                to="/pricing"
                className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
                Lihat detail harga lengkap →
              </Link>
            </div>
          </MChild>
        </div>
      </Section>

      {/* ── SECTION 5: BOTTOM CTA ── */}
      <section className="bg-hero-gradient py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
            Tertarik dengan Modul Ini?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
            Jadwalkan demo gratis dan lihat langsung cara kerja modul Absensi
            &amp; Jurnaling di sekolah Anda.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-card text-foreground hover:bg-card/90 h-14 rounded-xl text-base px-8 shadow-lg">
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

export default ModulAbsensi;
