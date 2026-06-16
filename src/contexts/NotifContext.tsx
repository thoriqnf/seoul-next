"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

// Notification type will be defined in TODO Context 1 (src/types/index.ts)
// For now we declare a local placeholder so this file compiles
interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

// ==========================================
// TODO Context 2: Define NotifAction as a discriminated union
// Every action type that can change notification state must be listed here
// ==========================================
// type NotifAction =
//   | { type: "ADD_NOTIF"; payload: Notification }
//   | { type: "DISMISS_NOTIF"; payload: { id: string } };
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
    // TODO Context 3: Handle ADD_NOTIF
    // Hint: return [action.payload, ...state]  ← prepend so newest is on top
    case "ADD_NOTIF":
      return state; // ← replace this line

    // TODO Context 4: Handle DISMISS_NOTIF
    // Hint: return state.filter((notif) => notif.id !== action.payload.id)
    case "DISMISS_NOTIF":
      return state; // ← replace this line

    default:
      return state;
  }
}

// ==========================================
// TODO Context 5: Define NotifContextValue and create the NotifContext
// createContext creates the "pipe" — no data yet, the Provider fills it
// ==========================================
// interface NotifContextValue {
//   notifications: Notification[];
//   dispatch: React.Dispatch<NotifAction>;
// }
// const NotifContext = createContext<NotifContextValue | null>(null);
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
  // TODO Context 6: Replace this stub with useReducer + Provider
  // const [notifications, dispatch] = useReducer(notifReducer, []);
  // return (
  //   <NotifContext.Provider value={{ notifications, dispatch }}>
  //     {children}
  //   </NotifContext.Provider>
  // );
  const [, dispatch] = useReducer(notifReducer, []);
  return (
    <NotifContext.Provider value={{ notifications: [], dispatch }}>
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
  // TODO Context 7: Replace with real implementation
  // const context = useContext(NotifContext);
  // if (!context) {
  //   throw new Error("useNotif must be used inside a <NotifProvider>");
  // }
  // return context;
  const context = useContext(NotifContext);
  if (!context) {
    throw new Error("useNotif must be used inside a <NotifProvider>");
  }
  return context;
}
