"use client";

import { Navigation } from "@/components/Navigation";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function UseMediaQueryPage() {
  // ==========================================
  // TODO Hook 9: Consume useMediaQuery for three breakpoints
  // Drag the browser window to see the active breakpoint change in real time
  // ==========================================
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const currentBreakpoint = isMobile
    ? { label: "Mobile", emoji: "📱", color: "text-rose-600", bg: "bg-rose-50 border-rose-200" }
    : isTablet
    ? { label: "Tablet", emoji: "📟", color: "text-violet-600", bg: "bg-violet-50 border-violet-200" }
    : isDesktop
    ? { label: "Desktop", emoji: "🖥️", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" }
    : { label: "Unknown", emoji: "❓", color: "text-slate-600", bg: "bg-slate-50 border-slate-200" };

  const breakpoints = [
    {
      label: "Mobile",
      emoji: "📱",
      query: "(max-width: 767px)",
      active: isMobile,
      color: "border-rose-300 bg-rose-50",
      activeText: "text-rose-700",
    },
    {
      label: "Tablet",
      emoji: "📟",
      query: "(min-width: 768px) and (max-width: 1023px)",
      active: isTablet,
      color: "border-violet-300 bg-violet-50",
      activeText: "text-violet-700",
    },
    {
      label: "Desktop",
      emoji: "🖥️",
      query: "(min-width: 1024px)",
      active: isDesktop,
      color: "border-emerald-300 bg-emerald-50",
      activeText: "text-emerald-700",
    },
  ];

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
            <span className="text-[10px] font-black tracking-widest text-violet-500 uppercase font-toy">
              TODO Hook 8–9
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-indigo-950 tracking-tight mt-1 font-toy">
              🐶 useMediaQuery — Slinky&apos;s Responsive View
            </h1>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-xl">
              Drag your browser window narrower or wider. The active breakpoint
              updates live — no page refresh needed. This is the JavaScript
              equivalent of CSS <code className="bg-slate-100 px-1 rounded">@media</code> rules.
            </p>
          </div>

          {/* Active breakpoint hero */}
          <div
            className={`flex items-center gap-4 p-5 border-2 rounded-2xl mb-6 transition-all ${currentBreakpoint.bg}`}
          >
            <span className="text-4xl">{currentBreakpoint.emoji}</span>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Current Breakpoint
              </p>
              <p
                className={`text-2xl font-black font-toy ${currentBreakpoint.color}`}
              >
                {currentBreakpoint.label}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Resize the window to change this
              </p>
            </div>
          </div>

          {/* Breakpoint cards */}
          <div className="space-y-3 mb-6">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
              All Breakpoints
            </label>
            {breakpoints.map((bp) => (
              <div
                key={bp.label}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                  bp.active
                    ? `${bp.color} border-b-4`
                    : "bg-white border-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{bp.emoji}</span>
                  <div>
                    <p
                      className={`text-sm font-black font-toy ${
                        bp.active ? bp.activeText : "text-slate-400"
                      }`}
                    >
                      {bp.label}
                    </p>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                      {bp.query}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                    bp.active
                      ? "bg-white/70 text-indigo-600"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {bp.active ? "✓ ACTIVE" : "inactive"}
                </span>
              </div>
            ))}
          </div>

          {/* Conditional toy layout demo */}
          <div className="p-4 bg-white border-2 border-sky-100 rounded-2xl mb-5">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
              Layout Hint (changes with breakpoint)
            </p>
            {isMobile && (
              <p className="text-sm text-slate-700">
                📱 <strong>Mobile:</strong> Slinky Dog stretches single column — one toy at a time!
              </p>
            )}
            {isTablet && (
              <p className="text-sm text-slate-700">
                📟 <strong>Tablet:</strong> Slinky Dog bends to a 2-column grid — more toys visible!
              </p>
            )}
            {isDesktop && (
              <p className="text-sm text-slate-700">
                🖥️ <strong>Desktop:</strong> Slinky Dog extends to a 3-column grid — Andy&apos;s full inventory!
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
