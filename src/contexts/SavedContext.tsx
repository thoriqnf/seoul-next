"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { Recipe } from "@/types";

// ==========================================
// TODO Recap Final 18: SavedAction union + savedReducer (SAVE / UNSAVE / CLEAR)
// ==========================================
type SavedAction = any; // Define action types

function savedReducer(state: Recipe[], action: any): Recipe[] {
  // Implement reducer cases
  return state;
}

// ==========================================
// TODO Recap Final 19: SavedProvider with derived savedCount
// ==========================================
interface SavedContextValue {
  savedRecipes: Recipe[];
  savedCount: number;
  dispatch: React.Dispatch<any>;
}

const SavedContext = createContext<SavedContextValue | null>(null);

export function SavedProvider({ children }: { children: ReactNode }) {
  // Initialize useReducer with savedReducer
  const savedRecipes: Recipe[] = [];
  const savedCount = 0;
  const dispatch = (action: any) => {};

  return (
    <SavedContext.Provider value={{ savedRecipes, savedCount, dispatch }}>
      {children}
    </SavedContext.Provider>
  );
}

// ==========================================
// TODO Recap Final 20: useSaved() custom hook with null guard
// ==========================================
export function useSaved() {
  // Implement custom hook with null check guard
  return { savedRecipes: [] as Recipe[], savedCount: 0, dispatch: (action: any) => {} };
}
