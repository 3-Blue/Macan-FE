import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesTeaserGrid } from "@/components/home/ServicesTeaserGrid";
import FeaturedProjectsCarousel from "@/components/featured-projects-carousel";
import { TestimonialsGrid } from "@/components/home/TestimonialsGrid";
import { ContactSection } from "@/components/sections/ContactSection";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import {
  getServices,
  getTestimonials,
  getFeaturedProjects,
  type Locale,
} from "@/lib/content";

const HOME_META = {
  en: {
    title: "MACAN | Engineering, Construction, Supply & PM Solutions",
    description:
      "MACAN delivers engineering, construction, supply, and project management solutions across oil & gas, power, and infrastructure sectors.",
  },
  fa: {
    // Best-effort draft — flag for native-speaker review.
    title: "ماکان | راهکارهای مهندسی، ساخت، تأمین و مدیریت پروژه",
    description:
      "ماکان راهکارهای مهندسی، ساخت، تأمین و مدیریت پروژه را در بخش‌های نفت و گاز، برق و زیرساخت ارائه می‌دهد.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = locale === "fa" ? HOME_META.fa : HOME_META.en;
  return buildMetadata({
    locale: locale as "en" | "fa" | "az" | "tr",
    path: "",
    title: copy.title,
    description: copy.description,
  });
}

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
