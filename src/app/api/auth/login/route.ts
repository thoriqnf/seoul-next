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
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, expiresInMins: 30 }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Invalid credentials" },
        { status: response.status }
      );
    }

    const data = await response.json();

    let role: "master-curator" | "recipe-editor" | "explorer" = "explorer";
    if (data.username === "emilys") role = "master-curator";
    else if (data.username === "michaelw") role = "recipe-editor";

    const authUser: AuthUser = {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.image,
      role,
    };

    const sessionData: SessionData = { user: authUser, token: data.accessToken };

    // ==========================================
    // TODO Recap Final 8: Set HttpOnly session cookie with sessionData payload
    // ==========================================
    const cookieStore = await cookies();
    cookieStore.set("session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 30,
    });

    return NextResponse.json(authUser);
  } catch (error) {
    console.error("Login Proxy Error:", error);
    return NextResponse.json(
      { error: "An unexpected authentication error occurred" },
      { status: 500 }
    );
  }
}
