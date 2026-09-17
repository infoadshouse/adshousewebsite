import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Public site is indexable. After deploy: Google Search Console → add
// https://www.adshouse.in/ → submit https://www.adshouse.in/sitemap.xml →
// URL Inspection on /. Recrawl is days to weeks. This file cannot force
// site:adshouse.in. Do not add IndexNow or other spam pings.
// Production also needs NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in env.

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
