import HeroRecognition from "@/components/home/HeroRecognition";
import FaqSection from "@/components/pages/pricing/FaqSection";
import RewardsMarketplace from "@/components/pages/redeem/RewardsMarketplace";
import FeaturedArticles from "@/components/pages/resources/FeaturedArticles";
import ResourceCategories from "@/components/pages/resources/ResourceCategories";
import ResourcesBanner from "@/components/pages/resources/ResourcesBanner";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen">
      <ResourcesBanner />
      <FeaturedArticles />
      <RewardsMarketplace />
      <ResourceCategories />
      <HeroRecognition />
      <FaqSection />
    </div>
  );
};

export default page;
