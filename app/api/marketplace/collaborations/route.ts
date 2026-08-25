import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { listOwnedCampaignIds } from "@/lib/marketplace/access";
import { isAuthUser, requireApiUser } from "@/lib/marketplace/api";
import { Campaign } from "@/models/Campaign";
import { Collaboration } from "@/models/Collaboration";
import { InfluencerProfile } from "@/models/InfluencerProfile";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;

  if (user.role === "creator") {
    const collabs = await Collaboration.find({ influencerUserId: user.id })
      .sort({ updatedAt: -1 })
      .lean();
    return NextResponse.json({ ok: true, collaborations: await hydrate(collabs) });
  }

  const campaignIds = await listOwnedCampaignIds(user);
  const collabs = await Collaboration.find({ campaignId: { $in: campaignIds } })
    .sort({ updatedAt: -1 })
    .lean();
  return NextResponse.json({ ok: true, collaborations: await hydrate(collabs) });
}

async function hydrate(collabs: Array<Record<string, unknown> & { _id: unknown; campaignId: unknown; influencerId: unknown }>) {
  const campaignIds = collabs.map((c) => c.campaignId);
  const influencerIds = collabs.map((c) => c.influencerId);
  const [campaigns, influencers] = await Promise.all([
    Campaign.find({ _id: { $in: campaignIds as mongoose.Types.ObjectId[] } }).lean(),
    InfluencerProfile.find({ _id: { $in: influencerIds as mongoose.Types.ObjectId[] } }).lean(),
  ]);
  const campaignMap = new Map(campaigns.map((c) => [String(c._id), c]));
  const influencerMap = new Map(influencers.map((c) => [String(c._id), c]));

  return collabs.map((c) => ({
    id: String(c._id),
    campaignId: String(c.campaignId),
    applicationId: String(c.applicationId),
    influencerUserId: String(c.influencerUserId),
    ownerUserId: String(c.ownerUserId),
    agreedRate: c.agreedRate ?? 0,
    status: c.status,
    createdAt: c.createdAt,
    campaign: campaignMap.get(String(c.campaignId))
      ? { id: String(c.campaignId), title: campaignMap.get(String(c.campaignId))!.title }
      : null,
    influencer: influencerMap.get(String(c.influencerId))
      ? {
          username: influencerMap.get(String(c.influencerId))!.username,
          displayName: influencerMap.get(String(c.influencerId))!.displayName,
          photo: influencerMap.get(String(c.influencerId))!.photo,
        }
      : null,
  }));
}
