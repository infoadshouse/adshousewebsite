import { NextResponse } from "next/server";
import { canManageCampaign } from "@/lib/marketplace/access";
import { isAuthUser, jsonError, requireApiUser } from "@/lib/marketplace/api";
import { findOrCreateConversation } from "@/lib/marketplace/chat";
import { Application } from "@/models/Application";
import { Campaign } from "@/models/Campaign";
import { Collaboration } from "@/models/Collaboration";
import { serializeApplication } from "@/lib/marketplace/serialize";

export const runtime = "nodejs";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  const { id } = await context.params;
  const application = await Application.findById(id).populate("influencerId");
  if (!application) return jsonError("Application not found", 404);

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return jsonError("Invalid body");
  const status = String((body as Record<string, unknown>).status ?? "");

  if (user.role === "creator") {
    if (String(application.influencerUserId) !== user.id) return jsonError("Not allowed", 403);
    if (status !== "withdrawn") return jsonError("Creators can only withdraw");
    if (application.status === "accepted") return jsonError("Cannot withdraw an accepted application");
    application.status = "withdrawn";
    await application.save();
    return NextResponse.json({ ok: true, application: serializeApplication(application.toObject()) });
  }

  const campaign = await Campaign.findById(application.campaignId);
  if (!campaign) return jsonError("Campaign not found", 404);
  if (!(await canManageCampaign(user, campaign))) return jsonError("Not allowed", 403);

  if (!["shortlisted", "rejected", "accepted"].includes(status)) {
    return jsonError("Invalid status");
  }

  if (status === "accepted") {
    application.status = "accepted";
    await application.save();
    const existing = await Collaboration.findOne({ applicationId: application._id });
    const collaboration =
      existing ??
      (await Collaboration.create({
        campaignId: campaign._id,
        applicationId: application._id,
        influencerId: application.influencerId,
        influencerUserId: application.influencerUserId,
        businessId: campaign.businessId,
        agencyId: campaign.agencyId,
        agencyClientId: campaign.agencyClientId,
        ownerUserId: user.id,
        agreedRate: application.proposedRate || 0,
        status: "active",
      }));
    await findOrCreateConversation({
      participantIds: [String(application.influencerUserId), String(campaign.createdByUserId)],
      campaignId: String(campaign._id),
      collaborationId: String(collaboration._id),
      firstMessage: {
        senderId: user.id,
        body: `You've been accepted for ${campaign.title}. Let's plan the collaboration.`,
      },
    });
    return NextResponse.json({
      ok: true,
      application: serializeApplication(application.toObject()),
      collaborationId: String(collaboration._id),
    });
  }

  application.status = status as typeof application.status;
  await application.save();
  return NextResponse.json({ ok: true, application: serializeApplication(application.toObject()) });
}
