import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { estimateReadTime, paragraphsFromText, uniqueContentSlug } from "@/lib/content";
import { asString, isAuthUser, jsonError, oid } from "@/lib/marketplace/api";
import { Insight } from "@/models/Insight";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const user = await requireAdminApi(request);
  if (!isAuthUser(user)) return user;
  const { id } = await params;
  const itemId = oid(id);
  if (!itemId) return jsonError("Invalid id", 400);
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return jsonError("Invalid body");
  const data = body as Record<string, unknown>;
  const current = await Insight.findById(itemId);
  if (!current) return jsonError("Post not found", 404);

  if (typeof data.title === "string") current.title = asString(data.title, 180) || current.title;
  if (typeof data.excerpt === "string") current.excerpt = asString(data.excerpt, 400);
  if (typeof data.seoDescription === "string") current.seoDescription = asString(data.seoDescription, 220);
  if (typeof data.date === "string") current.date = asString(data.date, 12) || current.date;
  if (typeof data.category === "string") current.category = asString(data.category, 40) || current.category;
  if (typeof data.image === "string") current.image = asString(data.image, 300) || current.image;
  if (typeof data.published === "boolean") current.published = data.published;
  if (typeof data.content === "string") current.content = paragraphsFromText(data.content);
  if (Array.isArray(data.content)) {
    current.content = data.content.map((item) => asString(item, 8000)).filter(Boolean);
  }
  if (typeof data.readTime === "string" && asString(data.readTime, 20)) {
    current.readTime = asString(data.readTime, 20);
  } else if (data.content !== undefined) {
    current.readTime = estimateReadTime(current.content);
  }
  if (typeof data.slug === "string" || typeof data.title === "string") {
    current.slug = await uniqueContentSlug(Insight, asString(data.slug, 80) || current.title, String(current._id));
  }
  await current.save();
  return NextResponse.json({ ok: true, insight: { id: String(current._id), slug: current.slug } });
}

export async function DELETE(request: Request, { params }: Params) {
  const user = await requireAdminApi(request);
  if (!isAuthUser(user)) return user;
  const { id } = await params;
  const itemId = oid(id);
  if (!itemId) return jsonError("Invalid id", 400);
  await Insight.findByIdAndDelete(itemId);
  return NextResponse.json({ ok: true });
}
