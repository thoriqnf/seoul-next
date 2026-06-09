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
        {/* ========================================== */}
        <div className="text-center py-12 text-xs text-slate-400 border border-dashed border-slate-200 dark:border-neutral-800 rounded-2xl">
          Implement SWR client data fetching hook and render items here.
        </div>
      </main>
    </>
  );
}
