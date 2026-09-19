import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { paragraphsFromText, uniqueContentSlug } from "@/lib/content";
import { asString, asStringArray, isAuthUser, jsonError, oid } from "@/lib/marketplace/api";
import { CaseStudy } from "@/models/CaseStudy";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

function parseStats(value: unknown) {
  if (typeof value === "string") {
    return value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [label, ...rest] = line.split("|");
        return { label: (label || "").trim(), value: rest.join("|").trim() };
      })
      .filter((row) => row.label && row.value);
  }
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      const row = item as { label?: string; value?: string };
      return { label: asString(row.label, 80), value: asString(row.value, 40) };
    })
    .filter((row) => row.label && row.value);
}

export async function PATCH(request: Request, { params }: Params) {
  const user = await requireAdminApi(request);
  if (!isAuthUser(user)) return user;
  const { id } = await params;
  const itemId = oid(id);
  if (!itemId) return jsonError("Invalid id", 400);
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return jsonError("Invalid body");
  const data = body as Record<string, unknown>;
  const current = await CaseStudy.findById(itemId);
  if (!current) return jsonError("Case study not found", 404);

  if (typeof data.client === "string") current.client = asString(data.client, 80) || current.client;
  if (typeof data.title === "string") current.title = asString(data.title, 180) || current.title;
  if (typeof data.industry === "string") current.industry = asString(data.industry, 80);
  if (typeof data.location === "string") current.location = asString(data.location, 80);
  if (typeof data.challenge === "string") current.challenge = asString(data.challenge, 2000);
  if (typeof data.solution === "string") current.solution = asString(data.solution, 2000);
  if (typeof data.result === "string") current.result = asString(data.result, 2000);
  if (typeof data.metric === "string") current.metric = asString(data.metric, 40);
  if (typeof data.metricLabel === "string") current.metricLabel = asString(data.metricLabel, 80);
  if (typeof data.image === "string") current.image = asString(data.image, 300) || current.image;
  if (typeof data.year === "string") current.year = asString(data.year, 8);
  if (typeof data.published === "boolean") current.published = data.published;
  if (data.services !== undefined) {
    current.services = asStringArray(
      typeof data.services === "string" ? String(data.services).split(",") : data.services,
      12,
    );
  }
  if (data.stats !== undefined) current.set("stats", parseStats(data.stats));
  if (typeof data.story === "string") current.story = paragraphsFromText(data.story);
  if (Array.isArray(data.story)) current.story = data.story.map((item) => asString(item, 8000)).filter(Boolean);
  if (typeof data.slug === "string" || typeof data.client === "string" || typeof data.title === "string") {
    current.slug = await uniqueContentSlug(
      CaseStudy,
      asString(data.slug, 80) || `${current.client} ${current.title}`,
      String(current._id),
    );
  }
  await current.save();
  return NextResponse.json({ ok: true, caseStudy: { id: String(current._id), slug: current.slug } });
}

export async function DELETE(request: Request, { params }: Params) {
  const user = await requireAdminApi(request);
  if (!isAuthUser(user)) return user;
  const { id } = await params;
  const itemId = oid(id);
  if (!itemId) return jsonError("Invalid id", 400);
  await CaseStudy.findByIdAndDelete(itemId);
  return NextResponse.json({ ok: true });
}
