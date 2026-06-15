"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { AuthUser } from "@/types";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function Navigation() {
  const router = useRouter();

  // ==========================================
  // TODO PROXY AUTH 9: Fetch active session user details in real-time from '/api/auth/me' using useSWR
  // ==========================================
  /* UNCOMMENT FOR FINISHED IMPLEMENTATION
  const { data: user } = useSWR<AuthUser>("/api/auth/me", fetcher, {
    shouldRetryOnError: false,
  });
  */
  // STARTER FALLBACK: Active session fetching so navbar updates out of the box
  const { data: user } = useSWR<AuthUser>("/api/auth/me", fetcher, {
    shouldRetryOnError: false,
  });

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    // ==========================================
    // TODO PROXY AUTH 10: Clear the HttpOnly session cookie by calling '/api/auth/logout' via Axios
    // and mutate the SWR cache '/api/auth/me' to null optimistically
    // ==========================================
    /* UNCOMMENT FOR FINISHED IMPLEMENTATION
    try {
      await axios.post("/api/auth/logout");
      await mutate("/api/auth/me", null, false);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
    */

    // STARTER FALLBACK: Active logout handler so clicking works out of the box
    try {
      await axios.post("/api/auth/logout");
      await mutate("/api/auth/me", null, false);
      router.push("/login");
    } catch (err) {}
  };

  return (
    <header className="w-full border-b border-sky-100 bg-white sticky top-0 z-40 shadow-[0_1px_2px_rgba(0,0,0,0.02)] font-sans">
      <div className="mx-auto max-w-4xl px-4 h-16 flex items-center justify-between gap-4">
        {/* toyStory Brand Logo */}
        <Link href="/" className="flex flex-col shrink-0">
          <span className="text-[9px] font-extrabold tracking-widest text-indigo-400 uppercase leading-none">
            Andy's Playroom Registry
          </span>
          <span className="text-lg font-black text-indigo-900 tracking-tight leading-tight flex items-center mt-0.5">
            toyStory<span className="text-amber-450 font-black">⭐</span>
          </span>
        </Link>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4 text-xs font-bold">
              <Link
                href="/dashboard"
                className="text-slate-650 hover:text-indigo-600 transition-colors"
              >
                Room Console
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline cursor-pointer bg-transparent border-none p-0"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-xs font-bold text-indigo-600 hover:underline transition-colors"
            >
              Sign In
            </Link>
          )}

          {isLoggedIn && (
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center h-8 px-4 rounded-full bg-indigo-650 hover:bg-indigo-700 text-white text-[10px] font-black transition-colors shadow-sm"
            >
              Toy Console
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
