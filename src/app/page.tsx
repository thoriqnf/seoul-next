import { Navigation } from "@/components/Navigation";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-5xl px-4 py-16 flex flex-col items-center justify-center font-sans text-center">
        {/* Magical Badge */}
        <span className="text-[10px] font-extrabold tracking-widest text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 dark:text-indigo-300 border border-indigo-150/40 dark:border-indigo-900/50 px-4 py-2 rounded-full uppercase mb-6 animate-pulse">
          ✨ Welcome to Toyiverse ✨
        </span>

        {/* Hero Title */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-zinc-50 leading-tight max-w-3xl">
          Bring Imagination to Play Time
        </h1>
        
        {/* Hero Subtitle */}
        <p className="mt-4 text-sm md:text-base text-slate-550 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Discover our curated collection of award-winning learning toys, hand-crafted wooden figures, and immersive family games designed for children of all ages.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <Link
            href="/dashboard"
            className="h-11 px-6 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-200 dark:shadow-none flex items-center justify-center cursor-pointer hover:scale-[1.02]"
          >
            Store Staff Console
          </Link>
          <Link
            href="/login"
            className="h-11 px-6 rounded-full border border-slate-200 dark:border-neutral-800 text-slate-650 dark:text-zinc-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors flex items-center justify-center cursor-pointer"
          >
            Sign In Panel
          </Link>
        </div>

        {/* Rebranded Toy Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left w-full">
          {/* Card 1: Action Figures */}
          <div className="p-6 bg-white dark:bg-zinc-950/40 border border-slate-200/60 dark:border-neutral-800/80 rounded-2xl shadow-sm hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all">
            <div className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-300 flex items-center justify-center font-bold mb-4 text-sm">
              🦖
            </div>
            <h3 className="text-xs font-black text-slate-800 dark:text-zinc-200 uppercase tracking-wider mb-2">
              Action & Figures
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-zinc-450 leading-relaxed">
              Explore dynamic figures, legendary prehistoric beasts, and robotic companions built to inspire high-action play scenarios.
            </p>
          </div>

          {/* Card 2: Plushies & Soft Toys */}
          <div className="p-6 bg-white dark:bg-zinc-950/40 border border-slate-200/60 dark:border-neutral-800/80 rounded-2xl shadow-sm hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold mb-4 text-sm">
              🧸
            </div>
            <h3 className="text-xs font-black text-slate-800 dark:text-zinc-200 uppercase tracking-wider mb-2">
              Plushies & Friends
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-zinc-450 leading-relaxed">
              Meet our super-soft huggable friends, curated from eco-friendly fabrics and stitched with love for long bedtime snuggles.
            </p>
          </div>

          {/* Card 3: Creative & Arts */}
          <div className="p-6 bg-white dark:bg-zinc-950/40 border border-slate-200/60 dark:border-neutral-800/80 rounded-2xl shadow-sm hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all">
            <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-450 flex items-center justify-center font-bold mb-4 text-sm">
              🎨
            </div>
            <h3 className="text-xs font-black text-slate-800 dark:text-zinc-200 uppercase tracking-wider mb-2">
              Crafts & Learn
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-zinc-450 leading-relaxed">
              Spark logical reasoning and artistic styling with science kits, build blocks, and premium watercolor sets.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
