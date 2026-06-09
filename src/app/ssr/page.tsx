import { Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { Flower, Announcement } from "@/types";
import { FlowerCard } from "@/components/FlowerCard";

// ========================================================
// Helper: Simulate delay for streaming demonstration
// ========================================================
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ========================================================
// API Fetching Helpers (RSC Server-side fetches)
// ========================================================
async function getFlowers(): Promise<Flower[]> {
  // SSR Fetching
  const response = await fetch("https://64ca45bd700d50e3c7049e2f.mockapi.io/flowers", {
    cache: "no-store", // Opt-out of static caching to demonstrate live server-side rendering
  });
  if (!response.ok) {
    throw new Error("Failed to fetch flowers");
  }
  return response.json();
}

async function getAnnouncements(): Promise<Announcement[]> {
  // SSR Fetching (simulating secondary parallel resource)
  await delay(500); // Small artificial database latency
  return [
    {
      id: "ann-1",
      title: "🌸 Mid-Season Special Offer",
      message: "Enjoy 20% discount on all Tulips and Lilies using coupon code SPRING20 at checkout.",
      type: "success",
    },
    {
      id: "ann-2",
      title: "🚛 Delivery Schedule Update",
      message: "Please note that logistics might face slight delays due to current seasonal demand.",
      type: "warning",
    },
  ];
}

// ========================================================
// Sub-components: Streaming Demo (Slow reviews component)
// ========================================================
async function SlowReviewsComponent() {
  // Simulate slow third-party API / database call (2 seconds delay)
  await delay(2000);

  const reviews = [
    { id: "rev-1", user: "Sophia Miller", comment: "The bouquet arrived perfectly fresh! Beautiful arrangement.", rating: 5 },
    { id: "rev-2", user: "Liam Davis", comment: "Very fast delivery, although the wrapping could be sturdier.", rating: 4 },
    { id: "rev-3", user: "Emma Wilson", comment: "Extremely pleased with the vibrant orchids. Highly recommended!", rating: 5 },
  ];

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="p-4 rounded-xl border border-slate-200 dark:border-neutral-850 bg-white dark:bg-zinc-900 transition-all hover:border-indigo-500"
        >
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-sm text-slate-800 dark:text-zinc-200">{review.user}</span>
            <span className="text-amber-500 text-xs font-bold">{"★".repeat(review.rating)}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-neutral-800/60 bg-slate-50/50 dark:bg-zinc-900/50">
          <div className="flex justify-between items-center mb-2">
            <div className="h-4 w-24 bg-slate-200 dark:bg-zinc-800 rounded-md" />
            <div className="h-4 w-12 bg-slate-200 dark:bg-zinc-800 rounded-md" />
          </div>
          <div className="h-3 w-full bg-slate-100 dark:bg-zinc-850 rounded-md mb-1.5" />
          <div className="h-3 w-4/5 bg-slate-100 dark:bg-zinc-850 rounded-md" />
        </div>
      ))}
    </div>
  );
}

// ========================================================
// Client Demonstration Wrapper (Hydration & Window Errors)
// We put this in a separate Client Component defined below
// ========================================================
import { ClientDemoComponents } from "./ClientDemoComponents";

// ========================================================
// Main Server Page Component
// ========================================================
export default async function SSRDemoPage() {
  // Parallel Fetching: flowers and announcements in parallel
  const [flowers, announcements] = await Promise.all([
    getFlowers(),
    getAnnouncements(),
  ]);

  return (
    <>
      <Navigation />
      <main className="shop-container py-8 max-w-5xl mx-auto px-4">
        {/* Page Hero */}
        <header className="mb-10 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-2 rounded-full border border-indigo-100 dark:border-indigo-900/50">
            Next.js App Router Lectures
          </span>
          <h1 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
            Server-Side Rendering (SSR) & streaming
          </h1>
          <p className="mt-2.5 text-slate-500 dark:text-zinc-400 max-w-2xl text-sm leading-relaxed">
            Welcome to the SSR learning space! All details on this page are pre-rendered on the server, loaded concurrently, or streamed via React Suspense.
          </p>
        </header>

        {/* Parallel Fetching & Announcements Area */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-100 mb-4 flex items-center gap-2">
            📢 Parallel Fetch Announcements <span className="text-xs font-normal text-slate-400">(Loaded concurrently)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className={`p-5 rounded-2xl border text-sm leading-relaxed ${
                  ann.type === "success"
                    ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-250/30 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300"
                    : "bg-amber-50/50 dark:bg-amber-950/20 border-amber-250/30 dark:border-amber-900/40 text-amber-800 dark:text-amber-300"
                }`}
              >
                <h3 className="font-bold text-sm mb-1">{ann.title}</h3>
                <p className="text-xs opacity-90">{ann.message}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Main Catalog Rendering & Streaming Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Catalog (SSR Loaded) */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-100 mb-4">
              🌸 Flower Catalog <span className="text-xs font-normal text-slate-400">(SSR Fetched)</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {flowers.slice(0, 4).map((flower) => (
                <FlowerCard key={flower.id} flower={flower} />
              ))}
            </div>
          </div>

          {/* Slow Component with Suspense Streaming */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-100 mb-4">
              💬 Customer Reviews <span className="text-xs font-normal text-slate-400">(SSR Streamed)</span>
            </h2>
            <Suspense fallback={<ReviewsSkeleton />}>
              <SlowReviewsComponent />
            </Suspense>
          </div>
        </div>

        {/* Common SSR Problems Demos */}
        <section className="border-t border-slate-200 dark:border-neutral-800 pt-10">
          <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-100 mb-2">
            🛠 Handling Common SSR Difficulties
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mb-6">
            Understand how server-side pre-rendering interacts with client-only modules and browser environments.
          </p>
          <ClientDemoComponents />
        </section>
      </main>
    </>
  );
}
