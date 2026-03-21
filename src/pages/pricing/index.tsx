import { Navbar, Footer } from "@/widgets/landing";
import {
  PricingCalculator,
  PricingFreeSetup,
  PricingGuarantee,
  PricingFAQ,
} from "@/widgets/pricing";

export const PricingPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PricingCalculator />
    <PricingFreeSetup />
    <PricingGuarantee />
    <PricingFAQ />
    <Footer />
  </div>
);
