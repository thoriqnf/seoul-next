"use client";

import { useCart } from "@/contexts/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  // ==========================================
  // TODO Context 24: Call useCart() to read items, total, itemCount, and dispatch
  // The drawer is a "subscriber" — it reads from context and re-renders on every change
  // ==========================================
  const { items, total, dispatch } = useCart();

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white border-l-2 border-sky-200 z-50 flex flex-col transition-transform duration-300 font-sans shadow-xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-sky-100">
          <h2 className="text-base font-black text-indigo-950 font-toy flex items-center gap-2">
            🛒 Cart
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors text-lg leading-none cursor-pointer"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {/* ==========================================
              TODO Context 24: Map over items and render each as a row
              Show: toy emoji, name, price per item, and total line price
              ========================================== */}
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <span className="text-5xl">🧸</span>
              <p className="text-xs font-semibold text-slate-400">
                Your cart is empty!
              </p>
              <p className="text-[11px] text-slate-300">
                Head to the Toy Shelf and add some toys.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 bg-sky-50 border border-sky-100 rounded-2xl px-4 py-3"
                >
                  {/* Toy emoji */}
                  <span className="text-2xl shrink-0">{item.emoji}</span>

                  {/* Name + price */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-indigo-950 font-toy truncate">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>

                  {/* ==========================================
                      TODO Context 25: Wire quantity controls
                      − button → dispatch UPDATE_QUANTITY (quantity - 1, min 1)
                      + button → dispatch UPDATE_QUANTITY (quantity + 1)
                      ✕ button → dispatch REMOVE_ITEM
                      ========================================== */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      id={`decrease-qty-${item.id}`}
                      onClick={() =>
                        // TODO Context 25: dispatch UPDATE_QUANTITY with quantity - 1 (min 1)
                        console.log("TODO Context 25: decrease qty", item.id)
                      }
                      className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-black flex items-center justify-center hover:bg-sky-50 transition-colors cursor-pointer"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-xs font-black text-indigo-950">
                      {item.quantity}
                    </span>
                    <button
                      id={`increase-qty-${item.id}`}
                      onClick={() =>
                        // TODO Context 25: dispatch UPDATE_QUANTITY with quantity + 1
                        console.log("TODO Context 25: increase qty", item.id)
                      }
                      className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-black flex items-center justify-center hover:bg-sky-50 transition-colors cursor-pointer"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>

                  {/* Line total + remove */}
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-xs font-black text-indigo-700 font-toy">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      id={`remove-item-${item.id}`}
                      onClick={() =>
                        // TODO Context 25: dispatch REMOVE_ITEM
                        console.log("TODO Context 25: remove item", item.id)
                      }
                      className="text-[10px] text-rose-400 hover:text-rose-600 font-bold transition-colors cursor-pointer"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ==========================================
            TODO Context 26: Render order subtotal using the computed `total`
            total was derived in CartProvider — no math needed here
            Also render a "Clear Cart" button dispatching CLEAR_CART
            ========================================== */}
        {items.length > 0 && (
          <div className="border-t-2 border-sky-100 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Subtotal
              </span>
              {/* TODO Context 26: Display computed total */}
              <span className="text-lg font-black text-indigo-950 font-toy">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              id="checkout-btn"
              className="btn-toy-blue w-full text-center"
              onClick={() => {
                alert(
                  "🎉 Andy says: Thanks for shopping at the Toy Shelf! (Checkout not implemented — this is a demo!)"
                );
              }}
            >
              Checkout 🧸
            </button>

            <button
              id="clear-cart-btn"
              onClick={() =>
                // TODO Context 26: dispatch CLEAR_CART
                console.log("TODO Context 26: clear cart")
              }
              className="w-full text-[10px] font-black text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
