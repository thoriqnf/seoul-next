import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SessionData } from "@/types";

// ==========================================
// TODO Recap Final 9: Read cookie, parse, return user to client
// ==========================================
export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie) {
      return NextResponse.json(null, { status: 401 });
    }

    const sessionData: SessionData = JSON.parse(sessionCookie.value);
    return NextResponse.json(sessionData.user);
  } catch {
    return NextResponse.json(null, { status: 401 });
  }
}
