import { NextResponse } from "next/server";
import { canManageCampaign } from "@/lib/marketplace/access";
import { isAuthUser, jsonError, requireApiUser } from "@/lib/marketplace/api";
import { Campaign } from "@/models/Campaign";
import { Collaboration } from "@/models/Collaboration";

export const runtime = "nodejs";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  const { id } = await context.params;
  const collab = await Collaboration.findById(id);
  if (!collab) return jsonError("Collaboration not found", 404);

  const campaign = await Campaign.findById(collab.campaignId);
  if (!campaign) return jsonError("Campaign not found", 404);

  const isCreator = String(collab.influencerUserId) === user.id;
  const isOwner = await canManageCampaign(user, campaign);
  if (!isCreator && !isOwner) return jsonError("Not allowed", 403);

  const body = await request.json().catch(() => null);
  const status = String((body as Record<string, unknown> | null)?.status ?? "");

  if (status === "completed") {
    if (!isOwner && !isCreator) return jsonError("Not allowed", 403);
    collab.status = "completed";
    await collab.save();
    return NextResponse.json({ ok: true, collaboration: { id: String(collab._id), status: collab.status } });
  }
  if (status === "cancelled") {
    if (!isOwner) return jsonError("Only the campaign owner can cancel");
    collab.status = "cancelled";
    await collab.save();
    return NextResponse.json({ ok: true, collaboration: { id: String(collab._id), status: collab.status } });
  }

  return jsonError("Invalid status");
}
