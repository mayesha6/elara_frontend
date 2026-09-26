import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value;

  // ✅ Public routes (always accessible)
  const publicRoutes = [
    "/", // Home page
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

  // ✅ Allow static files & Next internals
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    /\.(.*)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ✅ Public pages accessible without token
  if (isPublicRoute) {
    return NextResponse.next();
  }

  const isLoginPage = pathname === "/login";

  // 🔒 No token
  if (!token) {
    if (isLoginPage) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Has token → block login page
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
