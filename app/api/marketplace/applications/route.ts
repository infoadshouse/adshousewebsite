import { NextResponse } from "next/server";
import { isAuthUser, requireApiUser } from "@/lib/marketplace/api";
import { serializeApplication } from "@/lib/marketplace/serialize";
import { listOwnedCampaignIds } from "@/lib/marketplace/access";
import { Application } from "@/models/Application";
import { Campaign } from "@/models/Campaign";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;

  if (user.role === "creator") {
    const applications = await Application.find({ influencerUserId: user.id })
      .sort({ createdAt: -1 })
      .lean();
    const campaigns = await Campaign.find({ _id: { $in: applications.map((a) => a.campaignId) } }).lean();
    const map = new Map(campaigns.map((c) => [String(c._id), c]));
    return NextResponse.json({
      ok: true,
      applications: applications.map((a) => ({
        ...serializeApplication(a),
        campaign: map.get(String(a.campaignId))
          ? { id: String(a.campaignId), title: map.get(String(a.campaignId))!.title, status: map.get(String(a.campaignId))!.status }
          : null,
      })),
    });
  }

  const campaignIds = await listOwnedCampaignIds(user);
  const applications = await Application.find({ campaignId: { $in: campaignIds } })
    .populate("influencerId")
    .sort({ createdAt: -1 })
    .lean();
  const campaigns = await Campaign.find({ _id: { $in: campaignIds } }).lean();
  const map = new Map(campaigns.map((c) => [String(c._id), c]));
  return NextResponse.json({
    ok: true,
    applications: applications.map((a) => ({
      ...serializeApplication(a),
      campaign: map.get(String(a.campaignId))
        ? { id: String(a.campaignId), title: map.get(String(a.campaignId))!.title, status: map.get(String(a.campaignId))!.status }
        : null,
    })),
  });
}
