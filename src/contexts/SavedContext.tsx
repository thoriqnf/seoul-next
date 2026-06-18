"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { Recipe } from "@/types";

// ==========================================
// TODO Recap Final 10: Saved recipes Context setup (SavedAction, savedReducer, SavedProvider, and useSaved)
// ==========================================
/*
type SavedAction =
  | { type: "SAVE"; payload: Recipe }
  | { type: "UNSAVE"; payload: { id: number } }
  | { type: "CLEAR" };

function savedReducer(state: Recipe[], action: SavedAction): Recipe[] {
  switch (action.type) {
    case "SAVE":
      return state.find((r) => r.id === action.payload.id)
        ? state
        : [...state, action.payload];
    case "UNSAVE":
      return state.filter((r) => r.id !== action.payload.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

interface SavedContextValue {
  savedRecipes: Recipe[];
  savedCount: number;
  dispatch: React.Dispatch<SavedAction>;
}

const SavedContext = createContext<SavedContextValue | null>(null);

export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedRecipes, dispatch] = useReducer(savedReducer, []);
  const savedCount = savedRecipes.length;

  return (
    <SavedContext.Provider value={{ savedRecipes, savedCount, dispatch }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const context = useContext(SavedContext);
  if (!context)
    throw new Error("useSaved must be used inside a <SavedProvider>");
  return context;
}
*/

// For the compiler to not break when these are not defined yet, we'll export stub versions:
export type SavedAction = any;
export const SavedProvider = ({ children }: { children: ReactNode }) => <>{children}</>;
export function useSaved() {
  return {
    savedRecipes: [] as Recipe[],
    savedCount: 0,
    dispatch: (() => {}) as any,
  };
}

