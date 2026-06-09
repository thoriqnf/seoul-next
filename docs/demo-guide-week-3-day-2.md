# Developer Guide: Next.js Server-Side Rendering (SSR) & Common Pitfalls (Week 3 Day 2)

This guide walks you through Next.js Server-Side Rendering (SSR) in the App Router. You will learn how to fetch data directly on the server, fetch multiple resources concurrently, stream parts of the page asynchronously using `<Suspense>`, and diagnose/resolve hydration mismatch and client global object errors using **nested routes**.

---

## Folder & Route Structure

Today's lesson is organized into dedicated sub-directories under `/ssr` to keep the topics isolated and clean:

* `/ssr` (`src/app/ssr/page.tsx`): SSR main entry, performing basic server data fetching and concurrent parallel API calls.
* `/ssr/streaming` (`src/app/ssr/streaming/page.tsx`): Asynchronous HTML streaming using React `<Suspense>` boundaries.
* `/ssr/hydration` (`src/app/ssr/hydration/page.tsx`): Understanding hydration errors and applying state synchronization fixes.
* `/ssr/client-apis` (`src/app/ssr/client-apis/page.tsx`): Guarding client-only globals (like `window` and `localStorage`) during server-side pre-rendering.

---

## Step-by-Step Task Walkthrough

### Phase 1: Preparation (Types & Navigation)

#### Step 1 (`// TODO SSR 1`): Add SSR Types & Navigation Link
1. Define the `Announcement` data type in `src/types/index.ts` to support our parallel fetching dataset:
```typescript
export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success";
}
```
2. Add a navigation link to the new route in `src/components/Navigation.tsx`:
```jsx
<Link
  href="/ssr"
  className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
>
  SSR Demo
</Link>
```

---

### Phase 2: Server-Side Data Fetching

#### Step 2 (`// TODO SSR 2`): Basic SSR Data Fetching
*File: `src/app/ssr/page.tsx`*
Mark the Server Component functional body as `async` and execute native `fetch` requests directly:
```typescript
interface DummyProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
}

interface DummyJSONResponse {
  products: DummyProduct[];
}

async function getProducts(): Promise<Flower[]> {
  const response = await fetch("https://dummyjson.com/products?limit=10", {
    cache: "no-store", // Opt-out of static building caching to fetch live records
  });
  if (!response.ok) throw new Error("Failed to fetch products");
  const data: DummyJSONResponse = await response.json();
  return data.products.map((product: DummyProduct) => ({
    id: String(product.id),
    name: product.title,
    price: product.price,
    description: product.description,
    image: product.thumbnail,
  }));
}
```

#### Step 3 (`// TODO SSR 3`): Parallel SSR Data Fetching
*File: `src/app/ssr/page.tsx`*
Instead of sequentially awaiting fetches which blocks resources, run requests concurrently using `Promise.all`:
```typescript
const [products, announcements] = await Promise.all([
  getProducts(),
  getAnnouncements(),
]);
```

---

### Phase 3: Streaming & Suspense

#### Step 4 (`// TODO SSR 4`): Streaming with React Suspense
*File: `src/app/ssr/streaming/page.tsx`*
Wrap slow-loading server components in a `<Suspense>` boundary. The static surrounding page content will render instantly, and the slow child streams in once resolved:
```jsx
import { Suspense } from "react";

<Suspense fallback={<div className="text-xs text-slate-500 animate-pulse py-4 text-center">Loading reviews...</div>}>
  <SlowReviewsComponent />
</Suspense>
```

---

### Phase 4: Fixing Common SSR Pitfalls

#### Step 5 (`// TODO SSR 5`): Resolving Hydration Mismatch
*File: `src/app/ssr/hydration/page.tsx`*
If markup values (like time or random IDs) differ on server render vs client mounting, React throws a hydration error.
* **Fix**: Force dynamic renders strictly inside client components using `useEffect` lifecycle synchronization:
```typescript
const [fixedTime, setFixedTime] = useState<string>("");

useEffect(() => {
  setFixedTime(new Date().toLocaleTimeString());
}, []);

return <div>{fixedTime || "Loading..."}</div>;
```

#### Step 6 (`// TODO SSR 6`): Guarding Browser-Only API Crashes
*File: `src/app/ssr/client-apis/page.tsx`*
Node.js lacks window/localStorage browser globals. Calling them outside client hooks during SSR triggers crashes.
* **Fix**: Ensure browser access is deferred until client hydration completes, or guard them with safe checks:
```typescript
useEffect(() => {
  if (typeof window !== "undefined") {
    setBrowserWidth(window.innerWidth);
    const saved = localStorage.getItem("isLoggedIn");
  }
}, []);
```

---

## How to Test & Verify

1. Run the dev server:
   ```bash
   bun dev
   ```
2. Navigate to the `/ssr` tab in your web browser. Try clicking each sub-topic to inspect the clean, focused templates.
3. Open the developer console. Verify there are **no console warnings** or errors on page load.
