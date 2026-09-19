import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { requireUser, type AuthUser } from "@/lib/auth";
import { isAuthUser, jsonError, requireApiUser } from "@/lib/marketplace/api";

export async function requireAdminUser() {
  const user = await requireUser();
  if (user.role !== "admin") redirect("/dashboard");
  return user;
}

export async function requireAdminApi(request: Request): Promise<AuthUser | NextResponse> {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;
  if (user.role !== "admin") return jsonError("Admin only", 403);
  return user;
}
