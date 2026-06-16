# Developer Guide: Week 4 Day 2 — State Management with React Context + Zustand

This guide walks through building **global state management** in Andy's Playroom using two approaches:

- **Demo 1 (Guided):** A **Notification Bell** in the nav powered by React Context + `useReducer`. All solution code is provided — uncomment each block and follow along.
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

## The Problem First — Why Do We Even Need This?

> 💡 Before writing any code, open the starter branch and read the `🚨 BOTTLENECK` comments scattered across the files below. They explain exactly which real problem each piece of state management is solving.

This app has a specific shape that breaks ordinary `useState` + prop passing:

```
layout.tsx
└── Navigation           ← shows 🔔 unread count + 🛒 item count
    └── CartDrawer       ← shows every item in the cart
└── StorePage            ← the only place where items are ADDED
```

`StorePage` and `Navigation` are **siblings**. They have no parent-child relationship. Yet when the user clicks **"+ Add"** on a toy card, three things need to update instantly:

| What updates | Where it lives |
|---|---|
| 🛒 Cart badge count | `Navigation` |
| 🔔 Bell badge count | `Navigation` |
| 🛒 Cart drawer items | `CartDrawer` (inside `Navigation`) |

Without global state, here is what you'd have to do to make this work:

```
layout.tsx  ← must own ALL state: cartItems[], notifications[]
│           ← must pass everything down as props
├── Navigation
│   ├── itemCount={cartItems.length}        ← prop from layout
│   ├── unreadCount={notifications.length}  ← prop from layout
│   └── CartDrawer
│       ├── items={cartItems}               ← prop from layout (via Navigation)
│       └── onRemove={(id) => setCartItems(…)} ← callback UP through Nav → layout
└── StorePage
    └── onAddToCart={(toy) => setCartItems(…)} ← callback from layout
        onNotify={(msg) => setNotifications(…)} ← another callback from layout
```

Every new page = more callbacks and props to wire. Every new feature = update in 5+ files.

**With Context, none of that exists.** Each component just calls a hook:

```tsx
// In StorePage — writes to both contexts
const { dispatch: cartDispatch } = useCart();
const { dispatch: notifDispatch } = useNotif();

// In Navigation — reads from both contexts
const { itemCount } = useCart();
const { unreadCount } = useNotif();

// In CartDrawer — reads from CartContext
const { items, total, dispatch } = useCart();
```

No props. No callbacks. Zero coupling between components.

### The Five Bottleneck Files

Each file in the starter has a `🚨 BOTTLENECK` comment that explains its specific pain point:

| File | The Problem Without State Management |
|---|---|
| `src/contexts/NotifContext.tsx` | Bell badge lives in Nav; the ADD action lives in StorePage. They're siblings — you'd need a callback prop on every page. |
| `src/contexts/CartContext.tsx` | 4 cart operations as raw `useState` logic = scattered mutations, stale closure bugs, no single source of truth. |
| `src/app/layout.tsx` | Providers MUST wrap the highest common ancestor. Wrap too low → each page gets its own isolated, empty cart. |
| `src/app/store/page.tsx` | One "Add to Cart" click must update TWO sibling components simultaneously — impossible without a shared store. |
| `src/components/CartDrawer.tsx` | Drawer renders inside Nav but shows data written by StorePage — zero parent-child link between them. |
| `src/components/Navigation.tsx` | Nav needs live counts from two separate contexts, both written by a different page it has never met. |

---

## Core Concepts

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

The key rule: **a reducer never mutates state — it always returns a new value.** This is what lets React know something changed.

---

## Demo 1: Notification Bell (TODOs 1–11)

We build a `🔔` bell icon in the navigation with an unread badge and a dropdown panel. Any component anywhere can fire a notification — the bell updates instantly.

### Phase 1A — Types

#### Step 1 (`// TODO Context 1`)
**File:** `src/types/index.ts`

Define the `Notification` interface:

```typescript
export interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
  read: boolean;
}
```

> **Why `read: boolean`?** We need to know which notifications the user hasn't seen yet so we can compute `unreadCount` — the number on the bell badge. When the user clicks "Mark all read", we flip every `read` to `true` and the badge goes to 0.

---

### Phase 1B — Actions & Reducer

#### Step 2 (`// TODO Context 2`)
**File:** `src/contexts/NotifContext.tsx`

Define the `NotifAction` discriminated union. Three action types this time:

```typescript
type NotifAction =
  | { type: "ADD_NOTIF"; payload: Notification }
  | { type: "DISMISS_NOTIF"; payload: { id: string } }
  | { type: "MARK_ALL_READ" };
```

> **What is a discriminated union?** TypeScript uses the `type` field to narrow exactly which `payload` shape is valid for each action. Notice `MARK_ALL_READ` has no `payload` at all — no data needed, just the intent.

---

#### Step 3 (`// TODO Context 3`)
**File:** `src/contexts/NotifContext.tsx`

Implement the `ADD_NOTIF` case in `notifReducer`:

