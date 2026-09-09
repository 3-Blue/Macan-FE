import { NextResponse } from "next/server";
import { getPosts } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

const FEED_LOCALE = "en";
const EXCERPT_LENGTH = 200;

function excerpt(body: string, maxLength = EXCERPT_LENGTH): string {
  if (body.length <= maxLength) return body;
  return body.slice(0, maxLength).trimEnd() + "...";
}

// Minimal XML escaping for text nodes interpolated into the feed.
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getPosts(FEED_LOCALE);

  // Newest first.
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const items = sorted
    .map((post) => {
      const url = `${siteUrl}/${FEED_LOCALE}/news/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(excerpt(post.body))}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(post.author)}</author>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>MACAN News</title>
    <link>${siteUrl}/${FEED_LOCALE}/news</link>
    <description>Latest news and updates from MACAN.</description>
    <language>${FEED_LOCALE}</language>${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}