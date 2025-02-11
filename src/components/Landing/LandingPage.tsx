import FeaturesSection from "@/components/Landing/FeaturesSection";
import HeroSection from "@/components/Landing/HeroSection";
import IntersectionBar from "@/components/Landing/IntersectionBar";

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
