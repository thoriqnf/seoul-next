"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { Notification } from "@/types";

// 🚨 BOTTLENECK — WHY DO WE NEED A NOTIFICATION CONTEXT?
// ─────────────────────────────────────────────────────────
// The 🔔 bell badge lives in <Navigation>.
// The action that CREATES a notification happens in <StorePage> (Add to Cart).
// In the future it could also happen from <Dashboard>, <CheckoutPage>, etc.
//
// WITHOUT Context:
//   <Navigation> would hold the notifications array in its own useState.
//   Every page that wants to add a notification would need a callback prop:
//   <StorePage onNotify={(msg) => ...} />
//   <Dashboard onNotify={(msg) => ...} />
//   → Every new page = new prop. This pattern breaks immediately at scale.
//
// WITH Context:
//   Any component anywhere in the tree calls:
//   const { dispatch } = useNotif();
//   dispatch({ type: "ADD_NOTIF", payload: { ... } });
//   The bell badge in Navigation updates instantly. No props at all.
//
// This is the definition of global state: one source of truth,
// any component can read or write, zero prop drilling.
// ─────────────────────────────────────────────────────────

// ==========================================
// TODO Context 2: Define NotifAction as a discriminated union
// Three action types this time:
// ADD_NOTIF     → add a new notification (unread by default)
// DISMISS_NOTIF → remove a notification by id
// MARK_ALL_READ → mark every notification as read (badge count → 0)
// ==========================================
// type NotifAction =
//   | { type: "ADD_NOTIF"; payload: Notification }
//   | { type: "DISMISS_NOTIF"; payload: { id: string } }
//   | { type: "MARK_ALL_READ" };
type NotifAction =
  | { type: "ADD_NOTIF"; payload: Notification }
  | { type: "DISMISS_NOTIF"; payload: { id: string } }
  | { type: "MARK_ALL_READ" };

function notifReducer(
  state: Notification[],
  action: NotifAction
): Notification[] {
  switch (action.type) {
    // ==========================================
    // TODO Context 3: Handle ADD_NOTIF
    // Hint: return [action.payload, ...state]  ← prepend so newest is on top
    // ==========================================
    case "ADD_NOTIF":
      return [action.payload, ...state];

    // ==========================================
    // TODO Context 4: Handle DISMISS_NOTIF
    // Hint: return state.filter((notif) => notif.id !== action.payload.id)
    // ==========================================
    case "DISMISS_NOTIF":
      return state.filter((notif) => notif.id !== action.payload.id);

    // ==========================================
    // TODO Context 5: Handle MARK_ALL_READ
    // Hint: return state.map((notif) => ({ ...notif, read: true }))
    // ==========================================
    case "MARK_ALL_READ":
      return state.map((notif) => ({ ...notif, read: true }));

    default:
      return state;
  }
}

// ==========================================
// TODO Context 6: Define NotifContextValue and create NotifContext
// The context exposes: notifications array, derived unreadCount, and dispatch
// ==========================================
// interface NotifContextValue {
//   notifications: Notification[];
//   unreadCount: number;
//   dispatch: React.Dispatch<NotifAction>;
// }
// const NotifContext = createContext<NotifContextValue | null>(null);
interface NotifContextValue {
  notifications: Notification[];
  unreadCount: number;
  dispatch: React.Dispatch<NotifAction>;
}
const NotifContext = createContext<NotifContextValue | null>(null);

// ==========================================
// TODO Context 7: Implement NotifProvider
// Use useReducer, derive unreadCount from the notifications array:
// const unreadCount = notifications.filter((notif) => !notif.read).length;
// ==========================================
export function NotifProvider({ children }: { children: ReactNode }) {
  const [notifications, dispatch] = useReducer(notifReducer, []);

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return (
    <NotifContext.Provider value={{ notifications, unreadCount, dispatch }}>
      {children}
    </NotifContext.Provider>
  );
}

// ==========================================
// TODO Context 8: Export useNotif() custom hook with null safety guard
// ==========================================
export function useNotif() {
  const context = useContext(NotifContext);
  if (!context) {
    throw new Error("useNotif must be used inside a <NotifProvider>");
  }
  return context;
}
