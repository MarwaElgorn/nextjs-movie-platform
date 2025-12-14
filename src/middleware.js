import { NextResponse } from "next/server";

export function middleware(req) {
  const admin = req.cookies.get("admin")?.value;

  if (req.nextUrl.pathname.startsWith("/dashboard") && admin !== "true") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
