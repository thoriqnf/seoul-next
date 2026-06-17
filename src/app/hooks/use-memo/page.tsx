"use client";

import { useState, useMemo, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Data: 200 fake toy names generated from a fixed seed — no API needed
// ---------------------------------------------------------------------------
const TOY_NAMES = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: [
    "Woody",
    "Buzz Lightyear",
    "Jessie",
    "Rex",
    "Hamm",
    "Slinky Dog",
    "Mr. Potato Head",
    "Bo Peep",
    "Bullseye",
    "Forky",
    "Lotso",
    "Zurg",
    "RC Car",
    "Etch",
    "Wheezy",
    "Squeeze Toy Alien",
    "Chuckles",
    "Buttercup",
    "Trixie",
    "Dolly",
  ][i % 20] + (i >= 20 ? ` #${Math.floor(i / 20) + 1}` : ""),
  emoji: ["🤠", "🚀", "🤠", "🦕", "🐷", "🐶", "🥔", "🐑", "🐴", "🍴"][i % 10],
}));

export default function UseMemoPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [counter, setCounter] = useState(0);

  // ==========================================
  // TODO Hook 1: Track how many times the filter computation runs
  // useRef does NOT trigger a re-render — perfect for internal counters
  // ==========================================
  const filterRunCount = useRef(0);

  // ==========================================
  // TODO Hook 2: Wrap the filter in useMemo
  // The computation runs only when `searchQuery` changes — not when `counter` changes
  // ==========================================
  const filteredToys = useMemo(() => {
    filterRunCount.current += 1;
    return TOY_NAMES.filter((toy) =>
      toy.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white font-sans pb-24">
        <div className="mx-auto max-w-3xl px-6 md:px-8 pt-10">
          {/* Back link */}
          <Link
            href="/hooks"
            className="text-[11px] font-bold text-indigo-400 hover:text-indigo-600 transition-colors font-toy"
          >
            ← Hooks Lab
          </Link>

          {/* Header */}
          <div className="mt-4 mb-8">
            <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase font-toy">
              TODO Hook 1–2
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-indigo-950 tracking-tight mt-1 font-toy">
              🤠 useMemo — Woody&apos;s Toy Filter
            </h1>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-xl">
              Click the counter to trigger a re-render. Watch the{" "}
              <span className="font-bold text-amber-600">Filter Ran</span> count
              — with <code className="bg-slate-100 px-1 rounded text-amber-700">useMemo</code>,
              it only increments when you type in the search box.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <input
              id="toy-search-input"
              type="text"
              placeholder="Search toys…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-w-[200px] text-sm px-4 py-2 rounded-xl border-2 border-sky-200 focus:border-indigo-400 focus:outline-none bg-white text-slate-800"
            />
            <button
              id="usememo-counter-btn"
              onClick={() => setCounter((c) => c + 1)}
              className="px-4 py-2 rounded-xl border-2 border-b-4 border-amber-300 border-b-amber-400 bg-amber-50 text-amber-800 text-xs font-black font-toy hover:bg-amber-100 active:translate-y-[2px] active:border-b-2 transition-all"
            >
              🔄 Unrelated Counter: {counter}
            </button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-white border-2 border-sky-100 rounded-2xl text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Filter Ran
              </p>
              <p className="text-3xl font-black text-amber-500 font-toy">
                {filterRunCount.current}×
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                only increments on search change
              </p>
            </div>
            <div className="p-4 bg-white border-2 border-sky-100 rounded-2xl text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Results
              </p>
              <p className="text-3xl font-black text-indigo-600 font-toy">
                {filteredToys.length}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                out of {TOY_NAMES.length} toys
              </p>
            </div>
          </div>

          {/* Toy list */}
          <div className="bg-white border-2 border-sky-100 rounded-2xl overflow-hidden">
            <div className="px-4 py-2.5 border-b border-sky-50">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Toy Inventory
              </span>
            </div>
            <ul className="divide-y divide-sky-50 max-h-80 overflow-y-auto">
              {filteredToys.slice(0, 50).map((toy) => (
                <li
                  key={toy.id}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-sky-50 transition-colors"
                >
                  <span className="text-base">{toy.emoji}</span>
                  <span className="text-xs font-semibold text-slate-700">
                    {toy.name}
                  </span>
                </li>
              ))}
              {filteredToys.length === 0 && (
                <li className="px-4 py-8 text-center text-xs text-slate-400">
                  No toys found matching &quot;{searchQuery}&quot;
                </li>
              )}
            </ul>
          </div>

          {/* Concept callout */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
            <p className="font-black mb-1">💡 Key Concept</p>
            <p>
              <code className="bg-amber-100 px-1 rounded">useMemo(() =&gt; fn(), [deps])</code>{" "}
              caches the result. React only re-runs the function when one of the
              listed dependencies changes. Clicking the Unrelated Counter button
              triggers a re-render but the filter count stays flat — because
              <code className="bg-amber-100 px-1 rounded ml-1">searchQuery</code> did not change.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
