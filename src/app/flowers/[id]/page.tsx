"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import { Flower } from "@/types";
import { Navigation } from "@/components/Navigation";

export default function FlowerDetailPage() {
  // ==========================================
  // TODO RECAP 3: Retrieve dynamic route parameters using the useParams hook inside client component
  // ==========================================
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [flower, setFlower] = useState<Flower | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // TODO RECAP 4: Fetch single flower detail on ID change inside useEffect
  // ==========================================
  useEffect(() => {
    if (!id) return;

    const fetchFlowerDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        // Commented out legacy fetching to focus on SSG implementation
        // const response = await axios.get<Flower>(
        //   `https://64ca45bd700d50e3c7049e2f.mockapi.io/flowers/${id}`
        // );
        // setFlower(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to load flower details.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlowerDetail();
  }, [id]);

  return (
    <>
      <Navigation />
      <main className="shop-container max-w-3xl">
        {/* Navigation Action Back Button */}
        <div className="mb-6 flex">
          <Link href="/" className="btn-secondary py-2 text-xs flex items-center gap-1.5 active:scale-95 transition-all">
            ← Back to Catalog
          </Link>
        </div>

        {/* Error Feedback Component */}
        {error && (
          <div className="flex flex-col items-center justify-center p-12 text-center text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl">
            <span className="text-3xl mb-2">⚠</span>
            <h3 className="font-bold text-slate-800 dark:text-zinc-200 text-sm">Failed to Load Flower Details</h3>
            <p className="text-xs mt-1 text-slate-500 dark:text-zinc-400">{error}</p>
          </div>
        )}

        {/* Loading Spinner Skeleton */}
        {loading && !error && (
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row gap-8 animate-pulse">
            <div className="w-full md:w-1/2 h-64 bg-slate-100 dark:bg-zinc-800 rounded-xl" />
            <div className="flex-1 flex flex-col justify-between py-2">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="h-6 w-12 bg-slate-100 dark:bg-zinc-800 rounded-md" />
                </div>
                <div className="h-7 w-2/3 bg-slate-100 dark:bg-zinc-800 rounded-lg mb-4" />
                <div className="h-4 w-full bg-slate-50 dark:bg-zinc-800/50 rounded-md mb-2" />
                <div className="h-4 w-full bg-slate-50 dark:bg-zinc-800/50 rounded-md mb-2" />
                <div className="h-4 w-3/4 bg-slate-50 dark:bg-zinc-800/50 rounded-md" />
              </div>
            </div>
          </div>
        )}

        {/* Flower Details Display Container */}
        {!loading && !error && flower && (
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs flex flex-col md:flex-row gap-6 md:gap-8 p-6">
            {/* Left Side: Flower Image wrapper */}
            <div className="w-full md:w-1/2 h-72 md:h-80 bg-slate-100 dark:bg-zinc-800 rounded-xl overflow-hidden">
              {flower.image ? (
                <img src={flower.image} alt={flower.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-5xl">🌸</div>
              )}
            </div>

            {/* Right Side: Flower Details wrapper */}
            <div className="flex-1 flex flex-col justify-between py-2">
              <div>
                {/* Meta details tag line */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    ${Number(flower.price).toFixed(2)}
                  </span>
                </div>

                <h1 className="text-2xl font-extrabold text-slate-800 dark:text-zinc-150 mb-3">
                  {flower.name}
                </h1>

                <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-6 whitespace-pre-line">
                  {flower.description || "No description available for this floral arrangement."}
                </p>
              </div>

              {/* Order checkout confirmation CTA */}
              <button
                onClick={() => alert(`Purchase process for "${flower.name}" simulated!`)}
                className="btn-primary w-full py-3 text-sm tracking-wide font-bold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
