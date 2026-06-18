"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { Notification } from "@/types";

// ==========================================
// TODO Recap Final 13: NotifAction discriminated union + notifReducer
// ==========================================
type NotifAction = any; // Define discriminated union for ADD and DISMISS

function notifReducer(
  state: Notification[],
  action: any
): Notification[] {
  // Implement reducer logic
  return state;
}

// ==========================================
// TODO Recap Final 14: createContext + NotifProvider
// ==========================================
interface NotifContextValue {
  notifications: Notification[];
  dispatch: React.Dispatch<any>;
}

const NotifContext = createContext<NotifContextValue | null>(null);

export function NotifProvider({ children }: { children: ReactNode }) {
  // Setup useReducer
  const notifications: Notification[] = [];
  const dispatch = (action: any) => {};

  return (
    <NotifContext.Provider value={{ notifications, dispatch }}>
      {children}
    </NotifContext.Provider>
  );
}

// ==========================================
// TODO Recap Final 15: useNotif() custom hook with null guard
// ==========================================
export function useNotif() {
  // Implement hook with null guard
  return { notifications: [] as Notification[], dispatch: (action: any) => {} };
}

// ==========================================
// TODO Recap Final 17: ToastItem — auto-dismiss via useEffect + clearTimeout cleanup
// ==========================================
export function ToastItem({ id, message, type }: Notification) {
  // Implement useEffect with setTimeout to trigger auto-dismissal
  // and cleanup the timer on unmount.
  const dispatch = (action: any) => {};

  const colorMap = {
    success: "border-green-500 bg-green-950/60 text-green-300",
    error: "border-ramen-crimson bg-red-950/60 text-red-300",
    info: "border-ramen-gold bg-amber-950/60 text-amber-300",
  };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm text-sm font-medium shadow-xl max-w-xs ${colorMap[type]}`}
    >
      <span className="flex-1">{message}</span>
      <button
        onClick={() => {}}
        className="text-current opacity-60 hover:opacity-100 transition-opacity ml-1"
      >
        ✕
      </button>
    </div>
  );
}
