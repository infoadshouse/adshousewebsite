import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { getRequestUser, type AuthUser } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { slugify } from "@/lib/marketplace/constants";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export function jsonOk<T extends Record<string, unknown>>(data?: T, status = 200) {
  return NextResponse.json({ ok: true, ...data }, { status });
}

export async function withDbUser(request: Request) {
  await connectDb();
  const user = await getRequestUser(request);
  return user;
}

export async function requireApiUser(request: Request): Promise<AuthUser | NextResponse> {
  const user = await withDbUser(request);
  if (!user) return jsonError("Sign in required", 401);
  return user;
}

export function isAuthUser(value: AuthUser | NextResponse): value is AuthUser {
  return !(value instanceof NextResponse);
}

export function asString(value: unknown, max = 400) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function asNumber(value: unknown, fallback = 0) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function asStringArray(value: unknown, maxItems = 20) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems);
}

export function oid(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return new mongoose.Types.ObjectId(id);
}

export async function uniqueSlug(
  Model: { exists: (filter: object) => Promise<unknown> },
  field: string,
  base: string,
) {
  const root = slugify(base);
  let candidate = root;
  let i = 0;
  while (await Model.exists({ [field]: candidate })) {
    i += 1;
    candidate = `${root}-${i}`;
  }
  return candidate;
}

export function parseLocation(input: unknown) {
  if (!input || typeof input !== "object") return {};
  const data = input as Record<string, unknown>;
  const lng = asNumber(data.lng, Number.NaN);
  const lat = asNumber(data.lat, Number.NaN);
  return {
    country: asString(data.country, 80) || "India",
    state: asString(data.state, 80),
    district: asString(data.district, 80),
    city: asString(data.city, 80),
    locality: asString(data.locality, 80),
    ...(Number.isFinite(lng) && Number.isFinite(lat)
      ? { geo: { type: "Point" as const, coordinates: [lng, lat] as [number, number] } }
      : {}),
  };
}
