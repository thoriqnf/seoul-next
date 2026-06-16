"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { Toy, CartItem } from "@/types";

// ==========================================
// TODO Context 14: Define CartAction discriminated union
// List every possible way the cart state can change
// ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART
// ==========================================
type CartAction =
  | { type: "ADD_ITEM"; payload: Toy }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

// ==========================================
// TODO Context 15: Implement ADD_ITEM case in cartReducer
// If the toy already exists in cart → increment its quantity
// If it's new → append it as a CartItem with quantity: 1
// This branching logic is the most important reducer pattern to understand
// ==========================================
// ==========================================
// TODO Context 16: Implement REMOVE_ITEM case
// Use .filter() to return a new array without the item — same pattern as DISMISS_NOTIF
// ==========================================
// ==========================================
// TODO Context 17: Implement UPDATE_QUANTITY case
// Use .map() to return a new array, spreading the matched item with the new quantity
// { ...item, quantity: action.payload.quantity }
// ==========================================
// ==========================================
// TODO Context 18: Implement CLEAR_CART case
// The simplest reducer case — just return an empty array []
// ==========================================
function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        // Item already in cart — bump the quantity
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // New item — add with quantity 1
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);
    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

// ==========================================
// TODO Context 19: Define CartContextValue, create CartContext,
// implement CartProvider with useReducer, derive computed values,
// and export useCart() hook with null safety guard
// Same 3-part pattern as NotifContext — context → provider → hook
// ==========================================
interface CartContextValue {
  items: CartItem[];
  dispatch: React.Dispatch<CartAction>;
  // Derived values computed inside the Provider so every consumer gets them for free
  itemCount: number;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  // Derive computed values from state — no need to store these separately
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ items, dispatch, itemCount, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a <CartProvider>");
  }
  return context;
}
