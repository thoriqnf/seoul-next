import { create } from "zustand";

// Toy and CartItem will be defined in TODO Context 12 & 13
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

// ==========================================
// TODO Context 27: Define the Zustand store state interface
// In Zustand, state + actions live together in ONE flat object
// No separate action types, no discriminated unions — just plain functions
// ==========================================
// interface CartStore {
//   items: CartItem[];
//   itemCount: number;
//   total: number;
//   addItem: (toy: Toy) => void;
//   removeItem: (id: number) => void;
//   updateQuantity: (id: number, quantity: number) => void;
//   clearCart: () => void;
// }

// ==========================================
// TODO Context 28: Implement the Zustand create() call
// set() replaces useReducer + switch — just call set() with the new state
// No action types, no switch cases, no dispatch — just plain function calls
// Compare this to cartReducer in CartContext.tsx — same logic, far less boilerplate
// ==========================================
// export const useCartStore = create<CartStore>((set, get) => ({
//   items: [],
//   itemCount: 0,
//   total: 0,
//   addItem: (toy) => { ... },
//   removeItem: (id) => { ... },
//   updateQuantity: (id, quantity) => { ... },
//   clearCart: () => set({ items: [], itemCount: 0, total: 0 }),
// }));

// Placeholder export so any import of useCartStore doesn't break the build
interface CartStore {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (toy: Toy) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>(() => ({
  items: [],
  itemCount: 0,
  total: 0,
  addItem: () => console.log("TODO Context 28: implement addItem"),
  removeItem: () => console.log("TODO Context 28: implement removeItem"),
  updateQuantity: () => console.log("TODO Context 28: implement updateQuantity"),
  clearCart: () => console.log("TODO Context 28: implement clearCart"),
}));
