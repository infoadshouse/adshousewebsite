import { NextResponse } from "next/server";
import { getAgencyByUser } from "@/lib/marketplace/access";
import { asString, isAuthUser, jsonError, parseLocation, requireApiUser } from "@/lib/marketplace/api";
import { AgencyClient } from "@/models/AgencyClient";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  if (user.role !== "agency" && user.role !== "admin") return jsonError("Agency account required", 403);
  const clients =
    user.role === "admin"
      ? await AgencyClient.find({}).sort({ createdAt: -1 }).lean()
      : await AgencyClient.find({ agencyUserId: user.id }).sort({ createdAt: -1 }).lean();
  return NextResponse.json({
    ok: true,
    clients: clients.map((c) => ({
      id: String(c._id),
      name: c.name,
      category: c.category,
      location: c.location,
      notes: c.notes,
      businessProfileId: c.businessProfileId ? String(c.businessProfileId) : null,
    })),
  });
}

export async function POST(request: Request) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  if (user.role !== "agency" && user.role !== "admin") return jsonError("Agency account required", 403);
  const agency = await getAgencyByUser(user.id);
  if (!agency) return jsonError("Complete your agency profile first", 400);

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return jsonError("Invalid body");
  const data = body as Record<string, unknown>;
  const name = asString(data.name, 160);
  if (!name) return jsonError("Client name is required");

  const client = await AgencyClient.create({
    agencyId: agency._id,
    agencyUserId: user.id,
    name,
    category: asString(data.category, 80),
    location: parseLocation(data.location),
    notes: asString(data.notes, 2000),
  });

  return NextResponse.json(
    {
      ok: true,
      client: {
        id: String(client._id),
        name: client.name,
        category: client.category,
        location: client.location,
        notes: client.notes,
      },
    },
    { status: 201 },
  );
}
