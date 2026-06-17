"use client";

import { Navigation } from "@/components/Navigation";
import Link from "next/link";
import useSWR from "swr";
import { useFetch } from "@/hooks/useFetch";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface DummyProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

// ---------------------------------------------------------------------------
// SWR fetcher — simple wrapper (used by useSWR only)
// ---------------------------------------------------------------------------
const swrFetcher = (url: string) => fetch(url).then((r) => r.json());

// ---------------------------------------------------------------------------
// Shared API URL
// ---------------------------------------------------------------------------
const API_URL =
  "https://dummyjson.com/products?limit=6&select=id,title,price,thumbnail";

// ---------------------------------------------------------------------------
// Shared product card used in both columns
// ---------------------------------------------------------------------------
function ProductCard({ product }: { product: DummyProduct }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-10 h-10 rounded-lg object-cover shrink-0"
      />
      <div className="min-w-0">
        <p className="text-xs font-bold text-slate-800 truncate">
          {product.title}
        </p>
        <p className="text-[10px] font-semibold text-emerald-600">
          ${product.price}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Left column — useFetch (manual)
// ---------------------------------------------------------------------------
function UseFetchColumn() {
  // ==========================================
  // TODO Hook 11: Consume the custom useFetch hook
  // Notice: every time you navigate away and come back, this re-fetches
  // (shows a loading state). No caching — fresh request every mount.
  // ------------------------------------------
  // const { data, loading, error } = useFetch(API_URL);
  // const products: DummyProduct[] = data?.products ?? [];
  // ==========================================
  // Starter fallback — useFetch is called but returns error until TODO Hook 10 is done
  const { data, loading, error } = useFetch(API_URL);
  const products: DummyProduct[] = data?.products ?? [];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base">🔧</span>
        <div>
          <p className="text-xs font-black text-indigo-950 font-toy">useFetch (manual)</p>
          <p className="text-[10px] text-slate-400">useState + useEffect + AbortController</p>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-14 rounded-xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <p className="text-xs text-rose-600 p-3 bg-rose-50 rounded-xl border border-rose-200">
          ❌ {error}
        </p>
      )}

      {products.length > 0 && (
        <div className="flex flex-col gap-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <p className="mt-auto pt-2 text-[10px] text-slate-400 border-t border-slate-100">
        Navigate away and back → sees loading again
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Right column — useSWR (library)
// ---------------------------------------------------------------------------
function UseSWRColumn() {
  // ==========================================
  // TODO Hook 12: Consume useSWR for the same URL
  // Navigate away and come back — data renders instantly from cache.
  // useSWR revalidates in the background but shows stale data immediately.
  // ------------------------------------------
  // const { data, isLoading, error } = useSWR(API_URL, swrFetcher);
  // const products: DummyProduct[] = data?.products ?? [];
  // ==========================================
  // Starter fallback — useSWR already works, uncomment above to use it cleanly
  const { data, isLoading, error } = useSWR(API_URL, swrFetcher);
  const products: DummyProduct[] = data?.products ?? [];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base">⚡</span>
        <div>
          <p className="text-xs font-black text-indigo-950 font-toy">useSWR (library)</p>
          <p className="text-[10px] text-slate-400">cache + dedup + revalidation</p>
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-col gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-14 rounded-xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <p className="text-xs text-rose-600 p-3 bg-rose-50 rounded-xl border border-rose-200">
          ❌ Error loading data
        </p>
      )}

      {products.length > 0 && (
        <div className="flex flex-col gap-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <p className="mt-auto pt-2 text-[10px] text-slate-400 border-t border-slate-100">
        Navigate away and back → instant (from cache)
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function UseFetchPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white font-sans pb-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8 pt-10">
          {/* Back link */}
          <Link
            href="/hooks"
            className="text-[11px] font-bold text-indigo-400 hover:text-indigo-600 transition-colors font-toy"
          >
            ← Hooks Lab
          </Link>

          {/* Header */}
          <div className="mt-4 mb-8">
            <span className="text-[10px] font-black tracking-widest text-rose-500 uppercase font-toy">
              TODO Hook 10–12
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-indigo-950 tracking-tight mt-1 font-toy">
              🐷 useFetch vs useSWR — Hamm&apos;s Piggy Bank API
            </h1>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-xl">
              Both columns fetch the same URL. Navigate to another page and come
              back — watch which column shows a loader and which renders instantly.
            </p>
          </div>

          {/* Side-by-side columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 bg-slate-50 border-2 border-slate-200 rounded-2xl">
              <UseFetchColumn />
            </div>
            <div className="p-5 bg-indigo-50 border-2 border-indigo-200 rounded-2xl">
              <UseSWRColumn />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
