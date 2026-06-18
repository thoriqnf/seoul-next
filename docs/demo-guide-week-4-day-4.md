# Developer Guide: Week 4 Day 4 — Full Recap: Ramen Discovery 🍜

This is the **grand finale** of the course. We build **Ramen Discovery** — a premium recipe platform — and use it to revisit every major concept from the last two weeks (W3D2 → W4D3) in a single cohesive app.

**App concept:** Users browse and save authentic ramen recipes from around the world. A curator team manages which recipes are featured. All data comes from `dummyjson.com/recipes`.

**Aesthetic:** Dark izakaya — deep black, crimson red, burnished gold. Fonts: `Noto Serif JP` + `DM Sans`.

---

## What Is Pre-Built (Scaffolding — No TODOs)

When you open this branch, the following is already complete:

- **TypeScript types** (`src/types/index.ts`) — `Recipe`, `SavedRecipe`, `AuthUser`
- **Login page** (`src/app/login/page.tsx`) — `react-hook-form` wired up
- **Unauthorized page** (`src/app/unauthorized/page.tsx`)
- **RecipeCard component** (`src/components/RecipeCard.tsx`) — card JSX layout
- **SavedDrawer component** (`src/components/SavedDrawer.tsx`) — slide-in panel shell
- **Navigation component** (`src/components/Navigation.tsx`) — base nav structure
- **Dark theme CSS** (`src/app/globals.css`) — ramen color tokens
- **Landing page** (`src/app/page.tsx`) — hero section shell

Your job is to fill in the **26 TODO markers** below, which cover all the Week 3 + Week 4 concepts.

---

## Running the App

```bash
bun dev
```

Navigate to `http://localhost:3000`.

---

## Group A: SSR — `/recipes` (W3D2 Recap)

**File:** `src/app/recipes/page.tsx`

### What is SSR in the App Router?

In Next.js App Router, **async Server Components** fetch data directly on the server before sending HTML to the browser. No `useEffect`, no loading spinner for the initial paint — the data arrives with the page.

```
Browser request → Next.js server → fetch dummyjson → render HTML → send to browser
```

### TODO Recap Final 1
**File:** `src/app/recipes/page.tsx`

Make the component `async` and fetch recipes server-side:

```typescript
const response = await fetch(
  "https://dummyjson.com/recipes?limit=30&select=id,name,image,cuisine,rating,caloriesPerServing,tags,difficulty",
  { cache: "no-store" }
);
const { recipes }: { recipes: Recipe[] } = await response.json();
```

> **Why `cache: "no-store"`?** This forces a fresh fetch on every request — pure SSR. Without it, Next.js may cache the result (SSG behaviour). We want the data to always be fresh from the server.

---

### TODO Recap Final 2
**File:** `src/app/recipes/page.tsx`

Pass the server-fetched data into the `RecipeCard` client component via props:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {recipes.map((recipe) => (
    <RecipeCard key={recipe.id} recipe={recipe} />
  ))}
