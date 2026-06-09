import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Flower } from "@/types";

// ==========================================
// TODO SSG 4: Export revalidate configuration key for ISR page layout cache refresh
// ==========================================
export const revalidate = 10;

async function getFlowers(): Promise<Flower[]> {
  const response = await fetch("https://64ca45bd700d50e3c7049e2f.mockapi.io/flowers", {
    next: { revalidate: 10 },
  });
  if (!response.ok) throw new Error("Failed to fetch flowers");
  return response.json();
}

export default async function ISRDemoPage() {
  const flowers = await getFlowers();
  const timestamp = new Date().toLocaleTimeString();

  return (
    <>
      <Navigation />
      <main className="shop-container py-8 max-w-xl mx-auto px-4">
        <Link href="/rendering" className="text-xs text-slate-400 hover:text-indigo-600 mb-6 inline-block font-semibold">
          ← Back to Rendering Hub
        </Link>

        <header className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
            🔄 Incremental Static Regeneration (ISR)
          </h1>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            ISR updates static pages in the background after the revalidation timer expires, serving static files instantly to clients.
          </p>
        </header>

        <div className="space-y-6">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-zinc-900">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-2">
              ⏱️ Generation Timestamp
            </h2>
            <div className="bg-slate-50 dark:bg-zinc-950 p-4 rounded text-center text-sm font-semibold text-slate-800 dark:text-zinc-300 border border-slate-200/50 dark:border-neutral-800/80">
              Generated at: <span className="font-mono text-indigo-600 dark:text-indigo-400">{timestamp}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 text-center">
              Revalidation timer: 10s. Refresh page to trigger regeneration if the interval expired.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-zinc-900">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-4">
              Flowers List (ISR Loaded)
            </h2>
            <ul className="space-y-3">
              {flowers.slice(0, 5).map((flower) => (
                <li key={flower.id} className="flex justify-between items-center text-xs border-b border-slate-100 dark:border-neutral-800 pb-2">
                  <span className="font-semibold text-slate-700 dark:text-zinc-300">{flower.name}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">${Number(flower.price).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
