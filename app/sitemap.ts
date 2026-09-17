import type { MetadataRoute } from "next";
import { caseStudies, insights, services } from "@/lib/data";
import { locations } from "@/lib/locations";
import { tryConnectDb } from "@/lib/db";
import { siteConfig } from "@/lib/site";
import { Campaign } from "@/models/Campaign";
import { InfluencerProfile } from "@/models/InfluencerProfile";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const updated = new Date(siteConfig.contentUpdated);
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, lastModified: updated, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/services`, lastModified: updated, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/work`, lastModified: updated, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/locations`, lastModified: updated, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/about`, lastModified: updated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/insights`, lastModified: updated, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/contact`, lastModified: updated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/marketplace`, lastModified: updated, changeFrequency: "weekly", priority: 0.85 },
    { url: `${siteConfig.url}/marketplace/creators`, lastModified: updated, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteConfig.url}/marketplace/campaigns`, lastModified: updated, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteConfig.url}/marketplace/agencies/ads-house`, lastModified: updated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/privacy`, lastModified: updated, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/terms`, lastModified: updated, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes = services.map((item) => ({
    url: `${siteConfig.url}/services/${item.slug}`,
    lastModified: updated,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const locationRoutes = locations.map((item) => ({
    url: `${siteConfig.url}/locations/${item.slug}`,
    lastModified: updated,
    changeFrequency: "monthly" as const,
    priority: item.isHq ? 0.9 : 0.8,
  }));

  const workRoutes = caseStudies.map((item) => ({
    url: `${siteConfig.url}/work/${item.slug}`,
    lastModified: updated,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const insightRoutes = insights.map((item) => ({
    url: `${siteConfig.url}/insights/${item.slug}`,
    lastModified: new Date(item.date),
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
        url: `${siteConfig.url}/marketplace/creators/${creator.username}`,
        lastModified: creator.updatedAt ? new Date(creator.updatedAt) : updated,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
    for (const campaign of campaigns as Array<{ _id: unknown; updatedAt?: Date }>) {
      ugcRoutes.push({
        url: `${siteConfig.url}/marketplace/campaigns/${String(campaign._id)}`,
        lastModified: campaign.updatedAt ? new Date(campaign.updatedAt) : updated,
        changeFrequency: "daily",
        priority: 0.65,
      });
    }
  }

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes, ...workRoutes, ...insightRoutes, ...ugcRoutes];
}
