import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  console.info("[Ads House inquiry]", {
    name: body.name,
    email: body.email,
    phone: body.phone,
    company: body.company,
    service: body.service,
    budget: body.budget,
  });

  return NextResponse.json({ ok: true });
}
