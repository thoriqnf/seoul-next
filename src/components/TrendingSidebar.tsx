import Link from "next/link";
import { TrendingSidebarProps } from "@/types";

const NEWS_IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&h=120&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=120&h=120&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=120&h=120&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=120&h=120&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&h=120&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=120&h=120&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=120&h=120&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=120&h=120&auto=format&fit=crop&q=70",
];

export function TrendingSidebar({ articles }: TrendingSidebarProps) {
  return (
    <aside className="w-full">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3 mb-4">
        <div className="flex items-center border-l-4 border-red-500 pl-2">
          <h2 className="text-base font-extrabold text-slate-800 dark:text-zinc-150 tracking-tight">
            Trending
          </h2>
        </div>
        <Link
          href="/news/feed"
          className="text-xs font-semibold text-[#00828A] hover:underline transition-all"
        >
          See more →
        </Link>
      </div>

      {/* Trending Items List */}
      <div className="space-y-4">
        {articles.map((article, idx) => {
          const imageIndex = Math.abs(parseInt(article.id) || 0) % NEWS_IMAGES.length;
          const imageUrl = article.image || NEWS_IMAGES[imageIndex];

          return (
            <Link
              key={article.id}
              href={`/news/${article.id}`}
              className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-neutral-800/60 last:border-0 last:pb-0 group"
            >
              {/* Text content (left) */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs md:text-sm font-bold text-slate-800 dark:text-zinc-200 leading-snug group-hover:text-[#00828A] transition-colors line-clamp-3">
                  {article.title}
                </h4>
                <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-400 dark:text-zinc-500">
                  <span className="font-semibold text-slate-500 dark:text-zinc-400 truncate max-w-[80px]">
                    {article.author}
                  </span>
                  {article.verified && (
                    <span className="inline-flex items-center justify-center bg-teal-500 text-white rounded-full w-2.5 h-2.5 text-[6px] font-bold shrink-0">
                      ✓
                    </span>
                  )}
                  <span className="shrink-0">•</span>
                  <span className="shrink-0">{article.timeAgo}</span>
                </div>
              </div>

              {/* Square image (right) */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-zinc-800 relative">
                <img
                  src={imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
