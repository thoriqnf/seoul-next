import Link from "next/link";
import { notFound } from "next/navigation";
import { Flower } from "@/types";
import { Navigation } from "@/components/Navigation";

// ==========================================
// TODO SSG 3: Fetch and render static details inside server component (with dynamicParams = false)
// ==========================================
// export const dynamicParams = ...;

// interface DummyProduct {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   thumbnail: string;
// }
//
// async function getFlower(id: string): Promise<Flower> {
//   const response = await fetch(`https://dummyjson.com/products/${id}`);
//   if (!response.ok) throw new Error("Flower not found");
//   const product: DummyProduct = await response.json();
//   return {
//     id: String(product.id),
//     name: product.title,
//     price: product.price,
//     description: product.description,
//     image: product.thumbnail,
//   };
// }

// ==========================================
// TODO SSG 2: Define generateStaticParams to prebuild dynamic routes for IDs 1, 2, and 3
// ==========================================
// export async function generateStaticParams() { ... }


interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StaticFlowerDetailPage({ params }: PageProps) {
  // ==========================================
  // TODO SSG 3: Fetch and render static details inside server component (with dynamicParams = false)
  // 1. Export `dynamicParams = false` at the top of the file to return 404 for un-generated paths.
  // 2. Fetch the flower details using the `getFlower` function.
  // 3. Keep a try-catch safety net to return `notFound()` if fetching fails.
  // ==========================================
  const { id } = await params;

  let flower: Flower | null = null;
  // Try loading flower here:
  // flower = await getFlower(id);
  // If failed or null, return notFound();

  return (
    <>
      <Navigation />
      <main className="shop-container py-8 max-w-xl mx-auto px-4">
        <Link href="/rendering/ssg" className="text-xs text-slate-400 hover:text-indigo-600 mb-6 inline-block font-semibold">
          ← Back to SSG List
        </Link>

        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-6">
          <div className="w-full h-64 bg-slate-100 dark:bg-zinc-800 rounded-xl overflow-hidden mb-6">
            {flower?.image ? (
              <img src={flower.image} alt={flower.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-5xl">🌸</div>
            )}
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/50">
            Pre-rendered HTML Page (ID: {id})
          </span>

          <h1 className="mt-4 text-2xl font-extrabold text-slate-800 dark:text-zinc-150 mb-2">
            {flower?.name || "Loading name..."}
          </h1>

          <p className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-4">
            ${Number(flower?.price || 0).toFixed(2)}
          </p>

          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            {flower?.description || "No description available for this statically generated flower listing."}
          </p>
        </div>
      </main>
    </>
  );
}
