import HeroRecognition from "@/components/home/HeroRecognition";
import FaqSection from "@/components/pages/pricing/FaqSection";
import HowRedemptionWorks from "@/components/pages/redeem/HowRedemptionWorks";
import RedeemRewards from "@/components/pages/redeem/RedeemRewards";
import RedemptionBanner from "@/components/pages/redeem/RedemptionBanner";
import RewardsMarketplace from "@/components/pages/redeem/RewardsMarketplace";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen">
      <RedemptionBanner />
      <HowRedemptionWorks />
      <RewardsMarketplace />
      <RedeemRewards />
      <HeroRecognition />
      <FaqSection />
    </div>
  );
};

export default page;