</div>
```

> **Key concept:** Server Components can pass data as props to Client Components (`"use client"`). The data serializes as JSON across the Server→Client boundary.

---

## Group B: SSG + ISR — `/recipes/[id]` (W3D3 Recap)

**File:** `src/app/recipes/[id]/page.tsx`

### What is SSG + ISR?

**SSG (Static Site Generation):** Pages are pre-rendered at build time and served as static HTML. Blazing fast — no server work per request.

**ISR (Incremental Static Regeneration):** Static pages automatically re-generate in the background after a time interval. You get static speed *and* fresh data.

### TODO Recap Final 3
**File:** `src/app/recipes/[id]/page.tsx`

Tell Next.js which recipe IDs to pre-render at build time:

```typescript
export async function generateStaticParams() {
  const response = await fetch("https://dummyjson.com/recipes?limit=10&select=id");
  const { recipes } = await response.json();
  return recipes.map((recipe: { id: number }) => ({ id: String(recipe.id) }));
}
```

> **What happens at build time?** Next.js calls `generateStaticParams`, gets the IDs, then renders each `/recipes/1`, `/recipes/2`, etc. as a static HTML file. These pages load instantly for users.

---

### TODO Recap Final 4
**File:** `src/app/recipes/[id]/page.tsx`

Enable ISR — regenerate this page every 60 seconds:

```typescript
export const revalidate = 60;
```

> **How ISR works:** After 60 seconds, the next request triggers a background re-render. The user still sees the old static page immediately — no wait. The freshly rendered page replaces it for future visitors.

---

## Group C: SWR (W3D3 Recap)

### What is SWR?

SWR (Stale-While-Revalidate) is a client-side data fetching library. It caches responses keyed by URL, serves stale data instantly, then revalidates in the background.

```
First visit  → fetch → cache
Second visit → serve cache instantly → revalidate background
```

### TODO Recap Final 5
**File:** `src/components/Navigation.tsx`

Subscribe to the active session using SWR:

```typescript
const { data: user } = useSWR<AuthUser>("/api/auth/me", fetcher);
```

> **Why SWR for session?** Any component can call `useSWR("/api/auth/me")` and they all share the same cached result. No prop drilling, no Context needed for the session object itself.

---

### TODO Recap Final 6
**File:** `src/app/saved/page.tsx`

Sync the saved recipes list on the `/saved` page with periodic revalidation:

```typescript
const { data: savedRecipes } = useSWR<SavedRecipe[]>(
  "/api/saved",
  fetcher,
  { refreshInterval: 5000 }
);
```

> **`refreshInterval`:** Re-fetches every 5 seconds automatically. Good for showing real-time changes without the user refreshing.

---

## Group D: Auth Proxy — Route Handlers (W4D1 Recap)

**Files:** `src/app/api/auth/login/route.ts`, `src/app/api/auth/me/route.ts`, `src/app/api/auth/logout/route.ts`

### The Pattern

The client never talks to the external API directly. All auth goes through our own API route handlers (the "proxy"), which manage the HttpOnly cookie invisibly.

```
Browser → POST /api/auth/login → Next.js Route Handler → dummyjson → set cookie → response
```

### TODO Recap Final 7
**File:** `src/app/api/auth/login/route.ts`

Forward credentials to dummyjson and map the username to a Ramen Discovery role:

```typescript
const { username, password } = await request.json();
const response = await fetch("https://dummyjson.com/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, password, expiresInMins: 30 }),
});
const data = await response.json();

