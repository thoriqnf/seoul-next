import Link from "next/link";
import { FlowerCardProps } from "@/types";

export function FlowerCard({ flower }: FlowerCardProps) {
  // Use lowercase helper for dynamic utility styles
  const categorySlug = flower.category ? flower.category.toLowerCase() : "default";
  const badgeClass = `shop-badge badge-${categorySlug}`;

  return (
    <div className="shop-card">
      <div className="relative h-48 w-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
        {flower.image ? (
          <img
            src={flower.image}
            alt={flower.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl">
            🌸
          </div>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className={badgeClass}>{flower.category || "General"}</span>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              ${Number(flower.price).toFixed(2)}
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-zinc-100 line-clamp-1 mb-1">
            {flower.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
            {flower.description || "No description available."}
          </p>
        </div>
        <Link
          href={`/flowers/${flower.category || "General"}/${flower.id}`}
          className="btn-primary py-2 text-xs"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
