"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { Notification } from "@/types";

// ==========================================
// TODO Context 2: Define NotifAction as a discriminated union
// Every action type that can change notification state must be listed here
// ==========================================
type NotifAction =
  | { type: "ADD_NOTIF"; payload: Notification }
  | { type: "DISMISS_NOTIF"; payload: { id: string } };

// ==========================================
// TODO Context 3: Implement the ADD_NOTIF case in notifReducer
// Reducers are pure functions: (currentState, action) => newState
// Never mutate the state directly — always return a NEW array
// ==========================================
// ==========================================
// TODO Context 4: Implement the DISMISS_NOTIF case in notifReducer
// Use .filter() to return a new array without the dismissed notification
// ==========================================
function notifReducer(
  state: Notification[],
  action: NotifAction
): Notification[] {
  switch (action.type) {
    case "ADD_NOTIF":
      // Prepend new notification so newest appears at top
      return [action.payload, ...state];
    case "DISMISS_NOTIF":
      return state.filter((notif) => notif.id !== action.payload.id);
    default:
      return state;
  }
}

// ==========================================
// TODO Context 5: Define NotifContextValue and create the NotifContext
// createContext creates the "pipe" — no data yet, the Provider fills it
// ==========================================
interface NotifContextValue {
  notifications: Notification[];
  dispatch: React.Dispatch<NotifAction>;
}

const NotifContext = createContext<NotifContextValue | null>(null);

// ==========================================
// TODO Context 6: Implement NotifProvider
// The Provider is the "water source" — it wraps children and injects state into the pipe
// ==========================================
export function NotifProvider({ children }: { children: ReactNode }) {
  const [notifications, dispatch] = useReducer(notifReducer, []);

  return (
    <NotifContext.Provider value={{ notifications, dispatch }}>
      {children}
    </NotifContext.Provider>
  );
}

// ==========================================
// TODO Context 7: Export useNotif() custom hook
// The hook is the "tap" — consumers call useNotif() and get state + dispatch
// The null check catches the mistake of calling useNotif() outside a NotifProvider
// ==========================================
export function useNotif() {
  const context = useContext(NotifContext);
  if (!context) {
    throw new Error("useNotif must be used inside a <NotifProvider>");
  }
  return context;
}
