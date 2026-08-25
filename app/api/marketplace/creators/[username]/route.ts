import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { jsonError } from "@/lib/marketplace/api";
import { Review } from "@/models/Review";
import { InfluencerProfile } from "@/models/InfluencerProfile";

export const runtime = "nodejs";

export async function GET(_request: Request, context: { params: Promise<{ username: string }> }) {
  const { username } = await context.params;
  await connectDb();
  const creator = await InfluencerProfile.findOne({ username: username.toLowerCase() }).lean();
  if (!creator) return jsonError("Creator not found", 404);

  const reviews = await Review.find({ toUserId: creator.userId }).sort({ createdAt: -1 }).limit(20).lean();
  const avg =
    reviews.length > 0 ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10 : null;

  return NextResponse.json({
    ok: true,
    creator: {
      id: String(creator._id),
      userId: String(creator.userId),
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
    },
    reviews: reviews.map((r) => ({
      id: String(r._id),
      rating: r.rating,
      comment: r.comment,
      fromRole: r.fromRole,
      createdAt: r.createdAt,
    })),
    rating: avg,
    reviewCount: reviews.length,
  });
}
