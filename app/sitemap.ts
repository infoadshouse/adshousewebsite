import type { MetadataRoute } from "next";
import { services } from "@/lib/data";
import { locations } from "@/lib/locations";
import { tryConnectDb } from "@/lib/db";
import { listCaseStudies, listInsights } from "@/lib/content";
import { canonicalUrl, siteConfig } from "@/lib/site";
import { Campaign } from "@/models/Campaign";
import { InfluencerProfile } from "@/models/InfluencerProfile";

/** Cached for Googlebot. A force-dynamic sitemap that waits on Mongo can 500 and GSC then shows no referring sitemap. */
export const revalidate = 3600;

function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(fallback), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      () => {
        clearTimeout(timer);
        resolve(fallback);
      },
    );
  });
}

function coreRoutes(updated: Date): MetadataRoute.Sitemap {
  return [
    { url: canonicalUrl("/"), lastModified: updated, changeFrequency: "weekly", priority: 1 },
    { url: canonicalUrl("/services"), lastModified: updated, changeFrequency: "weekly", priority: 0.9 },
    { url: canonicalUrl("/work"), lastModified: updated, changeFrequency: "weekly", priority: 0.9 },
    { url: canonicalUrl("/locations"), lastModified: updated, changeFrequency: "weekly", priority: 0.9 },
    { url: canonicalUrl("/about"), lastModified: updated, changeFrequency: "monthly", priority: 0.7 },
    { url: canonicalUrl("/insights"), lastModified: updated, changeFrequency: "weekly", priority: 0.8 },
    { url: canonicalUrl("/testimonials"), lastModified: updated, changeFrequency: "monthly", priority: 0.7 },
    { url: canonicalUrl("/contact"), lastModified: updated, changeFrequency: "monthly", priority: 0.8 },
    { url: canonicalUrl("/marketplace"), lastModified: updated, changeFrequency: "weekly", priority: 0.85 },
    { url: canonicalUrl("/marketplace/creators"), lastModified: updated, changeFrequency: "daily", priority: 0.8 },
    { url: canonicalUrl("/marketplace/campaigns"), lastModified: updated, changeFrequency: "daily", priority: 0.8 },
    { url: canonicalUrl("/marketplace/agencies/ads-house"), lastModified: updated, changeFrequency: "monthly", priority: 0.7 },
    { url: canonicalUrl("/privacy"), lastModified: updated, changeFrequency: "yearly", priority: 0.3 },
    { url: canonicalUrl("/terms"), lastModified: updated, changeFrequency: "yearly", priority: 0.3 },
    ...services.map((item) => ({
      url: canonicalUrl(`/services/${item.slug}`),
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...locations.map((item) => ({
      url: canonicalUrl(`/locations/${item.slug}`),
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: item.isHq ? 0.9 : 0.8,
    })),
  ];
}

async function indexedContent(updated: Date): Promise<MetadataRoute.Sitemap> {
  const [publishedWork, publishedInsights] = await Promise.all([listCaseStudies(), listInsights()]);

  const workRoutes = publishedWork.map((item) => ({
    url: canonicalUrl(`/work/${item.slug}`),
    lastModified: updated,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const insightRoutes = publishedInsights.map((item) => ({
    url: canonicalUrl(`/insights/${item.slug}`),
    lastModified: item.date ? new Date(item.date) : updated,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const ugcRoutes: MetadataRoute.Sitemap = [];
  if (await tryConnectDb()) {
    const [creators, campaigns] = await Promise.all([
      InfluencerProfile.find({}, "username updatedAt").lean(),
      Campaign.find({ status: "open" }, "_id updatedAt").lean(),
    ]);
    for (const creator of creators as Array<{ username?: string; updatedAt?: Date }>) {
      if (!creator.username) continue;
      ugcRoutes.push({
        url: canonicalUrl(`/marketplace/creators/${encodeURIComponent(creator.username)}`),
        lastModified: creator.updatedAt ? new Date(creator.updatedAt) : updated,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
    for (const campaign of campaigns as Array<{ _id: unknown; updatedAt?: Date }>) {
      ugcRoutes.push({
        url: canonicalUrl(`/marketplace/campaigns/${encodeURIComponent(String(campaign._id))}`),
        lastModified: campaign.updatedAt ? new Date(campaign.updatedAt) : updated,
        changeFrequency: "daily",
        priority: 0.65,
      });
    }
  }

  return [...workRoutes, ...insightRoutes, ...ugcRoutes];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const updated = new Date(siteConfig.contentUpdated);
  const core = coreRoutes(updated);
  const extra = await withTimeout(indexedContent(updated), 4000, []);
  return [...core, ...extra];
}