let role: "master-curator" | "recipe-editor" | "explorer" = "explorer";
if (data.username === "emilys") role = "master-curator";
else if (data.username === "michaelw") role = "recipe-editor";
```

---

### TODO Recap Final 8
**File:** `src/app/api/auth/login/route.ts`

Store the session in a secure, HttpOnly cookie:

```typescript
const sessionData = { user: { ...authUser, role }, token: data.accessToken };
const cookieStore = await cookies();
cookieStore.set("session", JSON.stringify(sessionData), {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 30,
});
```

> **Why `httpOnly`?** JavaScript running in the browser cannot read HttpOnly cookies. This protects the session token from XSS attacks — even if a malicious script runs on your page, it cannot steal the cookie.

---

### TODO Recap Final 9
**File:** `src/app/api/auth/me/route.ts`

Read the cookie, parse the session, and return the user object:

```typescript
const cookieStore = await cookies();
const sessionCookie = cookieStore.get("session");
if (!sessionCookie) return NextResponse.json(null, { status: 401 });
const sessionData = JSON.parse(sessionCookie.value);
return NextResponse.json(sessionData.user);
```

---

### TODO Recap Final 10
**File:** `src/app/api/auth/logout/route.ts`

Clear the session cookie by setting `maxAge` to `0`:

```typescript
const cookieStore = await cookies();
cookieStore.set("session", "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
return NextResponse.json({ success: true });
```

---

## Group E: RBAC Middleware — proxy.ts (W4D1 Recap)

**File:** `src/proxy.ts`

### What is Middleware in Next.js?

`proxy.ts` (the middleware file) runs on **every request before** the page renders. It's the server-side gatekeeper that checks authentication and roles.

### TODO Recap Final 11
**File:** `src/proxy.ts`

Intercept `/saved` requests and check for a session cookie:

```typescript
if (pathname.startsWith("/saved")) {
  const sessionCookie = request.cookies.get("session")?.value;
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
```

---

### TODO Recap Final 12
**File:** `src/proxy.ts`

Parse the role and block food explorers from `/saved`:

```typescript
try {
  const sessionData: SessionData = JSON.parse(sessionCookie);
  const user = sessionData.user;
  if (user.role === "explorer") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
} catch {
  const redirect = NextResponse.redirect(new URL("/login", request.url));
  redirect.cookies.delete("session");
  return redirect;
}
```

> **Try/catch matters:** A tampered or expired cookie may fail to parse. We clear the cookie and redirect rather than crashing.

---

## Group F: React Context + useReducer — Notifications (W4D2 Recap)

**Files:** `src/contexts/NotifContext.tsx`, `src/components/ToastContainer.tsx`, `src/app/layout.tsx`

### The Pattern

```
dispatch(action) → reducer(state, action) → new state → all consumers re-render
```

### TODO Recap Final 13
**File:** `src/contexts/NotifContext.tsx`

Define the action types and implement the reducer:

```typescript
type NotifAction =
  | { type: "ADD_NOTIF"; payload: Notification }
  | { type: "DISMISS_NOTIF"; payload: { id: string } };

function notifReducer(state: Notification[], action: NotifAction): Notification[] {
  switch (action.type) {
    case "ADD_NOTIF":
      return [action.payload, ...state];
    case "DISMISS_NOTIF":
      return state.filter((n) => n.id !== action.payload.id);
    default:
      return state;
  }
}
```

---

### TODO Recap Final 14
**File:** `src/contexts/NotifContext.tsx`

Create the context and Provider:

```typescript
interface NotifContextValue {
  notifications: Notification[];
  dispatch: React.Dispatch<NotifAction>;
}
const NotifContext = createContext<NotifContextValue | null>(null);

export function NotifProvider({ children }: { children: ReactNode }) {
  const [notifications, dispatch] = useReducer(notifReducer, []);
  return (
    <NotifContext.Provider value={{ notifications, dispatch }}>
      {children}
    </NotifContext.Provider>
  );
}
```

---

### TODO Recap Final 15
**File:** `src/contexts/NotifContext.tsx`

Export a custom hook with a null guard:

```typescript
export function useNotif() {
  const context = useContext(NotifContext);
  if (!context) throw new Error("useNotif must be used inside <NotifProvider>");
  return context;
}
```

---

### TODO Recap Final 16
**File:** `src/app/layout.tsx`

Mount the provider and the toast UI in the root layout:

```tsx
<NotifProvider>
  {children}
  <ToastContainer />
</NotifProvider>
```

---

### TODO Recap Final 17
**File:** `src/components/ToastContainer.tsx`

Render toasts and auto-dismiss each one after 3 seconds:

```tsx
export function ToastContainer() {
  const { notifications } = useNotif();
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
      {notifications.map((n) => <ToastItem key={n.id} {...n} />)}
    </div>
  );
}

function ToastItem({ id, message, type }: Notification) {
  const { dispatch } = useNotif();
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "DISMISS_NOTIF", payload: { id } });
    }, 3000);
    return () => clearTimeout(timer);
  }, [id, dispatch]);
  // ... render JSX
}
```

> **Why `clearTimeout` in the cleanup?** If the user manually dismisses a toast before 3s, the component unmounts. Without cleanup, the timer fires on a dead component. The cleanup function prevents this memory leak.

---

## Group G: React Context — Saved Recipes (W4D2 Recap)

**Files:** `src/contexts/SavedContext.tsx`, `src/app/layout.tsx`

### TODO Recap Final 18
**File:** `src/contexts/SavedContext.tsx`

Define the actions and reducer:

```typescript
type SavedAction =
  | { type: "SAVE"; payload: Recipe }
  | { type: "UNSAVE"; payload: { id: number } }
  | { type: "CLEAR" };

