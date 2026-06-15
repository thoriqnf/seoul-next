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
    <header className="w-full border-b-4 border-sky-200 bg-white sticky top-0 z-40 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] font-sans">
      <div className="mx-auto max-w-4xl px-6 md:px-8 h-16 flex items-center justify-between gap-4">
        {/* toyStory Brand Logo */}
        <Link href="/" className="flex flex-col shrink-0 hover:opacity-90 active:scale-98 transition-all">
          <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase leading-none font-toy">
            Andy's Playroom Registry
          </span>
          <span className="text-xl font-black text-indigo-950 tracking-tight leading-tight flex items-center mt-1 font-toy">
            toy<span className="text-amber-500">Story</span><span className="text-amber-400 ml-0.5">⭐</span>
          </span>
        </Link>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4 text-xs font-extrabold font-toy">
              <Link
                href="/dashboard"
                className="text-slate-600 hover:text-indigo-650 transition-colors"
              >
                Room Console
              </Link>
              <button
                onClick={handleLogout}
                className="text-rose-500 hover:text-rose-650 hover:underline cursor-pointer bg-transparent border-none p-0 font-extrabold"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-xs font-black text-indigo-650 hover:text-indigo-800 transition-colors font-toy"
            >
              Sign In
            </Link>
          )}

          {isLoggedIn && (
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center h-8 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 border-b-2 border-indigo-800 text-white text-[10px] font-black tracking-wide font-toy transition-all shadow-sm active:translate-y-[2px] active:border-b-0"
            >
              Toy Console
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
