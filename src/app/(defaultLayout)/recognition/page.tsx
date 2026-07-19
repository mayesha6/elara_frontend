import HeroRecognition from "@/components/home/HeroRecognition";
import HowRecognitionWorks from "@/components/pages/recognitionReward/HowRecognitionWorks";
import RecognitionBanner from "@/components/pages/recognitionReward/RecognitionBanner";
import RecognitionBranding from "@/components/pages/recognitionReward/RecognitionBranding";
import RecognitionSpeedSection from "@/components/pages/recognitionReward/RecognitionSpeedSection";
import StructuredRewards from "@/components/pages/recognitionReward/StructuredRewards";
import SuccessStories from "@/components/pages/recognitionReward/SuccessStories";
import WaysToRecognizeSection from "@/components/pages/recognitionReward/WaysToRecognizeSection";
import WorkplaceRecognitionSection from "@/components/pages/recognitionReward/WorkplaceRecognitionSection";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen">
      <RecognitionBanner />
      <RecognitionSpeedSection />
      <WaysToRecognizeSection />
      <HowRecognitionWorks />
      <StructuredRewards />
      <WorkplaceRecognitionSection />
      <RecognitionBranding />
      <HeroRecognition />
      <SuccessStories />
    </div>
  );
};

export default page;
