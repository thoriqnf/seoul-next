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
    // ==========================================
    // TODO ROUTING 7: Secure route via local storage checks inside useEffect
    // ==========================================
    setIsChecking(false);
  }, [router]);

  // ==========================================
  // TODO ROUTING 8: Implement logout handler to clear state & redirect
  // ==========================================
  const handleLogout = () => {
    // ==========================================
    // TODO ROUTING 8: Implement logout handler to clear state & redirect
    // ==========================================
    console.log("Logout triggered");
  };

  if (isChecking) {
    return (
      <>
        <Navigation />
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-32 flex flex-col items-center justify-center font-sans">
          <p className="text-sm text-slate-500 dark:text-zinc-400">
            Checking authentication...
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12 md:py-16 font-sans">
        <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">
              Dashboard
            </h1>
            <p className="mt-2 text-slate-500 dark:text-zinc-400 text-sm">
              Welcome back, <span className="font-semibold text-slate-800 dark:text-zinc-200">{userEmail}</span>.
            </p>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-sm font-semibold text-red-600 dark:text-red-400 rounded-lg cursor-pointer transition-all"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Profile Card */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-6 max-w-md">
          <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-100 mb-4">
            Session Details
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm border-b border-slate-100 dark:border-neutral-850 pb-2">
              <span className="text-slate-500">Email:</span>
              <span className="font-medium text-slate-850 dark:text-zinc-205">{userEmail}</span>
            </div>
            <div className="flex justify-between text-sm border-b border-slate-100 dark:border-neutral-855 pb-2">
              <span className="text-slate-505">Status:</span>
              <span className="font-medium text-green-600 dark:text-green-400">Authenticated</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-505">Storage Mode:</span>
              <span className="font-medium text-slate-850 dark:text-zinc-205">LocalStorage</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
