"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { AuthUser } from "@/types";
import { useSaved } from "@/contexts/SavedContext";
import { useNotif } from "@/contexts/NotifContext";
import { SavedDrawer } from "@/components/SavedDrawer";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const NOTIF_ICONS: Record<string, string> = {
  success: "✅",
  error: "❌",
  info: "ℹ️",
};

export function Navigation() {
  const router = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // TODO Recap Final 3: Subscribe to the active session using SWR
  /*
  const { data: user } = useSWR<AuthUser>("/api/auth/me", fetcher, {
    shouldRetryOnError: false,
  });
  */
  const user: any = null;

  // TODO Recap Final 10: badge counts using useSaved()
  /*
  const { savedCount } = useSaved();
  const { notifications, dispatch: notifDispatch } = useNotif();
  */
  const savedCount = 0;
  const notifications: any[] = [];
  const notifDispatch = (action: any) => {};

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
      <SavedDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <header className="w-full border-b border-ramen-border bg-ramen-surface sticky top-0 z-40 shadow-[0_4px_12px_rgba(0,0,0,0.5)] font-sans">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Ramen Discovery Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-90 transition-all shrink-0"
          >
            <span className="text-xl">🍜</span>
            <span className="text-lg font-black font-serif text-ramen-text tracking-wider">
              Ramen <span className="text-ramen-crimson">Discovery</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold">
            <Link
              href="/recipes"
              className="text-ramen-muted hover:text-ramen-gold transition-colors"
            >
              Menu
            </Link>
            <Link
              href="/saved"
              className="text-ramen-muted hover:text-ramen-gold transition-colors"
            >
              Saved Board
            </Link>
          </nav>

          {/* User actions */}
          <div className="flex items-center gap-3">
            {/* Notification bell icon with unread badge */}
            <div className="relative">
              <button
                id="notif-bell-btn"
                onClick={() => {
                  setIsNotifOpen((prev) => !prev);
                  setIsDrawerOpen(false);
                }}
                className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-ramen-card border border-ramen-border text-ramen-text hover:border-ramen-gold hover:text-ramen-gold transition-all cursor-pointer"
                aria-label={`Notifications, ${notifications.length} notifications`}
              >
                <span className="text-base">🔔</span>
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-ramen-crimson text-white text-[9px] font-black flex items-center justify-center leading-none">
                    {notifications.length > 9 ? "9+" : notifications.length}
                  </span>
                )}
              </button>

              {/* Notification panel dropdown */}
              {isNotifOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-72 bg-ramen-surface border border-ramen-border rounded-2xl shadow-2xl z-50 overflow-hidden"
                  aria-label="Notification panel"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-ramen-border bg-ramen-card">
                    <span className="text-xs font-black text-ramen-text font-serif">
                      Notifications
                    </span>
                    {notifications.length > 0 && (
                      <button
                        onClick={() =>
                          notifDispatch({
                            type: "DISMISS_NOTIF",
                            payload: { id: notifications[0]?.id },
                          })
                        }
                        className="text-[10px] font-bold text-ramen-gold hover:underline cursor-pointer"
                      >
                        Dismiss last
                      </button>
                    )}
                  </div>

                  {notifications.length === 0 ? (
                    <div className="px-4 py-6 text-center">
                      <span className="text-2xl block mb-1">🔔</span>
                      <p className="text-[11px] font-semibold text-ramen-muted">
                        No notifications yet
                      </p>
                    </div>
                  ) : (
                    <ul className="max-h-64 overflow-y-auto divide-y divide-ramen-border">
                      {notifications.map((notif) => (
                        <li
                          key={notif.id}
                          className="flex items-start gap-2.5 px-4 py-3 hover:bg-ramen-card/50 transition-colors"
                        >
                          <span className="text-xs shrink-0 mt-0.5">
                            {NOTIF_ICONS[notif.type] || "ℹ️"}
                          </span>
                          <p className="flex-1 text-[11px] font-medium text-ramen-text leading-snug">
                            {notif.message}
                          </p>
                          <button
                            onClick={() =>
                              notifDispatch({
                                type: "DISMISS_NOTIF",
                                payload: { id: notif.id },
                              })
                            }
                            className="text-ramen-muted hover:text-ramen-text transition-colors shrink-0 cursor-pointer text-xs"
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

            {/* Saved Drawer button */}
            <button
              onClick={() => {
                setIsDrawerOpen(true);
                setIsNotifOpen(false);
              }}
              className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-ramen-card border border-ramen-border text-ramen-text hover:border-ramen-gold hover:text-ramen-gold transition-all cursor-pointer"
              aria-label={`Open bookmarks, ${savedCount} items`}
            >
              <span className="text-base">❤️</span>
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-ramen-crimson text-white text-[9px] font-black flex items-center justify-center leading-none">
                  {savedCount > 9 ? "9+" : savedCount}
                </span>
              )}
            </button>

            {/* Authentication UI */}
            {isLoggedIn ? (
              <div className="flex items-center gap-3 text-xs font-bold ml-1">
                <span className="text-ramen-muted hidden sm:inline">
                  Irashaimase, <strong className="text-ramen-text">{user.firstName}</strong> ({user.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="text-ramen-crimson hover:text-ramen-crimson-hover hover:underline cursor-pointer bg-transparent border-none p-0 font-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-xs font-bold text-ramen-gold hover:text-ramen-gold-light transition-colors ml-1"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
