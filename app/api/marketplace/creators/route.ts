import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { searchCreators } from "@/lib/marketplace/search-creators";

export const runtime = "nodejs";

export async function GET(request: Request) {
  await connectDb();
  const { searchParams } = new URL(request.url);
  const creators = await searchCreators(searchParams);
  return NextResponse.json({ ok: true, creators });
}
