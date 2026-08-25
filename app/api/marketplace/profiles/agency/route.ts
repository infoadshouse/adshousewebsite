import { NextResponse } from "next/server";
import { getAgencyByUser } from "@/lib/marketplace/access";
import { asString, isAuthUser, jsonError, parseLocation, requireApiUser, uniqueSlug } from "@/lib/marketplace/api";
import { AgencyProfile } from "@/models/AgencyProfile";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  if (user.role !== "agency" && user.role !== "admin") return jsonError("Agency account required", 403);
  const profile = await getAgencyByUser(user.id);
  if (!profile) return jsonError("Profile not found", 404);
  return NextResponse.json({ ok: true, profile: profile.toObject() });
}

export async function PATCH(request: Request) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  if (user.role !== "agency" && user.role !== "admin") return jsonError("Agency account required", 403);
  const profile = await getAgencyByUser(user.id);
  if (!profile) return jsonError("Profile not found", 404);

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return jsonError("Invalid body");
  const data = body as Record<string, unknown>;

  if (typeof data.name === "string" && data.name.trim()) profile.name = data.name.trim().slice(0, 160);
  if (typeof data.slug === "string" && data.slug.trim() && data.slug !== profile.slug) {
    profile.slug = await uniqueSlug(AgencyProfile, "slug", data.slug);
  }
  if (typeof data.about === "string") profile.about = data.about.slice(0, 4000);
  if (typeof data.website === "string") profile.website = asString(data.website, 300);
  if (typeof data.photo === "string") profile.photo = asString(data.photo, 500);
  if (data.location) profile.location = parseLocation(data.location);

  await profile.save();
  return NextResponse.json({ ok: true, profile });
}
