"use client";

import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import { Navigation } from "@/components/Navigation";
import { AuthUser } from "@/types";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function AdminOnlyPage() {
  const { data: user, error } = useSWR<AuthUser>("/api/auth/me", fetcher);

  if (error || !user) {
    return (
      <>
        <Navigation />
        <main className="mx-auto max-w-xl px-4 py-24 text-center">
          <p className="text-xs text-red-500 font-semibold animate-pulse">
            Verifying owner privileges...
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-3xl px-4 py-8 font-sans">
        <header className="mb-6 border-b border-slate-100 dark:border-neutral-900 pb-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50 flex items-center gap-2">
              <span className="bg-indigo-105/10 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                Owner Only
              </span>
              Owner Control Center
            </h1>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-zinc-400">
              Only accessible to users with the <span className="font-extrabold text-indigo-650">Store Owner</span> role.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            ← Back to Console
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Toy Store Financials */}
          <div className="bg-white dark:bg-zinc-950/40 border border-slate-200/60 dark:border-neutral-800/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-slate-800 dark:text-zinc-200">
              Store Ledger Overview (Mock)
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-100 dark:border-neutral-900 pb-1.5">
                <span className="text-slate-450">Quarterly Toy Sales</span>
                <span className="text-slate-805 dark:text-zinc-250 font-bold">$124,530.00</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-neutral-900 pb-1.5">
                <span className="text-slate-450">Total Orders Processed</span>
                <span className="text-slate-805 dark:text-zinc-250 font-bold">1,842</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-450">Fulfillment Gateway</span>
                <span className="text-green-600 dark:text-green-400 font-bold">ACTIVE (100%)</span>
              </div>
            </div>
          </div>

          {/* Card 2: Security & Logging */}
          <div className="bg-white dark:bg-zinc-950/40 border border-slate-200/60 dark:border-neutral-800/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-slate-800 dark:text-zinc-200">
              Access History Log (RBAC Auditing)
            </h2>
            <div className="space-y-2 text-[10px] font-mono text-slate-500 dark:text-zinc-400">
              <div className="flex gap-2">
                <span className="text-green-600 dark:text-green-400">[ALLOWED]</span>
                <span>{user.username} (owner) accessed Owner Control Center</span>
              </div>
              <div className="flex gap-2">
                <span className="text-red-500">[DENIED]</span>
                <span>michaelw (assistant) blocked from Owner Center</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
