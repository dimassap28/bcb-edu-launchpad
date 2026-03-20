import Navbar from "@/widgets/landing/Navbar";
import HeroSection from "@/widgets/landing/HeroSection";
import ProblemSection from "@/widgets/landing/ProblemSection";
import HowItWorksSection from "@/widgets/landing/HowItWorksSection";
import ModulesSection from "@/widgets/landing/ModulesSection";
import PricingSection from "@/widgets/landing/PricingSection";
import SolutionPersonaSection from "@/widgets/landing/SolutionPersonaSection";
import SocialProofSection from "@/widgets/landing/SocialProofSection";
import CTASection from "@/widgets/landing/CTASection";
import Footer from "@/widgets/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionPersonaSection />
      <HowItWorksSection />
      <ModulesSection />
      <PricingSection />
      <SocialProofSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
