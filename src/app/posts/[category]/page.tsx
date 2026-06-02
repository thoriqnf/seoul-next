import Link from "next/link";
import { MOCK_POSTS } from "@/data/posts";
import { Navigation } from "@/components/Navigation";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

// Generate page metadata dynamically based on the category param
export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const title = `${category.charAt(0).toUpperCase() + category.slice(1)} Articles - Next.js Router`;
  return {
    title,
    description: `Explore dynamic routes for category: ${category}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // ==========================================
  // TODO ROUTING 5: Resolve the dynamic category parameter from params Promise
  // ==========================================
  const { category } = await params;

  // Filter posts matching the category
  const categoryPosts = MOCK_POSTS.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );

  // Format title for display
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <>
      <Navigation />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12 md:py-20 font-sans">
        <div className="mb-6 flex">
          <Link
            href="/posts"
            className="text-xs font-semibold text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
          >
            ← Back to Categories
          </Link>
        </div>

        <header className="mb-10 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 rounded-full">
            Dynamic Segment: {category}
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
            Category: {categoryName}
          </h1>
          <p className="mt-2 text-slate-500 dark:text-zinc-400 text-base leading-relaxed">
            The articles below are dynamically loaded because they match the routing parameter <code className="text-sm font-mono text-pink-600 dark:text-pink-400">[category] = &quot;{category}&quot;</code>.
          </p>
        </header>

        {categoryPosts.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-12 text-center">
            <p className="text-slate-500 dark:text-zinc-400">
              No articles found in this category. Try <code className="font-mono text-xs">tech</code>, <code className="font-mono text-xs">cooking</code>, or <code className="font-mono text-xs">lifestyle</code>.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {categoryPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-6 hover:border-slate-300 dark:hover:border-neutral-700 transition-colors"
              >
                <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-100">
                  {post.title}
                </h2>
                <div className="mt-2 flex items-center gap-3 text-xs text-slate-400 dark:text-zinc-500">
                  <span>By {post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <p className="mt-4 text-sm text-slate-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
                  {post.body}
                </p>
                <div className="mt-6 flex">
                  <Link
                    href={`/posts/${category}/${post.id}`}
                    className="px-4 py-2 bg-slate-50 dark:bg-zinc-950 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-neutral-800 hover:border-indigo-200 dark:hover:border-indigo-900 text-xs font-semibold text-slate-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition-all"
                  >
                    Read Full Article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
