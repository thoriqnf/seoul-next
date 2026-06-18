"use client";

import { useNotif, ToastItem } from "@/contexts/NotifContext";

// ==========================================
// TODO Recap Final 16 (wired here): ToastContainer mounted in layout.tsx
// TODO Recap Final 17: Map notifications, auto-dismiss via useEffect timer (inside ToastItem)
// ==========================================
export function ToastContainer() {
  // Read notifications from context and map each to <ToastItem />.
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end pointer-events-none">
      {/* Map notifications here */}
    </div>
  );
}
