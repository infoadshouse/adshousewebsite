import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { asNumber } from "@/lib/marketplace/api";
import { matchScore } from "@/lib/marketplace/scoring";
import { InfluencerProfile } from "@/models/InfluencerProfile";

export const runtime = "nodejs";

export async function GET(request: Request) {
  await connectDb();
  const { searchParams } = new URL(request.url);

  const city = searchParams.get("city")?.trim() || "";
  const state = searchParams.get("state")?.trim() || "";
  const district = searchParams.get("district")?.trim() || "";
  const locality = searchParams.get("locality")?.trim() || "";
  const category = searchParams.get("category")?.trim() || "";
  const platform = searchParams.get("platform")?.trim() || "";
  const q = searchParams.get("q")?.trim() || "";
  const audienceCity = searchParams.get("audienceCity")?.trim() || "";
  const followersMin = searchParams.get("followersMin") ? asNumber(searchParams.get("followersMin")) : undefined;
  const followersMax = searchParams.get("followersMax") ? asNumber(searchParams.get("followersMax")) : undefined;
  const engagementMin = searchParams.get("engagementMin") ? asNumber(searchParams.get("engagementMin")) : undefined;
  const priceMin = searchParams.get("priceMin") ? asNumber(searchParams.get("priceMin")) : undefined;
  const priceMax = searchParams.get("priceMax") ? asNumber(searchParams.get("priceMax")) : undefined;
  const lat = searchParams.get("lat") ? asNumber(searchParams.get("lat"), Number.NaN) : Number.NaN;
  const lng = searchParams.get("lng") ? asNumber(searchParams.get("lng"), Number.NaN) : Number.NaN;
  const radiusKm = searchParams.get("radiusKm") ? asNumber(searchParams.get("radiusKm")) : 0;

  const filter: Record<string, unknown> = {};

  if (Number.isFinite(lat) && Number.isFinite(lng) && radiusKm > 0) {
    filter["location.geo"] = {
      $near: {
        $geometry: { type: "Point", coordinates: [lng, lat] },
        $maxDistance: radiusKm * 1000,
      },
    };
  } else {
    if (city) filter["location.city"] = new RegExp(`^${escapeRegex(city)}$`, "i");
    if (state) filter["location.state"] = new RegExp(`^${escapeRegex(state)}$`, "i");
    if (district) filter["location.district"] = new RegExp(`^${escapeRegex(district)}$`, "i");
    if (locality) filter["location.locality"] = new RegExp(`^${escapeRegex(locality)}$`, "i");
  }

  if (category) filter.categories = category;
  if (audienceCity) filter["audienceLocation.city"] = new RegExp(escapeRegex(audienceCity), "i");
  if (q) {
    filter.$or = [
      { displayName: new RegExp(escapeRegex(q), "i") },
      { username: new RegExp(escapeRegex(q), "i") },
      { bio: new RegExp(escapeRegex(q), "i") },
    ];
  }
  if (platform) filter["socialAccounts.platform"] = platform;
  if (followersMin != null || followersMax != null) {
    filter["socialAccounts.followers"] = {
      ...(followersMin != null ? { $gte: followersMin } : {}),
      ...(followersMax != null ? { $lte: followersMax } : {}),
    };
  }
  if (engagementMin != null) filter["socialAccounts.engagementRate"] = { $gte: engagementMin };
  if (priceMin != null || priceMax != null) {
    if (priceMax != null) filter["pricing.min"] = { $lte: priceMax };
    if (priceMin != null) filter["pricing.max"] = { $gte: priceMin };
  }

  const creators = await InfluencerProfile.find(filter).limit(60).lean();
  const ranked = creators
    .map((creator) => ({
      ...serializeCreator(creator as unknown as Record<string, unknown> & { _id: unknown; userId: unknown }),
      match: matchScore(creator, {
        city,
        district,
        state,
        category,
        platform,
        followersMin,
        followersMax,
        priceMin,
        priceMax,
      }),
    }))
    .sort((a, b) => b.match - a.match);

  return NextResponse.json({ ok: true, creators: ranked });
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function serializeCreator(creator: Record<string, unknown> & { _id: unknown; userId: unknown }) {
  return {
    id: String(creator._id),
    username: creator.username,
    displayName: creator.displayName,
    photo: creator.photo,
    bio: creator.bio,
    categories: creator.categories,
    languages: creator.languages,
    location: creator.location,
    audienceLocation: creator.audienceLocation,
    serviceRadiusKm: creator.serviceRadiusKm,
    socialAccounts: creator.socialAccounts,
    pricing: creator.pricing,
    contentTypes: creator.contentTypes,
    availability: creator.availability,
    verified: creator.verified,
    portfolio: creator.portfolio,
  };
}
