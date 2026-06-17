// next/font must be instantiated at module level — NOT inside a component.
// These are build-time optimizations that Next.js resolves before runtime.

// ==========================================
// TODO Hook 15: Import and instantiate Google Fonts using next/font/google
// Each font call generates a unique CSS class.
// The font file is downloaded at BUILD TIME and self-hosted — no runtime
// request to Google's servers.
// ==========================================
import { Bangers, Pacifico, Inter } from "next/font/google";

import { Navigation } from "@/components/Navigation";
import Link from "next/link";

const bangersFont = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bangers",
});

const pacificoFont = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
});

// ==========================================
// TODO Hook 16: Use the CSS variable approach
// Attach the variable to a wrapper element, then reference it via style prop.
// The variable approach is preferred for Tailwind integration.
// ==========================================
const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const FONT_SAMPLES = [
  {
    fontClass: "",
    fontStyle: {},
    label: "Default (System Font)",
    desc: "No next/font — browser default stack",
    badge: "browser default",
    badgeColor: "bg-slate-100 text-slate-500",
    quote: "To infinity and beyond!",
  },
  {
    fontClass: bangersFont.className,
    fontStyle: {},
    label: "Bangers",
    desc: "className approach",
    badge: "next/font className",
    badgeColor: "bg-amber-50 text-amber-700",
    quote: "To infinity and beyond!",
  },
  {
    fontClass: pacificoFont.className,
    fontStyle: {},
    label: "Pacifico",
    desc: "className approach",
    badge: "next/font className",
    badgeColor: "bg-rose-50 text-rose-700",
    quote: "Reach for the sky!",
  },
  {
    fontClass: `${interFont.variable}`,
    fontStyle: { fontFamily: "var(--font-inter)" },
    label: "Inter (CSS variable)",
    desc: "variable approach",
    badge: "next/font variable",
    badgeColor: "bg-indigo-50 text-indigo-700",
    quote: "You've got a friend in me.",
  },
];

export const metadata = {
  title: "next/font Demo — Andy's Playroom",
  description: "Week 4 Day 3: next/font Google and CSS variable demo",
};

export default function NextFontPage() {
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
            <span className="text-[10px] font-black tracking-widest text-orange-500 uppercase font-toy">
              TODO Hook 15–16
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-indigo-950 tracking-tight mt-1 font-toy">
              ✏️ next/font — Andy&apos;s Typography Showcase
            </h1>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-xl">
              Google Fonts loaded via{" "}
              <code className="bg-slate-100 px-1 rounded">next/font/google</code>{" "}
              are self-hosted at build time — no external request to Google,
              zero layout shift, automatic privacy protection.
            </p>
          </div>

          {/* Font showcase cards */}
          <div className="space-y-4">
            {FONT_SAMPLES.map((sample) => (
              <div
                key={sample.label}
                className="p-5 bg-white border-2 border-sky-100 rounded-2xl"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {sample.label}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {sample.desc}
                    </p>
                  </div>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${sample.badgeColor}`}
                  >
                    {sample.badge}
                  </span>
                </div>

                {/* Font preview */}
                <p
                  className={`text-2xl md:text-3xl text-indigo-950 ${sample.fontClass}`}
                  style={sample.fontStyle}
                >
                  {sample.quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
