# Developer Guide: Week 4 Day 1 - Proxy and Authentication (RBAC) in Andy's Playroom

This guide walks you through setting up a secure authentication and authorization pipeline in Next.js using **Route Handlers** (as an API Auth Proxy) and **HTTP-only session cookies**, with **Role-Based Access Control (RBAC)** handled on the client side, all wrapped inside a premium **Toy Story (Andy's Playroom)** theme.

---

## Step-by-Step 

Here is the step-by-step checklist of tasks to implement authentication in the playroom.

### Phase 1: API Route Handlers (Auth Proxy)

#### Step 1: Forward Login Credentials to DummyJSON
*File: `src/app/api/auth/login/route.ts` (Marker: `// TODO PROXY AUTH 1`)*
Extract the username and password from the POST request body and forward them to the external identity service:
```typescript
const { username, password } = await request.json();
const response = await fetch("https://dummyjson.com/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, password, expiresInMins: 30 }),
});
```

#### Step 2: Extract Session Data and Map Playroom Roles
*File: `src/app/api/auth/login/route.ts` (Marker: `// TODO PROXY AUTH 2a`)*
Check if the response is successful. Extract the user details and access token, mapping credentials to Toy Story roles:
```typescript
const data = await response.json();
let role: "admin" | "editor" | "user" = "user";
if (data.username === "emilys") role = "admin"; // Andy
else if (data.username === "michaelw") role = "editor"; // Woody/Buzz
```

#### Step 3: Set Secure HttpOnly Session Cookie
*File: `src/app/api/auth/login/route.ts` (Marker: `// TODO PROXY AUTH 2b`)*
Structure the session payload and store it inside a secure, `HttpOnly` cookie containing the session object:
```typescript
const sessionData = { user: authUser, token: data.accessToken };
const cookieStore = await cookies();
cookieStore.set("session", JSON.stringify(sessionData), {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 30, // 30 minutes
});
```

#### Step 4: Clear Cookie Lifespan on Logout
*File: `src/app/api/auth/logout/route.ts` (Marker: `// TODO PROXY AUTH 3`)*
Delete the session by setting the `session` cookie value to empty and its `maxAge` to `0` on the server:
```typescript
const cookieStore = await cookies();
cookieStore.set("session", "", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 0,
});
```

#### Step 5: Read and Safely Return Mapped Session User
*File: `src/app/api/auth/me/route.ts` (Marker: `// TODO PROXY AUTH 4`)*
Read the `session` cookie, parse the JSON payload, and safely return the mapped user profile object to the client:
```typescript
const cookieStore = await cookies();
const sessionCookie = cookieStore.get("session");
if (!sessionCookie) return NextResponse.json(null, { status: 401 });
const sessionData = JSON.parse(sessionCookie.value);
return NextResponse.json(sessionData.user);
```

---

### Phase 2: Client-Side Integrations (SWR & Axios)

#### Step 6: Post Login via Axios and Mutate SWR Cache
*File: `src/app/login/page.tsx` (Marker: `// TODO PROXY AUTH 5`)*
Post input values to the API route, trigger cache revalidation via SWR's `mutate` utility with the returned user data, and redirect:
```typescript
const response = await axios.post("/api/auth/login", { username, password });
await mutate("/api/auth/me", response.data, true);
router.push("/dashboard");
```

#### Step 7: Subscribe to Active User State via useSWR
*File: `src/components/Navigation.tsx` (Marker: `// TODO PROXY AUTH 6`)*
Fetch the active user session in the navbar to render authenticated state:
```typescript
const { data: user } = useSWR<AuthUser>("/api/auth/me", fetcher);
```

#### Step 8: Clear Auth Proxy and Reset SWR Cache
*File: `src/components/Navigation.tsx` (Marker: `// TODO PROXY AUTH 7`)*
Send a request to expire the session cookie and mutate `/api/auth/me` SWR cache to `null`:
```typescript
await axios.post("/api/auth/logout");
await mutate("/api/auth/me", null, false);
router.push("/login");
```

#### Step 9: Bind SWR Session and Guards
*File: `src/app/dashboard/page.tsx` (Marker: `// TODO PROXY AUTH 8a`)*
Subscribe to `/api/auth/me` on the dashboard to authenticate console layouts:
```typescript
const { data: user, error, isLoading } = useSWR<AuthUser>("/api/auth/me", fetcher);
```

#### Step 10: Conditional Render Controls Based on Role (RBAC)
*File: `src/app/dashboard/page.tsx` (Marker: `// TODO PROXY AUTH 8b`)*
Check the user's role inside components to conditionally toggle dashboard panels:
```typescript
{user?.role === "admin" && (
  <Link href="/dashboard/admin-only">Open Toy Chest</Link>
)}
```

---

### Phase 3: Server-Side Security Gatekeeper (Next.js 16 `proxy.ts`)

#### Step 11 (`// TODO PROXY AUTH 9`): Intercept Dashboard Routes & Read Session Cookie
*File: `src/proxy.ts`*  
Intercept dashboard paths matching `/dashboard/:path*` and retrieve the secure session cookie value:
```typescript
if (pathname.startsWith("/dashboard")) {
  const sessionCookie = request.cookies.get("session")?.value;
}
```

#### Step 12 (`// TODO PROXY AUTH 10`): Redirect Unauthenticated Occupants to Login
*File: `src/proxy.ts`*  
If the session cookie is missing, redirect the browser to the playroom sign-in view:
```typescript
if (!sessionCookie) {
  const loginUrl = new URL("/login", request.url);
  return NextResponse.redirect(loginUrl);
}
```

#### Step 13 (`// TODO PROXY AUTH 11`): Parse Cookie Payload & Enforce Access Controls (RBAC)
*File: `src/proxy.ts`*  
Decode the user payload, redirect Sid (unapproved user role) to Sid's yard, and block toys (editor role) from Andy's secret chest:
```typescript
try {
  const sessionData: SessionData = JSON.parse(sessionCookie);
  const user = sessionData.user;

  if (user.role !== "admin" && user.role !== "editor") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/dashboard/admin-only") && user.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
} catch (error) {
  const loginRedirect = NextResponse.redirect(new URL("/login", request.url));
  loginRedirect.cookies.delete("session");
  return loginRedirect;
}
```

---

## How to Test & Verify

1. **Launch Dev Server**:
   ```bash
   bun dev
   ```
2. **Log in as Owner (Andy)**:
   - Username: `emilys`
   - Password: `emilyspass`
   - Verify access to Andy's Chest `/dashboard/admin-only`.
3. **Log in as Toy (Woody/Buzz)**:
   - Username: `michaelw`
   - Password: `michaelwspass`
   - Verify chest is locked.
4. **Inspect Cookie Security**:
   - Verify `session` cookie has `HttpOnly` and `SameSite=Lax` flags active in Chrome Developer Tools.
