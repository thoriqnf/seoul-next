# Developer Guide: Week 4 Day 2 — State Management with React Context + Zustand

This guide walks through building **global state management** in Andy's Playroom using two approaches:

- **Demo 1 (Guided):** A **Notification / Toast system** powered by React Context + `useReducer`. All solution code is provided — uncomment each block and follow along.
- **Demo 2 (Hands-on):** A **Global Shopping Cart** for the Toy Store. Apply the same pattern from Demo 1 yourself.
- **Bonus:** Rebuild the cart as a **Zustand store** and compare the two approaches side-by-side.

---

## Prerequisites

Make sure both servers are running in separate terminals:

```bash
# Terminal 1 — Next.js dev server
bun dev

# Terminal 2 — json-server (for the Toy Store product data)
bun run api
```

---

## Core Concepts

### What is State Management?

As apps grow, components need to **share state** without passing props through many layers (called "prop drilling"). Global state management solves this.

### React Context — The Pipe Metaphor

| Part | Metaphor | What it does |
|---|---|---|
| `createContext` | The pipe | Creates the channel — empty until a Provider fills it |
| `Provider` | The water source | Wraps components and injects state into the pipe |
| `useContext` / custom hook | The tap | Any component subscribes and reads the state |

### `useReducer` — Predictable State Updates

Instead of multiple `useState` calls, `useReducer` manages complex state through **pure functions**:

```
dispatch(action) → reducer(currentState, action) → newState → re-render
```

---

## Demo 1: Notification System (TODOs 1–11)

### Phase 1A — Types

#### Step 1 (`// TODO Context 1`)
**File:** `src/types/index.ts`

Define the `Notification` interface. Uncomment the block:

```typescript
export interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}
```

> **Why `id`?** We need to identify each notification individually to dismiss it. Using `Date.now().toString()` or a short UUID works great.

---

### Phase 1B — Actions & Reducer

#### Step 2 (`// TODO Context 2`)
**File:** `src/contexts/NotifContext.tsx`

Define the `NotifAction` discriminated union — the "menu" of everything that can change notification state:

```typescript
type NotifAction =
  | { type: "ADD_NOTIF"; payload: Notification }
  | { type: "DISMISS_NOTIF"; payload: { id: string } };
```

> **What is a discriminated union?** TypeScript uses the `type` field to narrow exactly which `payload` shape is valid for each action. This prevents passing the wrong data.

---

#### Step 3 (`// TODO Context 3`)
**File:** `src/contexts/NotifContext.tsx`

Implement the `ADD_NOTIF` case in `notifReducer`:

```typescript
case "ADD_NOTIF":
  return [action.payload, ...state];
```

> **Why prepend?** `[action.payload, ...state]` puts the newest notification at the top of the stack. Never use `state.push()` — that mutates the array in place, breaking React's change detection.

---

#### Step 4 (`// TODO Context 4`)
**File:** `src/contexts/NotifContext.tsx`

Implement the `DISMISS_NOTIF` case:

```typescript
case "DISMISS_NOTIF":
  return state.filter((notif) => notif.id !== action.payload.id);
```

> **Why `.filter()`?** It returns a brand-new array without the dismissed item. React sees a new reference and knows to re-render.

---

### Phase 1C — Context + Provider

#### Step 5 (`// TODO Context 5`)
**File:** `src/contexts/NotifContext.tsx`

Define the context shape and create the context:

```typescript
interface NotifContextValue {
  notifications: Notification[];
  dispatch: React.Dispatch<NotifAction>;
}

const NotifContext = createContext<NotifContextValue | null>(null);
```

> **Why `| null`?** The context starts as `null` — there's no data yet. The Provider fills it. The `null` initial value also lets us detect if someone calls `useNotif()` outside a Provider.

---

#### Step 6 (`// TODO Context 6`)
**File:** `src/contexts/NotifContext.tsx`

Implement `NotifProvider`:

```typescript
export function NotifProvider({ children }: { children: ReactNode }) {
  const [notifications, dispatch] = useReducer(notifReducer, []);

  return (
    <NotifContext.Provider value={{ notifications, dispatch }}>
      {children}
    </NotifContext.Provider>
  );
}
```

> **The magic:** Any component inside `<NotifProvider>` can now call `useContext(NotifContext)` and get `notifications` + `dispatch`.

---

#### Step 7 (`// TODO Context 7`)
**File:** `src/contexts/NotifContext.tsx`

Export the `useNotif()` custom hook:

```typescript
export function useNotif() {
  const context = useContext(NotifContext);
  if (!context) {
    throw new Error("useNotif must be used inside a <NotifProvider>");
  }
  return context;
}
```

> **Why a custom hook?** It hides the `useContext` call. Consumers just write `useNotif()` instead of `useContext(NotifContext)`. The null check gives a clear error message if the Provider is missing.

---

### Phase 1D — Wire to App

#### Step 8 (`// TODO Context 8`)
**File:** `src/app/layout.tsx`

Wrap `{children}` with `<NotifProvider>`:

