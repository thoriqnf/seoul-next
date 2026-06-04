"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Flower, FlowerCategory } from "@/types";
import { Navigation } from "@/components/Navigation";
import { FlowerCard } from "@/components/FlowerCard";

const API_URL = "https://64ca45bd700d50e3c7049e2f.mockapi.io/flowers";
const CATEGORIES: FlowerCategory[] = ["all", "Roses", "Lilies", "Tulips", "Sunflowers"];

export default function Home() {
  // ==========================================
  // TODO RECAP 1: Initialize searchKeyword controlled state variable
  // ==========================================
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // ==========================================
  // TODO RECAP 2: Initialize activeCategory filter state variable
  // ==========================================
  const [activeCategory, setActiveCategory] = useState<FlowerCategory>("all");

  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // TODO RECAP 3: Fetch flowers list from API using useEffect on mount
  // TODO RECAP 4: Implement network request cancellation using AbortController
  // ==========================================
  useEffect(() => {
    const abortController = new AbortController();

    const fetchFlowers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get<Flower[]>(API_URL, {
          signal: abortController.signal,
        });
        setFlowers(response.data);
      } catch (err: any) {
        if (err.name !== "CanceledError" && err.message !== "canceled") {
          setError(err.message || "Failed to load flowers.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFlowers();

    return () => {
      abortController.abort();
    };
  }, []);

  // Event Handlers for controlled search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  // Derive filtered flower list based on keyword search and selected category
  const filteredFlowers = flowers.filter((flower) => {
    const matchesKeyword = flower.name
      ? flower.name.toLowerCase().includes(searchKeyword.toLowerCase())
      : false;
    const matchesCategory =
      activeCategory === "all" ||
      (flower.category && flower.category.toLowerCase() === activeCategory.toLowerCase());
    return matchesKeyword && matchesCategory;
  });

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
            Recap Project Day: Experience a beautifully structured catalog with live client-side searching, tab filter query matches, and asynchronous network states.
          </p>
        </header>

        {/* Search and Filters Layout */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Search Input Box */}
          <div className="w-full md:max-w-xs">
            <input
              type="text"
              placeholder="Search flowers..."
              value={searchKeyword}
              onChange={handleSearchChange}
              className="input-field"
            />
          </div>

          {/* Category Filtering Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white dark:bg-zinc-900 p-1.5 rounded-xl border border-slate-200 dark:border-neutral-800">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold select-none cursor-pointer transition-all ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800/50"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Error Feedback Wrapper */}
        {error && (
          <div className="flex flex-col items-center justify-center p-12 text-center text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl">
            <span className="text-3xl mb-2">⚠</span>
            <h3 className="font-bold text-slate-800 dark:text-zinc-200 text-sm">Failed to Load Products</h3>
            <p className="text-xs mt-1 text-slate-500 dark:text-zinc-400">{error}</p>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="shop-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="shop-card animate-pulse border border-slate-200 dark:border-neutral-800/80">
                <div className="h-48 w-full bg-slate-100 dark:bg-zinc-800/80" />
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-4 w-12 bg-slate-100 dark:bg-zinc-800 rounded-md" />
                      <div className="h-4 w-8 bg-slate-150 dark:bg-zinc-800 rounded-md" />
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
        {!loading && !error && filteredFlowers.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 text-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl">
            <span className="text-4xl mb-3">🌸</span>
            <h3 className="font-bold text-slate-800 dark:text-zinc-200 text-sm">No Flowers Found</h3>
            <p className="text-xs mt-1 text-slate-400 dark:text-zinc-500">
              Try modifying your search text or selecting a different category tab.
            </p>
          </div>
        )}

        {/* Flowers Grid Catalog */}
        {!loading && !error && filteredFlowers.length > 0 && (
          <div className="shop-grid">
            {filteredFlowers.map((flower) => (
              <FlowerCard key={flower.id} flower={flower} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
