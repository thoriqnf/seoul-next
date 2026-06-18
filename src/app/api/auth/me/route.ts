import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SessionData } from "@/types";

// ==========================================
// TODO Recap Final 9: Read cookie, parse, return user to client
// ==========================================
export async function GET() {
  try {
    // Read "session" cookie. Parse user from sessionData and return as JSON.
    return NextResponse.json(null);
  } catch {
    return NextResponse.json(null, { status: 401 });
  }
}
