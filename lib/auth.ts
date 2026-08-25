import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, sessionCookieOptions, signSession, verifySession, type SessionPayload } from "@/lib/auth-token";
import { connectDb } from "@/lib/db";
import { User } from "@/models/User";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: SessionPayload["role"];
};

export async function getSession(): Promise<AuthUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = await verifySession(token);
  if (!payload) return null;
  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    role: payload.role,
  };
}

export async function requireSession(): Promise<AuthUser> {
  const session = await getSession();
  if (!session) redirect("/marketplace/login");
  return session;
}

export async function getSessionUser() {
  const session = await getSession();
  if (!session) return null;
  await connectDb();
  const user = await User.findById(session.id).lean();
  if (!user) return null;
  return {
    id: String(user._id),
    email: user.email,
    name: user.name,
    role: user.role,
  } satisfies AuthUser;
}

export async function requireUser() {
  const user = await getSessionUser();
  if (!user) redirect("/marketplace/login");
  return user;
}

export async function setSessionCookie(payload: SessionPayload) {
  const token = await signSession(payload);
  (await cookies()).set(SESSION_COOKIE, token, sessionCookieOptions());
}

export async function clearSessionCookie() {
  (await cookies()).set(SESSION_COOKIE, "", {
    ...sessionCookieOptions(0),
    expires: new Date(0),
  });
}

export async function getRequestUser(request: Request): Promise<AuthUser | null> {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(new RegExp(`(?:^|; )${SESSION_COOKIE}=([^;]+)`));
  const token = match?.[1];
  if (!token) return null;
  const payload = await verifySession(decodeURIComponent(token));
  if (!payload) return null;
  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    role: payload.role,
  };
}
