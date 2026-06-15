import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SessionData } from "@/types";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    // ==========================================
    // TODO PROXY AUTH 4: Retrieve, parse, and return the session cookie payload.
    // Return the AuthUser object if authenticated, otherwise return 401.
    // ==========================================
    /* UNCOMMENT FOR FINISHED IMPLEMENTATION
    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const sessionData: SessionData = JSON.parse(sessionCookie.value);
    return NextResponse.json(sessionData.user);
    */

    // STARTER FALLBACK: Read cookie directly if it exists, otherwise return a 401
    if (sessionCookie && sessionCookie.value) {
      try {
        const sessionData: SessionData = JSON.parse(sessionCookie.value);
        return NextResponse.json(sessionData.user);
      } catch (e) {}
    }

    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Fetch Session Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 }
    );
  }
}
