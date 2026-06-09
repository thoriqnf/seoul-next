"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Navigation() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    checkLogin();
    // Listen for custom/storage changes to sync login button text dynamically
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    router.push("/login");
  };

  return (
    <header className="w-full border-b border-slate-200 bg-white dark:border-neutral-800 dark:bg-zinc-900">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-extrabold text-indigo-600 dark:text-indigo-400 text-lg tracking-tight">
          🌸 FlowerShop
        </Link>
        <nav className="flex items-center gap-6">
          {/* ========================================== */}
          {/* TODO RECAP 2: Use Next.js Link components instead of standard <a> tags */}
          {/* ========================================== */}
          <Link
            href="/"
            className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Catalog
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Admin Panel
          </Link>
          <Link
            href="/ssr"
            className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            SSR Demo
          </Link>
          {/* ========================================== */}
          {/* TODO SSG 1: Add Link to rendering page */}
          {/* ========================================== */}
          <Link
            href="/rendering"
            className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Rendering Demo
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-red-600 dark:text-red-400 hover:underline cursor-pointer bg-transparent border-none p-0"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
