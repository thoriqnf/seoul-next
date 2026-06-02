"use client";

import Link from "next/link";

export function Navigation() {
  return (
    <header className="w-full border-b border-slate-200/80 bg-white/80 dark:border-neutral-800/80 dark:bg-zinc-900/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">N</span>
          <span className="font-bold text-slate-900 dark:text-zinc-50 text-sm">NextJS Router</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/posts"
            className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Posts
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
