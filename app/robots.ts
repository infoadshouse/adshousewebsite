import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Indexing is operational, not a crawl hack.
// 1. Homepage canonical + sitemap loc are https://www.adshouse.in/ (trailing slash)
//    so they match the GSC URL-prefix property and URL Inspection.
// 2. Apex adshouse.in 308s to www.
// 3. Google Search Console: Sitemaps → submit https://www.adshouse.in/sitemap.xml
//    then URL Inspection on https://www.adshouse.in/. Recrawl is days to weeks.
// 4. Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in production so the meta token appears.
// 5. No IndexNow / spam pings. Backlinks and Google Business Profile are off-site.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/marketplace/login", "/marketplace/register"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
