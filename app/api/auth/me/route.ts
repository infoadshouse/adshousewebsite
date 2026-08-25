import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getSessionUser, setSessionCookie } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { AgencyProfile } from "@/models/AgencyProfile";
import { BusinessProfile } from "@/models/BusinessProfile";
import { InfluencerProfile } from "@/models/InfluencerProfile";
import { User } from "@/models/User";
import { asString, jsonError } from "@/lib/marketplace/api";

export const runtime = "nodejs";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ ok: true, user: null });

  await connectDb();
  let profile: Record<string, unknown> | null = null;
  if (user.role === "creator") {
    const doc = await InfluencerProfile.findOne({ userId: user.id }).lean();
    if (doc) {
      profile = {
        username: doc.username,
        displayName: doc.displayName,
        photo: doc.photo,
        bio: doc.bio,
        categories: doc.categories,
        location: doc.location,
      };
    }
  } else if (user.role === "business") {
    const doc = await BusinessProfile.findOne({ userId: user.id }).lean();
    if (doc) profile = { slug: doc.slug, name: doc.name, photo: doc.photo, category: doc.category, location: doc.location };
  } else if (user.role === "agency") {
    const doc = await AgencyProfile.findOne({ userId: user.id }).lean();
    if (doc) profile = { slug: doc.slug, name: doc.name, photo: doc.photo, isPlatformAgency: doc.isPlatformAgency };
  }

  return NextResponse.json({ ok: true, user: { ...user, profile } });
}

export async function PATCH(request: Request) {
  const session = await getSessionUser();
  if (!session) return jsonError("Sign in required", 401);

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return jsonError("Invalid body");
  const data = body as Record<string, unknown>;

  await connectDb();
  const user = await User.findById(session.id);
  if (!user) return jsonError("Account not found", 404);

  const name = asString(data.name, 120);
  const email = asString(data.email, 160).toLowerCase();
  const currentPassword = asString(data.currentPassword, 120);
  const newPassword = asString(data.newPassword, 120);

  if (name) user.name = name;
  if (email && email !== user.email) {
    const taken = await User.exists({ email, _id: { $ne: user._id } });
    if (taken) return jsonError("That email is already in use", 409);
    user.email = email;
  }

  if (newPassword) {
    if (newPassword.length < 8) return jsonError("New password must be at least 8 characters");
    if (!currentPassword) return jsonError("Enter your current password to change it");
    const ok = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!ok) return jsonError("Current password is incorrect", 401);
    user.passwordHash = await bcrypt.hash(newPassword, 10);
  }

  await user.save();
  await setSessionCookie({
    sub: String(user._id),
    email: user.email,
    name: user.name,
    role: user.role,
  });

  return NextResponse.json({
    ok: true,
    user: { id: String(user._id), email: user.email, name: user.name, role: user.role },
  });
}