```tsx
<NotifProvider>
  {children}
</NotifProvider>
```

> **Why root layout?** The Provider must sit above every component that uses `useNotif()`. Root layout = every page in the app.

---

#### Step 9 (`// TODO Context 9`)
**File:** `src/app/layout.tsx`

Mount `<ToastContainer />` inside the Provider:

```tsx
<NotifProvider>
  {children}
  <ToastContainer />
</NotifProvider>
```

> **Why inside NotifProvider?** `ToastContainer` calls `useNotif()` — it must live inside the Provider tree.

---

### Phase 1E — Build the Toast UI

#### Step 10 (`// TODO Context 10`)
**File:** `src/components/ToastContainer.tsx`

Call `useNotif()` and render the toast stack. Map over `notifications`:

```tsx
export function ToastContainer() {
  const { notifications } = useNotif();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
      {notifications.map((notif) => (
        <ToastItem key={notif.id} {...notif} />
      ))}
    </div>
  );
}
```

> **Key insight:** `ToastContainer` is a pure subscriber — it reads state and renders. It never owns the state itself.

---

#### Step 11 (`// TODO Context 11`)
**File:** `src/components/ToastContainer.tsx`

Add auto-dismiss inside `ToastItem` using `useEffect`:

```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    dispatch({ type: "DISMISS_NOTIF", payload: { id } });
  }, 3000);

  return () => clearTimeout(timer);
}, [id, dispatch]);
```

> **Why the cleanup function?** If the user manually dismisses a toast before 3 seconds, the `ToastItem` unmounts. Without `clearTimeout`, the timer fires anyway and tries to dispatch on a dead component — causing a memory leak or stale-closure error.

---

## Demo 2: Shopping Cart (TODOs 12–26)

You now know the full pattern. Apply it yourself to the cart.

---

### Phase 2A — Types

#### Step 12 (`// TODO Context 12`)
**File:** `src/types/index.ts`

Add the `Toy` interface (matches json-server shape):

```typescript
export interface Toy {
  id: number;
  name: string;
  price: number;
  emoji: string;
  description: string;
}
```

---

#### Step 13 (`// TODO Context 13`)
**File:** `src/types/index.ts`

Add `CartItem` — it extends `Toy` so you don't repeat yourself:

```typescript
export interface CartItem extends Toy {
  quantity: number;
}
```

> **Hint:** `extends` means CartItem automatically has all Toy fields + the new `quantity` field.

---

### Phase 2B — Actions & Reducer

#### Step 14 (`// TODO Context 14`)
**File:** `src/contexts/CartContext.tsx`

Define `CartAction` — same pattern as `NotifAction`. Four action types:
- `ADD_ITEM` with `payload: Toy`
- `REMOVE_ITEM` with `payload: { id: number }`
- `UPDATE_QUANTITY` with `payload: { id: number; quantity: number }`
- `CLEAR_CART` (no payload needed)

---

#### Step 15 (`// TODO Context 15`)
**File:** `src/contexts/CartContext.tsx`

Implement `ADD_ITEM` in `cartReducer`. This is the trickiest case:

```typescript
case "ADD_ITEM": {
  const existing = state.find((item) => item.id === action.payload.id);
  if (existing) {
    return state.map((item) =>
      item.id === action.payload.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...state, { ...action.payload, quantity: 1 }];
}
```

> **Hint:** Two branches — item already in cart? Bump quantity. New item? Append with `quantity: 1`.

---

#### Step 16 (`// TODO Context 16`)
**File:** `src/contexts/CartContext.tsx`

Implement `REMOVE_ITEM`. Hint: same `.filter()` pattern as `DISMISS_NOTIF`.

---

#### Step 17 (`// TODO Context 17`)
**File:** `src/contexts/CartContext.tsx`

Implement `UPDATE_QUANTITY` using `.map()` + spread:
```typescript
return state.map((item) =>
  item.id === action.payload.id
    ? { ...item, quantity: action.payload.quantity }
    : item
);
```

---

#### Step 18 (`// TODO Context 18`)
**File:** `src/contexts/CartContext.tsx`

Implement `CLEAR_CART` — the simplest case. Just return `[]`.

---

### Phase 2C — Context + Provider

#### Step 19 (`// TODO Context 19`)
**File:** `src/contexts/CartContext.tsx`

Three-part pattern — same as NotifContext. Also derive `itemCount` and `total` inside the Provider:

```typescript
const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
```

> **Why derive in the Provider?** Computed values only need to live in one place. Every consumer gets them for free from `useCart()`.

---

### Phase 2D — Mount Provider

#### Step 20 (`// TODO Context 20`)
**File:** `src/app/layout.tsx`

Add `<CartProvider>` alongside `<NotifProvider>`. Both providers are independent — they can nest in any order.

---

### Phase 2E — Store Page

#### Step 21 (`// TODO Context 21`)
**File:** `src/app/store/page.tsx`

Fetch toys from json-server using `useSWR`:

