"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { AuthUser } from "@/types";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function Navigation() {
  const router = useRouter();

  // Fetch the active user session in real-time
  const { data: user } = useSWR<AuthUser>("/api/auth/me", fetcher, {
    shouldRetryOnError: false,
  });

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    try {
      // Clear HTTP-only session cookie via the auth proxy
      await axios.post("/api/auth/logout");

      // Optimistically update SWR cache to log out the user instantly across components
      await mutate("/api/auth/me", null, false);

      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="w-full border-b border-slate-100 bg-white dark:border-neutral-800/80 dark:bg-zinc-950 sticky top-0 z-40 shadow-[0_1px_2px_rgba(0,0,0,0.02)] font-sans">
      <div className="mx-auto max-w-4xl px-4 h-16 flex items-center justify-between gap-4">
        {/* Toyiverse Brand Logo */}
        <Link href="/" className="flex flex-col shrink-0">
          <span className="text-[9px] font-extrabold tracking-widest text-indigo-500/80 uppercase leading-none">
            Online Toy Boutique
          </span>
          <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 tracking-tight leading-tight flex items-center mt-0.5">
            toyStore<span className="text-amber-400 font-black">.</span>
          </span>
        </Link>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4 text-xs font-bold">
              <Link
                href="/dashboard"
                className="text-slate-650 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Store Console
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-650 dark:text-red-400 hover:underline cursor-pointer bg-transparent border-none p-0"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline transition-colors"
            >
              Sign In
            </Link>
          )}

          {isLoggedIn && (
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center h-8 px-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold transition-colors shadow-sm"
            >
              Staff Dashboard
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
