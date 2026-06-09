# Developer Guide: Next.js App Router Rendering Strategies & SWR (Week 3 Day 3)

This guide walks you through Next.js Static Site Generation (SSG), Incremental Static Regeneration (ISR), and Client-Side Data Fetching using SWR in the App Router. You will learn how to pre-generate dynamic routes, schedule background static page regeneration, and fetch dynamic client data with cache synchronization.

---

## Folder & Route Structure

Today's lesson is organized into dedicated sub-directories under `/rendering` to keep the topics isolated and clean:

* `/rendering` (`src/app/rendering/page.tsx`): Main hub overview linking to all demos.
* `/rendering/ssg` (`src/app/rendering/ssg/page.tsx`): Overview of Static Site Generation with a flower catalog.
* `/rendering/ssg/[id]` (`src/app/rendering/ssg/[id]/page.tsx`): Statically generated detail pages using `generateStaticParams`.
* `/rendering/isr` (`src/app/rendering/isr/page.tsx`): Incremental Static Regeneration displaying static data refreshed every 10 seconds.
* `/rendering/swr` (`src/app/rendering/swr/page.tsx`): Client-side data fetching with SWR, including automatic caching.

---

## Step-by-Step Task Walkthrough

### Phase 1: Navigation Hook

#### Step 1 (`// TODO SSG 1`): Add Navigation Link
*File: `src/components/Navigation.tsx`*
Add the new route to the navbar list:
```jsx
<Link
  href="/rendering"
  className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
>
  Rendering Demo
</Link>
```

---

### Phase 2: Static Site Generation (SSG)

#### Step 2 (`// TODO SSG 2`): Define Static Parameter Generators
*File: `src/app/rendering/ssg/[id]/page.tsx`*
Pre-generate standard route parameters at build time:
```typescript
export async function generateStaticParams() {
  // Return a list of params to statically pre-build
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ];
}
```

#### Step 3 (`// TODO SSG 3`): Fetch and Render Static Dynamic Details
*File: `src/app/rendering/ssg/[id]/page.tsx`*
Force out-of-bounds dynamic queries to return 404 (by disabling generic dynamic builds on-demand) and render the statically pre-built pages:
```typescript
export const dynamicParams = false; // IDs other than 1, 2, 3 return 404

// Fetch data directly in the Server Component
async function getFlower(id: string): Promise<Flower> {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) throw new Error("Flower not found");
  const product = await response.json();
  return {
    id: String(product.id),
    name: product.title,
    price: product.price,
    description: product.description,
    image: product.thumbnail,
  };
}
```

---

### Phase 3: Incremental Static Regeneration (ISR)

#### Step 4 (`// TODO SSG 4`): Configure ISR Revalidation Interval
*File: `src/app/rendering/isr/page.tsx`*
Define a static cache revalidation interval by exporting the standard Next.js `revalidate` configuration:
```typescript
export const revalidate = 10; // Revalidate static cache every 10 seconds
```

---

### Phase 4: Client-Side Fetching with SWR

#### Step 5 (`// TODO SSG 5`): Setup useSWR Fetch Hook
*File: `src/app/rendering/swr/page.tsx`*
Initialize the SWR hook with a helper fetcher function (which maps dynamic JSON data to Flower shapes):
```typescript
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data: { products: any[] }) =>
      data.products.map((product) => ({
        id: String(product.id),
        name: product.title,
        price: product.price,
        description: product.description,
        image: product.thumbnail,
      }))
    );

const { data, error, isLoading } = useSWR<Flower[]>(
  "https://dummyjson.com/products?limit=10",
  fetcher,
  {
    revalidateOnFocus: true,
    refreshInterval: 5000,
    revalidateOnReconnect: true,
  }
);
```

#### Step 6 (`// TODO SSG 6`): Render SWR Cache Lists
*File: `src/app/rendering/swr/page.tsx`*
Reference SWR fetch statuses to display clean fallback loaders, error feedback elements, or the live list items:
```jsx
{isLoading && <p>Loading flowers...</p>}
{error && <p>Error loading flowers</p>}
{data && data.map((flower) => (
  <FlowerCard key={flower.id} flower={flower} />
))}
```

---

## How to Test & Verify

1. Run the dev server:
   ```bash
   bun dev
   ```
2. Navigate to "/rendering". Click through the subpages:
   - `/rendering/ssg/[id]` will only load for IDs 1, 2, and 3. Any other ID returns a 404.
   - `/rendering/isr` updates the static build timestamp only if refreshed after 10 seconds.
   - `/rendering/swr` caches fetches smoothly, updating immediately if you switch tabs and return.
