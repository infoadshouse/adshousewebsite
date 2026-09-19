import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { listTestimonials } from "@/lib/content";
import { MEDIA_URL_MAX } from "@/lib/media";
import { asNumber, asString, isAuthUser, jsonError } from "@/lib/marketplace/api";
import { Testimonial } from "@/models/Testimonial";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const user = await requireAdminApi(request);
  if (!isAuthUser(user)) return user;
  const testimonials = await listTestimonials({ includeDrafts: true });
  return NextResponse.json({ ok: true, testimonials });
}

export async function POST(request: Request) {
  const user = await requireAdminApi(request);
  if (!isAuthUser(user)) return user;
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return jsonError("Invalid body");
  const data = body as Record<string, unknown>;
  const name = asString(data.name, 80);
  const quote = asString(data.quote, 800);
  if (!name || !quote) return jsonError("Name and quote are required");
  const created = await Testimonial.create({
    name,
    role: asString(data.role, 80),
    company: asString(data.company, 80),
    location: asString(data.location, 80),
    quote,
    result: asString(data.result, 80),
    image: asString(data.image, MEDIA_URL_MAX) || "/images/testimonial-1.png",
    sortOrder: asNumber(data.sortOrder, 0),
    published: data.published !== false,
  });
  return NextResponse.json({ ok: true, testimonial: { id: String(created._id) } }, { status: 201 });
}
