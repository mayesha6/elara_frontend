import AdminControlsSection from "@/components/home/AdminControlsSection";
import ComparisonTableSection from "@/components/home/ComparisonTableSection";
import ElaraChatSection from "@/components/home/ElaraChatSection";
import HeroRecognition from "@/components/home/HeroRecognition";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import MarqueeSection from "@/components/home/MarqueeSection";
import ModernWorkSection from "@/components/home/ModernWorkSection";
import RecognitionBrandingSection from "@/components/home/RecognitionBrandingSection";
import RecognitionHeroSection from "@/components/home/RecognitionHeroSection";
import RecognitionImpactSection from "@/components/home/RecognitionImpactSection";
import RewardsSection from "@/components/home/RewardsSection";
import TestimonialsGridSection from "@/components/home/TestimonialsSection";
import WhyChooseElara from "@/components/home/WhyChooseElara";
import WorkplaceRecognition from "@/components/home/WorkplaceRecognition";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <MarqueeSection />
      <WorkplaceRecognition />
      <WhyChooseElara />
      <RewardsSection />
      <HowItWorks />
      <ElaraChatSection />
      <RecognitionImpactSection />
      <AdminControlsSection />
      <RecognitionBrandingSection />
      <ModernWorkSection />
      <RecognitionHeroSection />
      <ComparisonTableSection />
      <HeroRecognition />
      <TestimonialsGridSection />
    </div>
  );
};

export default HomePage;
