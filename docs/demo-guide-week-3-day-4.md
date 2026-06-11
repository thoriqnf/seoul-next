# Developer Guide: Week 3 Day 4 Recap Project (Kumparin-Style News Portal)

This guide walks you through building a cohesive, premium **News Portal** inspired by the Indonesian news site **Kumparin**. The project recaps all the Next.js App Router rendering strategies and client optimization techniques covered throughout Week 3 (SSR, Parallel Fetching, Streaming/Suspense, SSG, ISR, SWR, and Hydration debugging) in **10 progressive steps**.

---

## Learning Objectives & Topics Covered

1. **Client-Side SWR Fetching** (Week 3 Day 3): Leverage `useSWR` for real-time, cached client data fetching with focus synchronization.
2. **Next.js Link Navigation** (Week 2 Day 2): Connect pages with Next.js SPA client-side transitions.
3. **Incremental Static Regeneration (ISR)** (Week 3 Day 3): Set up static cache revalidation intervals using `export const revalidate`.
4. **Form Constraints Validation** (Week 2 Day 3): Bind form states with constraints feedback using `react-hook-form`.
5. **Client Auth Guarding** (Week 2 Day 2): Protect admin dashboards from unauthenticated sessions on client mount.
6. **SSR Pitfalls & Hydration Safeguards** (Week 3 Day 2): Use dynamic lifecycles (`useEffect` / client state) to prevent hydration mismatches and client API crashes.
7. **SSR Parallel Fetching** (Week 3 Day 2): Execute concurrent server-side data fetches using `Promise.all` to prevent resource blocking.
8. **SSG Static Params Generation** (Week 3 Day 3): Pre-build dynamic route segments (`/news/[id]`) at build time using `generateStaticParams`.
9. **CRUD PUT Integrations & ISR Verification** (Week 2 Day 3 / Week 3 Day 3): Integrate REST PUT actions to modify a local `json-server` and verify the background ISR refresh behavior.
10. **Streaming HTML with React Suspense** (Week 3 Day 2): Stream slow-loading subcomponents asynchronously to speed up First Contentful Paint.

---

## Step-by-Step Task Walkthrough

### Phase 1: Client-Side Caching & Navigation (CSR & SPA)

#### Step 1 (`// TODO RECAP RENDER 1`): useSWR Caching & Fetching
*File: `src/app/news/feed/page.tsx`*
Use SWR in client components to fetch and cache live feeds, updating automatically in the background when the user returns to the browser tab:
```typescript
import useSWR from "swr";

const { data, error, isLoading } = useSWR<NewsArticle[]>(
  "https://dummyjson.com/posts?limit=10&skip=8",
  fetcher,
  {
    revalidateOnFocus: true,
    refreshInterval: 15000
  }
);
```

#### Step 2 (`// TODO RECAP RENDER 2`): Navigation Re-branding & Search Bind
*File: `src/components/Navigation.tsx`*
Set up standard SPA routing links and bind the search bar with client-side routing or state for seamless searching:
```jsx
import Link from "next/link";

<Link href="/news/breaking" className="text-sm font-semibold hover:text-[#00828A]">
  Breaking News (ISR)
</Link>
```

---

### Phase 2: Static Revalidation & Forms (ISR & Client Interactivity)

#### Step 3 (`// TODO RECAP RENDER 3`): ISR Revalidation Interval
*File: `src/app/news/breaking/page.tsx`*
Enable Incremental Static Regeneration to rebuild the page in the background. Set a 10-second revalidation period:
```typescript
export const revalidate = 10; // Revalidate every 10 seconds
```

#### Step 4 (`// TODO RECAP RENDER 4`): Form Register Validations
*File: `src/app/dashboard/page.tsx`*
Register input fields with validation constraints (e.g. required string length, non-empty bounds) using `react-hook-form`:
```jsx
<input
  type="text"
  {...register("title", {
    required: "Breaking headline is required",
    minLength: { value: 10, message: "Headline must be at least 10 characters" }
  })}
  className="input-field"
/>
```

#### Step 5 (`// TODO RECAP RENDER 5`): Dashboard Client-Side Auth Guard
*File: `src/app/dashboard/page.tsx`*
Protect administrative controls on mount by verifying credentials in local storage and redirecting non-admin sessions:
```typescript
useEffect(() => {
  const loginState = localStorage.getItem("isLoggedIn");
  if (loginState !== "true") {
    router.push("/login");
  } else {
    setIsChecking(false);
  }
}, [router]);
```

---

### Phase 3: Hydration Safeguards & SSR Parallel Fetching

#### Step 6 (`// TODO RECAP RENDER 6`): Guarding client-only APIs & Hydration
*File: `src/components/ReadHistoryTracker.tsx`*
Reading client-only global APIs (like `localStorage` or `window`) on the server causes crashes. Showing dynamic timestamps on server vs client triggers hydration mismatch errors.
**Fix**: Sync browser-only variables strictly inside `useEffect` on client mount:
```typescript
useEffect(() => {
  if (typeof window !== "undefined") {
    const status = localStorage.getItem(`post_read_${postId}`);
    // Update local states safely inside mount hook
  }
}, [postId]);
```

#### Step 7 (`// TODO RECAP RENDER 7`): SSR Parallel Data Fetching
*File: `src/app/page.tsx`*
Fetch main articles and category statistics concurrently on the server. This prevents waterfall blocking (where the second fetch waits for the first to complete).
```typescript
const [postsRes, trendingRes] = await Promise.all([
  fetch("https://dummyjson.com/posts?limit=3", { cache: "no-store" }),
  fetch("https://dummyjson.com/posts?limit=5&skip=3", { cache: "no-store" })
]);
```

---

### Phase 4: SSG & Data Integrations

#### Step 8 (`// TODO RECAP RENDER 8`): SSG Pre-generated Static Parameters
*File: `src/app/news/[id]/page.tsx`*
Statically pre-render articles with IDs `1`, `2`, and `3` at build time to serve them instantly to users:
```typescript
export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ];
}
```

#### Step 9 (`// TODO RECAP RENDER 9`): CRUD PUT Integration & ISR Test
*File: `src/app/dashboard/page.tsx`*
Save updates to the local `json-server` database, enabling you to test the background ISR refresh cycles on the `/news/breaking` view:
```typescript
const response = await axios.put("http://localhost:4000/breaking-news", {
  title: data.title,
  timestamp: new Date().toLocaleTimeString()
});
```

#### Step 10 (`// TODO RECAP RENDER 10`): Streaming Comments with Suspense
*File: `src/app/news/[id]/page.tsx`*
Render the main article contents instantly on the server, but wrap the comments section (which fetches from a slower endpoint) inside a React `<Suspense>` boundary to stream them asynchronously:
```jsx
<Suspense fallback={<div className="animate-pulse text-xs text-slate-400">Loading discussion...</div>}>
  <CommentsSection postId={article.id} />
</Suspense>
```

---

## How to Test & Verify

1. **Launch local JSON-Server**:
   ```bash
   npm run api
   ```
2. **Launch Dev Server**:
   ```bash
   npm run dev
   ```
3. **Run Build Checks**:
   Confirm that all static pre-rendering components resolve cleanly during production compiles:
   ```bash
   npm run build
   ```
