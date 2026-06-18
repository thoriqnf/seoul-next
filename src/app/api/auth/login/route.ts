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
    // TODO Recap Final 4: Forward credentials to dummyjson, map role, and set secure cookie
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

    const cookieStore = await cookies();
    cookieStore.set("session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 30,
    });

    // const authUser: AuthUser = {
    //   id: 1,
    //   username: "mock",
    //   email: "mock@domain.com",
    //   firstName: "Mock",
    //   lastName: "User",
    //   image: "",
    //   role: "explorer",
    // };

    return NextResponse.json(authUser);
  } catch (error) {
    console.error("Login Proxy Error:", error);
    return NextResponse.json(
      { error: "An unexpected authentication error occurred" },
      { status: 500 }
    );
  }
}
