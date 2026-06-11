"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Navigation } from "@/components/Navigation";
import { NewsArticle } from "@/types";

// Static Unsplash images representing news topics
const NEWS_IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=400&h=300&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=300&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&auto=format&fit=crop&q=70",
];

// Helper mapper to associate raw posts with Kumparan author details
function mapPostToArticle(post: any): NewsArticle {
  const authors = [
    { name: "kumparanNEWS", verified: true },
    { name: "kumparanBISNIS", verified: true },
    { name: "kumparanTECH", verified: true },
    { name: "kumparanBOLA", verified: true },
    { name: "kumparanHIBURAN", verified: true },
  ];
  const authorMeta = authors[(post.userId || 0) % authors.length];
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function FeedContent() {
  const searchParams = useSearchParams();
  const searchVal = searchParams.get("search") || "";

  // Dynamic API endpoint choice based on search queries
  const apiUrl = searchVal
    ? `https://dummyjson.com/posts/search?q=${encodeURIComponent(searchVal)}`
    : `https://dummyjson.com/posts?limit=12&skip=8`;

  // ==========================================
  // TODO RECAP 7: Setup useSWR fetch hook
  // Fetch real-time cached news records from API and manage load state
  // ==========================================
  const { data, error, isLoading } = useSWR(apiUrl, fetcher, {
    revalidateOnFocus: true, // revalidate cache when browser gains focus
    refreshInterval: 15000,  // refresh cache in background every 15 seconds
  });

  const rawPosts = data?.posts || [];
  const articles: NewsArticle[] = rawPosts.map(mapPostToArticle);

  return (
    <div className="space-y-6">
      {/* Title block */}
      <header>
        <div className="flex items-center border-l-4 border-red-500 pl-2">
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
            {searchVal ? `Search Results: "${searchVal}"` : "SWR Real-time Feed"}
          </h1>
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
          Client-side data fetching using SWR. SWR serves cached content instantly, then refetches in the background for updates.
        </p>
      </header>

      {/* SWR Load Indicators */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse border border-slate-100 dark:border-neutral-900 rounded-2xl p-4 bg-white dark:bg-zinc-950/40">
              <div className="h-36 w-full bg-slate-100 dark:bg-zinc-800 rounded-xl mb-3" />
              <div className="h-4 w-3/4 bg-slate-200 dark:bg-zinc-800 rounded-md mb-2" />
              <div className="h-3 w-1/2 bg-slate-150 dark:bg-zinc-800 rounded-md" />
            </div>
          ))}
        </div>
      )}

      {/* SWR Error Feedback */}
      {error && (
        <div className="p-8 text-center text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200/50 rounded-2xl">
          <span className="text-2xl">⚠</span>
          <h4 className="font-bold text-sm mt-2">Failed to Load News Feed</h4>
          <p className="text-xs text-slate-400 mt-1">{error.message || "Unknown fetching error"}</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && articles.length === 0 && (
        <div className="p-16 text-center border border-slate-200/60 dark:border-neutral-800/80 rounded-2xl bg-white dark:bg-zinc-950/40">
          <span className="text-3xl">📰</span>
          <h4 className="font-bold text-sm text-slate-800 dark:text-zinc-200 mt-3">No News Found</h4>
          <p className="text-xs text-slate-400 mt-1">Try adjusting your search query keyword.</p>
          <Link href="/news/feed" className="mt-4 inline-block text-xs font-bold text-[#00828A] hover:underline">
            Back to All Feeds
          </Link>
        </div>
      )}

      {/* Articles Feed list */}
      {!isLoading && !error && articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => {
            const imgIndex = Math.abs(parseInt(article.id) || 0) % NEWS_IMAGES.length;
            const imageUrl = NEWS_IMAGES[imgIndex];

            return (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="group flex flex-col justify-between border border-slate-100 dark:border-neutral-900 rounded-2xl bg-white dark:bg-zinc-950/30 overflow-hidden shadow-sm hover:shadow transition-all duration-300 hover:scale-[1.005]"
              >
                <div>
                  <div className="h-40 w-full overflow-hidden bg-slate-100 dark:bg-zinc-800 relative">
                    <img
                      src={imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-xs font-extrabold text-slate-800 dark:text-zinc-200 leading-snug line-clamp-2 group-hover:text-[#00828A] transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-2 line-clamp-2">
                      {article.body}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-slate-50 dark:border-neutral-900 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5 font-bold text-slate-500 dark:text-zinc-400">
                    <span>{article.author}</span>
                    {article.verified && (
                      <span className="inline-flex items-center justify-center bg-teal-500 text-white rounded-full w-2.5 h-2.5 text-[6px] font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                  <span>{article.timeAgo}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function SWRFeedPage() {
  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Suspense
          fallback={
            <div className="animate-pulse space-y-6">
              <div className="h-6 bg-slate-200 dark:bg-zinc-800 w-1/4 rounded mb-2" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-48 bg-slate-100 dark:bg-zinc-900 rounded-2xl" />
                ))}
              </div>
            </div>
          }
        >
          <FeedContent />
        </Suspense>
      </main>
    </>
  );
}
