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
      description: "App Router, TypeScript, React Server Components, and more.",
      color: "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-400",
      icon: "💻",
    },
    {
      slug: "cooking",
      name: "Cooking",
      description: "Homemade Neapolitan pizzas, quick pastas, and culinary tips.",
      color: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400",
      icon: "🍳",
    },
    {
      slug: "lifestyle",
      name: "Lifestyle",
      description: "Stress management, mindfulness, and the art of slow living.",
      color: "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/60 text-amber-600 dark:text-amber-400",
      icon: "🌿",
    },
  ];

  return (
    <>
      <Navigation />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12 md:py-20 font-sans">
        <header className="mb-10 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 rounded-full">
            Week 2 • Day 2
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
            Dynamic & Nested Routing
          </h1>
          <p className="mt-2 text-slate-500 dark:text-zinc-400 max-w-2xl text-base leading-relaxed">
            Select a category below to explore dynamic routing segments. The folder structure maps directly to URL layouts.
          </p>
        </header>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/posts/${category.slug}`}
              className="group flex flex-col p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl hover:border-slate-300 dark:hover:border-neutral-700 hover:shadow-md transition-all duration-200 text-left"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 border ${category.color}`}>
                {category.icon}
              </div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {category.name}
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {category.description}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                Browse Articles
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
