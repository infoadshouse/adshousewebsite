import { NextResponse } from "next/server";
import { asString, isAuthUser, jsonError, parseLocation, requireApiUser } from "@/lib/marketplace/api";
import { AgencyClient } from "@/models/AgencyClient";
import { Campaign } from "@/models/Campaign";

export const runtime = "nodejs";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  const { id } = await context.params;
  const client = await AgencyClient.findOne({ _id: id, agencyUserId: user.id });
  if (!client) return jsonError("Client not found", 404);

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return jsonError("Invalid body");
  const data = body as Record<string, unknown>;
  if (typeof data.name === "string" && data.name.trim()) client.name = data.name.trim().slice(0, 160);
  if (typeof data.category === "string") client.category = asString(data.category, 80);
  if (typeof data.notes === "string") client.notes = asString(data.notes, 2000);
  if (data.location) client.location = parseLocation(data.location);
  await client.save();
  return NextResponse.json({
    ok: true,
    client: { id: String(client._id), name: client.name, category: client.category, notes: client.notes, location: client.location },
  });
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  const { id } = await context.params;
  const client = await AgencyClient.findOne({ _id: id, agencyUserId: user.id });
  if (!client) return jsonError("Client not found", 404);
  const inUse = await Campaign.exists({ agencyClientId: client._id });
  if (inUse) return jsonError("This client has campaigns and cannot be deleted");
  await client.deleteOne();
  return NextResponse.json({ ok: true });
}
