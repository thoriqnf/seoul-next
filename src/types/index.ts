// ==========================================
// Pre-written scaffolding — Ramen Discovery types
// ==========================================

export interface Recipe {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  caloriesPerServing: number;
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients?: string[];
  instructions?: string[];
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  servings?: number;
}

export interface SavedRecipe {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  savedAt: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  role: "master-curator" | "recipe-editor" | "explorer";
}

export interface SessionData {
  user: AuthUser;
  token: string;
}

export interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}
