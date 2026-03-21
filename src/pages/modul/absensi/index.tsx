import { Navbar, Footer } from "@/widgets/landing";
import {
  AbsensiHero,
  AbsensiHighlights,
  AbsensiFeatures,
  AbsensiPricing,
  AbsensiCTA,
} from "@/widgets/module/absensi";

export const ModulAbsensiPage = () => (
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
