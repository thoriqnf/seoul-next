import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// ==========================================
// TODO Recap Final 10: Clear session cookie with maxAge=0
// ==========================================
export async function POST() {
  // Clear the "session" cookie by setting its maxAge to 0.
  return NextResponse.json({ success: true });
}
