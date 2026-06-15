import { Navigation } from "@/components/Navigation";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-4xl px-4 py-16 flex flex-col items-center justify-center font-sans text-center">
        {/* Badge */}
        <span className="text-[10px] font-bold tracking-wider text-teal-650 bg-teal-50 dark:bg-teal-950/30 dark:text-teal-400 border border-teal-100 dark:border-teal-900/50 px-3.5 py-1.5 rounded-full uppercase mb-6 animate-pulse">
          Next.js Security & Routing Course
        </span>

        {/* Hero Headline */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50 leading-tight max-w-2xl">
          Proxy Routing & Role-Based Access Control (RBAC)
        </h1>
        
        {/* Hero Subtitle */}
        <p className="mt-4 text-sm text-slate-500 dark:text-zinc-400 max-w-xl leading-relaxed">
          Learn how to hide third-party API configurations via Next.js Route Handlers, write secure HttpOnly cookies, and enforce access guards at the middleware boundary.
        </p>

        {/* Call-to-actions */}
        <div className="mt-8 flex gap-4">
          <Link
            href="/dashboard"
            className="btn-primary px-6 h-11 rounded-full bg-[#00828A] hover:bg-[#006e75] text-white text-xs font-bold transition-colors shadow-sm flex items-center justify-center cursor-pointer"
          >
            Access Dashboard
          </Link>
          <Link
            href="/login"
            className="px-6 h-11 rounded-full border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-zinc-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors flex items-center justify-center cursor-pointer"
          >
            Sign In Panel
          </Link>
        </div>

        {/* Concept Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left w-full">
          {/* Card 1 */}
          <div className="p-6 bg-white dark:bg-zinc-950/40 border border-slate-200/60 dark:border-neutral-800/80 rounded-2xl shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-[#00828A] dark:text-teal-400 flex items-center justify-center font-bold mb-4 text-xs">
              01
            </div>
            <h3 className="text-xs font-extrabold text-slate-800 dark:text-zinc-200 uppercase tracking-wider mb-2">
              API Proxying
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-zinc-450 leading-relaxed">
              Exposing external APIs directly to the browser is insecure. Next.js route handlers proxy credentials, acting as a gateway buffer.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white dark:bg-zinc-950/40 border border-slate-200/60 dark:border-neutral-800/80 rounded-2xl shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-[#00828A] dark:text-teal-400 flex items-center justify-center font-bold mb-4 text-xs">
              02
            </div>
            <h3 className="text-xs font-extrabold text-slate-800 dark:text-zinc-200 uppercase tracking-wider mb-2">
              HttpOnly Cookies
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-zinc-450 leading-relaxed">
              Avoid saving tokens in local storage. Saving credentials in server-set HTTP-only cookies blocks client scripts (XSS) from reading them.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white dark:bg-zinc-950/40 border border-slate-200/60 dark:border-neutral-800/80 rounded-2xl shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-[#00828A] dark:text-teal-400 flex items-center justify-center font-bold mb-4 text-xs">
              03
            </div>
            <h3 className="text-xs font-extrabold text-slate-800 dark:text-zinc-200 uppercase tracking-wider mb-2">
              Role-Based Guards
            </h3>
            <p className="text-[11px] text-slate-550 dark:text-zinc-450 leading-relaxed">
              Intercept routes inside `middleware.ts`. Automatically inspect the user's role and block unauthorized access prior to rendering the page.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
