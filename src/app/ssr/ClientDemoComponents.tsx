"use client";

import { useEffect, useState } from "react";

export function ClientDemoComponents() {
  // ==========================================
  // States for Hydration Mismatch Fix
  // ==========================================
  const [fixedTime, setFixedTime] = useState<string>("");

  useEffect(() => {
    // Only set the time after client mounting completes
    setFixedTime(new Date().toLocaleTimeString());
  }, []);

  // ==========================================
  // States for window / localStorage access
  // ==========================================
  const [browserWidth, setBrowserWidth] = useState<number | null>(null);
  const [storedTheme, setStoredTheme] = useState<string>("default");

  useEffect(() => {
    // Safe client-only environment access
    if (typeof window !== "undefined") {
      setBrowserWidth(window.innerWidth);
      
      const savedTheme = localStorage.getItem("isLoggedIn") === "true" ? "Authorized User" : "Guest Mode";
      setStoredTheme(savedTheme);

      const handleResize = () => setBrowserWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Problem 1: Hydration Mismatch */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-zinc-900/40">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-zinc-200">
            ⚠️ Problem 1: Hydration Mismatch
          </h3>
          <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            Hydration Error
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4 leading-relaxed">
          Occurs when dynamic content (like current time or random variables) renders differently on the server vs client.
        </p>
        <div className="space-y-4">
          <div className="p-3 bg-red-50/50 dark:bg-red-950/10 border border-red-155/20 dark:border-red-900/30 rounded-xl text-xs">
            <span className="font-semibold block text-red-800 dark:text-red-400 mb-1">
              🔴 Direct Rendering Mismatch Code:
            </span>
            <code className="block bg-slate-100 dark:bg-zinc-950 p-2 rounded text-[11px] font-mono text-slate-700 dark:text-zinc-300 mb-2">
              {"// This will differ between SSR generation and client mount:"}
              <br />
              {"<span>{new Date().toLocaleTimeString()}</span>"}
            </code>
          </div>
          <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-155/20 dark:border-emerald-900/30 rounded-xl text-xs">
            <span className="font-semibold block text-emerald-800 dark:text-emerald-400 mb-1">
              🟢 Safe Hydration Fix Output:
            </span>
            <div className="bg-slate-100 dark:bg-zinc-950 p-3 rounded font-semibold text-slate-800 dark:text-zinc-100 text-center text-sm">
              {fixedTime || "Synchronizing with client..."}
            </div>
            <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-2">
              *Resoled by setting time strictly inside useEffect after client mounting.*
            </p>
          </div>
        </div>
      </div>

      {/* Problem 2: Window/LocalStorage Defined */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-zinc-900/40">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-zinc-200">
            ⚠️ Problem 2: Window / Storage Undefined
          </h3>
          <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
            ReferenceError
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4 leading-relaxed">
          Node.js server lacks window, document, or localStorage. Calling them directly at component root scope triggers a build/runtime crash.
        </p>
        <div className="space-y-4">
          <div className="p-3 bg-red-50/50 dark:bg-red-950/10 border border-red-155/20 dark:border-red-900/30 rounded-xl text-xs">
            <span className="font-semibold block text-red-800 dark:text-red-400 mb-1">
              🔴 Unsafe Call Code:
            </span>
            <code className="block bg-slate-100 dark:bg-zinc-950 p-2 rounded text-[11px] font-mono text-slate-700 dark:text-zinc-300 mb-2">
              {"// Server throws: \"window is not defined\""}
              <br />
              {"const width = window.innerWidth;"}
            </code>
          </div>
          <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-155/20 dark:border-emerald-900/30 rounded-xl text-xs">
            <span className="font-semibold block text-emerald-800 dark:text-emerald-400 mb-1">
              🟢 Safe Check Resolution Output:
            </span>
            <div className="bg-slate-100 dark:bg-zinc-950 p-3 rounded text-slate-700 dark:text-zinc-300 space-y-1.5 text-xs">
              <div>
                🖥️ Browser Width:{" "}
                <span className="font-bold text-slate-900 dark:text-zinc-150">
                  {browserWidth !== null ? `${browserWidth}px` : "Checking..."}
                </span>
              </div>
              <div>
                🔑 Local Auth Status:{" "}
                <span className="font-bold text-slate-900 dark:text-zinc-150">
                  {storedTheme}
                </span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-2">
              *Guarded by checking 'typeof window !== \"undefined\"' inside client hook lifecycle.*
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
