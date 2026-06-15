import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SessionData } from "@/types";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Guard dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const sessionCookie = request.cookies.get("session")?.value;

    // Redirection if unauthenticated
    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const sessionData: SessionData = JSON.parse(sessionCookie);
      const user = sessionData.user;

      // Enforce RBAC: Non-admin/non-editor users are not allowed on the dashboard at all
      if (user.role !== "admin" && user.role !== "editor") {
        const unauthorizedUrl = new URL("/unauthorized", request.url);
        return NextResponse.redirect(unauthorizedUrl);
      }

      // Enforce RBAC: Only admin role can access /dashboard/admin-only paths
      if (pathname.startsWith("/dashboard/admin-only") && user.role !== "admin") {
        const unauthorizedUrl = new URL("/unauthorized", request.url);
        return NextResponse.redirect(unauthorizedUrl);
      }
    } catch (error) {
      console.error("Middleware Auth Verification Error:", error);
      // Clean corrupted cookies and redirect to login
      const loginRedirect = NextResponse.redirect(new URL("/login", request.url));
      loginRedirect.cookies.delete("session");
      return loginRedirect;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
