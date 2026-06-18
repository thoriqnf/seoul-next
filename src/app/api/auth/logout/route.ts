import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// ==========================================
// TODO Recap Final 6: Clear session cookie with maxAge=0
// ==========================================
export async function POST() {
  const kukis = await cookies();

  kukis.delete("session");
  return NextResponse.json({ success: true });
}
