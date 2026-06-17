import { Navigation } from "@/components/Navigation";
import Link from "next/link";

interface DemoCard {
  href: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  borderColor: string;
  badgeColor: string;
}

const demos: DemoCard[] = [
  {
    href: "/hooks/use-memo",
    emoji: "🤠",
    title: "useMemo",
    subtitle: "Woody's Toy Filter",
    description:
      "Memoize expensive computations so they only re-run when their dependencies change. See the difference live with a render counter.",
    badge: "TODO Hook 1–2",
    borderColor: "border-amber-200 hover:border-amber-400",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    href: "/hooks/use-callback",
    emoji: "🚀",
    title: "useCallback",
    subtitle: "Buzz's Mission Panel",
    description:
      "Stabilize function references so React.memo children skip unnecessary re-renders. Track child renders live.",
    badge: "TODO Hook 3–4",
    borderColor: "border-sky-200 hover:border-sky-400",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
  },
  {
    href: "/hooks/use-local-storage",
    emoji: "🦕",
    title: "useLocalStorage",
    subtitle: "Rex's Preferences",
    description:
      "Build a generic custom hook that persists state across browser refreshes using the localStorage API.",
    badge: "TODO Hook 5–7",
    borderColor: "border-emerald-200 hover:border-emerald-400",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    href: "/hooks/use-media-query",
    emoji: "🐶",
    title: "useMediaQuery",
    subtitle: "Slinky's Responsive View",
    description:
      "Subscribe to CSS media query breakpoints in JavaScript. The layout hint updates live as you resize the window.",
    badge: "TODO Hook 8–9",
    borderColor: "border-violet-200 hover:border-violet-400",
    badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
  },
  {
    href: "/hooks/use-fetch",
    emoji: "🐷",
    title: "useFetch vs useSWR",
    subtitle: "Hamm's Piggy Bank API",
    description:
      "Compare a hand-rolled useFetch hook against useSWR. See caching and deduplication in action side by side.",
    badge: "TODO Hook 10–12",
    borderColor: "border-rose-200 hover:border-rose-400",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    href: "/hooks/next-image",
    emoji: "📸",
    title: "next/image",
    subtitle: "Andy's Toy Gallery",
    description:
      "Compare a raw <img> tag against Next.js <Image>. See automatic WebP conversion, lazy loading, and CLS prevention.",
    badge: "TODO Hook 13–14",
    borderColor: "border-indigo-200 hover:border-indigo-400",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    href: "/hooks/next-font",
    emoji: "✏️",
    title: "next/font",
    subtitle: "Andy's Typography Showcase",
    description:
      "Self-host Google Fonts at build time using next/font. Zero runtime requests, automatic CLS prevention.",
    badge: "TODO Hook 15–16",
    borderColor: "border-orange-200 hover:border-orange-400",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
  },
];

export const metadata = {
  title: "Hooks Lab — Andy's Playroom",
  description:
    "Week 4 Day 3: Advanced Hooks & Custom Hooks demos in Andy's Playroom",
};

export default function HooksHubPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white font-sans pb-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8 pt-12 pb-4">
          {/* Header */}
          <div className="mb-10">
            <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase font-toy">
              Week 4 · Day 3
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-indigo-950 tracking-tight mt-1 font-toy">
              🪝 Hooks Lab
            </h1>
            <p className="mt-3 text-sm text-slate-600 max-w-2xl leading-relaxed">
              Advanced hooks and custom hooks — each demo lives on its own page.
              Follow the TODOs in your guide to unlock each concept step by step.
            </p>
          </div>

          {/* Demo cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {demos.map((demo) => (
              <Link
                key={demo.href}
                href={demo.href}
                className={`group p-5 bg-white border-2 border-b-4 rounded-2xl shadow-sm hover:scale-[1.02] hover:shadow-md transition-all ${demo.borderColor}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                    {demo.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-black text-indigo-950 font-toy">
                        {demo.title}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full border font-mono ${demo.badgeColor}`}
                      >
                        {demo.badge}
                      </span>
                    </div>
                    <p className="text-[10px] font-semibold text-indigo-400 font-toy mt-0.5">
                      {demo.subtitle}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {demo.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
