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
// TODO Recap Final 8: React Context + useReducer (NotifAction, notifReducer, NotifProvider, and useNotif)
// ==========================================
/*
type NotifAction =
  | { type: "ADD_NOTIF"; payload: Notification }
  | { type: "DISMISS_NOTIF"; payload: { id: string } };

function notifReducer(
  state: Notification[],
  action: NotifAction
): Notification[] {
  switch (action.type) {
    case "ADD_NOTIF":
      return [action.payload, ...state];
    case "DISMISS_NOTIF":
      return state.filter((n) => n.id !== action.payload.id);
    default:
      return state;
  }
}

interface NotifContextValue {
  notifications: Notification[];
  dispatch: React.Dispatch<NotifAction>;
}

const NotifContext = createContext<NotifContextValue | null>(null);

export function NotifProvider({ children }: { children: ReactNode }) {
  const [notifications, dispatch] = useReducer(notifReducer, []);
  return (
    <NotifContext.Provider value={{ notifications, dispatch }}>
      {children}
    </NotifContext.Provider>
  );
}

export function useNotif() {
  const context = useContext(NotifContext);
  if (!context)
    throw new Error("useNotif must be used inside a <NotifProvider>");
  return context;
}
*/

export type NotifAction = any;
export const NotifProvider = ({ children }: { children: ReactNode }) => <>{children}</>;
export function useNotif() {
  return {
    notifications: [] as Notification[],
    dispatch: (() => {}) as any,
  };
}

// ==========================================
// TODO Recap Final 9: Toast item display & auto-dismiss (useEffect + timer cleanup)
// ==========================================
export function ToastItem({ id, message, type }: Notification) {
  /*
  const { dispatch } = useNotif();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "DISMISS_NOTIF", payload: { id } });
    }, 3000);
    return () => clearTimeout(timer);
  }, [id, dispatch]);

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
        onClick={() =>
          dispatch({ type: "DISMISS_NOTIF", payload: { id } })
        }
        className="text-current opacity-60 hover:opacity-100 transition-opacity ml-1"
      >
        ✕
      </button>
    </div>
  );
  */
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-ramen-gold bg-amber-950/60 text-amber-300 backdrop-blur-sm text-sm font-medium shadow-xl max-w-xs">
      <span className="flex-1">{message} (Unimplemented ToastItem)</span>
    </div>
  );
}

