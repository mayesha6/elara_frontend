import HeroRecognition from "@/components/home/HeroRecognition";
import MarqueeSection from "@/components/home/MarqueeSection";
import FaqSection from "@/components/pages/pricing/FaqSection";
import TestimonialsBanner from "@/components/pages/testimonials/TestimonialsBanner";
import TestimonialsGridSection from "@/components/home/TestimonialsSection";
import CustomerStories from "@/components/pages/testimonials/CustomerStories";

const page = () => {
  return (
    <div className="min-h-screen">
      <TestimonialsBanner />
      <MarqueeSection />
      <TestimonialsGridSection />
      <CustomerStories />
      <HeroRecognition />
      <FaqSection />
    </div>
  );
};

export default page;
