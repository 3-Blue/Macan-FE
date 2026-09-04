import { setRequestLocale } from "next-intl/server";
import { ServicesListing } from "@/components/sections/ServicesListing";
import { getServices, type Locale } from "@/lib/content";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

const SERVICES_META = {
  en: {
    title: "Services",
    description:
      "Explore MACAN's engineering, construction, supply, and project management services.",
  },
  fa: {
    title: "خدمات",
    description:
      "خدمات مهندسی، ساخت، تأمین و مدیریت پروژه ماکان را مشاهده کنید.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = locale === "fa" ? SERVICES_META.fa : SERVICES_META.en;
  return buildMetadata({
    locale: locale as "en" | "fa" | "az" | "tr",
    path: "/services",
    title: copy.title,
    description: copy.description,
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Opt this route into static rendering (SSG) for the given locale.
  setRequestLocale(locale);

  const services = await getServices(locale as Locale);

  return <ServicesListing services={services} />;
}
