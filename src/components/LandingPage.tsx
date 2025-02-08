import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";
import IntersectionBar from "@/components/IntersectionBar";

export default function LandingPage() {
  return (
    <div className="flex flex-col ">
      <HeroSection />
      <IntersectionBar
        title="Trusted By 200+ Users"
        buttonWord="Testimonials"
      />
      <FeaturesSection />
    </div>
  );
}
