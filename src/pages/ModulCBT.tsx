import Navbar from "@/widgets/landing/Navbar";
import Footer from "@/widgets/landing/Footer";

import { CBTHero } from "@/widgets/module/cbt/CBTHero";
import { CBTHighlights } from "@/widgets/module/cbt/CBTHighlights";
import { CBTFeatures } from "@/widgets/module/cbt/CBTFeatures";
import { CBTPricing } from "@/widgets/module/cbt/CBTPricing";
import { CBTCTA } from "@/widgets/module/cbt/CBTCTA";

const ModulCBT = () => {
  return (
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
};

export default ModulCBT;
