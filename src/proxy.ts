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

  // 1. Guard dashboard routes specifically (/dashboard and its subpaths)
  if (pathname.startsWith("/dashboard")) {
    // Retrieve the secure server-set session cookie payload
    const sessionCookie = request.cookies.get("session")?.value;

    // 2. Redirection if user is unauthenticated
    // If no session cookie is present, redirect user immediately to the login view
    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Decode and parse the session payload from the cookie
      const sessionData: SessionData = JSON.parse(sessionCookie);
      const user = sessionData.user;

      // 3. Enforce general Playroom Access Permission:
      // Only users with 'admin' (Andy) or 'editor' (Woody/Buzz) roles can enter the dashboard.
      // Basic customers or unmapped roles (like Sid's 'user' role) are blocked and sent to Sid's Yard.
      if (user.role !== "admin" && user.role !== "editor") {
        const unauthorizedUrl = new URL("/unauthorized", request.url);
        return NextResponse.redirect(unauthorizedUrl);
      }

      // 4. Enforce strict Owner-Only Access Level (RBAC):
      // Only Andy (admin role) can view the admin-only console files/routes.
      // Other approved toys (editor role like Woody/Buzz) are redirected to Sid's Yard if they try to look in Andy's chest.
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
