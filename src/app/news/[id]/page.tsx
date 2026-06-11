import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { CommentsSection } from "@/components/CommentsSection";
import { ReadHistoryTracker } from "@/components/ReadHistoryTracker";
import { NewsArticle } from "@/types";

// Static premium Unsplash images list representing different news topics
const NEWS_IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80",
];

// ==========================================
// TODO RECAP RENDER 3: Define generateStaticParams to pre-build articles 1, 2, and 3 during compile time
// ==========================================
export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ];
}

// Keep dynamic parameters active to allow SSR dynamic rendering on-demand for other IDs
export const dynamicParams = true;

async function getArticle(id: string): Promise<NewsArticle> {
  const response = await fetch(`https://dummyjson.com/posts/${id}`, {
    next: { revalidate: 60 } // cache article for 60 seconds
  });
  if (!response.ok) {
    throw new Error("Article not found");
  }
  const post = await response.json();

  const authors = [
    { name: "kumparinNEWS", verified: true },
    { name: "kumparinBISNIS", verified: true },
    { name: "kumparinTECH", verified: true },
    { name: "kumparinBOLA", verified: true },
    { name: "kumparinHIBURAN", verified: true },
  ];
  const authorMeta = authors[(post.userId || 0) % authors.length];
  const minutes = (post.id * 7) % 60;
  const hours = (post.id * 3) % 24;
  const timeAgoStr = hours === 0 ? `${minutes} minutes ago` : `${hours} hours ago`;

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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  let article: NewsArticle;

  try {
    article = await getArticle(id);
  } catch (err) {
    return notFound();
  }

  const imageIndex = Math.abs(parseInt(article.id) || 0) % NEWS_IMAGES.length;
  const imageUrl = NEWS_IMAGES[imageIndex];

  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-3xl px-4 py-8">
        {/* Back navigation */}
        <Link
          href="/"
          className="text-xs font-bold text-slate-400 hover:text-[#00828A] transition-colors mb-6 inline-flex items-center gap-1"
        >
          ← Home
        </Link>

        {/* Article Header */}
        <header className="mb-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold text-[#00828A] dark:text-teal-400 bg-teal-50 dark:bg-teal-950/20 px-2 py-0.5 rounded border border-teal-100/50 dark:border-teal-900/40 uppercase tracking-wider"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-zinc-50 leading-snug tracking-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-2 mt-4 pb-4 border-b border-slate-100 dark:border-neutral-900">
            {/* Mock Profile Image */}
            <div className="w-8 h-8 rounded-full bg-teal-500/10 dark:bg-teal-500/20 flex items-center justify-center font-bold text-[#00828A] dark:text-teal-400 text-xs border border-teal-200/50 dark:border-teal-800/40">
              {article.author.slice(-1).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-xs font-extrabold text-slate-800 dark:text-zinc-200">
                  {article.author}
                </span>
                {article.verified && (
                  <span className="inline-flex items-center justify-center bg-teal-500 text-white rounded-full w-3 h-3 text-[7px] font-bold">
                    ✓
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-400 dark:text-zinc-500">
                {article.timeAgo} • Read {article.views * 3} times
              </span>
            </div>
          </div>
        </header>

        {/* SSG indicator badge */}
        <div className="mb-6 text-[10px] bg-slate-50 dark:bg-zinc-900/40 border border-slate-200/50 dark:border-neutral-800/80 rounded-lg p-2.5 text-slate-500 dark:text-zinc-400 font-semibold flex items-center justify-between">
          <span>
            Rendering Strategy:{" "}
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">
              {Number(article.id) <= 3 ? "SSG (Statically Pre-rendered)" : "SSR (Dynamic Server-Side Rendered)"}
            </span>
          </span>
          <span className="font-mono text-[9px] bg-slate-200/60 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
            ID: {article.id}
          </span>
        </div>

        {/* ========================================== */}
        {/* TODO RECAP 5: SSR Pitfall & Client API Guard */}
        {/* Safely run browser-only window/localStorage APIs in nested Client Component */}
        {/* ========================================== */}
        <div className="mb-6">
          <ReadHistoryTracker postId={article.id} />
        </div>

        {/* Feature Image */}
        <div className="w-full h-64 md:h-[360px] rounded-2xl overflow-hidden mb-6 bg-slate-100 dark:bg-zinc-800">
          <img src={imageUrl} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body */}
        <article className="prose dark:prose-invert max-w-none">
          <p className="text-slate-700 dark:text-zinc-300 text-sm md:text-base leading-relaxed mb-6 first-letter:text-3xl first-letter:font-extrabold first-letter:text-[#00828A] first-letter:mr-2 first-letter:float-left">
            {article.body}
          </p>
          <p className="text-slate-600 dark:text-zinc-400 text-xs md:text-sm leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum, leo a elementum eleifend, magna diam gravida sapien, et eleifend tellus nibh nec dui. Cras varius sollicitudin elementum. Sed pretium imperdiet hendrerit. Etiam id urna at lectus luctus hendrerit.
          </p>
        </article>

        {/* ========================================== */}
        {/* TODO RECAP RENDER 4: Wrap CommentsSection inside a Suspense boundary with a skeleton fallback to enable HTML streaming */}
        {/* ========================================== */}
        <Suspense
          fallback={
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-neutral-800 animate-pulse">
              <div className="h-5 bg-slate-200 dark:bg-zinc-800 w-1/4 rounded mb-4" />
              <div className="space-y-3">
                <div className="h-16 bg-slate-100 dark:bg-zinc-900 rounded-xl" />
                <div className="h-16 bg-slate-100 dark:bg-zinc-900 rounded-xl" />
              </div>
            </div>
          }
        >
          <CommentsSection postId={article.id} />
        </Suspense>
      </main>
    </>
  );
}
