import { create } from "zustand";
import { Recipe } from "@/types";

// ==========================================
// TODO Bonus 1: Define SavedStore + create<SavedStore>()
// ==========================================
interface SavedStore {
  savedRecipes: Recipe[];
  savedCount: number;
  saveRecipe: (recipe: Recipe) => void;
  unsaveRecipe: (id: number) => void;
  clearSaved: () => void;
}

export const useSavedStore = create<SavedStore>((set, get) => ({
  savedRecipes: [],
  savedCount: 0,
  saveRecipe: (recipe) => {
    if (get().savedRecipes.find((r) => r.id === recipe.id)) return;
    const updated = [...get().savedRecipes, recipe];
    set({ savedRecipes: updated, savedCount: updated.length });
  },
  unsaveRecipe: (id) => {
    const updated = get().savedRecipes.filter((r) => r.id !== id);
    set({ savedRecipes: updated, savedCount: updated.length });
  },
  clearSaved: () => set({ savedRecipes: [], savedCount: 0 }),
}));
