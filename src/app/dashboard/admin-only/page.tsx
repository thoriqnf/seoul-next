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
          <p className="text-xs text-red-500 font-semibold">
            Checking permission... If stuck, redirecting to login.
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <header className="mb-6 border-b border-slate-100 dark:border-neutral-900 pb-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50 flex items-center gap-2">
              <span className="bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                Admin Area
              </span>
              System Configuration
            </h1>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-zinc-400">
              Only accessible to users with the <span className="font-extrabold text-[#00828A]">admin</span> role.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="text-xs font-bold text-[#00828A] hover:underline"
          >
            ← Back to Dashboard
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: System Metrics */}
          <div className="bg-white dark:bg-zinc-950/40 border border-slate-200/60 dark:border-neutral-800/80 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-extrabold text-slate-800 dark:text-zinc-200 mb-3">
              API Gateways & Status
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-100 dark:border-neutral-900 pb-1.5">
                <span className="text-slate-450">DummyJSON Provider</span>
                <span className="text-green-600 dark:text-green-400 font-bold">ONLINE</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-neutral-900 pb-1.5">
                <span className="text-slate-450">Local JSON-Server</span>
                <span className="text-green-600 dark:text-green-400 font-bold">ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-450">Security Context</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">HTTP-ONLY ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Card 2: Security Logs */}
          <div className="bg-white dark:bg-zinc-950/40 border border-slate-200/60 dark:border-neutral-800/80 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-extrabold text-slate-800 dark:text-zinc-200 mb-3">
              Access History Log (Mock)
            </h2>
            <div className="space-y-2 text-[10px] font-mono text-slate-500 dark:text-zinc-400">
              <div className="flex gap-2">
                <span className="text-green-600 dark:text-green-400">[OK]</span>
                <span>{user.username} (admin) accessed /dashboard/admin-only</span>
              </div>
              <div className="flex gap-2">
                <span className="text-red-500">[BLOCKED]</span>
                <span>michaelw (editor) attempted /dashboard/admin-only</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