```typescript
case "ADD_NOTIF":
  return [action.payload, ...state];
```

> **Why prepend?** `[action.payload, ...state]` puts the newest notification at the top of the list. Never use `state.push()` — that mutates the array in place, breaking React's change detection.

---

#### Step 4 (`// TODO Context 4`)
**File:** `src/contexts/NotifContext.tsx`

Implement the `DISMISS_NOTIF` case:

```typescript
case "DISMISS_NOTIF":
  return state.filter((notif) => notif.id !== action.payload.id);
```

> **Why `.filter()`?** It returns a brand-new array without the dismissed item. React sees a new reference → re-render.

---

#### Step 5 (`// TODO Context 5`)
**File:** `src/contexts/NotifContext.tsx`

Implement the `MARK_ALL_READ` case:

```typescript
case "MARK_ALL_READ":
  return state.map((notif) => ({ ...notif, read: true }));
```

> **Why `.map()` + spread?** Same immutability rule — we can't mutate existing objects. Spread `...notif` copies all fields, then override `read: true` for each one. The bell badge drops to 0 because `unreadCount` is derived from `read` flags.

---

### Phase 1C — Context + Provider

#### Step 6 (`// TODO Context 6`)
**File:** `src/contexts/NotifContext.tsx`

Define the context shape and create the context:

```typescript
interface NotifContextValue {
  notifications: Notification[];
  unreadCount: number;
  dispatch: React.Dispatch<NotifAction>;
}

const NotifContext = createContext<NotifContextValue | null>(null);
```

> **Why expose `unreadCount` here?** It's a derived value — computed from `notifications` once, inside the Provider. Every consumer (`Navigation`, etc.) gets it for free without doing their own math.

---

#### Step 7 (`// TODO Context 7`)
**File:** `src/contexts/NotifContext.tsx`

Implement `NotifProvider` with derived `unreadCount`:

```typescript
export function NotifProvider({ children }: { children: ReactNode }) {
  const [notifications, dispatch] = useReducer(notifReducer, []);

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return (
    <NotifContext.Provider value={{ notifications, unreadCount, dispatch }}>
      {children}
    </NotifContext.Provider>
  );
}
```

> **The magic:** `unreadCount` recalculates every time `notifications` changes — no extra state, no `useEffect`. Just a derived value.

---

#### Step 8 (`// TODO Context 8`)
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

> **Why a custom hook?** It hides the `useContext` boilerplate. The null check gives a clear error message if the Provider is missing instead of a cryptic `Cannot read properties of null`.

---

### Phase 1D — Mount Provider at Root

#### Step 9 (`// TODO Context 9`)
**File:** `src/app/layout.tsx`

Wrap `{children}` with `<NotifProvider>`:

```tsx
<NotifProvider>
  <CartProvider>
    {children}
  </CartProvider>
</NotifProvider>
```

> **Why root layout?** Read the `🚨 BOTTLENECK` comment in `layout.tsx`. The Provider only shares state with components **inside** it. Root layout = every page in the app. Wrap too low (e.g. inside `/store/page.tsx`) and Navigation — which is outside — sees a different, isolated, empty state.

---

### Phase 1E — Bell Icon + Panel in Navigation

#### Step 10 (`// TODO Context 10`)
**File:** `src/components/Navigation.tsx`

Call `useNotif()` and wire the bell icon:

```typescript
const { notifications, unreadCount, dispatch: notifDispatch } = useNotif();

// In JSX — the bell button:
<button onClick={() => setIsNotifOpen((prev) => !prev)}>
  🔔
  {unreadCount > 0 && (
    <span className="absolute ...">
      {unreadCount > 9 ? "9+" : unreadCount}
    </span>
  )}
</button>
```

> **The wow moment:** Navigate to `/dashboard`, add a toy on `/store`, come back — the bell badge is already updated. Navigation never received a prop from StorePage. This is global state in action.

---

#### Step 11 (`// TODO Context 11`)
**File:** `src/components/Navigation.tsx`

Wire the notification panel dropdown — map over `notifications`, add "Mark all read" and individual dismiss:

```tsx
{/* "Mark all read" button */}
<button onClick={() => notifDispatch({ type: "MARK_ALL_READ" })}>
  Mark all read
</button>

{/* Each notification row */}
{notifications.map((notif) => (
  <div key={notif.id} className={notif.read ? "opacity-50" : ""}>
    <p>{notif.message}</p>
    <button
      onClick={() =>
        notifDispatch({ type: "DISMISS_NOTIF", payload: { id: notif.id } })
      }
    >
      ✕
    </button>
  </div>
))}
```

> **Key insight:** Navigation is a pure **subscriber and dispatcher** — it reads `notifications` from context and dispatches actions back into context. It doesn't own the state. The Provider owns it.

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

Add `CartItem` — extends `Toy` so you don't repeat fields:

```typescript
export interface CartItem extends Toy {
  quantity: number;
}
```

---

### Phase 2B — Actions & Reducer

