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
        <main className="min-h-screen bg-sky-50 flex items-center justify-center font-sans">
          <div className="text-center p-8 bg-white border border-sky-100 rounded-3xl shadow-sm max-w-sm mx-auto">
            <span className="text-3xl block mb-3 animate-spin">⭐</span>
            <p className="text-xs text-red-500 font-extrabold font-toy animate-pulse">
              Verifying owner privileges...
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-sky-50 pb-20 font-sans">
        <div className="mx-auto max-w-4xl px-6 md:px-8 py-12">
          <header className="mb-8 border-b-2 border-sky-200 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-indigo-950 flex flex-wrap items-center gap-2 font-toy">
                <span className="bg-amber-400 border border-amber-500 border-b-2 border-b-amber-600 text-amber-950 text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider font-toy shadow-sm">
                  Andy Only
                </span>
                Andy's Toy Chest
              </h1>
              <p className="mt-1.5 text-xs text-slate-500 font-medium">
                Only accessible to Andy (Owner). Other playroom occupants are redirected.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="text-xs font-black text-indigo-600 hover:text-indigo-800 hover:underline font-toy self-start sm:self-center"
            >
              ← Back to Room Console
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Toy inventory list */}
            <div className="bg-white border-2 border-sky-200 border-b-4 border-b-sky-300 rounded-3xl p-6 shadow-sm space-y-5">
              <h2 className="text-sm font-black text-indigo-950 font-toy uppercase tracking-wider">
                Toy Inventory Registry
              </h2>
              <ul className="space-y-3.5 text-xs text-slate-650 font-semibold">
                <li className="flex justify-between border-b-2 border-sky-50 pb-2.5">
                  <span className="font-bold">🤠 Woody</span>
                  <span className="text-amber-600 font-extrabold uppercase font-toy tracking-wider">Sheriff</span>
                </li>
                <li className="flex justify-between border-b-2 border-sky-50 pb-2.5">
                  <span className="font-bold">🚀 Buzz Lightyear</span>
                  <span className="text-green-600 font-extrabold uppercase font-toy tracking-wider">Space Ranger</span>
                </li>
                <li className="flex justify-between border-b-2 border-sky-50 pb-2.5">
                  <span className="font-bold">🐷 Hamm</span>
                  <span className="text-indigo-400 font-bold font-toy uppercase tracking-wider">Piggy Bank</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-bold">🦖 Rex</span>
                  <span className="text-indigo-400 font-bold font-toy uppercase tracking-wider">Tyrannosaurus</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Security & Logging */}
            <div className="bg-white border-2 border-sky-200 border-b-4 border-b-sky-300 rounded-3xl p-6 shadow-sm space-y-5">
              <h2 className="text-sm font-black text-indigo-950 font-toy uppercase tracking-wider">
                Access Log (RBAC Audits)
              </h2>
              <div className="space-y-3 text-[10px] font-mono text-slate-600 bg-sky-50 p-4 rounded-2xl border border-sky-100 shadow-inner">
                <div className="flex gap-2">
                  <span className="text-green-600 font-bold">[OK]</span>
                  <span>{user.username} (Andy) opened Andy's Toy Chest</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-rose-500 font-bold">[DENIED]</span>
                  <span>michaelw (Woody/Buzz) blocked from Andy's Chest</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-rose-500 font-bold">[BLOCKED]</span>
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
