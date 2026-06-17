# Developer Guide: Week 4 Day 3 — Advanced Hooks & Custom Hooks

This guide walks through **7 sequential demos** building on Andy's Playroom. Each demo lives on its own page under `/hooks/*` so concepts stay isolated and focused.

**Topics in order:**
1. `useMemo`
2. `useCallback`
3. Custom Hook — `useLocalStorage`
4. Custom Hook — `useMediaQuery`
5. Custom Hook — `useFetch` (compared with `useSWR`)
6. `next/image`
7. `next/font`

---

## Prerequisites

```bash
bun dev
```

Navigate to `http://localhost:3000/hooks` to find the Hooks Lab hub.

---

## Demo 1: `useMemo` — Woody's Toy Inventory Filter

**File:** `src/app/hooks/use-memo/page.tsx`

### What problem does `useMemo` solve?

React re-renders a component every time its state changes. If you have an **expensive computation** (e.g., filtering 500+ items) inside the component body, that computation runs on **every render** — even when unrelated state changes.

`useMemo` lets you **memoize** (cache) the result of a computation and only re-run it when its listed dependencies change.

```
useMemo(() => expensiveWork(), [dep1, dep2])
         ↑ the computation         ↑ only re-run when these change
```

---

### Step 1 (`// TODO Hook 1`)
**File:** `src/app/hooks/use-memo/page.tsx`

Track how many times the filter function runs using a `useRef` counter. This lets students *see* the problem — without `useMemo`, the count shoots up even when the counter changes:

```typescript
const filterRunCount = useRef(0);
```

> **Why `useRef` and not `useState`?** A `ref` doesn't cause a re-render when it changes. We only use it to count internally, not to drive UI.

---

### Step 2 (`// TODO Hook 2`)
**File:** `src/app/hooks/use-memo/page.tsx`

Wrap the expensive filter computation in `useMemo`:

```typescript
const filteredToys = useMemo(() => {
  filterRunCount.current += 1;
  return allToys.filter((toy) =>
    toy.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [allToys, searchQuery]);
```

> **Without `useMemo`:** clicking the counter button increments `filterRunCount` on every click.
> **With `useMemo`:** the count only increases when `searchQuery` changes. The counter button clicks no longer trigger the filter.

---

## Demo 2: `useCallback` — Buzz's Mission Panel

**File:** `src/app/hooks/use-callback/page.tsx`

### What problem does `useCallback` solve?

In JavaScript, functions are objects. Every time a component re-renders, **a new function instance** is created even if the logic is identical. When you pass that function as a prop to a child wrapped in `React.memo`, the child sees a *new prop reference* and re-renders unnecessarily.

`useCallback` returns the **same function reference** between renders as long as its dependencies haven't changed.

```
useCallback(fn, [dep1, dep2])  →  stable fn reference while deps are unchanged
```

---

### Step 3 (`// TODO Hook 3`)
**File:** `src/app/hooks/use-callback/page.tsx`

Wrap the mission dispatch handler in `useCallback`:

```typescript
const handleLaunchMission = useCallback(() => {
  setMissionLog((prev) => [...prev, `🚀 Mission launched by ${missionName}!`]);
}, [missionName]);
```

> **Without `useCallback`:** `handleLaunchMission` is a new function every render. The `MissionButton` child re-renders every time the parent's `counter` state changes.
> **With `useCallback`:** the function is stable. `MissionButton` only re-renders when `missionName` changes.

---

### Step 4 (`// TODO Hook 4`)
**File:** `src/app/hooks/use-callback/page.tsx`

Wrap the child button component in `React.memo` so it **bails out** of re-rendering when its props haven't changed:

```typescript
const MissionButton = React.memo(function MissionButton({
  onLaunch,
  renderCount,
}: {
  onLaunch: () => void;
  renderCount: React.MutableRefObject<number>;
}) {
  renderCount.current += 1;
  return (
    <button onClick={onLaunch}>
      🚀 Launch Mission (rendered {renderCount.current}×)
    </button>
  );
});
```

> **Key insight:** `React.memo` does a **shallow prop comparison**. If `onLaunch` is a new function reference on every render (no `useCallback`), `memo` can't help — the reference changed. Combine `React.memo` + `useCallback` for the full effect.

---

## Demo 3: Custom Hook — `useLocalStorage`

**Files:**
- `src/hooks/useLocalStorage.ts`
- `src/app/hooks/use-local-storage/page.tsx`

### What is a custom hook?

A custom hook is a **regular function whose name starts with `use`** and that may call other React hooks inside it. It lets you **extract and reuse stateful logic** across multiple components.

---

### Step 5 (`// TODO Hook 5`)
**File:** `src/hooks/useLocalStorage.ts`

Initialize state by reading from `localStorage` (with an SSR-safe check):

```typescript
const [storedValue, setStoredValue] = useState<T>(() => {
  if (typeof window === "undefined") return initialValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  } catch {
    return initialValue;
  }
});
```

