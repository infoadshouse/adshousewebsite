import { NextResponse } from "next/server";
import { canManageCampaign, getInfluencerByUser } from "@/lib/marketplace/access";
import { asNumber, asString, isAuthUser, jsonError, requireApiUser } from "@/lib/marketplace/api";
import { findOrCreateConversation } from "@/lib/marketplace/chat";
import { serializeApplication } from "@/lib/marketplace/serialize";
import { Application } from "@/models/Application";
import { Campaign } from "@/models/Campaign";

export const runtime = "nodejs";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  const { id } = await context.params;
  const campaign = await Campaign.findById(id);
  if (!campaign) return jsonError("Campaign not found", 404);

  if (user.role === "creator") {
    const mine = await Application.find({ campaignId: campaign._id, influencerUserId: user.id })
      .populate("influencerId")
      .lean();
    return NextResponse.json({ ok: true, applications: mine.map(serializeApplication) });
  }

  if (!(await canManageCampaign(user, campaign))) return jsonError("Not allowed", 403);

  const applications = await Application.find({ campaignId: campaign._id })
    .populate("influencerId")
    .sort({ createdAt: -1 })
    .lean();
  return NextResponse.json({ ok: true, applications: applications.map(serializeApplication) });
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  if (user.role !== "creator") return jsonError("Only creators can apply", 403);

  const { id } = await context.params;
  const campaign = await Campaign.findById(id);
  if (!campaign || campaign.status !== "open") return jsonError("This campaign is not open for applications", 400);

  const influencer = await getInfluencerByUser(user.id);
  if (!influencer) return jsonError("Complete your creator profile first", 400);

  const existing = await Application.findOne({ campaignId: campaign._id, influencerId: influencer._id });
  if (existing) return jsonError("You already applied to this campaign", 409);

  const body = await request.json().catch(() => ({}));
  const data = (body ?? {}) as Record<string, unknown>;
  const pitch = asString(data.pitch, 2000);
  const proposedRate = asNumber(data.proposedRate);

  const application = await Application.create({
    campaignId: campaign._id,
    influencerId: influencer._id,
    influencerUserId: user.id,
    pitch,
    proposedRate,
  });

  await findOrCreateConversation({
    participantIds: [user.id, String(campaign.createdByUserId)],
    campaignId: String(campaign._id),
    firstMessage: pitch
      ? { senderId: user.id, body: `Application: ${pitch}` }
      : { senderId: user.id, body: `${influencer.displayName} applied to ${campaign.title}.` },
  });

  return NextResponse.json({ ok: true, application: serializeApplication(application.toObject()) }, { status: 201 });
}
