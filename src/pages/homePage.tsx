import { useState, useEffect } from "react";
import axios from "axios";
import { Flower } from "@/types";
import { Navigation } from "@/components/Navigation";
import { FlowerCard } from "@/components/FlowerCard";

const API_URL = "http://localhost:5000/flowers";

export default function HomePage() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const fetchFlowers = async (keyword: string) => {
    try {
      setLoading(true);
      setError(null);
      // json-server supports full-text search via ?q=
      const url = keyword ? `${API_URL}?q=${encodeURIComponent(keyword)}` : API_URL;
      const response = await axios.get(url);
      setFlowers(response.data);
    } catch (err: any) {
      setError(err.message || "Failed to load flowers. Please call admin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlowers(searchKeyword);
  }, [searchKeyword]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <>
      <Navigation />
      <main className="shop-container">
        {/* Header Hero Section */}
        <header className="mb-10 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-2 rounded-full border border-indigo-100 dark:border-indigo-900/50">
            Welcome to FlowerShop
          </span>
          <h1 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
            Fresh & Handcrafted Blooms
          </h1>
          <p className="mt-2.5 text-slate-500 dark:text-zinc-400 max-w-2xl text-sm leading-relaxed">
            Recap Project Day: Experience a beautifully structured catalog with
            client-side searching, dynamic detail views, and asynchronous
            network fetching.
          </p>
        </header>

        {/* Search Input Box */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          <div className="w-full md:max-w-xs">
            <input
              type="text"
              placeholder="Search flowers..."
              value={searchKeyword}
              onChange={handleSearchChange}
              className="input-field"
            />
          </div>
        </div>

        {/* Error Feedback Wrapper */}
        {error && (
          <div className="flex flex-col items-center justify-center p-12 text-center text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl">
            <span className="text-3xl mb-2">⚠</span>
            <h3 className="font-bold text-slate-800 dark:text-zinc-200 text-sm">
              Failed to Load Flowers
            </h3>
            <p className="text-xs mt-1 text-slate-500 dark:text-zinc-400">
              {error}
            </p>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="shop-grid">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="shop-card animate-pulse border border-slate-200 dark:border-neutral-800/80"
              >
                <div className="h-48 w-full bg-slate-100 dark:bg-zinc-800/80" />
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-4 w-12 bg-slate-100 dark:bg-zinc-800 rounded-md" />
                      <div className="h-4 w-8 bg-slate-155 dark:bg-zinc-800 rounded-md" />
                    </div>
                    <div className="h-5 w-2/3 bg-slate-100 dark:bg-zinc-800 rounded-lg mb-2" />
                    <div className="h-4 w-full bg-slate-50 dark:bg-zinc-800/50 rounded-md mb-1" />
                    <div className="h-4 w-4/5 bg-slate-50 dark:bg-zinc-800/50 rounded-md" />
                  </div>
                  <div className="h-8 w-full bg-slate-100 dark:bg-zinc-800 rounded-xl mt-6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty Catalog View */}
        {!loading && !error && flowers.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 text-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl">
            <span className="text-4xl mb-3">🌸</span>
            <h3 className="font-bold text-slate-800 dark:text-zinc-200 text-sm">
              No Flowers Found
            </h3>
            <p className="text-xs mt-1 text-slate-400 dark:text-zinc-500">
              Try modifying your search text.
            </p>
          </div>
        )}

        {/* Flowers Grid Catalog */}
        {!loading && !error && flowers.length > 0 && (
          <div className="shop-grid">
            {flowers.map((flower) => (
              <FlowerCard key={flower.id} flower={flower} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
