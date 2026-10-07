import { useScrollTop } from "@/hooks/useScrollTop";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import AboutPreview from "@/components/home/AboutPreview";
import StepsSection from "@/components/home/StepsSection";
import DoctorsSection from "@/components/home/DoctorsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogSection from "@/components/home/BlogSection";
import CtaSection from "@/components/home/CtaSection";
import PartnersSection from "@/components/home/PartnersSection";

const Home = () => {
  useScrollTop();
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <AboutPreview />
      <StepsSection />
      <DoctorsSection />
      <TestimonialsSection />
      <BlogSection />
      <CtaSection />
      <PartnersSection />
    </div>
  );
};

export default Home;
