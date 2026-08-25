export function serializeCampaign(campaign: {
  _id: unknown;
  createdByUserId: unknown;
  businessId?: unknown;
  agencyId?: unknown;
  agencyClientId?: unknown;
  title: string;
  description?: string;
  location?: unknown;
  categories?: string[];
  platforms?: string[];
  followerMin?: number;
  followerMax?: number;
  budget?: number;
  currency?: string;
  creatorCount?: number;
  durationDays?: number;
  status: string;
  createdAt?: Date;
}) {
  return {
    id: String(campaign._id),
    createdByUserId: String(campaign.createdByUserId),
    businessId: campaign.businessId ? String(campaign.businessId) : null,
    agencyId: campaign.agencyId ? String(campaign.agencyId) : null,
    agencyClientId: campaign.agencyClientId ? String(campaign.agencyClientId) : null,
    title: campaign.title,
    description: campaign.description ?? "",
    location: campaign.location,
    categories: campaign.categories ?? [],
    platforms: campaign.platforms ?? [],
    followerMin: campaign.followerMin ?? 0,
    followerMax: campaign.followerMax ?? 0,
    budget: campaign.budget ?? 0,
    currency: campaign.currency ?? "INR",
    creatorCount: campaign.creatorCount ?? 1,
    durationDays: campaign.durationDays ?? 15,
    status: campaign.status,
    createdAt: campaign.createdAt,
  };
}

export function serializeApplication(doc: Record<string, unknown> & { _id: unknown }) {
  const influencer =
    doc.influencerId && typeof doc.influencerId === "object" ? (doc.influencerId as Record<string, unknown>) : null;
  return {
    id: String(doc._id),
    campaignId: String(doc.campaignId),
    influencerId: influencer ? String(influencer._id) : String(doc.influencerId),
    influencerUserId: String(doc.influencerUserId),
    pitch: doc.pitch ?? "",
    proposedRate: doc.proposedRate ?? 0,
    status: doc.status,
    createdAt: doc.createdAt,
    influencer: influencer
      ? {
          username: influencer.username,
          displayName: influencer.displayName,
          photo: influencer.photo,
          categories: influencer.categories,
          socialAccounts: influencer.socialAccounts,
          pricing: influencer.pricing,
        }
      : null,
  };
}