```typescript
const { data: toys, error, isLoading } = useSWR<Toy[]>(
  "http://localhost:4000/toys",
  fetcher
);
```

> **Reminder:** json-server must be running (`bun run api`) for this to work.

---

#### Step 22 (`// TODO Context 22`)
**File:** `src/app/store/page.tsx`

Call `useCart()` and `useNotif()`, then dispatch on "Add to Cart":

```typescript
const { dispatch: cartDispatch } = useCart();
const { dispatch: notifDispatch } = useNotif();

const handleAddToCart = (toy: Toy) => {
  cartDispatch({ type: "ADD_ITEM", payload: toy });
  notifDispatch({
    type: "ADD_NOTIF",
    payload: {
      id: `notif-${toy.id}-${Date.now()}`,
      message: `${toy.emoji} ${toy.name} added to cart!`,
      type: "success",
    },
  });
};
```

> **Payoff moment:** One click → two context dispatches. Demo 1 and Demo 2 connect here.

---

### Phase 2F — Navigation Cart Badge

#### Step 23 (`// TODO Context 23`)
**File:** `src/components/Navigation.tsx`

Read `itemCount` from `useCart()` and render the badge:

```typescript
const { itemCount } = useCart();

// In JSX:
{itemCount > 0 && (
  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-black flex items-center justify-center">
    {itemCount > 9 ? "9+" : itemCount}
  </span>
)}
```

> **Wow moment:** Navigation has no idea the Toy Store exists — yet it sees the live count the moment a toy is added.

---

### Phase 2G — Cart Drawer

#### Step 24 (`// TODO Context 24`)
**File:** `src/components/CartDrawer.tsx`

Call `useCart()` and map over items to render each cart row:

```typescript
const { items, total, dispatch } = useCart();
```

---

#### Step 25 (`// TODO Context 25`)
**File:** `src/components/CartDrawer.tsx`

Wire the quantity controls and remove button:

```typescript
// − button
dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: Math.max(1, item.quantity - 1) } })

// + button
dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity + 1 } })

// Remove button
dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } })
```

---

#### Step 26 (`// TODO Context 26`)
**File:** `src/components/CartDrawer.tsx`

Display `total` and wire the Clear Cart button:

```tsx
<span>${total.toFixed(2)}</span>
<button onClick={() => dispatch({ type: "CLEAR_CART" })}>
  Clear cart
</button>
```

> **Note:** `total` was already computed in `CartProvider` — you just read it here. No math needed.

---

## Bonus: Zustand Comparison (TODOs 27–29)

Now let's rebuild the same cart with Zustand and compare.

### Step 27 (`// TODO Context 27`)
**File:** `src/store/cartStore.ts`

Define the Zustand store state interface — state + actions in one flat object:

```typescript
interface CartStore {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (toy: Toy) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}
```

---

### Step 28 (`// TODO Context 28`)
**File:** `src/store/cartStore.ts`

Implement `create<CartStore>()` — no Provider, no `createContext`, no switch:

```typescript
export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  itemCount: 0,
  total: 0,
  addItem: (toy) => {
    const existing = get().items.find((item) => item.id === toy.id);
    const updatedItems = existing
      ? get().items.map((item) =>
          item.id === toy.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...get().items, { ...toy, quantity: 1 }];
    set({ items: updatedItems, itemCount: ..., total: ... });
  },
  // ... other actions
}));
```

---

### Step 29 (`// TODO Context 29`)
**File:** `src/app/store/page.tsx`

Swap `useCart()` → `useCartStore()`. **Zero JSX changes:**

```typescript
// Before (Context):
const { dispatch: cartDispatch } = useCart();
cartDispatch({ type: "ADD_ITEM", payload: toy });

// After (Zustand):
const { addItem } = useCartStore();
addItem(toy);
```

> **Punchline:** The UI doesn't care which state manager powers it. If the hook API matches, it's a clean swap.

---

## Context vs Zustand — When to Use Which?

| | React Context + useReducer | Zustand |
|---|---|---|
| **Best for** | Small/medium apps, learning fundamentals | Medium/large apps, complex state |
| **Boilerplate** | More (createContext, Provider, reducer) | Minimal (just `create()`) |
| **Provider needed?** | ✅ Yes — must wrap the tree | ❌ No — global by default |
| **DevTools** | React DevTools | Zustand DevTools (Redux extension) |
| **Re-render** | All context consumers re-render | Only subscribed slices re-render |

---

## How to Test & Verify

1. **Add toys** — click "+ Add" on any toy → nav badge increments + toast appears
2. **Toast auto-dismiss** — wait 3 seconds → toast fades away
3. **Toast manual dismiss** — click ✕ on a toast → dismisses immediately
4. **Open cart drawer** — click 🛒 in nav → drawer slides in with correct items
5. **Quantity controls** — click +/− → subtotal updates in real time
6. **Remove item** — click Remove → item disappears, subtotal recalculates
7. **Clear cart** — click "Clear cart" → badge resets to 0
8. **Zustand bonus** — swap the hook, verify identical behavior
