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

interface DummyProductsResponse {
  products: DummyProduct[];
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
  // ==========================================
  const { data, loading, error } = useFetch<DummyProductsResponse>(API_URL);

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
            <div
              key={i}
              className="h-14 rounded-xl bg-slate-100 animate-pulse"
            />
          ))}
        </div>
      )}

      {error && (
        <p className="text-xs text-rose-600 p-3 bg-rose-50 rounded-xl border border-rose-200">
          ❌ Error: {error}
        </p>
      )}

      {data?.products && (
        <div className="flex flex-col gap-2">
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="mt-auto pt-2 text-[10px] text-slate-400 border-t border-slate-100">
        Navigate away and back → sees loading again
      </div>
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
  // ==========================================
  const { data, isLoading, error } = useSWR<DummyProductsResponse>(
    API_URL,
    swrFetcher
  );

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
            <div
              key={i}
              className="h-14 rounded-xl bg-slate-100 animate-pulse"
            />
          ))}
        </div>
      )}

      {error && (
        <p className="text-xs text-rose-600 p-3 bg-rose-50 rounded-xl border border-rose-200">
          ❌ Error loading data
        </p>
      )}

      {data?.products && (
        <div className="flex flex-col gap-2">
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="mt-auto pt-2 text-[10px] text-slate-400 border-t border-slate-100">
        Navigate away and back → instant (from cache)
      </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div className="p-5 bg-slate-50 border-2 border-slate-200 rounded-2xl">
              <UseFetchColumn />
            </div>
            <div className="p-5 bg-indigo-50 border-2 border-indigo-200 rounded-2xl">
              <UseSWRColumn />
            </div>
          </div>

          {/* Comparison table */}
          <div className="bg-white border-2 border-sky-100 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-sky-50 bg-sky-50">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Feature Comparison
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-sky-50">
                    <th className="text-left px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest w-[35%]">
                      Feature
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      🔧 useFetch
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                      ⚡ useSWR
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-50">
                  {[
                    ["Caching", "❌ None — re-fetches every mount", "✅ Keyed cache — instant revisit"],
                    ["Deduplication", "❌ Each component fetches independently", "✅ Shared request for same key"],
                    ["Revalidation", "❌ Manual only", "✅ On focus, reconnect, interval"],
                    ["Race conditions", "⚠️ Add AbortController yourself", "✅ Handled internally"],
                    ["Loading state", "✅ Manual useState", "✅ Built-in isLoading"],
                    ["Error handling", "✅ Manual try/catch", "✅ Built-in error"],
                    ["Best for", "📚 Learning fundamentals", "🚀 Production apps"],
                  ].map(([feature, manual, swr]) => (
                    <tr key={feature}>
                      <td className="px-5 py-3 font-semibold text-slate-600">
                        {feature}
                      </td>
                      <td className="px-4 py-3 text-slate-500">{manual}</td>
                      <td className="px-4 py-3 text-slate-700">{swr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
