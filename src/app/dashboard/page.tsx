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
          <p className="text-xs text-slate-400 animate-pulse font-semibold">
            Checking playroom session...
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-sky-50/40 pb-20 font-sans">
        <div className="mx-auto max-w-4xl px-4 py-12">
          {/* Dashboard Header */}
          <header className="mb-8 border-b border-sky-100 pb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-indigo-950">
                Room Console
              </h1>
              <p className="mt-1.5 text-xs text-slate-500">
                Playroom occupant: <span className="font-extrabold text-indigo-600">{user?.firstName} {user?.lastName}</span>
              </p>
            </div>
          </header>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            {/* User Profile Card (Left/60%) */}
            <div className="md:col-span-3 bg-white border border-sky-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start">
              <img
                src={user?.image}
                alt={user?.username}
                className="w-20 h-20 rounded-full border border-sky-100 bg-sky-50/50"
              />
              <div className="flex-1 space-y-3 text-center md:text-left">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
                    Toy Identity
                  </span>
                  <h2 className="text-base font-extrabold text-indigo-950">
                    {user?.firstName} {user?.lastName} ({user?.username})
                  </h2>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
                    Assigned Wardrobe Email
                  </span>
                  <p className="text-xs text-slate-600 font-medium">{user?.email}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    Playroom Access Permission
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide bg-indigo-50 text-indigo-700">
                    {user?.role === "admin" ? "Andy (Owner)" : "Woody / Buzz (Toy)"}
                  </span>
                </div>
              </div>
            </div>

            {/* Role-Based Actions Panel (Right/40%) */}
            <div className="md:col-span-2 space-y-4 w-full">
              {user?.role === "admin" && (
                <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl animate-fade-in space-y-3 shadow-xs">
                  <h4 className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
                    🗝️ Andy's Secret Chest
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    You have complete Andy (Owner) permissions. You can open the Toy Chest and view all room logistics settings.
                  </p>
                  <Link
                    href="/dashboard/admin-only"
                    className="w-full h-9 inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white text-xs font-black hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
                  >
                    Open Toy Chest
                  </Link>
                </div>
              )}

              {user?.role === "editor" && (
                <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl space-y-2">
                  <h4 className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                    🤠 Toy Patrol Panel
                  </h4>
                  <p className="text-[11px] text-amber-800/95 leading-relaxed">
                    You are signed in as a Toy (Woody / Buzz). You have access to play configurations, but Andy's Secret Toy Chest is locked for this role.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
