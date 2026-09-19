import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import {
  estimateReadTime,
  listInsights,
  paragraphsFromText,
  uniqueContentSlug,
} from "@/lib/content";
import { asString, isAuthUser, jsonError } from "@/lib/marketplace/api";
import { Insight } from "@/models/Insight";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const user = await requireAdminApi(request);
  if (!isAuthUser(user)) return user;
  const insights = await listInsights({ includeDrafts: true });
  return NextResponse.json({ ok: true, insights });
}

export async function POST(request: Request) {
  const user = await requireAdminApi(request);
  if (!isAuthUser(user)) return user;
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return jsonError("Invalid body");
  const data = body as Record<string, unknown>;
  const title = asString(data.title, 180);
  if (!title) return jsonError("Title is required");
  const content =
    typeof data.content === "string"
      ? paragraphsFromText(data.content)
      : Array.isArray(data.content)
        ? data.content.map((item) => asString(item, 8000)).filter(Boolean)
        : [];
  const slug = await uniqueContentSlug(Insight, asString(data.slug, 80) || title);
  const created = await Insight.create({
    slug,
    title,
    excerpt: asString(data.excerpt, 400),
    seoDescription: asString(data.seoDescription, 220) || asString(data.excerpt, 220),
    date: asString(data.date, 12) || new Date().toISOString().slice(0, 10),
    readTime: asString(data.readTime, 20) || estimateReadTime(content),
    category: asString(data.category, 40) || "Insights",
    image: asString(data.image, 300) || "/images/insight-seo.png",
    content,
    published: data.published !== false,
  });
  return NextResponse.json({ ok: true, insight: { id: String(created._id), slug: created.slug } }, { status: 201 });
}
