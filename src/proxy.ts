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
  // TODO Recap Final 7: Route protection & RBAC (redirect unauthenticated to /login, explorer to /unauthorized)
  // ==========================================
  if (pathname.startsWith("/saved")) {
    const sessionCookie = request.cookies.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const sessionData: SessionData = JSON.parse(sessionCookie);
      const user = sessionData.user;

      if (user.role === "explorer") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } catch {
      const redirect = NextResponse.redirect(new URL("/login", request.url));
      redirect.cookies.delete("session");
      return redirect;
    }
  }

  if (pathname.startsWith("/login")) {
    const sessionCookie = request.cookies.get("session")?.value;

    if (sessionCookie) {
      try {
        JSON.parse(sessionCookie)
        return NextResponse.redirect(new URL("/saved", request.url));
      } catch {
        const redirect = NextResponse.redirect(new URL("/login", request.url));
        redirect.cookies.delete("session");
        return redirect;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/saved/:path*", "/login"],
};
