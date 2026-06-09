import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Flower } from "@/types";
import { FlowerCard } from "@/components/FlowerCard";

async function getFlowers(): Promise<Flower[]> {
  const response = await fetch("https://64ca45bd700d50e3c7049e2f.mockapi.io/flowers");
  if (!response.ok) throw new Error("Failed to fetch flowers");
  return response.json();
}

export default async function SSGPage() {
  const flowers = await getFlowers();

  return (
    <>
      <Navigation />
      <main className="shop-container py-8 max-w-5xl mx-auto px-4">
        <div className="mb-6 flex">
          <Link href="/rendering" className="text-xs text-slate-400 hover:text-indigo-600 mb-6 inline-block font-semibold">
            ← Back to Rendering Hub
          </Link>
        </div>

        <header className="mb-10 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-2 rounded-full border border-indigo-100 dark:border-indigo-900/50">
            Topic 1 - SSG Demo
          </span>
          <h1 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
            Static Site Generation (SSG)
          </h1>
          <p className="mt-2 text-slate-500 dark:text-zinc-400 max-w-2xl text-sm leading-relaxed">
            Statically generated routes pre-compile files at build time. Choose a flower below to inspect the statically generated dynamic route.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {flowers.slice(0, 3).map((flower) => (
            <div key={flower.id} className="relative group">
              <FlowerCard flower={flower} />
              <div className="mt-2 text-center">
                <Link
                  href={`/rendering/ssg/${flower.id}`}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View Static Detail →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
