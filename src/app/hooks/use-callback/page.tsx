"use client";

import React, { useState, useCallback, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import Link from "next/link";

// ---------------------------------------------------------------------------
// MissionButton — wrapped in React.memo
//
// TODO Hook 4: Wrap this component in React.memo so it bails out of re-rendering
// when its props haven't changed. Without memo, it re-renders every time the
// parent re-renders regardless of whether onLaunch changed.
// ---------------------------------------------------------------------------
const MissionButton = React.memo(function MissionButton({
  onLaunch,
  renderCount,
}: {
  onLaunch: () => void;
  renderCount: React.MutableRefObject<number>;
}) {
  renderCount.current += 1;

  return (
    <button
      id="mission-launch-btn"
      onClick={onLaunch}
      className="w-full px-4 py-3 rounded-xl border-2 border-b-4 border-sky-300 border-b-sky-500 bg-sky-50 text-sky-900 text-sm font-black font-toy hover:bg-sky-100 active:translate-y-[2px] active:border-b-2 transition-all"
    >
      🚀 Launch Mission
      <span className="block text-[10px] font-bold text-sky-400 mt-0.5 font-sans">
        This button rendered {renderCount.current}×
      </span>
    </button>
  );
});

export default function UseCallbackPage() {
  const [counter, setCounter] = useState(0);
  const [missionName, setMissionName] = useState("Buzz Lightyear");
  const [missionLog, setMissionLog] = useState<string[]>([]);

  // Ref to track MissionButton renders — useRef doesn't cause re-render
  const btnRenderCount = useRef(0);

  // ==========================================
  // TODO Hook 3: Wrap handleLaunchMission in useCallback
  // Without useCallback, a new function is created every render → MissionButton
  // re-renders even when only `counter` changed (unrelated to `missionName`).
  // With useCallback, the function is stable while `missionName` stays the same.
  // ==========================================
  const handleLaunchMission = useCallback(() => {
    setMissionLog((prev) => [
      `🚀 Mission by ${missionName} — ${new Date().toLocaleTimeString()}`,
      ...prev,
    ]);
  }, [missionName]);

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
            <span className="text-[10px] font-black tracking-widest text-sky-500 uppercase font-toy">
              TODO Hook 3–4
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-indigo-950 tracking-tight mt-1 font-toy">
              🚀 useCallback — Buzz&apos;s Mission Panel
            </h1>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-xl">
              Click the{" "}
              <span className="font-bold text-amber-600">Unrelated Counter</span>{" "}
              — watch the button&apos;s render count. With{" "}
              <code className="bg-slate-100 px-1 rounded text-sky-700">useCallback</code>{" "}
              + <code className="bg-slate-100 px-1 rounded text-sky-700">React.memo</code>,
              the count stays flat. Change the mission name — then it re-renders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {/* Left: controls */}
            <div className="space-y-4">
              {/* Mission name input */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                  Mission Name
                </label>
                <input
                  id="mission-name-input"
                  type="text"
                  value={missionName}
                  onChange={(e) => setMissionName(e.target.value)}
                  className="w-full text-sm px-4 py-2 rounded-xl border-2 border-sky-200 focus:border-indigo-400 focus:outline-none bg-white text-slate-800"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Changing this recreates the callback → child re-renders
                </p>
              </div>

              {/* Unrelated counter */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                  Unrelated Parent State
                </label>
                <button
                  id="callback-counter-btn"
                  onClick={() => setCounter((c) => c + 1)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-b-4 border-amber-300 border-b-amber-400 bg-amber-50 text-amber-800 text-xs font-black font-toy hover:bg-amber-100 active:translate-y-[2px] active:border-b-2 transition-all"
                >
                  🔄 Counter: {counter}
                </button>
                <p className="text-[10px] text-slate-400 mt-1">
                  This re-renders the parent — child should stay stable
                </p>
              </div>

              {/* Stat */}
              <div className="p-3 bg-white border-2 border-sky-100 rounded-xl text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Parent Re-renders
                </p>
                <p className="text-2xl font-black text-indigo-600 font-toy">
                  {counter + 1}×
                </p>
              </div>
            </div>

            {/* Right: MissionButton + log */}
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                  Memoized Child Component
                </label>
                <MissionButton
                  onLaunch={handleLaunchMission}
                  renderCount={btnRenderCount}
                />
              </div>

              {/* Mission log */}
              <div className="bg-white border-2 border-sky-100 rounded-xl overflow-hidden">
                <div className="px-4 py-2 border-b border-sky-50">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Mission Log
                  </span>
                </div>
                <ul className="divide-y divide-sky-50 max-h-48 overflow-y-auto">
                  {missionLog.length === 0 ? (
                    <li className="px-4 py-6 text-center text-xs text-slate-400">
                      Launch a mission to see the log
                    </li>
                  ) : (
                    missionLog.map((entry, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 text-xs text-slate-600"
                      >
                        {entry}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Concept callout */}
          <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-900 leading-relaxed">
            <p className="font-black mb-1">💡 Key Concept</p>
            <p>
              <code className="bg-sky-100 px-1 rounded">useCallback(fn, [deps])</code>{" "}
              returns the <strong>same function instance</strong> between renders while
              deps are stable. Combine with{" "}
              <code className="bg-sky-100 px-1 rounded">React.memo</code> on the child
              — it does a shallow prop comparison, so a stable function reference
              means the child skips the render entirely.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
