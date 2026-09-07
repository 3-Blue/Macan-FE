import { setRequestLocale } from "next-intl/server";
import { NewsListing } from "@/components/news/NewsListing";
import { getPosts, type Locale } from "@/lib/content";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await getPosts(locale as Locale);

  return <NewsListing posts={posts} />;
}
