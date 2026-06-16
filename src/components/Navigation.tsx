"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { AuthUser } from "@/types";

// ==========================================
// TODO Context 23: Import useCart to read the live cart item count
// ==========================================
import { useCart } from "@/contexts/CartContext";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface NavigationProps {
  onCartOpen?: () => void;
}

export function Navigation({ onCartOpen }: NavigationProps) {
  const router = useRouter();

  // ==========================================
  // TODO PROXY AUTH 6: Fetch active session user details in real-time from '/api/auth/me' using useSWR
  // ==========================================
  const { data: user } = useSWR<AuthUser>("/api/auth/me", fetcher, {
    shouldRetryOnError: false,
  });

  // ==========================================
  // TODO Context 23: Call useCart() to read itemCount
  // The nav has no idea about the store page — yet it sees the live count
  // This is the "wow moment" of global state
  // ==========================================
  // const { itemCount } = useCart();
  const { itemCount } = useCart(); // ← This will show 0 until TODO Context 19 derives it correctly

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    try {
      // ==========================================
      // TODO PROXY AUTH 7: Clear the HttpOnly session cookie by calling '/api/auth/logout' via Axios
      // ==========================================
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
        <Link
          href="/"
          className="flex flex-col shrink-0 hover:opacity-90 active:scale-98 transition-all"
        >
          <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase leading-none font-toy">
            Andy&apos;s Playroom Registry
          </span>
          <span className="text-xl font-black text-indigo-950 tracking-tight leading-tight flex items-center mt-1 font-toy">
            toy<span className="text-amber-500">Story</span>
            <span className="text-amber-400 ml-0.5">⭐</span>
          </span>
        </Link>

        {/* Center nav links */}
        <nav className="hidden md:flex items-center gap-5 text-[11px] font-extrabold font-toy">
          <Link
            href="/store"
            className="text-slate-600 hover:text-indigo-600 transition-colors"
          >
            🧸 Toy Store
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* ==========================================
              TODO Context 23: Render cart icon with live item count badge
              itemCount comes from useCart() — badge shows when itemCount > 0
              ========================================== */}
          {onCartOpen && (
            <button
              id="cart-icon-btn"
              onClick={onCartOpen}
              className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 text-slate-600 hover:bg-sky-100 hover:text-indigo-600 transition-all cursor-pointer"
              aria-label={`Open cart, ${itemCount} items`}
            >
              <span className="text-base">🛒</span>
              {/* ==========================================
                  TODO Context 23: Show badge only when itemCount > 0
                  Hint: {itemCount > 0 && ( <span ...>{itemCount}</span> )}
                  ========================================== */}
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-black flex items-center justify-center font-toy leading-none">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>
          )}

          {isLoggedIn ? (
            <div className="flex items-center gap-4 text-xs font-extrabold font-toy">
              <Link
                href="/dashboard"
                className="text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Room Console
              </Link>
              <button
                onClick={handleLogout}
                className="text-rose-500 hover:text-rose-600 hover:underline cursor-pointer bg-transparent border-none p-0 font-extrabold"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors font-toy"
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
