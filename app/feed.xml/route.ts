import { insights } from "@/lib/data";
import { canonicalUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function GET() {
  const items = insights
    .map((post) => {
      const url = canonicalUrl(`/insights/${post.slug}`);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.seoDescription)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} Insights</title>
    <link>${canonicalUrl("/insights")}</link>
    <atom:link href="${canonicalUrl("/feed.xml")}" rel="self" type="application/rss+xml"/>
    <description>${escapeXml("Digital marketing, SEO, and performance thinking for Indian brands.")}</description>
    <language>en-in</language>
    <lastBuildDate>${new Date(siteConfig.contentUpdated).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
