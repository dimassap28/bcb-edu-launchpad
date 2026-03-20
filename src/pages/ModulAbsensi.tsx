import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Navbar from "@/widgets/landing/Navbar";
import Footer from "@/widgets/landing/Footer";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { PillBadge } from "@/shared/ui/pill-badge";
import { Send, Sparkles, Layout, Wallet } from "lucide-react";

import { sectionVariants, staggerContainer, childFade, Section } from "@/widgets/module/ui/Section";
import { FloatingIcons } from "@/widgets/module/ui/FloatingIcons";
import { cardHover, absensiFeatures } from "@/entities/module/data/module.data";
import { useCountUp } from "@/shared/hooks/use-count-up";

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
                <motion.div variants={childFade()}>
                  <Badge
                    variant="secondary"
                    className="mb-4 text-xs font-semibold">
                    Modul · Absensi &amp; Jurnaling
                  </Badge>
                </motion.div>

                <motion.div variants={childFade()}>
                  <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.12] mb-5">
                    Absensi Digital yang Simpel —{" "}
                    <span className="text-gradient">Langsung dari HP Guru</span>
                  </h1>
                </motion.div>

                <motion.div variants={childFade()}>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                    Tidak perlu lagi kertas, tanda tangan, atau rekap manual.
                    Catat kehadiran dan aktivitas kelas dalam hitungan detik —
                    di mana saja, kapan saja.
                  </p>
                </motion.div>

                <motion.div variants={childFade()}>
                  <Button
                    size="lg"
                    asChild
                    className="bg-hero-gradient hover:opacity-90 transition-opacity text-lg px-8 h-14 rounded-xl">
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
                      Rp 5.000
                    </span>{" "}
                    / siswa / tahun
                  </p>
                </motion.div>
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
          <motion.div variants={sectionVariants} className="flex flex-col items-center">
            <PillBadge icon={<Sparkles className="w-3 h-3" />}>Keunggulan Modul</PillBadge>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-14">
              Kenapa Memilih Modul Ini?
            </h2>
          </motion.div>

          {/* bento grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* large card */}
            <motion.div variants={childFade()} className={`${cardHover} p-8 md:col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col`}>
              <span className="text-3xl mb-4">📍</span>
              <h3 className="text-xl font-bold mb-2">Live Location</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Periksa lokasi guru secara real-time saat membuat jurnal — tidak bisa dimanipulasi.
              </p>
              <div className="flex-1 min-h-[200px] relative">
                <FloatingIcons />
              </div>
            </motion.div>

            {/* card 2 */}
            <motion.div variants={childFade()} className={`${cardHover} p-6 lg:row-start-2`}>
              <span className="text-3xl mb-3 block">🔔</span>
              <h3 className="text-lg font-bold mb-1">Reminder Otomatis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Guru piket dan kepala sekolah dapat memantau aktivitas seluruh guru langsung dari dashboard.
              </p>
            </motion.div>

            {/* card 3 */}
            <motion.div variants={childFade()} className={`${cardHover} p-6 lg:row-start-2`}>
              <span className="text-3xl mb-3 block">🤖</span>
              <h3 className="text-lg font-bold mb-1">Rekap KPI Guru Otomatis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sistem otomatis menghitung jumlah jam mengajar dan performa guru — tanpa input manual.
              </p>
            </motion.div>

            {/* card 4 */}
            <motion.div variants={childFade()} className={`${cardHover} p-6 md:col-span-2 lg:col-span-2 lg:row-start-1 `}>
              <span className="text-3xl mb-3 block">📊</span>
              <h3 className="text-lg font-bold mb-1">Monitoring Kehadiran Guru Real-Time</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Guru piket dan kepala sekolah dapat memantau aktivitas seluruh guru langsung dari dashboard.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── SECTION 3: MODULE FEATURES ── */}
      <Section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div variants={sectionVariants} className="flex flex-col items-center">
            <PillBadge icon={<Layout className="w-3 h-3" />}>Fitur Modul</PillBadge>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-14">
              Semua yang Ada di Dalam Modul
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {absensiFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                variants={childFade()}
                className={`${cardHover} p-6`}>
                <span className="text-2xl mb-3 block">{f.emoji}</span>
                <h3 className="text-base font-bold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── SECTION 4: PRICING ── */}
      <Section className="py-24 bg-section-alt" id="harga">
        <div className="container mx-auto px-4">
          <motion.div variants={sectionVariants} className="flex flex-col items-center">
            <PillBadge icon={<Wallet className="w-3 h-3" />}>Harga Modul</PillBadge>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12">
              Harga Transparan, Bayar Sesuai Siswa Aktif
            </h2>
          </motion.div>

          <motion.div variants={childFade()} className="max-w-lg mx-auto">
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
