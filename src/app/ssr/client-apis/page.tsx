"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export default function ClientApisPage() {
  // ==========================================
  // TODO SSR 6: Guard client-only APIs (window, localStorage) inside useEffect
  // to prevent server pre-rendering from crashing on window is not defined reference errors
  // ==========================================
  const [browserWidth, setBrowserWidth] = useState<number | null>(null);
  const [storedStatus, setStoredStatus] = useState<string>("unknown");

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
            🖥️ Safe Client APIs
          </h1>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            During SSR, React compiles your component on the Node.js server first. Accessing browser variables like window or localStorage outside client hooks will cause the server to crash.
          </p>
        </header>

        <div className="space-y-6">
          {/* Mismatch Example */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-zinc-900">
            <h2 className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">
              🔴 Unsafe Call (Build Crash)
            </h2>
            <p className="text-xs text-slate-550 dark:text-zinc-400 mb-3">
              Calling browser-only objects in module scope or rendering directly:
            </p>
            <code className="block bg-slate-50 dark:bg-zinc-950 p-2 rounded text-[11px] font-mono text-slate-600 dark:text-zinc-400 mb-2">
              {"// Server crash: ReferenceError: window is not defined"}
              <br />
              {"const width = window.innerWidth;"}
            </code>
          </div>

          {/* Solution Example */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-zinc-900">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-2">
              🟢 Guarded Call Fix
            </h2>
            <p className="text-xs text-slate-550 dark:text-zinc-400 mb-3">
              Check if window is defined, or query localStorage parameters inside `useEffect`.
            </p>
            <div className="bg-emerald-50/20 dark:bg-emerald-950/10 border border-emerald-500/20 p-4 rounded text-xs space-y-2 text-slate-700 dark:text-zinc-350">
              <div>
                🖥️ Browser Width:{" "}
                <span className="font-bold text-slate-900 dark:text-zinc-100">
                  {browserWidth !== null ? `${browserWidth}px` : "Checking..."}
                </span>
              </div>
              <div>
                🔑 Local Auth Status:{" "}
                <span className="font-bold text-slate-900 dark:text-zinc-100">
                  {storedStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