> **Why the `typeof window === "undefined"` check?** Next.js renders components on the server too. `localStorage` doesn't exist on the server, so accessing it without this guard throws a `ReferenceError`.

---

### Step 6 (`// TODO Hook 6`)
**File:** `src/hooks/useLocalStorage.ts`

Sync state back to `localStorage` whenever the value changes:

```typescript
const setValue = (value: T) => {
  try {
    setStoredValue(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error("useLocalStorage write error:", error);
  }
};
```

> **Why not use `useEffect` for the write?** Writing directly in the setter keeps it synchronous with the state update. Using `useEffect` would work too, but risks a render cycle where the old value flashes briefly.

---

### Step 7 (`// TODO Hook 7`)
**File:** `src/app/hooks/use-local-storage/page.tsx`

Consume `useLocalStorage` in the page:

```typescript
const [favCharacter, setFavCharacter] = useLocalStorage<string>(
  "rex-fav-character",
  "Woody"
);
```

> **Try it:** Pick a character, then hard-refresh the page — your choice persists! Open DevTools → Application → Local Storage to see the key written in real time.

---

## Demo 4: Custom Hook — `useMediaQuery`

**Files:**
- `src/hooks/useMediaQuery.ts`
- `src/app/hooks/use-media-query/page.tsx`

### Step 8 (`// TODO Hook 8`)
**File:** `src/hooks/useMediaQuery.ts`

Subscribe to a media query using `window.matchMedia`:

```typescript
useEffect(() => {
  if (typeof window === "undefined") return;

  const mediaQueryList = window.matchMedia(query);
  const handleChange = (event: MediaQueryListEvent) => {
    setMatches(event.matches);
  };

  setMatches(mediaQueryList.matches);
  mediaQueryList.addEventListener("change", handleChange);

  return () => {
    mediaQueryList.removeEventListener("change", handleChange);
  };
}, [query]);
```

> **Why the cleanup function?** Without `removeEventListener`, every time the component re-mounts (e.g., navigating away and back), a new listener is added but the old one is never removed. This is a **memory leak**. The cleanup runs when the component unmounts or when `query` changes.

---

### Step 9 (`// TODO Hook 9`)
**File:** `src/app/hooks/use-media-query/page.tsx`

Consume `useMediaQuery` to derive responsive layout values:

```typescript
const isMobile = useMediaQuery("(max-width: 767px)");
const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
const isDesktop = useMediaQuery("(min-width: 1024px)");
```

> **Try it:** Drag your browser window narrower. The displayed layout hint changes in real time — no page refresh needed. This mirrors how CSS media queries work, but on the JavaScript side.

---

## Demo 5: Custom Hook — `useFetch` vs `useSWR`

**Files:**
- `src/hooks/useFetch.ts`
- `src/app/hooks/use-fetch/page.tsx`

### The Problem with Raw Fetch

`fetch` in a `useEffect` is the most basic data-fetching pattern, but it has sharp edges:
- No automatic caching — every mount re-fetches
- Race conditions when props change fast
- No built-in retry or revalidation

---

### Step 10 (`// TODO Hook 10`)
**File:** `src/hooks/useFetch.ts`

Implement `useFetch` with `AbortController` to prevent stale responses:

```typescript
useEffect(() => {
  const controller = new AbortController();
  setLoading(true);
  setError(null);

  fetch(url, { signal: controller.signal })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((json) => setData(json))
    .catch((err) => {
      if (err.name !== "AbortError") setError(err.message);
    })
    .finally(() => setLoading(false));

  return () => controller.abort();
}, [url]);
```

> **Why `AbortController`?** If the component unmounts before the fetch completes (user navigates away), without aborting, the `.then()` callback still fires and tries to call `setData` on an unmounted component — causing a stale update warning. Aborting the request prevents this.

---

### Step 11 (`// TODO Hook 11`)
**File:** `src/app/hooks/use-fetch/page.tsx`

Consume `useFetch` in the left column:

```typescript
const { data, loading, error } = useFetch<DummyProduct[]>(
  "https://dummyjson.com/products?limit=6&select=title,thumbnail,price"
);
```

---

### Step 12 (`// TODO Hook 12`)
**File:** `src/app/hooks/use-fetch/page.tsx`

Consume `useSWR` in the right column for comparison:

```typescript
const {
  data,
  isLoading,
  error,
} = useSWR<{ products: DummyProduct[] }>(
  "https://dummyjson.com/products?limit=6&select=title,thumbnail,price",
  fetcher
);
```

> **Navigate away and come back.** The `useSWR` column renders immediately from cache — **zero loading state**. The `useFetch` column shows a loader again. This is the biggest real-world difference.

### `useFetch` vs `useSWR` — Feature Comparison

| Feature | `useFetch` (manual) | `useSWR` |
|---|---|---|
| **Caching** | ❌ None — re-fetches on every mount | ✅ Keyed cache — instant on revisit |
| **Deduplication** | ❌ Multiple components each fetch | ✅ Shared request for same key |
| **Revalidation** | ❌ Manual | ✅ On focus, reconnect, interval |
| **Race conditions** | ⚠️ Must add AbortController yourself | ✅ Handled internally |
| **Loading state** | ✅ Manual `useState` | ✅ Built-in `isLoading` |
| **Error handling** | ✅ Manual `try/catch` | ✅ Built-in `error` |
| **Best for** | Learning fundamentals | Production apps |

