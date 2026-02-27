import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Logged-in users visiting homepage, login, or register → redirect based on role
  if ((pathname === "/" || pathname === "/login" || pathname === "/register") && token) {
    const dest = token.role === "ADMIN" ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(dest, req.url));
  }

  // Protected routes: require auth
  const protectedPaths = ["/dashboard", "/settings", "/packages", "/admin", "/leads", "/my-leads"];
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Admin users hitting /dashboard → send to /admin (unless explicitly navigating to portal)
  if (pathname === "/dashboard" && token?.role === "ADMIN" && !req.nextUrl.searchParams.has("portal")) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Block AGENT from /packages (they don't have subscriptions)
  if (pathname.startsWith("/packages") && token?.role === "AGENT") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // /leads routes: only AGENT can access
  if (pathname.startsWith("/leads") && token?.role !== "AGENT") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // /my-leads routes: only USER can access
  if (pathname.startsWith("/my-leads") && token?.role !== "USER") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Admin routes: require ADMIN role
  if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*", "/settings/:path*", "/packages/:path*", "/admin/:path*", "/leads/:path*", "/my-leads/:path*"],
};
