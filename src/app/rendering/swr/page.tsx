"use client";

import Link from "next/link";
import useSWR from "swr";
import { Flower } from "@/types";
import { Navigation } from "@/components/Navigation";
import { FlowerCard } from "@/components/FlowerCard";

// ==========================================
// TODO SSG 5: Configure custom fetcher helper and initialize SWR fetch hooks
// Configure options to control SWR revalidation behavior:
// - revalidateOnFocus: Automatically refetch when the user refocuses the browser window/tab.
// - refreshInterval: Periodically poll and refetch data (e.g., every 5 seconds).
// - revalidateOnReconnect: Refetch when the user regains network connectivity.
// ==========================================
// const fetcher = ...;

export default function SWRDemoPage() {
  // const { data, error, isLoading } = useSWR(..., fetcher, { ...options });

  return (
    <>
      <Navigation />
      <main className="shop-container py-8 max-w-5xl mx-auto px-4">
        <Link href="/rendering" className="text-xs text-slate-400 hover:text-indigo-600 mb-6 inline-block font-semibold">
          ← Back to Rendering Hub
        </Link>

        <header className="mb-10 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-2 rounded-full border border-indigo-100 dark:border-indigo-900/50">
            Topic 3 - SWR Demo
          </span>
          <h1 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
            Client-Side Fetching with SWR
          </h1>
          <p className="mt-2 text-slate-500 dark:text-zinc-400 max-w-2xl text-sm leading-relaxed">
            SWR (stale-while-revalidate) returns cached data first, fetches updates in the background, and keeps your UI fast and fresh.
          </p>
        </header>

        {/* ========================================== */}
        {/* TODO SSG 6: Render fetch loaders, error feedbacks, or SWR item grids */}
        {/* 1. If `isLoading` is true, render a fallback loading indicator (e.g. skeleton card list or spinner) */}
        {/* 2. If `error` is returned, render an error message block */}
        {/* 3. If `data` is resolved, map the array to render FlowerCard components */}
        {/* ========================================== */}

        {/* Loading Spinner Skeleton (Uncomment and bind to SWR loading state) */}
        {/*
        <div className="shop-grid">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="shop-card animate-pulse border border-slate-200 dark:border-neutral-800/80">
              <div className="h-48 w-full bg-slate-100 dark:bg-zinc-800/80" />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="h-5 w-2/3 bg-slate-100 dark:bg-zinc-800 rounded-lg mb-2" />
                  <div className="h-4 w-full bg-slate-50 dark:bg-zinc-800/50 rounded-md" />
                </div>
                <div className="h-8 w-full bg-slate-100 dark:bg-zinc-800 rounded-xl mt-6" />
              </div>
            </div>
          ))}
        </div>
        */}

        {/* Error Feedback Element (Uncomment and bind to SWR error state) */}
        {/*
        <div className="flex flex-col items-center justify-center p-12 text-center text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl">
          <span className="text-3xl mb-2">⚠</span>
          <h3 className="font-bold text-slate-800 dark:text-zinc-200 text-sm">Failed to Load Flowers</h3>
        </div>
        */}

        {/* Catalog Grid View (Uncomment and bind to SWR data state) */}
        {/*
        <div className="shop-grid">
          {data?.slice(0, 6).map((flower) => (
            <FlowerCard key={flower.id} flower={flower} />
          ))}
        </div>
        */}
      </main>
    </>
  );
}
