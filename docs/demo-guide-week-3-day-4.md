# Developer Guide: Week 3 Day 4 Recap Project (Kumparan-Style News Portal)

This guide walks you through building a cohesive, premium **News Portal** inspired by the Indonesian news site **Kumparan**. The project recaps all the Next.js App Router rendering strategies and client optimization techniques covered throughout Week 3 (SSR, Parallel Fetching, Streaming/Suspense, SSG, ISR, SWR, and Hydration debugging) in **10 progressive steps**.

---

## Learning Objectives & Topics Covered

1. **SSR Parallel Fetching** (Week 3 Day 2): Execute concurrent server-side data fetches using `Promise.all` to prevent resource blocking.
2. **Next.js Link Navigation** (Week 2 Day 2): Connect pages with Next.js SPA client-side transitions.
3. **SSG Static Params Generation** (Week 3 Day 3): Pre-build dynamic route segments (`/news/[id]`) at build time using `generateStaticParams`.
4. **Streaming HTML with React Suspense** (Week 3 Day 2): Stream slow-loading subcomponents asynchronously to speed up First Contentful Paint.
5. **SSR Pitfalls & Hydration Safeguards** (Week 3 Day 2): Use dynamic lifecycles (`useEffect` / client state) to prevent hydration mismatches and client API crashes.
6. **Incremental Static Regeneration (ISR)** (Week 3 Day 3): Set up static cache revalidation intervals using `export const revalidate`.
7. **Client-Side SWR Fetching** (Week 3 Day 3): Leverage `useSWR` for real-time, cached client data fetching with focus synchronization.
8. **Client Auth Guarding** (Week 2 Day 2): Protect admin dashboards from unauthenticated sessions on client mount.
9. **Form Constraints Validation** (Week 2 Day 3): Bind form states with constraints feedback using `react-hook-form`.
10. **CRUD PUT Integrations & ISR Verification** (Week 2 Day 3 / Week 3 Day 3): Integrate REST PUT actions to modify a local `json-server` and verify the background ISR refresh behavior.

---

## Step-by-Step Task Walkthrough

### Phase 1: Shared Layout & Home Page (SSR & Parallel Fetching)

#### Step 1 (`// TODO RECAP 1`): SSR Parallel Data Fetching
*File: `src/app/page.tsx`*
Fetch main articles and category statistics concurrently on the server. This prevents waterfall blocking (where the second fetch waits for the first to complete).
```typescript
const [articlesResponse, statsResponse] = await Promise.all([
  fetch("https://dummyjson.com/posts?limit=8"),
  fetch("https://dummyjson.com/posts?limit=30") // used to compute dummy analytics
]);
```

#### Step 2 (`// TODO RECAP 2`): Navigation Re-branding & Search Bind
*File: `src/components/Navigation.tsx`*
Set up standard SPA routing links and bind the search bar with client-side routing or state for seamless searching:
```jsx
import Link from "next/link";

<Link href="/news/breaking" className="text-sm font-semibold hover:text-[#00828A]">
  Breaking News
</Link>
```

---

### Phase 2: Dynamic Detail Page (SSG, Streaming, and Hydration Mismatch Fix)

#### Step 3 (`// TODO RECAP 3`): SSG Pre-generated Static Parameters
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

#### Step 4 (`// TODO RECAP 4`): Streaming Comments with Suspense
*File: `src/app/news/[id]/page.tsx`*
Render the main article contents instantly on the server, but wrap the comments section (which fetches from a slower endpoint) inside a React `<Suspense>` boundary to stream them asynchronously:
```jsx
import { Suspense } from "react";
import { CommentsSection } from "@/components/CommentsSection";

<Suspense fallback={<div className="animate-pulse text-xs text-slate-400">Loading discussion...</div>}>
  <CommentsSection postId={id} />
</Suspense>
```

#### Step 5 (`// TODO RECAP 5`): Guarding client-only APIs & Hydration
*File: `src/app/news/[id]/page.tsx`*
Reading client-only global APIs (like `localStorage` or `window`) on the server causes crashes. Showing dynamic timestamps on server vs client triggers hydration mismatch errors.
**Fix**: Sync browser-only variables strictly inside `useEffect` on client mount:
```typescript
const [readStatus, setReadStatus] = useState<string>("Unread");

useEffect(() => {
  const history = localStorage.getItem(`read_post_${id}`);
  if (history) {
    setReadStatus("Already Read");
  } else {
    localStorage.setItem(`read_post_${id}`, "true");
  }
}, [id]);
```

---

### Phase 3: Incremental Static Regeneration (ISR)

#### Step 6 (`// TODO RECAP 6`): ISR Revalidation Interval
*File: `src/app/news/breaking/page.tsx`*
Enable Incremental Static Regeneration to rebuild the page in the background. Set a 10-second revalidation period:
```typescript
export const revalidate = 10; // Revalidate every 10 seconds
```

---

### Phase 4: Client-Side SWR Data Fetching

#### Step 7 (`// TODO RECAP 7`): useSWR Caching & Fetching
*File: `src/app/news/feed/page.tsx`*
Use SWR in client components to fetch and cache live feeds, updating automatically in the background when the user returns to the browser tab:
```typescript
import useSWR from "swr";

const { data, error, isLoading } = useSWR<NewsArticle[]>(
  "https://dummyjson.com/posts?limit=10&skip=8",
  fetcher,
  {
    revalidateOnFocus: true,
    refreshInterval: 5000
  }
);
```

---

### Phase 5: Admin Panel (CRUD Operations & Auth Guarding)

#### Step 8 (`// TODO RECAP 8`): Dashboard Client-Side Auth Guard
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

#### Step 9 (`// TODO RECAP 9`): Form Register Validations
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

#### Step 10 (`// TODO RECAP 10`): CRUD PUT Integration & ISR Test
*File: `src/app/dashboard/page.tsx`*
Save updates to the local `json-server` database, enabling you to test the background ISR refresh cycles on the `/news/breaking` view:
```typescript
const response = await axios.put("http://localhost:4000/breaking-news", {
  title: data.title,
  timestamp: new Date().toLocaleTimeString()
});
// Reset form fields or display success alert
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
