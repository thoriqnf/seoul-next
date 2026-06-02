import Link from "next/link";
import { MOCK_POSTS } from "@/data/posts";
import { Navigation } from "@/components/Navigation";

interface PostDetailPageProps {
  params: Promise<{ category: string; id: string }>;
}

export async function generateMetadata({ params }: PostDetailPageProps) {
  const { category, id } = await params;
  const post = MOCK_POSTS.find(
    (p) => p.category.toLowerCase() === category.toLowerCase() && p.id === id
  );
  return {
    title: post ? post.title : "Article Not Found",
    description: post ? post.body.substring(0, 150) : "Post details",
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  // ==========================================
  // TODO ROUTING 6: Resolve nested parameters (category, id) from params Promise
  // ==========================================
  const { category, id } = await params;

  const post = MOCK_POSTS.find(
    (p) => p.category.toLowerCase() === category.toLowerCase() && p.id === id
  );

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  if (!post) {
    return (
      <>
        <Navigation />
        <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-20 font-sans text-center">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-12">
            <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-100">Article Not Found</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
              Could not find article {id} in category {categoryName}.
            </p>
            <div className="mt-8">
              <Link
                href={`/posts/${category}`}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white rounded-lg transition-colors"
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
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-12 md:py-16 font-sans">
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

        <article className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-6 md:p-8">
          <header className="mb-6 pb-6 border-b border-slate-100 dark:border-neutral-800/80">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 leading-tight">
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
          </div>
        </article>
      </main>
    </>
  );
}
