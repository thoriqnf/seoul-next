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
    // TODO PROXY AUTH 1: Forward (proxy) the login request to the external DummyJSON authentication service
    // ==========================================
    /* UNCOMMENT FOR FINISHED IMPLEMENTATION
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Invalid credentials" },
        { status: response.status }
      );
    }

    const data = await response.json();
    */

    // ==========================================
    // TODO PROXY AUTH 2: Map roles based on username, create a secure HttpOnly session cookie, and return user profile
    // ==========================================
    /* UNCOMMENT FOR FINISHED IMPLEMENTATION
    let role: "admin" | "editor" | "user" = "user";
    if (data.username === "emilys") {
      role = "admin";
    } else if (data.username === "michaelw") {
      role = "editor";
    }

    const authUser: AuthUser = {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.image,
      role,
    };

    const sessionData: SessionData = {
      user: authUser,
      token: data.accessToken,
    };

    const cookieStore = await cookies();
    cookieStore.set("session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 30, // 30 minutes
    });

    return NextResponse.json(authUser);
    */

    // STARTER FALLBACK: Return a mock admin profile directly so that frontend runs immediately
    const mockUser: AuthUser = {
      id: 1,
      username: username,
      email: `${username}@example.com`,
      firstName: "Starter",
      lastName: "User",
      image: "https://dummyjson.com/icon/emilys/128",
      role: username === "emilys" ? "admin" : username === "michaelw" ? "editor" : "user",
    };

    const mockSession: SessionData = {
      user: mockUser,
      token: "mock-jwt-token",
    };

    const cookieStore = await cookies();
    cookieStore.set("session", JSON.stringify(mockSession), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 30,
    });

    return NextResponse.json(mockUser);
  } catch (error: any) {
    console.error("Login Proxy Error:", error);
    return NextResponse.json(
      { error: "An unexpected authentication error occurred" },
      { status: 500 }
    );
  }
}
