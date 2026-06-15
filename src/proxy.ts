import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SessionData } from "@/types";

/**
 * Next.js 16 Proxy boundary function.
 * This functions as the server-side gatekeeper/middleware for requested routes.
 * It intercepts incoming requests matching the matcher paths (specifically /dashboard routes)
 * and enforces Role-Based Access Control (RBAC) before layouts are rendered on the client.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ==========================================
  // TODO PROXY AUTH 9: Guard dashboard routes specifically, and extract the "session" cookie
  // ==========================================
  if (pathname.startsWith("/dashboard")) {
    const sessionCookie = request.cookies.get("session")?.value;

    // ==========================================
    // TODO PROXY AUTH 10: If cookie is missing, redirect unauthenticated users to "/login"
    // ==========================================
    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Decode and parse the session payload from the cookie
      const sessionData: SessionData = JSON.parse(sessionCookie);
      const user = sessionData.user;

      // ==========================================
      // TODO PROXY AUTH 11: Parse session data and enforce RBAC rules:
      //   - Block non-admin/non-editor users (role !== admin/editor) from dashboard
      //   - Block non-admin users (role !== admin) from dashboard/admin-only
      // ==========================================
      if (user.role !== "admin" && user.role !== "editor") {
        const unauthorizedUrl = new URL("/unauthorized", request.url);
        return NextResponse.redirect(unauthorizedUrl);
      }

      if (pathname.startsWith("/dashboard/admin-only") && user.role !== "admin") {
        const unauthorizedUrl = new URL("/unauthorized", request.url);
        return NextResponse.redirect(unauthorizedUrl);
      }
    } catch (error) {
      console.error("Proxy Auth Verification Error:", error);
      // In case of cookie corruption or parsing issues, flush the bad cookie
      // and redirect the user back to the sign-in screen to prevent loading loops.
      const loginRedirect = NextResponse.redirect(new URL("/login", request.url));
      loginRedirect.cookies.delete("session");
      return loginRedirect;
    }
  }

  // Allow the request to proceed to the destination route
  return NextResponse.next();
}

// Config object defining the matched routes that trigger this proxy guard
export const config = {
  matcher: ["/dashboard/:path*"],
};
