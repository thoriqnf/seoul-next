import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // ==========================================
    // TODO PROXY AUTH 3: Delete the `session` cookie by setting its maxAge to 0
    // ==========================================
    /* UNCOMMENT FOR FINISHED IMPLEMENTATION
    const cookieStore = await cookies();
    cookieStore.set("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    */

    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout API Error:", error);
    return NextResponse.json(
      { error: "Failed to log out cleanly" },
      { status: 500 }
    );
  }
}
