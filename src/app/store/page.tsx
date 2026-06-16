"use client";

import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { Navigation } from "@/components/Navigation";
import { CartDrawer } from "@/components/CartDrawer";
import { Toy } from "@/types";

// ==========================================
// TODO Context 21: Fetch toys from json-server using useSWR
// json-server must be running: bun run api (or npm run api)
// Endpoint: http://localhost:4000/toys
// Re-using SWR from Week 3 — data fetching and state management are separate concerns
// ==========================================
import { useCart } from "@/contexts/CartContext";
import { useNotif } from "@/contexts/NotifContext";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function StorePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ==========================================
  // TODO Context 21: Call useSWR to fetch the toys list
  // ==========================================
  const {
    data: toys,
    error,
    isLoading,
  } = useSWR<Toy[]>("http://localhost:4000/toys", fetcher);

  // ==========================================
  // TODO Context 22: Call useCart() to get dispatch
  // Then dispatch ADD_ITEM when "Add to Cart" is clicked
  // ==========================================
  const { dispatch: cartDispatch } = useCart();

  // ==========================================
  // TODO Context 22: Call useNotif() to get the notification dispatch
  // Fire a success toast when the user adds a toy to cart
  // This is the payoff moment — Demo 1 and Demo 2 connect together here
  // ==========================================
  const { dispatch: notifDispatch } = useNotif();

  const handleAddToCart = (toy: Toy) => {
    // ==========================================
    // TODO Context 22: Dispatch ADD_ITEM to the cart context
    // ==========================================
    cartDispatch({ type: "ADD_ITEM", payload: toy });

    // ==========================================
    // TODO Context 22: Also fire a success toast via NotifContext
    // One click → two context dispatches: cart + notification
    // ==========================================
    notifDispatch({
      type: "ADD_NOTIF",
      payload: {
        id: `notif-${toy.id}-${Date.now()}`,
        message: `${toy.emoji} ${toy.name} added to cart!`,
        type: "success",
      },
    });

    // ==========================================
    // TODO Context 29 (Zustand bonus): To swap to Zustand, comment out the
    // cartDispatch line above and replace with:
    // addItem(toy);  ← from useCartStore()
    // Zero JSX changes needed — the UI doesn't care which state manager powers it
    // ==========================================
  };

  return (
    <>
      <Navigation onCartOpen={() => setIsCartOpen(true)} />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="min-h-screen bg-sky-50 pb-20 font-sans">
        <div className="mx-auto max-w-4xl px-6 md:px-8 py-12">
          {/* Page Header */}
          <header className="mb-10 border-b-2 border-sky-200 pb-6">
            <span className="text-[10px] font-black tracking-widest text-amber-950 bg-amber-400 border border-amber-500 px-3 py-1 rounded-full uppercase font-toy">
              🧸 Andy&apos;s Toy Store
            </span>
            <h1 className="text-3xl font-black tracking-tight text-indigo-950 font-toy mt-3">
              Toy Shelf
            </h1>
            <p className="mt-1.5 text-xs text-slate-500 font-medium">
              Pick your favourite toys and add them to the cart — powered by
              React Context &amp; Zustand
            </p>
          </header>

          {/* Loading state */}
          {isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-sky-100 rounded-3xl p-5 animate-pulse"
                >
                  <div className="w-14 h-14 bg-sky-100 rounded-2xl mb-4" />
                  <div className="h-3 bg-sky-100 rounded-full mb-2 w-3/4" />
                  <div className="h-2 bg-sky-50 rounded-full w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="p-6 bg-rose-50 border-2 border-rose-200 rounded-3xl text-center">
              <p className="text-sm font-bold text-rose-700">
                🚨 Could not load toys!
              </p>
              <p className="text-xs text-rose-500 mt-1">
                Make sure json-server is running:{" "}
                <code className="font-mono bg-rose-100 px-1 rounded">
                  bun run api
                </code>
              </p>
            </div>
          )}

          {/* Toy grid */}
          {toys && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {toys.map((toy) => (
                <div
                  key={toy.id}
                  className="bg-white border-2 border-sky-200 border-b-4 border-b-sky-300 rounded-3xl p-5 flex flex-col gap-3 hover:border-indigo-300 hover:scale-[1.02] transition-all group shadow-sm"
                >
                  {/* Toy emoji icon */}
                  <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {toy.emoji}
                  </div>

                  {/* Toy info */}
                  <div className="flex-1">
                    <h2 className="text-sm font-black text-indigo-950 font-toy leading-tight">
                      {toy.name}
                    </h2>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-relaxed">
                      {toy.description}
                    </p>
                  </div>

                  {/* Price + Add to Cart */}
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <span className="text-sm font-black text-indigo-700 font-toy">
                      ${toy.price.toFixed(2)}
                    </span>
                    <button
                      id={`add-to-cart-${toy.id}`}
                      onClick={() => handleAddToCart(toy)}
                      className="inline-flex items-center justify-center h-7 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 border-b-2 border-indigo-800 text-white text-[10px] font-black tracking-wide font-toy transition-all shadow-sm active:translate-y-[1px] active:border-b-0 cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
