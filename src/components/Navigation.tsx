"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { AuthUser } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { CartDrawer } from "@/components/CartDrawer";

// ==========================================
// TODO Context 10: Import useNotif to read the live notification state
// ==========================================
import { useNotif } from "@/contexts/NotifContext";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const NOTIF_ICONS: Record<string, string> = {
  success: "✅",
  error: "❌",
  info: "ℹ️",
};

export function Navigation() {
  const router = useRouter();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const { data: user } = useSWR<AuthUser>("/api/auth/me", fetcher, {
    shouldRetryOnError: false,
  });

  // 🚨 BOTTLENECK — WHY DO WE NEED STATE MANAGEMENT HERE?
  // ─────────────────────────────────────────────────────────
  // Navigation needs to show TWO live counts:
  //   🛒 Cart badge  → how many items are in the cart
  //   🔔 Bell badge  → how many unread notifications exist
  //
  // WITHOUT Context, the only option is prop drilling:
  //   Every page that renders <Navigation /> would have to:
  //   1. Keep its own cart state in useState
  //   2. Pass it down: <Navigation itemCount={n} unreadCount={m} />
  //
  // The real problem: when a user adds a toy on /store,
  // how does the Navigation on /dashboard know to update?
  // → It CAN'T. Components can't talk to each other sideways.
  //   State would have to be lifted all the way up to layout.tsx
  //   and then passed down to EVERY page as props. A maintenance nightmare.
  //
  // WITH Context:
  //   Navigation just calls useCart() and useNotif() — one line each.
  //   No props. No callbacks. Updates instantly on every page.
  // ─────────────────────────────────────────────────────────

  // ==========================================
  // TODO Context 23: Call useCart() to read live itemCount
  // ==========================================
  const { itemCount } = useCart();

  // ==========================================
  // TODO Context 10: Call useNotif() to read notifications, unreadCount, and dispatch
  // unreadCount drives the bell badge — any page that dispatches ADD_NOTIF
  // will instantly update this badge without any prop passing
  // ==========================================
  // const { notifications, unreadCount, dispatch: notifDispatch } = useNotif();
  const { notifications, unreadCount, dispatch: notifDispatch } = useNotif();

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      await mutate("/api/auth/me", null, false);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <header className="w-full border-b-4 border-sky-200 bg-white sticky top-0 z-40 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] font-sans">
        <div className="mx-auto max-w-4xl px-6 md:px-8 h-16 flex items-center justify-between gap-4">
          {/* toyStory Brand Logo */}
          <Link href="/" className="flex flex-col shrink-0 hover:opacity-90 transition-all">
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
            <Link href="/store" className="text-slate-600 hover:text-indigo-600 transition-colors">
              🧸 Toy Store
            </Link>
          </nav>

          {/* Right action icons */}
          <div className="flex items-center gap-2">

            {/* ==========================================
                TODO Context 10: Bell icon with unread badge
                unreadCount comes from useNotif() — badge is 0 until TODO Context 7
                derives it correctly from the notifications array
                ========================================== */}
            <div className="relative">
              <button
                id="notif-bell-btn"
                onClick={() => {
                  setIsNotifOpen((prev) => !prev);
                  setIsCartOpen(false);
                }}
                className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 text-slate-600 hover:bg-sky-100 hover:text-indigo-600 transition-all cursor-pointer"
                aria-label={`Notifications, ${unreadCount} unread`}
              >
                <span className="text-base">🔔</span>
                {/* Badge — visible only when unreadCount > 0 */}
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center font-toy leading-none">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {/* ==========================================
                  TODO Context 11: Notification panel dropdown
                  - Call useNotif() — already done above
                  - Map over notifications array to render each item
                  - Wire "Mark all read" → dispatch MARK_ALL_READ
                  - Wire dismiss ✕ → dispatch DISMISS_NOTIF
                  ========================================== */}
              {isNotifOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-72 bg-white border-2 border-sky-100 rounded-2xl shadow-lg z-50 overflow-hidden"
                  aria-label="Notification panel"
                >
                  {/* Panel header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-sky-100">
                    <span className="text-xs font-black text-indigo-950 font-toy">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <button
                        id="mark-all-read-btn"
                        onClick={() =>
                          notifDispatch({ type: "MARK_ALL_READ" })
                        }
                        className="text-[10px] font-bold text-indigo-500 hover:text-indigo-700 transition-colors cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  {/* Notification list */}
                  {notifications.length === 0 ? (
                    <div className="px-4 py-6 text-center">
                      <span className="text-2xl block mb-1">🔔</span>
                      <p className="text-[11px] font-semibold text-slate-400">
                        No notifications yet
                      </p>
                      <p className="text-[10px] text-slate-300 mt-0.5">
                        Add a toy to the cart to see one!
                      </p>
                    </div>
                  ) : (
                    <ul className="max-h-64 overflow-y-auto divide-y divide-sky-50">
                      {/* TODO Context 11: Map over notifications and render each item */}
                      {notifications.map((notif) => (
                        <li
                          key={notif.id}
                          className={`flex items-start gap-2.5 px-4 py-3 transition-colors ${
                            notif.read ? "opacity-50" : "bg-sky-50/50"
                          }`}
                        >
                          <span className="text-xs shrink-0 mt-0.5">
                            {NOTIF_ICONS[notif.type]}
                          </span>
                          <p className="flex-1 text-[11px] font-medium text-slate-700 leading-snug">
                            {notif.message}
                          </p>
                          <button
                            onClick={() =>
                              notifDispatch({
                                type: "DISMISS_NOTIF",
                                payload: { id: notif.id },
                              })
                            }
                            className="text-slate-300 hover:text-slate-500 transition-colors shrink-0 cursor-pointer text-xs"
                            aria-label="Dismiss notification"
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Cart icon with badge */}
            <button
              id="cart-icon-btn"
              onClick={() => { setIsCartOpen(true); setIsNotifOpen(false); }}
              className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 text-slate-600 hover:bg-sky-100 hover:text-indigo-600 transition-all cursor-pointer"
              aria-label={`Open cart, ${itemCount} items`}
            >
              <span className="text-base">🛒</span>
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-black flex items-center justify-center font-toy leading-none">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>

            {/* Auth links */}
            {isLoggedIn ? (
              <div className="flex items-center gap-3 text-xs font-extrabold font-toy ml-1">
                <Link href="/dashboard" className="text-slate-600 hover:text-indigo-600 transition-colors hidden sm:block">
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
              <Link href="/login" className="text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors font-toy ml-1">
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
    </>
  );
}
