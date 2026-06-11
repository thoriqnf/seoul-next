import { Navigation } from "@/components/Navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { TrendingSidebar } from "@/components/TrendingSidebar";
import { NewsArticle } from "@/types";

// Helper mapper to associate raw DummyJSON posts with Kumparan author details
function mapPostToArticle(post: any): NewsArticle {
  const authors = [
    { name: "kumparanNEWS", verified: true },
    { name: "kumparanBISNIS", verified: true },
    { name: "kumparanTECH", verified: true },
    { name: "kumparanBOLA", verified: true },
    { name: "kumparanHIBURAN", verified: true },
  ];
  const authorMeta = authors[(post.userId || 0) % authors.length];
  // Calculate relative realistic time ago based on id
  const minutes = (post.id * 7) % 60;
  const hours = (post.id * 3) % 24;
  const timeAgoStr = hours === 0 ? `${minutes} menit` : `${hours} jam`;

  return {
    id: String(post.id),
    title: post.title,
    body: post.body,
    tags: post.tags || [],
    views: post.views || 0,
    userId: post.userId,
    author: authorMeta.name,
    verified: authorMeta.verified,
    timeAgo: timeAgoStr,
  };
}

async function getNewsData(): Promise<{ heroArticles: NewsArticle[]; trendingArticles: NewsArticle[] }> {
  // ==========================================
  // TODO RECAP RENDER 1: Concurrently fetch news data (posts limit=3) and trending data (posts limit=5 skip=3) using Promise.all
  // Then map raw posts to our NewsArticle structures using mapPostToArticle
  // ==========================================
  const [postsRes, trendingRes] = await Promise.all([
    fetch("https://dummyjson.com/posts?limit=3", { cache: "no-store" }),
    fetch("https://dummyjson.com/posts?limit=5&skip=3", { cache: "no-store" }),
  ]);

  if (!postsRes.ok || !trendingRes.ok) {
    throw new Error("Failed to fetch news feed");
  }

  const postsData = await postsRes.json();
  const trendingData = await trendingRes.json();

  const heroArticles = (postsData.posts || []).map(mapPostToArticle);
  const trendingArticles = (trendingData.posts || []).map(mapPostToArticle);

  return { heroArticles, trendingArticles };
}

export default async function Home() {
  const { heroArticles, trendingArticles } = await getNewsData();
  const mainHero = heroArticles[0];
  const subHeroList = heroArticles.slice(1);

  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Banner Topic Row */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs font-bold text-white bg-[#00828A] px-3 py-1.5 rounded-full shrink-0">
            Terbaru
          </span>
          <span className="text-xs font-bold text-slate-600 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-slate-200/40 dark:border-neutral-800/80 shrink-0">
            Fokus: Pemulihan Ekonomi
          </span>
          <span className="text-xs font-bold text-slate-600 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-slate-200/40 dark:border-neutral-800/80 shrink-0">
            Teknologi Digital
          </span>
        </div>

        {/* Kumparan-Style Split Layout (70% Left Main Feed, 30% Right Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* Left Main Column: Hero and Grid cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center border-l-4 border-red-500 pl-2 mb-2">
              <h2 className="text-base font-extrabold text-slate-800 dark:text-zinc-100 tracking-tight">
                Pilihan Redaksi
              </h2>
            </div>

            {/* Main top hero article */}
            {mainHero && (
              <ArticleCard article={mainHero} isHero={true} />
            )}

            {/* Sub heroes grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subHeroList.map((article) => (
                <ArticleCard key={article.id} article={article} isHero={false} />
              ))}
            </div>
          </div>

          {/* Right Column: Trending Sidebar */}
          <div className="lg:col-span-3">
            <TrendingSidebar articles={trendingArticles} />
          </div>
        </div>

        {/* Additional category shelf */}
        <section className="mt-12 pt-8 border-t border-slate-100 dark:border-neutral-900">
          <div className="flex items-center border-l-4 border-red-500 pl-2 mb-6">
            <h2 className="text-base font-extrabold text-slate-800 dark:text-zinc-100 tracking-tight">
              Sains & Lingkungan
            </h2>
          </div>
          {/* Placeholder cards for visual completeness */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 dark:border-neutral-900 p-4 bg-slate-50/50 dark:bg-zinc-900/20">
                <div className="h-32 bg-slate-100 dark:bg-zinc-800 rounded-xl mb-3 animate-pulse" />
                <div className="h-4 bg-slate-200 dark:bg-zinc-850 w-3/4 rounded-md mb-2" />
                <div className="h-3 bg-slate-150 dark:bg-zinc-850 w-1/2 rounded-md" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
