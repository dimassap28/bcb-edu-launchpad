import Navbar from "@/widgets/landing/Navbar";
import Footer from "@/widgets/landing/Footer";

import { AbsensiHero } from "@/widgets/module/absensi/AbsensiHero";
import { AbsensiHighlights } from "@/widgets/module/absensi/AbsensiHighlights";
import { AbsensiFeatures } from "@/widgets/module/absensi/AbsensiFeatures";
import { AbsensiPricing } from "@/widgets/module/absensi/AbsensiPricing";
import { AbsensiCTA } from "@/widgets/module/absensi/AbsensiCTA";

/* ═══════════════════════════════════════════════ */
/* PAGE                                            */
/* ═══════════════════════════════════════════════ */
const ModulAbsensi = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AbsensiHero />
      <AbsensiHighlights />
      <AbsensiFeatures />
      <AbsensiPricing />
      <AbsensiCTA />
      <Footer />
    </div>
  );
};

export default ModulAbsensi;
