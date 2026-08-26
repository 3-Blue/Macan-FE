import { setRequestLocale } from "next-intl/server";
import { ServicesListing } from "@/components/sections/ServicesListing";
import { getServices, type Locale } from "@/lib/content";

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
