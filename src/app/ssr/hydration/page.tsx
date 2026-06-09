"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export default function HydrationMismatchPage() {
  // ==========================================
  // TODO SSR 5: Initialize a state variable fixedTime, and set it inside useEffect
  // to prevent hydration mismatch with server rendering local times.
  // ==========================================
  const [fixedTime, setFixedTime] = useState<string>("");

  return (
    <>
      <Navigation />
      <main className="shop-container py-8 max-w-xl mx-auto px-4">
        {/* Back Link */}
        <Link href="/ssr" className="text-xs text-slate-400 hover:text-indigo-600 mb-6 inline-block font-semibold">
          ← Back to SSR Hub
        </Link>

        <header className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
            ⏳ Hydration Mismatch
          </h1>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            Hydration occurs when React in the browser binds to the HTML sent by the server. If server rendering computes a value that changes instantly, a mismatch warning occurs.
          </p>
        </header>

        <div className="space-y-6">
          {/* Mismatch Example */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-zinc-900">
            <h2 className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">
              🔴 Direct rendering (Mismatch trigger)
            </h2>
            <p className="text-xs text-slate-550 dark:text-zinc-400 mb-3">
              Directly rendering timestamps or random strings causes differences on client load.
            </p>
            <code className="block bg-slate-50 dark:bg-zinc-950 p-2 rounded text-[11px] font-mono text-slate-600 dark:text-zinc-400 mb-2">
              {"<span>{new Date().toLocaleTimeString()}</span>"}
            </code>
          </div>

          {/* Solution Example */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-zinc-900">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-2">
              🟢 State Rendering Fix
            </h2>
            <p className="text-xs text-slate-550 dark:text-zinc-400 mb-3">
              Wait until the client mounts using standard `useEffect` to safely display dynamic data.
            </p>
            <div className="bg-emerald-50/20 dark:bg-emerald-950/10 border border-emerald-500/20 p-3 rounded text-center text-sm font-semibold text-emerald-800 dark:text-emerald-300">
              {fixedTime || "Synchronizing with browser..."}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
