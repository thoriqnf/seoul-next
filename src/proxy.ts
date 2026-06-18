import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SessionData } from "@/types";

/**
 * Next.js Middleware — Ramen Discovery gatekeeper.
 * Protects /saved from unauthenticated users and food explorers.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ==========================================
  // TODO Recap Final 11: Read session cookie on /saved; redirect to /login if missing
  // ==========================================
  if (pathname.startsWith("/saved")) {
    // Check for "session" cookie, if missing redirect to /login
    
    // ==========================================
    // TODO Recap Final 12: Parse role; redirect food explorers to /unauthorized
    // ==========================================
    // Parse cookie JSON into SessionData. If user.role is "explorer", redirect to /unauthorized.
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/saved/:path*"],
};
