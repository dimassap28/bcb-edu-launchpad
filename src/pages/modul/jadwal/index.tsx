import { Navbar, Footer } from "@/widgets/landing";
import {
  JadwalHero,
  JadwalHighlights,
  JadwalPricing,
  JadwalCTA,
} from "@/widgets/module/jadwal";

export const ModulJadwalPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <JadwalHero />
    <JadwalHighlights />
    <JadwalPricing />
    <JadwalCTA />
    <Footer />
  </div>
);
