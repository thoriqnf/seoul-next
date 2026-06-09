import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Flower, Announcement } from "@/types";
import { FlowerCard } from "@/components/FlowerCard";

// ==========================================
// Types & Interfaces
// ==========================================
interface DummyProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
}

interface DummyJSONResponse {
  products: DummyProduct[];
}

// ==========================================
// SSR Fetch Helpers
// ==========================================
async function getProducts(): Promise<Flower[]> {
  const response = await fetch("https://dummyjson.com/products?limit=10", {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Failed to fetch products");
  const data: DummyJSONResponse = await response.json();
  return data.products.map((product: DummyProduct) => ({
    id: String(product.id),
    name: product.title,
    price: product.price,
    description: product.description,
    image: product.thumbnail,
  }));
}

async function getAnnouncements(): Promise<Announcement[]> {
  // Simulate network delay for parallel fetch
  await new Promise((resolve) => setTimeout(resolve, 600));
  return [
    {
      id: "ann-1",
      title: "🌸 Spring Catalog Active",
      message: "The new catalog has been pre-rendered directly on the server.",
      type: "success",
    },
    {
      id: "ann-2",
      title: "🚛 Delivery Regions",
      message: "Logistics are serving normal routes, pre-calculated server-side.",
      type: "info",
    },
  ];
}

export default async function SSRMainHub() {
  // Parallel fetch using Promise.all
  const [products, announcements] = await Promise.all([
    getProducts(),
    getAnnouncements(),
  ]);

  return (
    <>
      <Navigation />
      <main className="shop-container py-8 max-w-5xl mx-auto px-4">
        {/* Header Hero */}
        <header className="mb-10 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-2 rounded-full border border-indigo-100 dark:border-indigo-900/50">
            Week 3 Day 2 - SSR Hub
          </span>
          <h1 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
            Server-Side Rendering (SSR)
          </h1>
          <p className="mt-2 text-slate-500 dark:text-zinc-400 max-w-2xl text-sm leading-relaxed">
            Data on this page is fetched directly from the server. Explore the topics below to learn about advanced App Router techniques.
          </p>
        </header>

        {/* Sub-Topics Navigation Grid */}
        <section className="mb-12">
          <h2 className="text-base font-bold text-slate-800 dark:text-zinc-100 mb-5">
            📚 Server-Side Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/ssr/streaming"
              className="p-5 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-zinc-900 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 mb-1">
                ⚡ 1. SSR Streaming
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Stream heavy or slow component layouts using React Suspense without blocking the main layout.
              </p>
            </Link>

            <Link
              href="/ssr/hydration"
              className="p-5 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-zinc-900 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 mb-1">
                ⏳ 2. Hydration Mismatch
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Diagnose and resolve content synchronization errors between server markup and client activation.
              </p>
            </Link>

            <Link
              href="/ssr/client-apis"
              className="p-5 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-zinc-900 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
            >
              <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 mb-1">
                🖥️ 3. Safe Client APIs
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Learn to safely reference browser-only globals like window or localStorage without triggering build crashes.
              </p>
            </Link>
          </div>
        </section>

        {/* Parallel Fetch & Announcements Panel */}
        <section className="mb-12 border-t border-slate-200 dark:border-neutral-800 pt-8">
          <h2 className="text-base font-bold text-slate-800 dark:text-zinc-100 mb-4">
            📢 Server Parallel Fetch Announcements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200"
              >
                <h3 className="font-semibold text-xs text-slate-550 dark:text-zinc-300 mb-1">
                  {ann.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">{ann.message}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Basic Flower Catalog Rendering */}
        <section className="mb-12">
          <h2 className="text-base font-bold text-slate-800 dark:text-zinc-100 mb-4">
            🌸 Server-Rendered Flowers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {products.slice(0, 3).map((flower) => (
              <FlowerCard key={flower.id} flower={flower} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