function savedReducer(state: Recipe[], action: SavedAction): Recipe[] {
  switch (action.type) {
    case "SAVE":
      return state.find((r) => r.id === action.payload.id)
        ? state
        : [...state, action.payload];
    case "UNSAVE":
      return state.filter((r) => r.id !== action.payload.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}
```

---

### TODO Recap Final 19
**File:** `src/contexts/SavedContext.tsx`

Create the context, derive `savedCount`, and mount the Provider in `layout.tsx`:

```typescript
// In SavedContext.tsx
export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedRecipes, dispatch] = useReducer(savedReducer, []);
  const savedCount = savedRecipes.length;
  return (
    <SavedContext.Provider value={{ savedRecipes, savedCount, dispatch }}>
      {children}
    </SavedContext.Provider>
  );
}

// In layout.tsx — add alongside NotifProvider:
<SavedProvider>{children}</SavedProvider>
```

---

### TODO Recap Final 20
**File:** `src/components/RecipeCard.tsx` + `src/components/Navigation.tsx`

Wire `useSaved()` to the save button and the nav badge:

```typescript
// In RecipeCard — save button handler:
const { dispatch } = useSaved();
const handleSave = () => {
  dispatch({ type: "SAVE", payload: recipe });
  notifDispatch({ type: "ADD_NOTIF", payload: {
    id: `save-${recipe.id}-${Date.now()}`,
    message: `🍜 ${recipe.name} saved!`,
    type: "success",
  }});
};

// In Navigation — badge:
const { savedCount } = useSaved();
{savedCount > 0 && (
  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center">
    {savedCount > 9 ? "9+" : savedCount}
  </span>
)}
```

---

## Group H: useMemo + useCallback (W4D3 Recap)

**File:** `src/app/recipes/page.tsx`

### TODO Recap Final 21
Track filter runs and memoize the result:

```typescript
const filterRunCount = useRef(0);

const filteredRecipes = useMemo(() => {
  filterRunCount.current += 1;
  return recipes.filter((recipe) => {
    const matchesCuisine = !cuisineFilter || recipe.cuisine === cuisineFilter;
    const matchesDifficulty = !difficultyFilter || recipe.difficulty === difficultyFilter;
    return matchesCuisine && matchesDifficulty;
  });
}, [recipes, cuisineFilter, difficultyFilter]);
```

> **Without `useMemo`:** every keystroke in the counter/search re-runs the filter even if cuisine/difficulty didn't change. With `useMemo`, the filter only runs when its dependencies actually change.

---

### TODO Recap Final 22
Stabilize the filter handler with `useCallback` and memoize the child:

```typescript
const handleCuisineChange = useCallback((value: string) => {
  setCuisineFilter(value);
}, []);

// FilterBar child component:
const FilterBar = React.memo(function FilterBar({
  onCuisineChange,
  renderCount,
}: {
  onCuisineChange: (val: string) => void;
  renderCount: React.MutableRefObject<number>;
}) {
  renderCount.current += 1;
  // ...
});
```

> **`React.memo` + `useCallback` together:** `memo` does shallow prop comparison. If `onCuisineChange` is a new function reference on every render (no `useCallback`), memo can't help. Both are needed for the optimization to work.

---

## Group I: Custom Hooks + next/image + next/font (W4D3 Recap)

### TODO Recap Final 23
**File:** `src/app/saved/page.tsx`

Persist saved recipe IDs in localStorage using the pre-built custom hook:

```typescript
const [savedIds, setSavedIds] = useLocalStorage<number[]>("ramen-discovery-saved", []);

// Sync Context saves to localStorage:
useEffect(() => {
  setSavedIds(savedRecipes.map((r) => r.id));
}, [savedRecipes, setSavedIds]);
```

> **Hard refresh test:** Save a recipe, press `Cmd+Shift+R` — your saved list comes back. That's `useLocalStorage` persisting across sessions.

---

### TODO Recap Final 24
**File:** `src/app/recipes/page.tsx`

Use the `useMediaQuery` custom hook to dynamically pick the grid column count:

```typescript
const isMobile = useMediaQuery("(max-width: 767px)");
const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
const gridCols = isMobile ? 1 : isTablet ? 2 : 3;
```

---

### TODO Recap Final 25
**File:** `src/app/page.tsx` + `src/components/RecipeCard.tsx`

Use `next/image` with proper `width`/`height` on cards and `fill` + `priority` on the hero:

```tsx
// In RecipeCard — thumbnail:
<Image
  src={recipe.image}
  alt={recipe.name}
  width={400}
  height={300}
  className="object-cover w-full h-48 rounded-t-xl"
