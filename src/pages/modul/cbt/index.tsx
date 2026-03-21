import { Navbar, Footer } from "@/widgets/landing";
import {
  CBTHero,
  CBTHighlights,
  CBTFeatures,
  CBTPricing,
  CBTCTA,
} from "@/widgets/module/cbt";

export const ModulCBTPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <CBTHero />
    <CBTHighlights />
    <CBTFeatures />
    <CBTPricing />
    <CBTCTA />
    <Footer />
  </div>
);
