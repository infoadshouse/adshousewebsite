import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  if (host === "adshouse.in") {
    const { pathname, search } = request.nextUrl;
    return NextResponse.redirect(`https://www.adshouse.in${pathname}${search}`, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon-|apple-icon|mark\\.png|logo\\.png).*)"],
};
