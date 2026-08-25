import Link from "next/link";
import { formatFollowers, formatInr, formatLocation } from "@/lib/marketplace/constants";

export type CampaignCardData = {
  id: string;
  title: string;
  description?: string;
  location?: { city?: string; state?: string; locality?: string };
  categories?: string[];
  platforms?: string[];
  followerMin?: number;
  followerMax?: number;
  budget?: number;
  creatorCount?: number;
  status?: string;
  clientName?: string;
};

export function CampaignCard({ campaign }: { campaign: CampaignCardData }) {
  return (
    <Link
      href={`/marketplace/campaigns/${campaign.id}`}
      className="block rounded-3xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-sky/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-bold text-sky-dark">{campaign.title}</h3>
        <span className="rounded-full bg-sky/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-sky">
          {campaign.status || "open"}
        </span>
      </div>
      {campaign.clientName ? <p className="mt-1 text-sm text-muted">For {campaign.clientName}</p> : null}
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{campaign.description}</p>
      <p className="mt-4 text-sm text-sky-dark">{formatLocation(campaign.location)}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(campaign.categories ?? []).map((cat) => (
          <span key={cat} className="rounded-full bg-surface px-3 py-1 text-xs font-medium">
            {cat}
          </span>
        ))}
        {(campaign.platforms ?? []).map((p) => (
          <span key={p} className="rounded-full border border-line px-3 py-1 text-xs">
            {p}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-4 text-sm font-medium text-sky-dark">
        <span>{formatInr(campaign.budget ?? 0)} budget</span>
        <span>{campaign.creatorCount} creators</span>
        <span>
          {formatFollowers(campaign.followerMin ?? 0)}–{formatFollowers(campaign.followerMax ?? 0)} followers
        </span>
      </div>
    </Link>
  );
}
