import Navbar from "@/widgets/landing/Navbar";
import Footer from "@/widgets/landing/Footer";

import { PricingCalculator } from "@/widgets/pricing/PricingCalculator";
import { PricingFreeSetup } from "@/widgets/pricing/PricingFreeSetup";
import { PricingGuarantee } from "@/widgets/pricing/PricingGuarantee";
import { PricingFAQ } from "@/widgets/pricing/PricingFAQ";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PricingCalculator />
      <PricingFreeSetup />
      <PricingGuarantee />
      <PricingFAQ />
      <Footer />
    </div>
  );
};

export default Pricing;
