import { Suspense } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

// ==========================================
// Slow-rendering server component
// ==========================================
async function SlowReviewsComponent() {
  // Simulate slow API/DB fetch (2 seconds delay)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const reviews = [
    { id: "1", user: "Sarah Jenkins", comment: "Perfect fresh flowers, exceeded expectations!", rating: 5 },
    { id: "2", user: "Michael Chang", comment: "Fast delivery but wrapping could be prettier.", rating: 4 },
  ];

  return (
    <div className="space-y-4">
      {reviews.map((rev) => (
        <div
          key={rev.id}
          className="p-4 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-zinc-900"
        >
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-xs text-slate-800 dark:text-zinc-200">{rev.user}</span>
            <span className="text-amber-500 text-xs">{"★".repeat(rev.rating)}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400">{rev.comment}</p>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// Loading Skeleton Component
// ==========================================
function ReviewsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="p-4 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-zinc-900/50"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="h-3 w-24 bg-slate-200 dark:bg-zinc-800 rounded" />
            <div className="h-3 w-12 bg-slate-200 dark:bg-zinc-800 rounded" />
          </div>
          <div className="h-3 bg-slate-200 dark:bg-zinc-800 rounded w-full mb-1.5" />
          <div className="h-3 bg-slate-200 dark:bg-zinc-800 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}

export default function StreamingPage() {
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
            ⚡ Asynchronous Streaming
          </h1>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            By wrapping a slow component in Suspense, Next.js can stream the surrounding layout first while the slow component fetches in the background.
          </p>
        </header>

        {/* Suspense Boundary */}
        <div className="border border-slate-200 dark:border-neutral-850 rounded-2xl p-6 bg-slate-50/50 dark:bg-zinc-950/20">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Customer Reviews Feed
          </h2>
          {/* ========================================== */}
          {/* TODO SSR 4: Wrap the <SlowReviewsComponent /> inside a React <Suspense> boundary */}
          {/* Provide a simple inline div text loader as the loading fallback */}
          {/* ========================================== */}
          <Suspense fallback={<ReviewsSkeleton />}>
            <SlowReviewsComponent />
          </Suspense>
        </div>
      </main>
    </>
  );
}
