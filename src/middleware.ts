import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value;

  const publicRoutes = [
    "/",
    "/login",
    "/forget-password",
    "/create-password",
    "/recognition",
    "/pricing",
    "/redeem",
    "/resources",
    "/testimonials",
    "/register",
    "/otp-verify",
    "/success",
    "/cancel",
  ];

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    /\.(.*)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  let response: NextResponse;

  const isLoginPage = pathname === "/login";

  if (!token) {
    if (isPublicRoute || isLoginPage) {
      response = NextResponse.next();
    } else {
      response = NextResponse.redirect(new URL("/login", request.url));
    }
  } else if (token && isLoginPage) {
    response = NextResponse.redirect(new URL("/", request.url));
  } else {
    response = NextResponse.next();
  }

  // Disable bfcache storing of auth state
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
