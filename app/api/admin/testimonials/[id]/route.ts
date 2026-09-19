import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { MEDIA_URL_MAX } from "@/lib/media";
import { asNumber, asString, isAuthUser, jsonError, oid } from "@/lib/marketplace/api";
import { Testimonial } from "@/models/Testimonial";

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
  const current = await Testimonial.findById(itemId);
  if (!current) return jsonError("Testimonial not found", 404);

  if (typeof data.name === "string") current.name = asString(data.name, 80) || current.name;
  if (typeof data.role === "string") current.role = asString(data.role, 80);
  if (typeof data.company === "string") current.company = asString(data.company, 80);
  if (typeof data.location === "string") current.location = asString(data.location, 80);
  if (typeof data.quote === "string") current.quote = asString(data.quote, 800) || current.quote;
  if (typeof data.result === "string") current.result = asString(data.result, 80);
  if (typeof data.image === "string") current.image = asString(data.image, MEDIA_URL_MAX) || current.image;
  if (data.sortOrder !== undefined) current.sortOrder = asNumber(data.sortOrder, current.sortOrder);
  if (typeof data.published === "boolean") current.published = data.published;
  await current.save();
  return NextResponse.json({ ok: true, testimonial: { id: String(current._id) } });
}

export async function DELETE(request: Request, { params }: Params) {
  const user = await requireAdminApi(request);
  if (!isAuthUser(user)) return user;
  const { id } = await params;
  const itemId = oid(id);
  if (!itemId) return jsonError("Invalid id", 400);
  await Testimonial.findByIdAndDelete(itemId);
  return NextResponse.json({ ok: true });
}
