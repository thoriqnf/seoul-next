"use client";

import Link from "next/link";

// ==========================================
// TODO ROUTING 3: Replace standard <a> tags with Next.js <Link> components
// ==========================================

export function Navigation() {
  return (
    <header className="w-full border-b border-slate-200 bg-white dark:border-neutral-800 dark:bg-zinc-900">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <span className="font-bold text-slate-900 dark:text-zinc-50 text-sm">Demo App</span>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/posts"
            className="text-sm text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Posts
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Dashboard
          </Link>
          {/* ========================================== */}
          {/* TODO CRUD 2: Add client-side Navigation link to '/products' */}
          {/* ========================================== */}
          <Link
            href="/products"
            className="text-sm text-slate-650 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Products
          </Link>
        </nav>
      </div>
    </header>
  );
}
