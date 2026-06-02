"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/Navigation";

export default function DashboardPage() {
  const [isChecking, setIsChecking] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  // ==========================================
  // TODO ROUTING 7: Secure route via local storage checks inside useEffect
  // ==========================================
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const email = localStorage.getItem("userEmail");

    if (isLoggedIn !== "true") {
      // If user is not authenticated, programmatically redirect to /login
      router.push("/login");
    } else {
      setUserEmail(email);
      setIsChecking(false);
    }
  }, [router]);

  // ==========================================
  // TODO ROUTING 8: Implement logout handler to clear state & redirect
  // ==========================================
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  // While checking authorization, show a loading spinner
  if (isChecking) {
    return (
      <>
        <Navigation />
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-32 flex flex-col items-center justify-center font-sans">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            <p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">
              Checking authentication...
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12 md:py-20 font-sans">
        {/* Dashboard Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full">
              Secure Private Route
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
              User Dashboard
            </h1>
            <p className="mt-2 text-slate-500 dark:text-zinc-400 text-sm leading-relaxed">
              Welcome back! You are logged in as <span className="font-semibold text-slate-800 dark:text-zinc-200">{userEmail}</span>.
            </p>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/45 border border-red-200 dark:border-red-900/60 text-sm font-bold text-red-600 dark:text-red-400 rounded-xl cursor-pointer transition-all"
            >
              Sign Out
          </button>
          </div>
        </header>

        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-6">
            <span className="text-2xl">🔒</span>
            <h3 className="mt-3 text-base font-bold text-slate-800 dark:text-zinc-100">
              Protected Layout
            </h3>
            <p className="mt-2 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              This dashboard layout is only visible to logged-in users. Direct navigation checks occur instantly on mount.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-6">
            <span className="text-2xl">📁</span>
            <h3 className="mt-3 text-base font-bold text-slate-800 dark:text-zinc-100">
              Local Session
            </h3>
            <p className="mt-2 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              User authentication states persist directly inside your browser&apos;s localStorage sandbox.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-6">
            <span className="text-2xl">⚡</span>
            <h3 className="mt-3 text-base font-bold text-slate-800 dark:text-zinc-100">
              Client Guards
            </h3>
            <p className="mt-2 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              Next.js App Router integrates with Client hooks to safely intercept history pushing before DOM painting.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