---

## Demo 6: `next/image`

**File:** `src/app/hooks/next-image/page.tsx`

### Why `next/image` over `<img>`?

| | `<img>` | `<Image>` (next/image) |
|---|---|---|
| **Format** | Browser default (JPEG/PNG) | Auto WebP / AVIF |
| **Lazy loading** | Manual `loading="lazy"` | Automatic by default |
| **Size optimization** | None | Resized to viewport |
| **Layout shifts** | Common (no reserved space) | Reserved via `width`/`height` |
| **Priority loading** | Manual | `priority` prop |

### Step 13 (`// TODO Hook 13`)
**File:** `src/app/hooks/next-image/page.tsx`

Use `<Image>` with explicit `width` and `height` for known-size images:

```tsx
import Image from "next/image";

<Image
  src={product.thumbnail}
  alt={product.title}
  width={200}
  height={200}
  className="rounded-xl object-cover"
/>
```

> **Why `width` and `height`?** Next.js uses these to pre-reserve space in the page, preventing **Cumulative Layout Shift (CLS)** — a Core Web Vitals metric.

---

### Step 14 (`// TODO Hook 14`)
**File:** `src/app/hooks/next-image/page.tsx`

Use `fill` mode for a hero image inside a sized container, and add `priority` for the above-the-fold image:

```tsx
<div className="relative w-full h-48">
  <Image
    src={product.thumbnail}
    alt={product.title}
    fill
    priority
    className="object-cover rounded-xl"
  />
</div>
```

> **`fill` vs fixed `width/height`:**
> - `fill` makes the image stretch to fill its parent container — the parent **must** have `position: relative` and a defined size.
> - Use `priority` on above-the-fold images to skip lazy loading and improve **LCP (Largest Contentful Paint)**.

> **`next.config.ts`:** Remote images need their domain whitelisted via `remotePatterns`. Without this, Next.js throws an error to prevent loading untrusted images.

---

## Demo 7: `next/font`

**File:** `src/app/hooks/next-font/page.tsx`

### Why `next/font`?

Traditional Google Fonts use `<link>` tags that cause **external network requests** at render time. `next/font` downloads the font at **build time**, self-hosts it, and eliminates that external round-trip.

| | `<link href="fonts.googleapis.com">` | `next/font/google` |
|---|---|---|
| **Request at runtime** | ✅ External call to Google | ❌ None — self-hosted |
| **Privacy** | User IP sent to Google | ✅ No Google tracking |
| **CLS prevention** | Manual `font-display` | ✅ Automatic `size-adjust` |
| **Tailwind integration** | Manual CSS variable | ✅ `variable` prop → CSS var |

---

### Step 15 (`// TODO Hook 15`)
**File:** `src/app/hooks/next-font/page.tsx`

Import and instantiate a Google font:

```typescript
import { Bangers, Pacifico } from "next/font/google";

const bangersFont = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bangers",
});

const pacificoFont = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
});
```

> **Why call the function at module level?** `next/font` is a build-time optimization. The import and call happen once when the module loads — not per render. Calling inside a component would break this.

---

### Step 16 (`// TODO Hook 16`)
**File:** `src/app/hooks/next-font/page.tsx`

Apply fonts two ways — via `className` (direct) and via CSS `variable` (Tailwind-compatible):

```tsx
{/* Direct className approach */}
<p className={bangersFont.className}>
  To infinity and beyond!
</p>

{/* CSS variable approach — use in any className after attaching the variable */}
<div className={`${pacificoFont.variable} font-pacifico`}>
  <p style={{ fontFamily: "var(--font-pacifico)" }}>
    Reach for the sky!
  </p>
</div>
```

> **CSS variable approach** is preferred for Tailwind because you define `--font-pacifico` once in your layout and reference it anywhere via `font-family: var(--font-pacifico)` or a Tailwind `fontFamily` extension in `tailwind.config`.

---

## How to Test & Verify

1. **`/hooks`** — hub shows 6 demo cards with working links.
2. **`/hooks/use-memo`** — click counter; filter run count stays flat. Change search query; count increments.
3. **`/hooks/use-callback`** — click counter; child render count stays flat. Change mission name; child re-renders.
4. **`/hooks/use-local-storage`** — pick a character, hard-refresh (`Cmd+Shift+R`); selection persists.
5. **`/hooks/use-media-query`** — drag window narrower; layout label changes live.
6. **`/hooks/use-fetch`** — navigate away and back; left column (useFetch) re-fetches, right column (useSWR) is instant.
7. **`/hooks/next-image`** — open DevTools → Network → filter Img; see WebP served automatically.
8. **`/hooks/next-font`** — visually compare Bangers, Pacifico, and the default font.