/>

// In page.tsx — hero:
<div className="relative w-full h-96">
  <Image
    src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1600"
    alt="Ramen Discovery Hero"
    fill
    priority
    className="object-cover"
  />
</div>
```

> **Why `priority`?** The hero image is above-the-fold. `priority` disables lazy loading, fetches it early, and directly improves **LCP (Largest Contentful Paint)**.

---

### TODO Recap Final 26
**File:** `src/app/layout.tsx`

Load fonts at build time with `next/font/google` and apply via CSS variable:

```typescript
import { Noto_Serif_JP, DM_Sans } from "next/font/google";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif-jp",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

// In JSX:
<body className={`${notoSerifJP.variable} ${dmSans.variable}`}>
```

> **vs `<link href="fonts.googleapis.com">`**: That causes an external network request at render time. `next/font` downloads the font files **at build time** and self-hosts them. No Google request, no privacy leak, no CLS from late-loading fonts.

---

## Zustand Bonus — if time allows (W4D2 Recap)

**File:** `src/store/savedStore.ts`

### TODO Bonus 1

```typescript
interface SavedStore {
  savedRecipes: Recipe[];
  savedCount: number;
  saveRecipe: (recipe: Recipe) => void;
  unsaveRecipe: (id: number) => void;
  clearSaved: () => void;
}

export const useSavedStore = create<SavedStore>((set, get) => ({
  savedRecipes: [],
  savedCount: 0,
  saveRecipe: (recipe) => {
    if (get().savedRecipes.find((r) => r.id === recipe.id)) return;
    const updated = [...get().savedRecipes, recipe];
    set({ savedRecipes: updated, savedCount: updated.length });
  },
  unsaveRecipe: (id) => {
    const updated = get().savedRecipes.filter((r) => r.id !== id);
    set({ savedRecipes: updated, savedCount: updated.length });
  },
  clearSaved: () => set({ savedRecipes: [], savedCount: 0 }),
}));
```

### TODO Bonus 2

Swap in `RecipeCard.tsx` and `Navigation.tsx`:

```typescript
// Before (Context):
const { dispatch } = useSaved();
dispatch({ type: "SAVE", payload: recipe });

// After (Zustand):
const { saveRecipe } = useSavedStore();
saveRecipe(recipe);
```

> **Punchline:** The JSX doesn't change at all. If the hook API matches, swapping state managers is a one-line change per file. No Provider needed for Zustand — it's global by default.

---

## Verification Checklist

1. `/` — SSG landing, Noto Serif JP heading, hero image loads with priority
2. `/recipes` — SSR list renders from dummyjson, cuisine/difficulty filter works, run-count stays flat
3. `/recipes/[id]` — detail page loads, ISR revalidate = 60 noted in guide
4. Save a recipe → nav badge increments → toast appears → auto-dismisses at 3s
5. Open saved drawer → saved cards listed, unsave removes them
6. Not logged in → `/saved` → redirected to `/login`
7. Login as `emilys` → `/saved` accessible
8. Login as regular user → `/saved` → redirected to `/unauthorized`
9. Logout → cookie cleared, redirect to `/login`
10. Hard refresh (`Cmd+Shift+R`) → saved IDs persist via `useLocalStorage`
11. Resize window → recipe grid switches 1 → 2 → 3 columns
12. Zustand bonus → same UX, zero JSX changes

---

## Test Accounts

| Username | Password | Role |
|---|---|---|
| `emilys` | `emilyspass` | Master Curator (admin) |
| `michaelw` | `michaelwpass` | Recipe Editor (editor) |
| `atuny0` | `9uQFF1Lh` | Food Explorer (user → /unauthorized) |
