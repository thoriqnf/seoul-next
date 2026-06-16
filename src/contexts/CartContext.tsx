"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

// CartItem and Toy types will be defined in TODO Context 12 & 13 (src/types/index.ts)
// Local placeholder interfaces so this file compiles on the starter branch
interface Toy {
  id: number;
  name: string;
  price: number;
  emoji: string;
  description: string;
}

interface CartItem extends Toy {
  quantity: number;
}

// 🚨 BOTTLENECK — WHY useReducer INSTEAD OF useState?
// ─────────────────────────────────────────────────────────
// The cart has 4 operations: add, remove, update quantity, clear.
// You COULD try managing this with multiple useState calls:
//
//   const [items, setItems] = useState([]);
//
//   // Add: have to check if item exists, decide to append or update...
//   // Remove: filter the array, return a new one...
//   // Update: map over, find by id, spread new quantity...
//   // Clear: setItems([])...
//
// Each operation is scattered logic in your component. Hard to read, easy to get wrong.
// If two operations run at the same time, they can overwrite each other (stale closure bug).
//
// useReducer fixes this by:
//   1. Centralising all mutations in ONE pure function (the reducer)
//   2. Making state transitions explicit and predictable via action types
//   3. Making it impossible to mutate state directly (must go through dispatch)
// ─────────────────────────────────────────────────────────

// ==========================================
// TODO Context 14: Define CartAction discriminated union
// List every possible way the cart state can change:
// ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART
// ==========================================
// type CartAction =
//   | { type: "ADD_ITEM"; payload: Toy }
//   | { type: "REMOVE_ITEM"; payload: { id: number } }
//   | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
//   | { type: "CLEAR_CART" };
type CartAction =
  | { type: "ADD_ITEM"; payload: Toy }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    // ==========================================
    // TODO Context 15: Handle ADD_ITEM
    // If item already in cart → bump quantity
    // If new → append with quantity: 1
    // Hint:
    // const existing = state.find((item) => item.id === action.payload.id);
    // if (existing) { return state.map((item) => item.id === ... ? { ...item, quantity: item.quantity + 1 } : item) }
    // return [...state, { ...action.payload, quantity: 1 }];
    // ==========================================
    case "ADD_ITEM":
      return state; // ← replace this line

    // ==========================================
    // TODO Context 16: Handle REMOVE_ITEM
    // Hint: return state.filter((item) => item.id !== action.payload.id)
    // ==========================================
    case "REMOVE_ITEM":
      return state; // ← replace this line

    // ==========================================
    // TODO Context 17: Handle UPDATE_QUANTITY
    // Hint: return state.map((item) => item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item)
    // ==========================================
    case "UPDATE_QUANTITY":
      return state; // ← replace this line

    // ==========================================
    // TODO Context 18: Handle CLEAR_CART
    // Hint: return []
    // ==========================================
    case "CLEAR_CART":
      return state; // ← replace this line

    default:
      return state;
  }
}

// ==========================================
// TODO Context 19: Define CartContextValue, create CartContext,
// implement CartProvider with useReducer + derived values (itemCount, total),
// and export useCart() hook with null safety guard
// Same 3-part pattern as NotifContext — context → provider → hook
// ==========================================
interface CartContextValue {
  items: CartItem[];
  dispatch: React.Dispatch<CartAction>;
  itemCount: number;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  // TODO Context 19: Derive itemCount and total from items
  // const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  // const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = 0; // ← replace with real derived value
  const total = 0; // ← replace with real derived value

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
