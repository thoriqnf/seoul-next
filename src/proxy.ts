import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SessionData } from "@/types";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Guard dashboard routes
  if (pathname.startsWith("/dashboard")) {
    // ==========================================
    // TODO PROXY AUTH 1: Extract the `session` cookie value from the request
    // ==========================================
    /* UNCOMMENT FOR FINISHED IMPLEMENTATION
    const sessionCookie = request.cookies.get("session")?.value;
    */
    const sessionCookie = undefined as any; // Starter Fallback

    // ==========================================
    // TODO PROXY AUTH 2: If the session cookie is missing, redirect unauthenticated request to /login page
    // ==========================================
    /* UNCOMMENT FOR FINISHED IMPLEMENTATION
    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    */

    // ==========================================
    // TODO PROXY AUTH 3: Parse the session cookie value, verify role and enforce RBAC:
    // - Block non-admin and non-editor users (like Sid) from accessing /dashboard at all (redirect to /unauthorized)
    // - Block non-admin users (like Woody/Buzz) from accessing /dashboard/admin-only paths (redirect to /unauthorized)
    // ==========================================
    /* UNCOMMENT FOR FINISHED IMPLEMENTATION
    try {
      const sessionData: SessionData = JSON.parse(sessionCookie);
      const user = sessionData.user;

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
      const loginRedirect = NextResponse.redirect(new URL("/login", request.url));
      loginRedirect.cookies.delete("session");
      return loginRedirect;
    }
    */
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
