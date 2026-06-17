"use client";

import { Navigation } from "@/components/Navigation";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const CHARACTERS = [
  { name: "Woody", emoji: "🤠", color: "border-amber-300 bg-amber-50" },
  { name: "Buzz Lightyear", emoji: "🚀", color: "border-sky-300 bg-sky-50" },
  { name: "Rex", emoji: "🦕", color: "border-emerald-300 bg-emerald-50" },
  { name: "Jessie", emoji: "🤠", color: "border-rose-300 bg-rose-50" },
  { name: "Hamm", emoji: "🐷", color: "border-pink-300 bg-pink-50" },
  { name: "Slinky Dog", emoji: "🐶", color: "border-orange-300 bg-orange-50" },
];

export default function UseLocalStoragePage() {
  // ==========================================
  // TODO Hook 7: Use the custom useLocalStorage hook
  // The value persists across browser refreshes — try picking a character,
  // then hard-refreshing (Cmd+Shift+R). Your choice will still be selected!
  // ------------------------------------------
  // const [favCharacter, setFavCharacter] = useLocalStorage<string>(
  //   "rex-fav-character",
  //   "Rex"
  // );
  // ==========================================
  // Starter fallback — useLocalStorage is called but TODO Hook 5+6 aren't done yet,
  // so it behaves like plain useState (no persistence). That's fine for now!
  const [favCharacter, setFavCharacter] = useLocalStorage<string>(
    "rex-fav-character",
    "Rex"
  );

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
            <span className="text-[10px] font-black tracking-widest text-emerald-500 uppercase font-toy">
              TODO Hook 5–7
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-indigo-950 tracking-tight mt-1 font-toy">
              🦕 useLocalStorage — Rex&apos;s Preferences
            </h1>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-xl">
              Pick your favorite character. Then{" "}
              <strong className="text-slate-700">hard-refresh</strong> the page
              (Cmd+Shift+R) — your choice persists! Open DevTools → Application
              → Local Storage to see the key written in real time.
            </p>
          </div>

          {/* Character selector */}
          <div className="mb-6">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
              Rex&apos;s Favorite Character
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CHARACTERS.map((char) => {
                const isSelected = favCharacter === char.name;
                return (
                  <button
                    key={char.name}
                    id={`char-btn-${char.name.toLowerCase().replace(/\s/g, "-")}`}
                    onClick={() => setFavCharacter(char.name)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 border-b-4 text-left transition-all hover:scale-[1.02] active:translate-y-[1px] active:border-b-2 ${
                      isSelected
                        ? `${char.color} border-b-current scale-[1.02]`
                        : "bg-white border-slate-200 border-b-slate-300 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-xl">{char.emoji}</span>
                    <div>
                      <p
                        className={`text-xs font-black font-toy ${
                          isSelected ? "text-indigo-900" : "text-slate-600"
                        }`}
                      >
                        {char.name}
                      </p>
                      {isSelected && (
                        <p className="text-[9px] font-bold text-indigo-400 mt-0.5">
                          ✓ Selected
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview card */}
          <div className="p-5 bg-white border-2 border-emerald-100 rounded-2xl">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
              Persisted Value
            </p>
            <div className="flex items-center gap-4">
              <span className="text-4xl">
                {CHARACTERS.find((c) => c.name === favCharacter)?.emoji ?? "🦕"}
              </span>
              <div>
                <p className="text-lg font-black text-indigo-950 font-toy">
                  {favCharacter}
                </p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  localStorage key: <span className="text-emerald-600">&quot;rex-fav-character&quot;</span>
                </p>
              </div>
            </div>
          </div>

          {/* Concept callout */}
          <div className="mt-5 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed">
            <p className="font-black mb-1">💡 Key Concept</p>
            <p>
              A <strong>custom hook</strong> is just a function whose name starts
              with <code className="bg-emerald-100 px-1 rounded">use</code> and
              that can call other React hooks inside it.{" "}
              <code className="bg-emerald-100 px-1 rounded">useLocalStorage</code>{" "}
              wraps <code className="bg-emerald-100 px-1 rounded">useState</code>{" "}
              with a lazy initializer that reads from localStorage on mount,
              keeping the API identical to plain{" "}
              <code className="bg-emerald-100 px-1 rounded">useState</code>.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
