import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { getAgencyByUser, getBusinessByUser } from "@/lib/marketplace/access";
import {
  asNumber,
  asString,
  asStringArray,
  isAuthUser,
  jsonError,
  parseLocation,
  requireApiUser,
} from "@/lib/marketplace/api";
import { serializeCampaign } from "@/lib/marketplace/serialize";
import { AgencyClient } from "@/models/AgencyClient";
import { Campaign } from "@/models/Campaign";

export const runtime = "nodejs";

export async function GET(request: Request) {
  await connectDb();
  const { searchParams } = new URL(request.url);
  const mine = searchParams.get("mine") === "1";
  const status = searchParams.get("status") || "open";
  const city = searchParams.get("city")?.trim();
  const category = searchParams.get("category")?.trim();

  if (mine) {
    const user = await requireApiUser(request);
    if (!isAuthUser(user)) return user;
    const filter: Record<string, unknown> = { createdByUserId: user.id };
    if (user.role === "agency") {
      const agency = await getAgencyByUser(user.id);
      filter.$or = [{ createdByUserId: user.id }, ...(agency ? [{ agencyId: agency._id }] : [])];
      delete filter.createdByUserId;
    }
    const campaigns = await Campaign.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json({
      ok: true,
      campaigns: campaigns.map(serializeCampaign),
    });
  }

  const filter: Record<string, unknown> = { status };
  if (city) filter["location.city"] = new RegExp(`^${city}$`, "i");
  if (category) filter.categories = category;
  const campaigns = await Campaign.find(filter).sort({ createdAt: -1 }).limit(50).lean();
  return NextResponse.json({ ok: true, campaigns: campaigns.map(serializeCampaign) });
}

export async function POST(request: Request) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  if (user.role !== "business" && user.role !== "agency" && user.role !== "admin") {
    return jsonError("Only businesses and agencies can post campaigns", 403);
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return jsonError("Invalid body");
  const data = body as Record<string, unknown>;
  const title = asString(data.title, 160);
  if (!title) return jsonError("Title is required");

  let businessId = null;
  let agencyId = null;
  let agencyClientId = null;

  if (user.role === "business") {
    const business = await getBusinessByUser(user.id);
    if (!business) return jsonError("Complete your business profile first", 400);
    businessId = business._id;
  } else if (user.role === "agency") {
    const agency = await getAgencyByUser(user.id);
    if (!agency) return jsonError("Complete your agency profile first", 400);
    agencyId = agency._id;
    const clientId = asString(data.agencyClientId, 40);
    if (clientId) {
      const client = await AgencyClient.findOne({ _id: clientId, agencyUserId: user.id });
      if (!client) return jsonError("Client not found", 404);
      agencyClientId = client._id;
    }
  } else if (user.role === "admin") {
    const clientId = asString(data.agencyClientId, 40);
    if (clientId) {
      const client = await AgencyClient.findById(clientId);
      if (!client) return jsonError("Client not found", 404);
      agencyClientId = client._id;
      agencyId = client.agencyId;
    }
  }

  const campaign = await Campaign.create({
    createdByUserId: user.id,
    businessId,
    agencyId,
    agencyClientId,
    title,
    description: asString(data.description, 4000),
    location: parseLocation(data.location),
    categories: asStringArray(data.categories),
    platforms: asStringArray(data.platforms),
    followerMin: asNumber(data.followerMin),
    followerMax: asNumber(data.followerMax),
    budget: asNumber(data.budget),
    creatorCount: asNumber(data.creatorCount, 1),
    durationDays: asNumber(data.durationDays, 15),
    status: data.status === "draft" ? "draft" : "open",
  });

  return NextResponse.json({ ok: true, campaign: serializeCampaign(campaign.toObject()) }, { status: 201 });
}
