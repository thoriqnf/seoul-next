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
      <main className="min-h-screen bg-sky-50/40 pb-20 font-sans">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <header className="mb-6 border-b border-sky-100 pb-5 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-indigo-950 flex items-center gap-2">
                <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                  Andy Only
                </span>
                Andy's Toy Chest
              </h1>
              <p className="mt-1.5 text-xs text-slate-500">
                Only accessible to Andy (Owner). Other playroom occupants are redirected.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              ← Back to Room Console
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Toy inventory list */}
            <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-black text-indigo-950">
                Toy Inventory Registry
              </h2>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex justify-between border-b border-sky-50 pb-1.5">
                  <span className="font-semibold">🤠 Woody</span>
                  <span className="text-amber-600 font-extrabold uppercase">Sheriff</span>
                </li>
                <li className="flex justify-between border-b border-sky-50 pb-1.5">
                  <span className="font-semibold">🚀 Buzz Lightyear</span>
                  <span className="text-green-600 font-extrabold uppercase">Space Ranger</span>
                </li>
                <li className="flex justify-between border-b border-sky-50 pb-1.5">
                  <span className="font-semibold">🐷 Hamm</span>
                  <span className="text-slate-500 font-bold">Piggy Bank</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">🦖 Rex</span>
                  <span className="text-slate-500 font-bold">Tyrannosaurus</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Security & Logging */}
            <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-black text-indigo-950">
                Toy Room Access Log (RBAC Audits)
              </h2>
              <div className="space-y-2 text-[10px] font-mono text-slate-500">
                <div className="flex gap-2">
                  <span className="text-green-600 font-bold">[OK]</span>
                  <span>{user.username} (Andy) opened Andy's Toy Chest</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-red-500 font-bold">[DENIED]</span>
                  <span>michaelw (Woody/Buzz) blocked from Andy's Chest</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-red-500 font-bold">[BLOCKED]</span>
                  <span>sid (Sid) unauthorized entrance attempt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
