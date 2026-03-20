import Navbar from "@/widgets/landing/Navbar";
import Footer from "@/widgets/landing/Footer";

import { JadwalHero } from "@/widgets/module/jadwal/JadwalHero";
import { JadwalHighlights } from "@/widgets/module/jadwal/JadwalHighlights";
import { JadwalPricing } from "@/widgets/module/jadwal/JadwalPricing";
import { JadwalCTA } from "@/widgets/module/jadwal/JadwalCTA";

const ModulJadwal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <JadwalHero />
      <JadwalHighlights />
      <JadwalPricing />
      <JadwalCTA />
      <Footer />
    </div>
  );
};

export default ModulJadwal;
