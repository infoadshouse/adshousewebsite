import { NextResponse } from "next/server";
import { asNumber, asString, isAuthUser, jsonError, oid, requireApiUser } from "@/lib/marketplace/api";
import { Collaboration } from "@/models/Collaboration";
import { Review } from "@/models/Review";
import { User } from "@/models/User";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  const reviews = await Review.find({ $or: [{ fromUserId: user.id }, { toUserId: user.id }] })
    .sort({ createdAt: -1 })
    .lean();
  return NextResponse.json({
    ok: true,
    reviews: reviews.map((r) => ({
      id: String(r._id),
      collaborationId: String(r.collaborationId),
      fromUserId: String(r.fromUserId),
      toUserId: String(r.toUserId),
      fromRole: r.fromRole,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt,
      mine: String(r.fromUserId) === user.id,
    })),
  });
}

export async function POST(request: Request) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return jsonError("Invalid body");
  const data = body as Record<string, unknown>;
  const collaborationId = String(data.collaborationId ?? "");
  if (!oid(collaborationId)) return jsonError("Invalid collaboration");

  const collab = await Collaboration.findById(collaborationId);
  if (!collab || collab.status !== "completed") {
    return jsonError("Reviews are available after a collaboration is completed");
  }

  const isCreator = String(collab.influencerUserId) === user.id;
  const isOwner = String(collab.ownerUserId) === user.id;
  if (!isCreator && !isOwner) return jsonError("Not allowed", 403);

  const toUserId = isCreator ? String(collab.ownerUserId) : String(collab.influencerUserId);
  const rating = asNumber(data.rating);
  if (rating < 1 || rating > 5) return jsonError("Rating must be between 1 and 5");

  const existing = await Review.findOne({ collaborationId: collab._id, fromUserId: user.id });
  if (existing) return jsonError("You already reviewed this collaboration", 409);

  const review = await Review.create({
    collaborationId: collab._id,
    fromUserId: user.id,
    toUserId,
    fromRole: user.role,
    rating,
    comment: asString(data.comment, 2000),
  });

  const other = await User.findById(toUserId).lean();
  return NextResponse.json({
    ok: true,
    review: {
      id: String(review._id),
      rating: review.rating,
      comment: review.comment,
      toName: other?.name ?? "",
    },
  });
}
