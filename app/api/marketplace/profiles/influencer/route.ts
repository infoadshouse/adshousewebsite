import { NextResponse } from "next/server";
import { asNumber, asString, asStringArray, isAuthUser, jsonError, parseLocation, requireApiUser } from "@/lib/marketplace/api";
import { getInfluencerByUser } from "@/lib/marketplace/access";
import { InfluencerProfile } from "@/models/InfluencerProfile";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  if (user.role !== "creator") return jsonError("Creator account required", 403);
  const profile = await getInfluencerByUser(user.id);
  if (!profile) return jsonError("Profile not found", 404);
  return NextResponse.json({ ok: true, profile: profile.toObject() });
}

export async function PATCH(request: Request) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  if (user.role !== "creator") return jsonError("Creator account required", 403);

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return jsonError("Invalid body");
  const data = body as Record<string, unknown>;

  const profile = await getInfluencerByUser(user.id);
  if (!profile) return jsonError("Profile not found", 404);

  if (typeof data.displayName === "string" && data.displayName.trim()) {
    profile.displayName = data.displayName.trim().slice(0, 120);
  }
  if (typeof data.username === "string" && data.username.trim()) {
    const next = data.username.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "");
    if (next.length < 3) return jsonError("Username must be at least 3 characters");
    if (next !== profile.username) {
      const taken = await InfluencerProfile.exists({ username: next, _id: { $ne: profile._id } });
      if (taken) return jsonError("Username is taken", 409);
      profile.username = next;
    }
  }
  if (typeof data.bio === "string") profile.bio = data.bio.slice(0, 2000);
  if (typeof data.photo === "string") profile.photo = data.photo.slice(0, 500);
  if (Array.isArray(data.languages)) profile.languages = asStringArray(data.languages);
  if (Array.isArray(data.categories)) profile.categories = asStringArray(data.categories);
  if (Array.isArray(data.contentTypes)) profile.contentTypes = asStringArray(data.contentTypes);
  if (data.location) profile.location = parseLocation(data.location);
  if (data.audienceLocation && typeof data.audienceLocation === "object") {
    const aud = data.audienceLocation as Record<string, unknown>;
    profile.audienceLocation = {
      country: asString(aud.country, 80) || "India",
      state: asString(aud.state, 80),
      city: asString(aud.city, 80),
      note: asString(aud.note, 200),
    };
  }
  if (data.serviceRadiusKm != null) profile.serviceRadiusKm = asNumber(data.serviceRadiusKm, 25);
  if (data.pricing && typeof data.pricing === "object") {
    const pricing = data.pricing as Record<string, unknown>;
    profile.pricing = {
      min: asNumber(pricing.min),
      max: asNumber(pricing.max),
      currency: "INR",
    };
  }
  if (typeof data.availability === "string") profile.availability = data.availability as typeof profile.availability;
  if (Array.isArray(data.socialAccounts)) {
    profile.set(
      "socialAccounts",
      data.socialAccounts.slice(0, 8).map((item) => {
        const acc = (item ?? {}) as Record<string, unknown>;
        return {
          platform: asString(acc.platform, 40),
          handle: asString(acc.handle, 80),
          url: asString(acc.url, 300),
          followers: asNumber(acc.followers),
          avgViews: asNumber(acc.avgViews),
          avgLikes: asNumber(acc.avgLikes),
          engagementRate: asNumber(acc.engagementRate),
        };
      }),
    );
  }
  if (Array.isArray(data.portfolio)) {
    profile.set(
      "portfolio",
      data.portfolio.slice(0, 12).map((item) => {
        const p = (item ?? {}) as Record<string, unknown>;
        return { title: asString(p.title, 120), url: asString(p.url, 400) };
      }),
    );
  }

  await profile.save();
  return NextResponse.json({ ok: true, profile });
}
