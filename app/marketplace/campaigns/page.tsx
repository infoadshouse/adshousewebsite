import { Breadcrumbs } from "@/components/PageHero";
import { CampaignCard } from "@/components/marketplace/CampaignCard";
import { SectionEyebrow } from "@/components/ui";
import { tryConnectDb } from "@/lib/db";
import { createMetadata } from "@/lib/seo";
import { AgencyClient } from "@/models/AgencyClient";
import { Campaign } from "@/models/Campaign";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Open influencer campaigns",
  description: "Browse open campaigns from businesses and agencies looking for local creators in Rohtak and across India.",
  path: "/marketplace/campaigns",
});

export default async function CampaignsPage() {
  const connected = await tryConnectDb();
  const campaigns = connected ? await Campaign.find({ status: "open" }).sort({ createdAt: -1 }).lean() : [];
  const clientIds = campaigns.map((c) => c.agencyClientId).filter((id): id is NonNullable<typeof id> => Boolean(id));
  const clients = connected ? await AgencyClient.find({ _id: { $in: clientIds } }).lean() : [];
  const clientMap = new Map(clients.map((c) => [String(c._id), c.name]));

  return (
    <div className="pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Marketplace", href: "/marketplace" },
          { name: "Campaigns", href: "/marketplace/campaigns" },
        ]}
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionEyebrow>Campaign marketplace</SectionEyebrow>
        <h1 className="mb-8 font-display text-4xl font-extrabold text-sky-dark">Open campaigns</h1>
        {campaigns.length === 0 ? (
          <p className="rounded-3xl border border-line bg-white p-8 text-muted">
            No open campaigns yet. Businesses and agencies can post from the dashboard.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {campaigns.map((campaign) => (
              <CampaignCard
                key={String(campaign._id)}
                campaign={{
                  id: String(campaign._id),
                  title: campaign.title,
                  description: campaign.description,
                  location: campaign.location,
                  categories: campaign.categories,
                  platforms: campaign.platforms,
                  followerMin: campaign.followerMin,
                  followerMax: campaign.followerMax,
                  budget: campaign.budget,
                  creatorCount: campaign.creatorCount,
                  status: campaign.status,
                  clientName: campaign.agencyClientId ? clientMap.get(String(campaign.agencyClientId)) : undefined,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
