import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthUser, SessionData } from "@/types";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // ==========================================
    // TODO Recap Final 7: Forward credentials to dummyjson and map role
    // ==========================================
    // 1. Fetch https://dummyjson.com/auth/login (POST)
    // 2. Map role: emilys -> master-curator, michaelw -> recipe-editor, anyone else -> explorer
    const authUser: AuthUser = {
      id: 1,
      username: "mock",
      email: "mock@domain.com",
      firstName: "Mock",
      lastName: "User",
      image: "",
      role: "explorer",
    };

    const sessionData: SessionData = { user: authUser, token: "mock-token" };

    // ==========================================
    // TODO Recap Final 8: Set HttpOnly session cookie with sessionData payload
    // ==========================================
    // Set cookie "session" with JSON string of sessionData, httpOnly: true, sameSite: "lax", path: "/", maxAge: 1800

    return NextResponse.json(authUser);
  } catch (error) {
    console.error("Login Proxy Error:", error);
    return NextResponse.json(
      { error: "An unexpected authentication error occurred" },
      { status: 500 }
    );
  }
}
