"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { Notification } from "@/types";

// ==========================================
// TODO Context 2: Define NotifAction as a discriminated union
// Three action types:
// ADD_NOTIF    → add a new notification (unread by default)
// DISMISS_NOTIF → remove a notification by id
// MARK_ALL_READ → mark every notification as read (badge count → 0)
// ==========================================
type NotifAction =
  | { type: "ADD_NOTIF"; payload: Notification }
  | { type: "DISMISS_NOTIF"; payload: { id: string } }
  | { type: "MARK_ALL_READ" };

// ==========================================
// TODO Context 3: Implement the ADD_NOTIF case in notifReducer
// Prepend the new notification so the newest appears at the top
// ==========================================
// ==========================================
// TODO Context 4: Implement the DISMISS_NOTIF case
// Use .filter() to return a new array without the removed notification
// ==========================================
// ==========================================
// TODO Context 5: Implement the MARK_ALL_READ case
// Use .map() to return a new array where every notification has read: true
// ==========================================
function notifReducer(
  state: Notification[],
  action: NotifAction
): Notification[] {
  switch (action.type) {
    case "ADD_NOTIF":
      return [action.payload, ...state];
    case "DISMISS_NOTIF":
      return state.filter((notif) => notif.id !== action.payload.id);
    case "MARK_ALL_READ":
      return state.map((notif) => ({ ...notif, read: true }));
    default:
      return state;
  }
}

// ==========================================
// TODO Context 6: Define NotifContextValue and create NotifContext
// The context exposes: notifications array, derived unreadCount, and dispatch
// unreadCount is derived here so every consumer gets it for free
// ==========================================
interface NotifContextValue {
  notifications: Notification[];
  unreadCount: number;
  dispatch: React.Dispatch<NotifAction>;
}

const NotifContext = createContext<NotifContextValue | null>(null);

// ==========================================
// TODO Context 7: Implement NotifProvider
// Use useReducer to manage state, derive unreadCount from the notifications array
// ==========================================
export function NotifProvider({ children }: { children: ReactNode }) {
  const [notifications, dispatch] = useReducer(notifReducer, []);

  // Derived value — count how many notifications have not been read yet
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
