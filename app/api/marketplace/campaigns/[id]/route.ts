import { NextResponse } from "next/server";
import { canManageCampaign } from "@/lib/marketplace/access";
import { asNumber, asString, asStringArray, isAuthUser, jsonError, parseLocation, requireApiUser } from "@/lib/marketplace/api";
import { connectDb } from "@/lib/db";
import { serializeCampaign } from "@/lib/marketplace/serialize";
import { AgencyClient } from "@/models/AgencyClient";
import { Application } from "@/models/Application";
import { Campaign } from "@/models/Campaign";
import { Collaboration } from "@/models/Collaboration";

export const runtime = "nodejs";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await connectDb();
  const campaign = await Campaign.findById(id).lean();
  if (!campaign) return jsonError("Campaign not found", 404);
  const client = campaign.agencyClientId
    ? await AgencyClient.findById(campaign.agencyClientId).lean()
    : null;
  return NextResponse.json({
    ok: true,
    campaign: {
      ...serializeCampaign(campaign),
      clientName: client?.name ?? null,
    },
  });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  const { id } = await context.params;
  const campaign = await Campaign.findById(id);
  if (!campaign) return jsonError("Campaign not found", 404);
  if (!(await canManageCampaign(user, campaign))) return jsonError("Not allowed", 403);

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return jsonError("Invalid body");
  const data = body as Record<string, unknown>;

  if (typeof data.title === "string" && data.title.trim()) campaign.title = data.title.trim().slice(0, 160);
  if (typeof data.description === "string") campaign.description = asString(data.description, 4000);
  if (data.location) campaign.location = parseLocation(data.location);
  if (Array.isArray(data.categories)) campaign.categories = asStringArray(data.categories);
  if (Array.isArray(data.platforms)) campaign.platforms = asStringArray(data.platforms);
  if (data.followerMin != null) campaign.followerMin = asNumber(data.followerMin);
  if (data.followerMax != null) campaign.followerMax = asNumber(data.followerMax);
  if (data.budget != null) campaign.budget = asNumber(data.budget);
  if (data.creatorCount != null) campaign.creatorCount = asNumber(data.creatorCount, 1);
  if (data.durationDays != null) campaign.durationDays = asNumber(data.durationDays, 15);
  if (typeof data.status === "string" && ["draft", "open", "closed", "completed"].includes(data.status)) {
    campaign.status = data.status as typeof campaign.status;
  }

  await campaign.save();
  return NextResponse.json({ ok: true, campaign: serializeCampaign(campaign.toObject()) });
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  const { id } = await context.params;
  const campaign = await Campaign.findById(id);
  if (!campaign) return jsonError("Campaign not found", 404);
  if (!(await canManageCampaign(user, campaign))) return jsonError("Not allowed", 403);
  const collab = await Collaboration.exists({ campaignId: campaign._id });
  if (collab) return jsonError("Cannot delete a campaign with collaborations");
  await Application.deleteMany({ campaignId: campaign._id });
  await campaign.deleteOne();
  return NextResponse.json({ ok: true });
}
