import Link from "next/link";
import { MOCK_POSTS } from "@/data/posts";
import { Navigation } from "@/components/Navigation";

interface PostDetailPageProps {
  params: Promise<{ category: string; id: string }>;
}

// Generate dynamic metadata
export async function generateMetadata({ params }: PostDetailPageProps) {
  const { category, id } = await params;
  const post = MOCK_POSTS.find(
    (p) => p.category.toLowerCase() === category.toLowerCase() && p.id === id
  );
  return {
    title: post ? `${post.title} - Next.js Router` : "Article Not Found",
    description: post ? post.body.substring(0, 150) : "Post detail routing page",
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  // ==========================================
  // TODO ROUTING 6: Resolve nested parameters (category, id) from params Promise
  // ==========================================
  const { category, id } = await params;

  // Find the exact post by matching both category and ID
  const post = MOCK_POSTS.find(
    (p) => p.category.toLowerCase() === category.toLowerCase() && p.id === id
  );

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  if (!post) {
    return (
      <>
        <Navigation />
        <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-20 font-sans text-center">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-12">
            <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-100">Article Not Found</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
              We couldn&apos;t find an article with ID &quot;{id}&quot; in category &quot;{categoryName}&quot;.
            </p>
            <div className="mt-8">
              <Link
                href={`/posts/${category}`}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white rounded-xl transition-colors"
              >
                Back to {categoryName}
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-12 md:py-20 font-sans">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Link href="/posts" className="hover:text-indigo-600 transition-colors">
            Categories
          </Link>
          <span>/</span>
          <Link href={`/posts/${category}`} className="hover:text-indigo-600 transition-colors">
            {categoryName}
          </Link>
          <span>/</span>
          <span className="text-slate-500 dark:text-zinc-400">Article {id}</span>
        </div>

        {/* Article Content */}
        <article className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8">
          <header className="mb-6 pb-6 border-b border-slate-100 dark:border-neutral-800/80">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1.5 rounded-md">
                Category: {categoryName}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1.5 rounded-md">
                ID: {id}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50 leading-tight">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-xs text-slate-400 dark:text-zinc-500">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
          </header>

          <p className="text-slate-600 dark:text-zinc-300 text-base leading-relaxed whitespace-pre-line">
            {post.body}
          </p>

          <div className="mt-10 pt-6 border-t border-slate-100 dark:border-neutral-800/80 flex justify-between items-center">
            <Link
              href={`/posts/${category}`}
              className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
            >
              ← More in {categoryName}
            </Link>
            <span className="text-xs text-slate-400">
              Route: /posts/[category]/[id]
            </span>
          </div>
        </article>
      </main>
    </>
  );
}
