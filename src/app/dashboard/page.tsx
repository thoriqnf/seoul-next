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
  
  // ==========================================
  // TODO PROXY AUTH 8: Get user session info using useSWR and implement RBAC logic in dashboard layout
  // ==========================================
  /* UNCOMMENT FOR FINISHED IMPLEMENTATION
  const { data: user, error, isLoading } = useSWR<AuthUser>("/api/auth/me", fetcher, {
    shouldRetryOnError: false,
  });
  */
  // STARTER FALLBACK: Active session checks so dashboard updates out of the box
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
        <main className="min-h-screen bg-sky-50 flex items-center justify-center font-sans">
          <div className="text-center p-8 bg-white border border-sky-100 rounded-3xl shadow-sm max-w-sm mx-auto">
            <span className="text-3xl block mb-3 animate-spin">⭐</span>
            <p className="text-xs text-slate-500 animate-pulse font-extrabold font-toy">
              Checking playroom session...
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
          {/* Dashboard Header */}
          <header className="mb-8 border-b-2 border-sky-200 pb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-indigo-950 font-toy">
                Room Console
              </h1>
              <p className="mt-1.5 text-xs text-slate-500 font-medium">
                Playroom occupant: <span className="font-extrabold text-indigo-600">{user?.firstName} {user?.lastName}</span>
              </p>
            </div>
          </header>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            {/* User Profile Card (Left/60%) */}
            <div className="md:col-span-3 bg-white border-2 border-sky-200 border-b-4 border-b-sky-300 rounded-3xl p-8 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <img
                src={user?.image}
                alt={user?.username}
                className="w-24 h-24 rounded-full border-4 border-sky-100 bg-sky-50 shadow-inner shrink-0"
              />
              <div className="flex-1 space-y-4 text-center sm:text-left w-full">
                <div>
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1 font-toy">
                    Toy Identity
                  </span>
                  <h2 className="text-lg font-black text-indigo-950 font-toy leading-tight">
                    {user?.firstName} {user?.lastName} ({user?.username})
                  </h2>
                </div>

                <div>
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1 font-toy">
                    Assigned Wardrobe Email
                  </span>
                  <p className="text-xs text-slate-600 font-bold">{user?.email}</p>
                </div>

                <div>
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1.5 font-toy">
                    Playroom Access Permission
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide bg-indigo-50 border border-indigo-100 text-indigo-700 font-toy shadow-2xs">
                    {user?.role === "admin" ? "Andy (Owner)" : "Woody / Buzz (Toy)"}
                  </span>
                </div>
              </div>
            </div>

            {/* Role-Based Actions Panel (Right/40%) */}
            <div className="md:col-span-2 space-y-6 w-full">
              {/* ========================================== */}
              {/* TODO PROXY AUTH 8 (RBAC JSX): Render different cards based on the user's role:
                  - If admin: show link to configure store settings
                  - If editor: show assistant workspace summary */}
              {/* ========================================== */}
              {/* UNCOMMENT FOR FINISHED IMPLEMENTATION
              {user?.role === "admin" && (
                <div className="p-6 bg-indigo-50 border-2 border-indigo-200 border-b-4 border-b-indigo-300 rounded-3xl space-y-4 shadow-sm animate-fade-in">
                  <h4 className="text-sm font-black text-indigo-950 flex items-center gap-1.5 font-toy">
                    🗝️ Andy's Secret Chest
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    You have complete Andy (Owner) permissions. You can open the Toy Chest and view all room logistics settings.
                  </p>
                  <Link
                    href="/dashboard/admin-only"
                    className="btn-toy-blue w-full text-center"
                  >
                    Open Toy Chest
                  </Link>
                </div>
              )}

              {user?.role === "editor" && (
                <div className="p-6 bg-amber-50 border-2 border-amber-200 border-b-4 border-b-amber-300 rounded-3xl space-y-3 shadow-sm">
                  <h4 className="text-sm font-black text-amber-900 flex items-center gap-1.5 font-toy">
                    🤠 Toy Patrol Panel
                  </h4>
                  <p className="text-xs text-amber-950/80 leading-relaxed font-semibold">
                    You are signed in as a Toy (Woody / Buzz). You have access to play configurations, but Andy's Secret Toy Chest is locked for this role.
                  </p>
                </div>
              )}
              */}

              {/* STARTER FALLBACK: Active displays so UI updates out of the box */}
              {user?.role === "admin" && (
                <div className="p-6 bg-indigo-50 border-2 border-indigo-200 border-b-4 border-b-indigo-300 rounded-3xl space-y-4 shadow-sm animate-fade-in">
                  <h4 className="text-sm font-black text-indigo-950 flex items-center gap-1.5 font-toy">
                    🗝️ Andy's Secret Chest
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    You have complete Andy (Owner) permissions. You can open the Toy Chest and view all room logistics settings.
                  </p>
                  <Link
                    href="/dashboard/admin-only"
                    className="btn-toy-blue w-full text-center"
                  >
                    Open Toy Chest
                  </Link>
                </div>
              )}

              {user?.role === "editor" && (
                <div className="p-6 bg-amber-50 border-2 border-amber-200 border-b-4 border-b-amber-300 rounded-3xl space-y-3 shadow-sm">
                  <h4 className="text-sm font-black text-amber-900 flex items-center gap-1.5 font-toy">
                    🤠 Toy Patrol Panel
                  </h4>
                  <p className="text-xs text-amber-950/80 leading-relaxed font-semibold">
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
