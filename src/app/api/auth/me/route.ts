import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SessionData } from "@/types";

export async function GET() {
  try {
    // ==========================================
    // TODO PROXY AUTH 4: Retrieve, parse, and return the session cookie payload.
    // ==========================================
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const sessionData: SessionData = JSON.parse(sessionCookie.value);
    
    // Return only the user info (hiding the JWT token from browser scripts)
    return NextResponse.json(sessionData.user);
  } catch (error) {
    console.error("Fetch Session Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 }
    );
  }
}
