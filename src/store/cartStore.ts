// import { create } from "zustand";
// import { Toy, CartItem } from "@/types";

// // ==========================================
// // TODO Context 27: Define the Zustand store state interface
// // In Zustand, state + actions live together in ONE flat object
// // No separate action types, no discriminated unions — just plain functions
// // ==========================================
// interface CartStore {
//   items: CartItem[];
//   itemCount: number;
//   total: number;
//   addItem: (toy: Toy) => void;
//   removeItem: (id: number) => void;
//   updateQuantity: (id: number, quantity: number) => void;
//   clearCart: () => void;
// }

// // ==========================================
// // TODO Context 28: Implement the Zustand create() call
// // set() replaces useReducer + switch — just call set() with the new state
// // No action types, no switch cases, no dispatch — just plain function calls
// // Compare this to the cartReducer in CartContext.tsx — same logic, far less boilerplate
// // ==========================================
// export const useCartStore = create<CartStore>((set, get) => ({
//   items: [],
//   itemCount: 0,
//   total: 0,

//   addItem: (toy: Toy) => {
//     const existing = get().items.find((item) => item.id === toy.id);
//     const updatedItems = existing
//       ? get().items.map((item) =>
//           item.id === toy.id ? { ...item, quantity: item.quantity + 1 } : item
//         )
//       : [...get().items, { ...toy, quantity: 1 }];

//     set({
//       items: updatedItems,
//       itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
//       total: updatedItems.reduce(
//         (sum, item) => sum + item.price * item.quantity,
//         0
//       ),
//     });
//   },

//   removeItem: (id: number) => {
//     const updatedItems = get().items.filter((item) => item.id !== id);
//     set({
//       items: updatedItems,
//       itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
//       total: updatedItems.reduce(
//         (sum, item) => sum + item.price * item.quantity,
//         0
//       ),
//     });
//   },

//   updateQuantity: (id: number, quantity: number) => {
//     const updatedItems = get().items.map((item) =>
//       item.id === id ? { ...item, quantity } : item
//     );
//     set({
//       items: updatedItems,
//       itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
//       total: updatedItems.reduce(
//         (sum, item) => sum + item.price * item.quantity,
//         0
//       ),
//     });
//   },

//   clearCart: () => set({ items: [], itemCount: 0, total: 0 }),
// }));
