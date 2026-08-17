import { sendInquiryEmails, type InquiryPayload } from "@/lib/mail";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function parseInquiry(body: unknown): InquiryPayload | null {
  if (!body || typeof body !== "object") return null;

  const data = body as Record<string, unknown>;
  const inquiry: InquiryPayload = {
    name: asString(data.name, 120),
    email: asString(data.email, 160).toLowerCase(),
    phone: asString(data.phone, 40),
    company: asString(data.company, 160),
    service: asString(data.service, 120),
    budget: asString(data.budget, 80),
    message: asString(data.message, 4000),
  };

  if (!inquiry.name || !inquiry.email || !inquiry.phone || !inquiry.company) return null;
  if (!inquiry.service || !inquiry.budget || !inquiry.message) return null;
  if (!EMAIL_RE.test(inquiry.email)) return null;

  return inquiry;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const inquiry = parseInquiry(body);

  if (!inquiry) {
    return NextResponse.json({ ok: false, error: "Missing or invalid fields" }, { status: 400 });
  }

  try {
    await sendInquiryEmails(inquiry);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Ads House inquiry] mail failed", error);
    return NextResponse.json({ ok: false, error: "Could not send email" }, { status: 500 });
  }
}
