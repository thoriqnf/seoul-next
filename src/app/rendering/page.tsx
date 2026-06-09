import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export default function RenderingMainHub() {
  return (
    <>
      <Navigation />
      <main className="shop-container py-8 max-w-5xl mx-auto px-4">
        <header className="mb-10 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-2 rounded-full border border-indigo-100 dark:border-indigo-900/50">
            Week 3 Day 3 - Rendering Hub
          </span>
          <h1 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
            Next.js App Router Rendering
          </h1>
          <p className="mt-2 text-slate-500 dark:text-zinc-400 max-w-2xl text-sm leading-relaxed">
            Understand different rendering strategies in the App Router: build-time static parameters, cache revalidation, and client-side data fetching with SWR.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/rendering/ssg"
            className="p-5 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-zinc-900 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
          >
            <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 mb-1">
              📦 1. Static Site Generation (SSG)
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              Generate static pages at build time with generateStaticParams.
            </p>
          </Link>

          <Link
            href="/rendering/isr"
            className="p-5 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-zinc-900 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
          >
            <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 mb-1">
              🔄 2. Incremental Static Regeneration (ISR)
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              Revalidate static layouts in the background at designated intervals.
            </p>
          </Link>

          <Link
            href="/rendering/swr"
            className="p-5 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-zinc-900 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
          >
            <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 mb-1">
              ⚡ 3. Client SWR Fetching
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              Dynamically load data client-side with SWR cache-first hydration.
            </p>
          </Link>
        </div>
      </main>
    </>
  );
}
