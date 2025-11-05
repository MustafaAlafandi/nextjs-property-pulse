// middleware.js
import authMiddleware from "next-auth/middleware";
import { NextResponse } from "next/server";

const protectRoutes =
  process.env.NEXT_PUBLIC_REGESTRING_ADDED === "true";

const protectedPaths = [
  "/properties/add",
  "/profile",
  "/properties/saved",
  "/messages",
];

// Middleware runs for all requests (matcher below). We short-circuit early
// when protection is disabled or the path is not in the protected list.
export default function middleware(req) {
  // if protection disabled -> do nothing
  if (!protectRoutes) return NextResponse.next();

  const pathname = req.nextUrl.pathname;

  // treat exact matches and sub-paths (e.g. /profile/settings)
  const isProtected = protectedPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  // If this path is not protected -> continue without invoking next-auth
  if (!isProtected) return NextResponse.next();

  // For protected paths, delegate to next-auth's built-in middleware
  return authMiddleware(req);
}

// Make middleware run for every route so our custom logic can decide per request.
// This matcher causes the middleware to be invoked on all pages and API routes.
export const config = {
  matcher: ["/:path*"],
};
