import Link from "next/link";
import { ArticleCardProps } from "@/types";

// Static premium Unsplash images list representing different news topics
const NEWS_IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=70", // City/IKN
  "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=70", // Bisnis/Logistik
  "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&auto=format&fit=crop&q=70", // Politics/Sragen
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=70", // Sports/Bola
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=70", // Tekno/Sains
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=70", // Travel/Food
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=70", // Green/Environment
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=70", // Entertainment/Event
];

export function ArticleCard({ article, isHero = false }: ArticleCardProps) {
  // Select image based on article id hash
  const imageIndex = Math.abs(parseInt(article.id) || 0) % NEWS_IMAGES.length;
  const imageUrl = article.image || NEWS_IMAGES[imageIndex];

  if (isHero) {
    return (
      <Link href={`/news/${article.id}`} className="group relative block w-full h-[420px] rounded-2xl overflow-hidden cursor-pointer shadow-sm transition-all duration-300 hover:scale-[1.005] border border-slate-200/40 dark:border-neutral-800/40">
        <img
          src={imageUrl}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Bottom overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
          <span className="text-[10px] font-bold tracking-wider text-[#00828A] bg-teal-500/10 px-2 py-0.5 rounded-full w-max border border-teal-500/20 mb-2">
            TOP STORY
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-white leading-snug mb-3 group-hover:text-teal-200 transition-colors">
            {article.title}
          </h2>
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <span className="font-semibold text-teal-300">{article.author}</span>
            {article.verified && (
              <span className="inline-flex items-center justify-center bg-teal-500 text-white rounded-full w-3.5 h-3.5 text-[8px] font-bold">
                ✓
              </span>
            )}
            <span className="text-zinc-400">•</span>
            <span className="text-zinc-400">{article.timeAgo}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Smaller grid card layout (sub-cards)
  return (
    <Link href={`/news/${article.id}`} className="group relative block w-full h-[240px] rounded-2xl overflow-hidden cursor-pointer shadow-sm transition-all duration-300 hover:scale-[1.005] border border-slate-200/40 dark:border-neutral-800/40">
      <img
        src={imageUrl}
        alt={article.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Bottom overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4">
        <h3 className="text-sm md:text-base font-bold text-white leading-snug mb-2 group-hover:text-teal-200 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-300">
          <span className="font-semibold text-teal-300 truncate max-w-[100px]">{article.author}</span>
          {article.verified && (
            <span className="inline-flex items-center justify-center bg-teal-500 text-white rounded-full w-3 h-3 text-[7px] font-bold shrink-0">
              ✓
            </span>
          )}
          <span className="text-zinc-400 shrink-0">•</span>
          <span className="text-zinc-400 shrink-0">{article.timeAgo}</span>
        </div>
      </div>
    </Link>
  );
}
