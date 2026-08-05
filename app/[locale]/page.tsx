import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesTeaserGrid } from "@/components/home/ServicesTeaserGrid";
import FeaturedProjectsCarousel from "@/components/featured-projects-carousel";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Enable static rendering (required for `output: export`).
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesTeaserGrid />
      <FeaturedProjectsCarousel />
    </>
  );
}
