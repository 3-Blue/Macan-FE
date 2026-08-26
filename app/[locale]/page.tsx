import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesTeaserGrid } from "@/components/home/ServicesTeaserGrid";
import FeaturedProjectsCarousel from "@/components/featured-projects-carousel";
import { TestimonialsGrid } from "@/components/home/TestimonialsGrid";
import { ContactSection } from "@/components/sections/ContactSection";
import {
  getServices,
  getTestimonials,
  getFeaturedProjects,
  type Locale,
} from "@/lib/content";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Opt this route into static rendering (SSG) for the given locale.
  setRequestLocale(locale);

  const [services, projects, testimonials] = await Promise.all([
    getServices(locale as Locale),
    getFeaturedProjects(locale as Locale),
    getTestimonials(locale as Locale),
  ]);

  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesTeaserGrid services={services} />
      <FeaturedProjectsCarousel projects={projects} />
      <TestimonialsGrid testimonials={testimonials} />
      <ContactSection />
    </>
  );
}
