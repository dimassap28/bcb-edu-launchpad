import {
  Navbar,
  HeroSection,
  ProblemSection,
  SolutionPersonaSection,
  HowItWorksSection,
  ModulesSection,
  PricingSection,
  SocialProofSection,
  CTASection,
  Footer,
} from "@/widgets/landing";

export const HomePage = () => (
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
