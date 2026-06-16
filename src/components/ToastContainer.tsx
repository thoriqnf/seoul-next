"use client";

import { useEffect } from "react";
import { useNotif } from "@/contexts/NotifContext";

// ==========================================
// TODO Context 10: Call useNotif() and render the toast stack
// Map over notifications and render each as a colored card
// success = green, error = red, info = blue
// Add a click-to-dismiss button that dispatches DISMISS_NOTIF
// ==========================================
// ==========================================
// TODO Context 11: Add auto-dismiss with useEffect inside each toast
// setTimeout fires DISMISS_NOTIF after 3 seconds
// Return clearTimeout as cleanup to prevent memory leaks
// ==========================================

const TOAST_COLORS: Record<string, string> = {
  success:
    "bg-emerald-50 border-emerald-200 border-b-emerald-300 text-emerald-900",
  error: "bg-rose-50 border-rose-200 border-b-rose-300 text-rose-900",
  info: "bg-sky-50 border-sky-200 border-b-sky-300 text-sky-900",
};

const TOAST_ICONS: Record<string, string> = {
  success: "✅",
  error: "❌",
  info: "ℹ️",
};

function ToastItem({
  id,
  message,
  type,
}: {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}) {
  const { dispatch } = useNotif();

  // ==========================================
  // TODO Context 11: Auto-dismiss after 3 seconds using useEffect
  // The cleanup function (clearTimeout) runs if the toast is manually dismissed
  // before the timer fires — preventing a stale-closure / memory leak
  // ==========================================
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "DISMISS_NOTIF", payload: { id } });
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, dispatch]);

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-2xl border-2 border-b-4 shadow-md text-xs font-semibold max-w-xs w-full ${TOAST_COLORS[type]}`}
    >
      <span className="text-sm shrink-0">{TOAST_ICONS[type]}</span>
      <p className="flex-1 leading-relaxed">{message}</p>
      <button
        onClick={() => dispatch({ type: "DISMISS_NOTIF", payload: { id } })}
        className="text-current opacity-50 hover:opacity-100 transition-opacity shrink-0 cursor-pointer"
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
}

// ==========================================
// TODO Context 10: ToastContainer reads notifications from useNotif()
// It renders a fixed-position stack in the bottom-right corner
// z-[9999] ensures it floats above all other UI including drawers and overlays
// ==========================================
export function ToastContainer() {
  const { notifications } = useNotif();

  if (notifications.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 items-end pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      {notifications.map((notif) => (
        <div key={notif.id} className="pointer-events-auto">
          <ToastItem
            id={notif.id}
            message={notif.message}
            type={notif.type}
          />
        </div>
      ))}
    </div>
  );
}