#### Step 14 (`// TODO Context 14`)
**File:** `src/contexts/CartContext.tsx`

> **Read the `🚨 BOTTLENECK` comment first.** It explains why `useReducer` is the right tool here instead of 4 separate `useState` calls. The short version: scattered `setItems` logic is hard to maintain and vulnerable to stale closure bugs. A reducer centralises all mutations.

Define `CartAction` — same pattern as `NotifAction`. Four action types:
- `ADD_ITEM` with `payload: Toy`
- `REMOVE_ITEM` with `payload: { id: number }`
- `UPDATE_QUANTITY` with `payload: { id: number; quantity: number }`
- `CLEAR_CART` (no payload needed)

---

#### Step 15 (`// TODO Context 15`)
**File:** `src/contexts/CartContext.tsx`

Implement `ADD_ITEM` — the trickiest case because it has two branches:

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

> Item already in cart → bump quantity. New item → append with `quantity: 1`.

---

#### Step 16 (`// TODO Context 16`)
**File:** `src/contexts/CartContext.tsx`

Implement `REMOVE_ITEM`. Same `.filter()` pattern as `DISMISS_NOTIF`:

```typescript
case "REMOVE_ITEM":
  return state.filter((item) => item.id !== action.payload.id);
```

---

#### Step 17 (`// TODO Context 17`)
**File:** `src/contexts/CartContext.tsx`

Implement `UPDATE_QUANTITY` using `.map()` + spread:

```typescript
case "UPDATE_QUANTITY":
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

Same three-part pattern. Also derive `itemCount` and `total` inside the Provider:

```typescript
const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
```

> **Why derive here?** Computed values live in one place. Every consumer — CartDrawer, Navigation — gets them for free from `useCart()`. No math scattered across components.

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

---

#### Step 22 (`// TODO Context 22`)
**File:** `src/app/store/page.tsx`

> **Read the `🚨 BOTTLENECK` comment first.** This is exactly where the cross-component update problem lives — one click, two sibling components must update simultaneously.

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
      read: false,
    },
  });
};
```

> **Payoff moment:** One click → two context dispatches. `StorePage` doesn't know Navigation exists. Navigation doesn't know StorePage exists. They just both subscribe to the same contexts.

---

### Phase 2F — Navigation Badges

#### Step 23 (`// TODO Context 23`)
**File:** `src/components/Navigation.tsx`

Read `itemCount` from `useCart()` and render the cart badge. The bell badge from TODO 10 and cart badge from TODO 23 now both live in Navigation — both powered by global state, zero props.

```typescript
const { itemCount } = useCart();
```

---

### Phase 2G — Cart Drawer

#### Step 24 (`// TODO Context 24`)
**File:** `src/components/CartDrawer.tsx`

> **Read the `🚨 BOTTLENECK` comment first.** CartDrawer lives inside Navigation but reads data written by StorePage. Without Context this connection is impossible without a chain of callbacks.

Call `useCart()` and map over items:

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

> `total` was already computed in `CartProvider` — you just read it here. No math needed.

---

## Bonus: Zustand Comparison (TODOs 27–29)

Now let's rebuild the same cart with Zustand and compare boilerplate.

### Step 27 (`// TODO Context 27`)
**File:** `src/store/cartStore.ts`

Define the Zustand store interface — state + actions in one flat object (no separate action type union):

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

> **Punchline:** The UI doesn't care which state manager powers it. If the hook API matches, it's a drop-in swap.

---

## Context vs Zustand — When to Use Which?

| | React Context + useReducer | Zustand |
|---|---|---|
| **Best for** | Learning fundamentals, small–medium apps | Medium–large apps, complex state |
| **Boilerplate** | More (`createContext`, Provider, reducer, action types) | Minimal — just `create()` |
| **Provider needed?** | ✅ Yes — must wrap the tree | ❌ No — global by default |
| **DevTools** | React DevTools | Zustand DevTools (Redux extension) |
| **Re-render scope** | All context consumers re-render | Only subscribed slices re-render |
| **Prop drilling** | Still needs Provider placement | Zero — import the hook anywhere |

---

## How to Test & Verify

1. **Add toys** — click "+ Add" on any toy → 🛒 cart badge increments + 🔔 bell badge increments
2. **Bell panel** — click 🔔 → dropdown shows the notification list
3. **Mark all read** — click "Mark all read" → bell badge drops to 0, items dim
4. **Dismiss notification** — click ✕ on a notification row → it disappears from the panel
5. **Cross-page bell** — add a toy on `/store`, navigate to `/` or `/dashboard` → bell still shows the unread count
6. **Open cart drawer** — click 🛒 in nav → drawer slides in with correct items and subtotal
7. **Quantity controls** — click +/− → subtotal updates in real time
8. **Remove item** — click Remove → item disappears, subtotal recalculates
9. **Clear cart** — click "Clear cart" → cart badge resets to 0
10. **Zustand bonus** — swap the hook, verify identical behaviour with less code
