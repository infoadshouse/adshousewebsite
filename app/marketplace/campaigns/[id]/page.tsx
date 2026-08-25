import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/PageHero";
import { ApplyForm } from "@/components/marketplace/ApplyForm";
import { SectionEyebrow } from "@/components/ui";
import { tryConnectDb } from "@/lib/db";
import { formatFollowers, formatInr, formatLocation } from "@/lib/marketplace/constants";
import { createMetadata } from "@/lib/seo";
import { AgencyClient } from "@/models/AgencyClient";
import { Campaign } from "@/models/Campaign";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const connected = await tryConnectDb();
  if (!connected) return createMetadata({ title: "Campaign not found", description: "This campaign is unavailable.", path: `/marketplace/campaigns/${id}`, noIndex: true });
  const campaign = await Campaign.findById(id).lean();
  if (!campaign) return createMetadata({ title: "Campaign not found", description: "This campaign is unavailable.", path: `/marketplace/campaigns/${id}`, noIndex: true });
  return createMetadata({
    title: campaign.title,
    description: campaign.description?.slice(0, 160) || campaign.title,
    path: `/marketplace/campaigns/${id}`,
  });
}

export default async function CampaignDetailPage({ params }: Props) {
  const { id } = await params;
  const connected = await tryConnectDb();
  if (!connected) notFound();
  const campaign = await Campaign.findById(id).lean();
  if (!campaign) notFound();
  const client = campaign.agencyClientId ? await AgencyClient.findById(campaign.agencyClientId).lean() : null;

  return (
    <div className="pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Marketplace", href: "/marketplace" },
          { name: "Campaigns", href: "/marketplace/campaigns" },
          { name: campaign.title, href: `/marketplace/campaigns/${id}` },
        ]}
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1.2fr_0.8fr] md:px-8">
        <div>
          <SectionEyebrow>{campaign.status}</SectionEyebrow>
          <h1 className="font-display text-4xl font-extrabold text-sky-dark">{campaign.title}</h1>
          {client ? <p className="mt-2 text-muted">Client: {client.name}</p> : null}
          <p className="mt-4 text-lg leading-relaxed text-muted">{campaign.description}</p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <Stat label="Location" value={formatLocation(campaign.location) || "India"} />
            <Stat label="Budget" value={formatInr(campaign.budget)} />
            <Stat label="Creators needed" value={String(campaign.creatorCount)} />
            <Stat
              label="Followers"
              value={`${formatFollowers(campaign.followerMin)} – ${formatFollowers(campaign.followerMax)}`}
            />
            <Stat label="Duration" value={`${campaign.durationDays} days`} />
            <Stat label="Platforms" value={(campaign.platforms ?? []).join(", ") || "Any"} />
          </dl>
          <div className="mt-6 flex flex-wrap gap-2">
            {(campaign.categories ?? []).map((cat) => (
              <span key={cat} className="rounded-full bg-surface px-3 py-1 text-sm">
                {cat}
              </span>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-3xl border border-line bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-bold text-sky-dark">Apply now</h2>
          <p className="mt-2 text-sm text-muted">Creators can send a pitch and proposed rate. Businesses and Ads House shortlist from the dashboard.</p>
          <ApplyForm campaignId={String(campaign._id)} open={campaign.status === "open"} />
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface p-4">
      <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-1 font-semibold text-sky-dark">{value}</dd>
    </div>
  );
}
