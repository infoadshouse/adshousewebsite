import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth-token";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  if (host === "adshouse.in") {
    const { pathname, search } = request.nextUrl;
    return NextResponse.redirect(`https://www.adshouse.in${pathname}${search}`, 308);
  }

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!token) {
      const login = new URL("/marketplace/login", request.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
    try {
      const session = await verifySession(token);
      if (!session) {
        const login = new URL("/marketplace/login", request.url);
        login.searchParams.set("next", pathname);
        return NextResponse.redirect(login);
      }
    } catch {
      const login = new URL("/marketplace/login", request.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon-|apple-icon|mark\\.png|logo\\.png|google[a-f0-9]+\\.html|sitemap\\.xml|robots\\.txt|feed\\.xml).*)",
  ],
};
