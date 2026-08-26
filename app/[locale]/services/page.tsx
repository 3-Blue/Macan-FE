import { setRequestLocale } from "next-intl/server";
import { ServicesListing } from "@/components/sections/ServicesListing";
import { getServices, type Locale } from "@/lib/content";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Enable static rendering (required for `output: export`).
  setRequestLocale(locale);

  const services = await getServices(locale as Locale);

  return <ServicesListing services={services} />;
}
