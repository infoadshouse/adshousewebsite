import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { listCaseStudies, paragraphsFromText, uniqueContentSlug } from "@/lib/content";
import { MEDIA_URL_MAX } from "@/lib/media";
import { asString, asStringArray, isAuthUser, jsonError } from "@/lib/marketplace/api";
import { CaseStudy } from "@/models/CaseStudy";

export const runtime = "nodejs";

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

export async function GET(request: Request) {
  const user = await requireAdminApi(request);
  if (!isAuthUser(user)) return user;
  const caseStudies = await listCaseStudies({ includeDrafts: true });
  return NextResponse.json({ ok: true, caseStudies });
}

export async function POST(request: Request) {
  const user = await requireAdminApi(request);
  if (!isAuthUser(user)) return user;
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return jsonError("Invalid body");
  const data = body as Record<string, unknown>;
  const title = asString(data.title, 180);
  const client = asString(data.client, 80);
  if (!title || !client) return jsonError("Client and title are required");
  const story =
    typeof data.story === "string"
      ? paragraphsFromText(data.story)
      : Array.isArray(data.story)
        ? data.story.map((item) => asString(item, 8000)).filter(Boolean)
        : [];
  const slug = await uniqueContentSlug(CaseStudy, asString(data.slug, 80) || `${client} ${title}`);
  const created = await CaseStudy.create({
    slug,
    client,
    industry: asString(data.industry, 80),
    location: asString(data.location, 80) || "India",
    title,
    challenge: asString(data.challenge, 2000),
    solution: asString(data.solution, 2000),
    result: asString(data.result, 2000),
    metric: asString(data.metric, 40),
    metricLabel: asString(data.metricLabel, 80),
    image: asString(data.image, MEDIA_URL_MAX) || "/images/work-fashion.png",
    year: asString(data.year, 8) || String(new Date().getFullYear()),
    services: asStringArray(typeof data.services === "string" ? String(data.services).split(",") : data.services, 12),
    stats: parseStats(data.stats),
    story,
    published: data.published !== false,
  });
  return NextResponse.json({ ok: true, caseStudy: { id: String(created._id), slug: created.slug } }, { status: 201 });
}
