"use client";

import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import Link from "next/link";
import useSWR from "swr";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface DummyProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const API_URL =
  "https://dummyjson.com/products?limit=6&select=id,title,price,thumbnail";

export default function NextImagePage() {
  const { data, isLoading } = useSWR(API_URL, fetcher);

  const products: DummyProduct[] = data?.products ?? [];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white font-sans pb-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8 pt-10">
          {/* Back link */}
          <Link
            href="/hooks"
            className="text-[11px] font-bold text-indigo-400 hover:text-indigo-600 transition-colors font-toy"
          >
            ← Hooks Lab
          </Link>

          {/* Header */}
          <div className="mt-4 mb-8">
            <span className="text-[10px] font-black tracking-widest text-indigo-500 uppercase font-toy">
              TODO Hook 13–14
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-indigo-950 tracking-tight mt-1 font-toy">
              📸 next/image — Andy&apos;s Toy Photo Gallery
            </h1>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-xl">
              Compare a raw{" "}
              <code className="bg-slate-100 px-1 rounded">&lt;img&gt;</code> tag
              (left) against Next.js{" "}
              <code className="bg-slate-100 px-1 rounded">&lt;Image&gt;</code>{" "}
              (right). Open DevTools → Network → Img to see WebP served automatically.
            </p>
          </div>

          {isLoading && (
            <div className="grid grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-52 bg-slate-100 animate-pulse rounded-2xl" />
              ))}
            </div>
          )}

          {products.length > 0 && (
            <div className="space-y-8">
              {/* Section A: fixed width/height */}
              <div>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest font-toy mb-4">
                  TODO Hook 13 — Fixed width & height
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left: plain img */}
                  <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                      🖼 &lt;img&gt; — plain HTML
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {products.slice(0, 3).map((product) => (
                        <div key={product.id} className="flex flex-col gap-1.5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            width={100}
                            height={100}
                            className="w-full rounded-lg object-cover aspect-square"
                          />
                          <p className="text-[9px] text-slate-500 leading-tight truncate">
                            {product.title}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="text-[9px] text-slate-400 mt-3">
                      Format: JPEG/PNG · No size optimization
                    </p>
                  </div>

                  {/* Right: next/image */}
                  <div className="p-4 bg-indigo-50 border-2 border-indigo-200 rounded-2xl">
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-3">
                      ✅ &lt;Image&gt; — next/image
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {products.slice(0, 3).map((product) => (
                        <div key={product.id} className="flex flex-col gap-1.5">
                          {/* ==========================================
                              TODO Hook 13: Replace <img> with <Image> from next/image
                              Add width, height, and alt — Next.js uses these to
                              pre-reserve space (prevents layout shift) and serve WebP.
                              ========================================== */}
                          <Image
                            src={product.thumbnail}
                            alt={product.title}
                            width={100}
                            height={100}
                            className="w-full rounded-lg object-cover aspect-square"
                          />
                          <p className="text-[9px] text-slate-500 leading-tight truncate">
                            {product.title}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="text-[9px] text-indigo-400 mt-3">
                      Format: WebP auto · Lazy load · CLS prevented
                    </p>
                  </div>
                </div>
              </div>

              {/* Section B: fill mode + priority */}
              <div>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest font-toy mb-4">
                  TODO Hook 14 — fill mode & priority
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left: plain img stretch */}
                  <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                      🖼 &lt;img&gt; — manual sizing
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {products.slice(3, 6).map((product) => (
                        <div key={product.id} className="relative w-full h-24">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-[9px] text-slate-400 mt-3">
                      Manual CSS — no intrinsic size hints
                    </p>
                  </div>

                  {/* Right: next/image fill */}
                  <div className="p-4 bg-indigo-50 border-2 border-indigo-200 rounded-2xl">
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-3">
                      ✅ &lt;Image fill priority&gt; — next/image
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {products.slice(3, 6).map((product, i) => (
                        <div key={product.id} className="relative w-full h-24">
                          {/* ==========================================
                              TODO Hook 14: Use fill mode + priority for above-the-fold images
                              - fill: stretches to fill the relative-positioned parent
                              - priority: skips lazy load → improves LCP score
                              - Parent MUST have position:relative + defined height
                              ========================================== */}
                          <Image
                            src={product.thumbnail}
                            alt={product.title}
                            fill
                            priority={i === 0}
                            className="object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-[9px] text-indigo-400 mt-3">
                      fill + priority → zero CLS · first image skips lazy load
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
