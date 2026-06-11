import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { BreakingNews } from "@/types";

// ==========================================
// TODO RECAP 6: Export static revalidation interval key
// Next.js ISR will rebuild this page in the background if accessed after 10 seconds
// ==========================================
export const revalidate = 10;

async function getBreakingNews(): Promise<BreakingNews> {
  try {
    const response = await fetch("http://localhost:4000/breaking-news", {
      next: { revalidate: 10 }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch breaking news");
    }
    return await response.json();
  } catch (error) {
    console.warn("Local json-server is offline. Serving build-time fallback breaking news.");
    return {
      title: "Warning: Local json-server is offline! Run 'npm run api' to test real-time ISR revalidation.",
      timestamp: "Build-Time Offline Fallback"
    };
  }
}

export default async function BreakingNewsPage() {
  const data = await getBreakingNews();
  const buildTime = new Date().toLocaleTimeString();

  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-xl px-4 py-8">
        {/* Back navigation */}
        <Link
          href="/"
          className="text-xs font-bold text-slate-400 hover:text-[#00828A] transition-colors mb-6 inline-block"
        >
          ← Home
        </Link>

        {/* Section Header */}
        <header className="mb-6">
          <div className="flex items-center border-l-4 border-red-500 pl-2">
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
              🔄 Incremental Static Regeneration (ISR)
            </h1>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            ISR allows static pages to be regenerated periodically in the background as new data arrives, serving them instantly to clients.
          </p>
        </header>

        {/* Timestamp Status Panel */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl border border-slate-200/60 dark:border-neutral-800/80 bg-white dark:bg-zinc-950/40">
            <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-[#00828A] dark:text-teal-400 mb-2">
              ⏱️ GENERATION TIMESTAMP
            </h2>
            <div className="bg-slate-50 dark:bg-zinc-900 p-4 rounded-xl text-center text-xs font-bold text-slate-700 dark:text-zinc-300 border border-slate-200/40 dark:border-neutral-800/50">
              Page regenerated at:{" "}
              <span className="font-mono text-red-500 dark:text-red-400 ml-1">{buildTime}</span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-2 text-center leading-relaxed">
              Cache revalidation period: **10 seconds**. Refresh the browser after 10 seconds to trigger background revalidation.
            </p>
          </div>

          {/* Breaking News Content Panel */}
          <div className="p-5 rounded-2xl border border-[#00828A]/20 dark:border-teal-900/30 bg-[#00828A]/5 dark:bg-teal-950/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#00828A] text-white text-[8px] font-black uppercase px-2.5 py-0.5 rounded-bl">
              ISR LIVE DATA
            </div>
            <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-red-500 mb-3">
              📢 BREAKING NEWS
            </h2>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-zinc-100 leading-snug mb-3">
              {data.title}
            </h3>
            <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-zinc-500 mt-4 pt-3 border-t border-slate-100 dark:border-neutral-900">
              <span>Source: local json-server (:4000)</span>
              <span>Updated at: {data.timestamp}</span>
            </div>
          </div>

          {/* Explanation / Classroom steps */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/20 text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed border border-slate-200/30 dark:border-neutral-800/40">
            <span className="font-extrabold text-slate-700 dark:text-zinc-300 block mb-1">How to Test ISR Revalidation:</span>
            <ol className="list-decimal list-inside space-y-1">
              <li>Navigate to the <Link href="/login" className="text-[#00828A] underline font-bold">Admin Panel</Link> and log in (isLoggedIn = true).</li>
              <li>Modify the Breaking News title in the dashboard form, then submit.</li>
              <li>Return to this page. You will initially see the cached (stale) headline.</li>
              <li>Wait 10 seconds, then refresh this page.</li>
              <li>The first refresh triggers a background page rebuild. The second refresh displays the updated headline!</li>
            </ol>
          </div>
        </div>
      </main>
    </>
  );
}
