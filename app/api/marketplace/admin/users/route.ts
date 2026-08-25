import { NextResponse } from "next/server";
import { isAuthUser, jsonError, requireApiUser } from "@/lib/marketplace/api";
import { User } from "@/models/User";
import { AgencyProfile } from "@/models/AgencyProfile";
import { BusinessProfile } from "@/models/BusinessProfile";
import { InfluencerProfile } from "@/models/InfluencerProfile";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  if (user.role !== "admin") return jsonError("Admin only", 403);

  const users = await User.find({}).sort({ createdAt: -1 }).lean();
  const [creators, businesses, agencies] = await Promise.all([
    InfluencerProfile.find({ userId: { $in: users.map((u) => u._id) } }).lean(),
    BusinessProfile.find({ userId: { $in: users.map((u) => u._id) } }).lean(),
    AgencyProfile.find({ userId: { $in: users.map((u) => u._id) } }).lean(),
  ]);
  const creatorMap = new Map(creators.map((c) => [String(c.userId), c]));
  const businessMap = new Map(businesses.map((c) => [String(c.userId), c]));
  const agencyMap = new Map(agencies.map((c) => [String(c.userId), c]));

  return NextResponse.json({
    ok: true,
    users: users.map((item) => ({
      id: String(item._id),
      name: item.name,
      email: item.email,
      role: item.role,
      createdAt: item.createdAt,
      handle:
        item.role === "creator"
          ? creatorMap.get(String(item._id))?.username
          : item.role === "business"
            ? businessMap.get(String(item._id))?.slug
            : item.role === "agency"
              ? agencyMap.get(String(item._id))?.slug
              : null,
    })),
  });
}
