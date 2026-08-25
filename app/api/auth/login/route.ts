import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { asString, jsonError } from "@/lib/marketplace/api";
import { User } from "@/models/User";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return NextResponse.redirect(new URL("/marketplace/login", request.url));
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") return jsonError("Invalid body");

    const data = body as Record<string, unknown>;
    const email = asString(data.email, 160).toLowerCase();
    const password = asString(data.password, 120);
    if (!email || !password) return jsonError("Email and password are required");

    await connectDb();
    const user = await User.findOne({ email });
    if (!user) return jsonError("Invalid email or password", 401);

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return jsonError("Invalid email or password", 401);

    await setSessionCookie({
      sub: String(user._id),
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return NextResponse.json({
      ok: true,
      user: { id: String(user._id), email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error("[login]", error);
    const message = error instanceof Error ? error.message : "Could not sign in";
    if (message.includes("MONGODB_URI") || message.includes("AUTH_SECRET")) {
      return jsonError("Server is missing database or auth settings. Check .env", 500);
    }
    return jsonError("Could not sign in. Try again.", 500);
  }
}
