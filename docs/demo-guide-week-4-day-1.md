# Developer Guide: Week 4 Day 1 - Proxy and Authentication (RBAC) in Toyiverse

This guide walks you through setting up a secure authentication and authorization pipeline in Next.js using **Route Handlers** (as an API Auth Proxy) and **HTTP-only session cookies**, with **Role-Based Access Control (RBAC)** handled on the client side, all wrapped inside a premium **Online Toy Store ("Toyiverse")** theme.

---

## Learning Objectives & Topics Covered

1. **API Route Handlers (Auth Proxy)**: Proxy client-side authentication requests to external services (`https://dummyjson.com/auth/login`) to prevent exposure of third-party API configurations.
2. **Secure HTTP-Only Cookies**: Save authentication session objects securely inside server-set `HttpOnly` cookies, shielding them from client-side XSS scripting.
3. **Role-Based Access Control (RBAC)**: Check user permissions in components to render views according to roles:
   - **Store Owner** (`admin` role): Full access to inventory, financials, and ledger configurations.
   - **Store Assistant** (`editor` role): Access to basic dashboard, but blocked from financial metrics.
   - **Customer** (`user` role): Blocked from Staff Console entirely.
4. **Real-time Client Auth Synchronization**: Bind global state tracking using `useSWR` to share session data seamlessly between navigation bars and layout pages.
5. **Axios POST Mutations with SWR**: Integrate action-based calls (login and logout) via Axios, trigger cache revalidation via SWR's `mutate` utility, and inspect HTTP-only cookies in developer tools.

---

## Step-by-Step Task Walkthrough

### Phase 1: API Route Handlers (Auth Proxy)

#### Step 1 (`// TODO PROXY AUTH 1`): Proxy Post Request to DummyJSON
*File: `src/app/api/auth/login/route.ts`*  
Proxy the client-side login request to the secure external identity service.
```typescript
const response = await fetch("https://dummyjson.com/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, password, expiresInMins: 30 }),
});
```

#### Step 2 (`// TODO PROXY AUTH 2`): Map Mocks and Set Secure Cookies
*File: `src/app/api/auth/login/route.ts`*  
Assign roles based on username credentials (`emilys` -> `admin` as Store Owner, `michaelw` -> `editor` as Store Assistant), structure a session object, and write it into a secure `HttpOnly` Lax cookie:
```typescript
let role: "admin" | "editor" | "user" = "user";
if (data.username === "emilys") role = "admin";
else if (data.username === "michaelw") role = "editor";

const cookieStore = await cookies();
cookieStore.set("session", JSON.stringify({ user: authUser, token: data.accessToken }), {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 30, // 30 minutes
});
```

#### Step 3 (`// TODO PROXY AUTH 3`): Clear Session Cookie on Logout
*File: `src/app/api/auth/logout/route.ts`*  
Flush user sessions on the server by setting the session cookie lifetime to expire.
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

#### Step 4 (`// TODO PROXY AUTH 4`): Retrieve Active Session Profile
*File: `src/app/api/auth/me/route.ts`*  
Retrieve, parse, and safely return the active profile details from the session cookie.
```typescript
const cookieStore = await cookies();
const sessionCookie = cookieStore.get("session");
const sessionData = JSON.parse(sessionCookie.value);
return NextResponse.json(sessionData.user);
```

---

### Phase 2: Client-Side Integrations (SWR & Axios)

#### Step 5 (`// TODO PROXY AUTH 5`): Post Credentials using Axios
*File: `src/app/login/page.tsx`*  
Post inputs to the local auth proxy endpoint using Axios, and update the global SWR user cache:
```typescript
const response = await axios.post("/api/auth/login", { username, password });
await mutate("/api/auth/me", response.data, true);
```

#### Step 6 (`// TODO PROXY AUTH 6`): Fetch Session State with useSWR
*File: `src/components/Navigation.tsx`*  
Fetch the active user session in real-time, sharing state between the navbar and views:
```typescript
const { data: user } = useSWR<AuthUser>("/api/auth/me", fetcher);
```

#### Step 7 (`// TODO PROXY AUTH 7`): Perform Axios Logout & SWR Mutation
*File: `src/components/Navigation.tsx`*  
Submit a POST request to `/api/auth/logout` and reset SWR cache optimistically:
```typescript
await axios.post("/api/auth/logout");
await mutate("/api/auth/me", null, false);
```

#### Step 8 (`// TODO PROXY AUTH 8`): Implement SWR Guards and Conditional Displays
*File: `src/app/dashboard/page.tsx`*  
Switch local storage auth checks with `useSWR("/api/auth/me")`, and render Owner-only settings links depending on the user's role:
```typescript
const { data: user } = useSWR<AuthUser>("/api/auth/me", fetcher);

{user?.role === "admin" && (
  <Link href="/dashboard/admin-only">Configure Store Settings</Link>
)}
```

---

## How to Test & Verify

1. **Launch Dev Server**:
   ```bash
   npm run dev
   ```
2. **Log in as Store Owner**:
   - Username: `emilys`
   - Password: `emilyspass`
   - Verify that you are greeted as a **Store Owner** and can click "Configure Store Settings" to access the `/dashboard/admin-only` route.
3. **Log in as Store Assistant**:
   - Username: `michaelw`
   - Password: `michaelwspass`
   - Verify that you are logged in as a **Store Assistant** and the owner controls card is hidden.
4. **Inspect Cookie Security**:
   - Open Chrome DevTools -> Application -> Cookies.
   - Verify that the `session` cookie has `HTTP` checked (HttpOnly) and cannot be read via `document.cookie` in the Console.
