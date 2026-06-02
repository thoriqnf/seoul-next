"use client";

import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Segment Error:", error);
  }, [error]);

  return (
    <>
      <Navigation />
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-20 flex flex-col items-center justify-center font-sans text-center">
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-8 w-full">
          <span className="text-4xl">⚠️</span>
          <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-zinc-50">
            Something went wrong!
          </h1>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">
            {error.message || "An unexpected error occurred during rendering."}
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white rounded-lg transition-colors cursor-pointer"
            >
              Try Again
            </button>
            <a
              href="/"
              className="px-5 py-2.5 bg-slate-50 dark:bg-zinc-950 hover:bg-slate-100 dark:hover:bg-zinc-900 border border-slate-200 dark:border-neutral-800 text-sm font-semibold text-slate-600 dark:text-zinc-300 rounded-lg transition-colors"
            >
              Go Home
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
