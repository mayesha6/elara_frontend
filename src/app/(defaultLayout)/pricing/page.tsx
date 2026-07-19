import HeroRecognition from "@/components/home/HeroRecognition";
import FaqSection from "@/components/pages/pricing/FaqSection";
import FeatureComparisonSection from "@/components/pages/pricing/FeatureComparisonSection";
import PricingHero from "@/components/pages/pricing/PricingHero";
import PricingPlanSection from "@/components/pages/pricing/PricingPlanSection";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen">
      <PricingHero />
      <PricingPlanSection />
      <FeatureComparisonSection />
      <HeroRecognition />
      <FaqSection />
    </div>
  );
};

export default page;
