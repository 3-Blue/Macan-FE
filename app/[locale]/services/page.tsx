import { setRequestLocale } from "next-intl/server";
import { ServicesListing } from "@/components/sections/ServicesListing";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Enable static rendering (required for `output: export`).
  setRequestLocale(locale);

  return <ServicesListing />;
}
