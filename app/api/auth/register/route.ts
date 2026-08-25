import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getRequestUser, setSessionCookie } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { asString, jsonError, uniqueSlug } from "@/lib/marketplace/api";
import { USER_ROLES, type UserRole } from "@/lib/marketplace/constants";
import { AgencyProfile } from "@/models/AgencyProfile";
import { BusinessProfile } from "@/models/BusinessProfile";
import { InfluencerProfile } from "@/models/InfluencerProfile";
import { User } from "@/models/User";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const sessionUser = await getRequestUser(request);
  if (sessionUser) {
    return jsonError("You are already signed in. Sign out first to create another account.", 409);
  }
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return jsonError("Invalid body");

  const data = body as Record<string, unknown>;
  const name = asString(data.name, 120);
  const email = asString(data.email, 160).toLowerCase();
  const password = asString(data.password, 120);
  const role = asString(data.role, 20) as UserRole;

  if (!name || !email || !password) return jsonError("Name, email, and password are required");
  if (!EMAIL_RE.test(email)) return jsonError("Enter a valid email");
  if (password.length < 8) return jsonError("Password must be at least 8 characters");
  if (!USER_ROLES.includes(role) || role === "admin") return jsonError("Choose a valid account type");

  await connectDb();
  const existing = await User.findOne({ email });
  if (existing) return jsonError("An account with this email already exists", 409);

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash, name, role });

  if (role === "creator") {
    const username = await uniqueSlug(InfluencerProfile, "username", name);
    await InfluencerProfile.create({
      userId: user._id,
      displayName: name,
      username,
    });
  } else if (role === "business") {
    const slug = await uniqueSlug(BusinessProfile, "slug", name);
    await BusinessProfile.create({
      userId: user._id,
      name,
      slug,
    });
  } else if (role === "agency") {
    const slug = await uniqueSlug(AgencyProfile, "slug", name);
    await AgencyProfile.create({
      userId: user._id,
      name,
      slug,
    });
  }

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
