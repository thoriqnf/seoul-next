"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { AuthUser } from "@/types";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function DashboardPage() {
  const router = useRouter();
  
  // Use SWR to retrieve the user's authenticated session from HTTP-only cookie
  const { data: user, error, isLoading } = useSWR<AuthUser>("/api/auth/me", fetcher, {
    shouldRetryOnError: false,
  });

  // Client-side guard fallback if SWR catches authentication failure
  useEffect(() => {
    if (error) {
      router.push("/login");
    }
  }, [error, router]);

  // Render a loading state during validation
  if (isLoading || (!user && !error)) {
    return (
      <>
        <Navigation />
        <main className="mx-auto max-w-xl px-4 py-24 text-center">
          <p className="text-xs text-slate-400 dark:text-zinc-500 animate-pulse font-semibold">
            Verifying staff credentials...
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-3xl px-4 py-12 font-sans">
        {/* Dashboard Header */}
        <header className="mb-8 border-b border-slate-100 dark:border-neutral-900 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
              Store Staff Console
            </h1>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-zinc-400">
              Welcome back, <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{user?.firstName} {user?.lastName}</span>
            </p>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* User Profile Card (Left/60%) */}
          <div className="md:col-span-3 bg-white dark:bg-zinc-950/40 border border-slate-200/60 dark:border-neutral-800/80 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start">
            <img
              src={user?.image}
              alt={user?.username}
              className="w-20 h-20 rounded-full border border-slate-200 dark:border-neutral-800"
            />
            <div className="flex-1 space-y-3 text-center md:text-left">
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest block mb-0.5">
                  Staff Identity
                </span>
                <h2 className="text-base font-extrabold text-slate-800 dark:text-zinc-200">
                  {user?.firstName} {user?.lastName} ({user?.username})
                </h2>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest block mb-0.5">
                  Corporate Email
                </span>
                <p className="text-xs text-slate-650 dark:text-zinc-400 font-medium">{user?.email}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest block mb-1">
                  Store Role Access
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-455">
                  {user?.role === "admin" ? "Store Owner" : "Store Assistant"}
                </span>
              </div>
            </div>
          </div>

          {/* Role-Based Actions Panel (Right/40%) */}
          <div className="md:col-span-2 space-y-4 w-full">
            {user?.role === "admin" && (
              <div className="p-6 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl animate-fade-in space-y-3">
                <h4 className="text-xs font-bold text-indigo-850 dark:text-indigo-400 flex items-center gap-1.5">
                  🔑 Owner Control Center
                </h4>
                <p className="text-[11px] text-slate-550 dark:text-zinc-400 leading-relaxed">
                  You are logged in with full Store Owner privileges. You can configure inventory registries and check ledger settings.
                </p>
                <Link
                  href="/dashboard/admin-only"
                  className="w-full h-9 inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
                >
                  Configure Store Settings
                </Link>
              </div>
            )}

            {user?.role === "editor" && (
              <div className="p-6 bg-slate-50 dark:bg-zinc-900/40 border border-slate-200/45 dark:border-neutral-800/60 rounded-2xl space-y-2">
                <h4 className="text-xs font-bold text-slate-650 dark:text-zinc-350 flex items-center gap-1.5">
                  📋 Assistant Console
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed">
                  You are logged in as a Store Assistant. You can edit product titles and write description blogs, but financial settings are restricted to the Store Owner role.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
