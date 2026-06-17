// next/font must be instantiated at module level — NOT inside a component.
// These are build-time optimizations that Next.js resolves before runtime.

// ==========================================
// TODO Hook 15: Import and instantiate Google Fonts using next/font/google
// Each font call generates a unique CSS class and optional CSS variable.
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
// Attach the variable to a wrapper element, then reference it via style prop
// or a Tailwind fontFamily extension in tailwind.config.
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
    desc: "next/font/google · className approach",
    badge: "next/font className",
    badgeColor: "bg-amber-50 text-amber-700",
    quote: "To infinity and beyond!",
  },
  {
    fontClass: pacificoFont.className,
    fontStyle: {},
    label: "Pacifico",
    desc: "next/font/google · className approach",
    badge: "next/font className",
    badgeColor: "bg-rose-50 text-rose-700",
    quote: "Reach for the sky!",
  },
  {
    fontClass: `${interFont.variable}`,
    fontStyle: { fontFamily: "var(--font-inter)" },
    label: "Inter (CSS variable)",
    desc: "next/font/google · variable approach",
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
          <div className="space-y-4 mb-8">
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

          {/* className vs variable explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
              <p className="font-black mb-2">className approach</p>
              <pre className="bg-amber-100 rounded p-2 text-[10px] overflow-x-auto whitespace-pre-wrap">
{`const bangersFont = Bangers({
  subsets: ["latin"],
  weight: "400",
});

<p className={bangersFont.className}>
  To infinity and beyond!
</p>`}
              </pre>
              <p className="mt-2 text-amber-700">
                Simple — scopes the font to that element directly.
              </p>
            </div>

            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 leading-relaxed">
              <p className="font-black mb-2">CSS variable approach (Tailwind-friendly)</p>
              <pre className="bg-indigo-100 rounded p-2 text-[10px] overflow-x-auto whitespace-pre-wrap">
{`const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Attach the var to a wrapper:
<div className={interFont.variable}>
  <p style={{fontFamily: "var(--font-inter)"}}>
    Text here
  </p>
</div>`}
              </pre>
              <p className="mt-2 text-indigo-700">
                Preferred with Tailwind — add to{" "}
                <code className="bg-indigo-200 px-1 rounded">fontFamily</code>{" "}
                in tailwind config and use it as a utility class.
              </p>
            </div>
          </div>

          {/* Comparison table */}
          <div className="bg-white border-2 border-sky-100 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-sky-50 bg-sky-50">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Traditional vs next/font
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-sky-50">
                    <th className="text-left px-5 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest w-[35%]">
                      Feature
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      &lt;link&gt; Google CDN
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                      next/font/google
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-50">
                  {[
                    ["Request at runtime", "✅ External call to Google", "❌ None — self-hosted"],
                    ["Privacy", "User IP sent to Google", "✅ No Google tracking"],
                    ["Layout shift (CLS)", "Manual font-display", "✅ Automatic size-adjust"],
                    ["Tailwind integration", "Manual CSS variable", "✅ variable prop → CSS var"],
                    ["Bundle size", "Runtime dependency", "✅ Zero runtime cost"],
                  ].map(([feature, traditional, nextFont]) => (
                    <tr key={feature}>
                      <td className="px-5 py-3 font-semibold text-slate-600">
                        {feature}
                      </td>
                      <td className="px-4 py-3 text-slate-500">{traditional}</td>
                      <td className="px-4 py-3 text-slate-700">{nextFont}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
