import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Indexing is operational, not a crawl hack.
// 1. Homepage canonical is https://www.adshouse.in (no trailing slash); sitemap must match.
// 2. Apex adshouse.in 308s to www.
// 3. Google Search Console: add https://www.adshouse.in/ → submit sitemap.xml →
//    URL Inspection on the homepage. Recrawl is days to weeks; site: cannot be forced.
// 4. Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in production so the meta token appears.
// 5. No IndexNow / spam pings. Backlinks and Google Business Profile are off-site.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/uploads/", "/marketplace/login", "/marketplace/register"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
