import { Hero } from "@/components/sections/Hero";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesTeaserGrid } from "@/components/home/ServicesTeaserGrid";
import FeaturedProjectsCarousel from "@/components/featured-projects-carousel";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesTeaserGrid />
      <FeaturedProjectsCarousel />
      <ContactSection />
    </>
  );
}