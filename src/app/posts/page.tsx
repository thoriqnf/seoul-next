import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export const metadata = {
  title: "Blog Categories - Next.js Router",
  description: "Browse posts by category. Explores basic routing and nested layout patterns.",
};

export default function PostsIndexPage() {
  const categories = [
    {
      slug: "tech",
      name: "Technology",
      description: "Articles about Next.js, TypeScript, and modern web development technologies.",
    },
    {
      slug: "cooking",
      name: "Cooking",
      description: "Recipes, kitchen tips, and guides for cooking homemade meals.",
    },
    {
      slug: "lifestyle",
      name: "Lifestyle",
      description: "Thoughts on productivity, mindfulness, and slow living.",
    },
  ];

  return (
    <>
      <Navigation />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12 md:py-16 font-sans">
        <header className="mb-10 text-left">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">
            Categories
          </h1>
          <p className="mt-2 text-slate-500 dark:text-zinc-400 max-w-2xl text-base leading-relaxed">
            Select a category below to view the articles.
          </p>
        </header>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/posts/${category.slug}`}
              className="group flex flex-col p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-xl hover:border-slate-300 dark:hover:border-neutral-700 hover:shadow-sm transition-all duration-200 text-left"
            >
              <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {category.name}
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {category.description}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                View Articles →
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
