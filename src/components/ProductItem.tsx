"use client";

import { ProductItemProps } from "@/types";

// ==========================================
// TODO CRUD 7: Implement ProductItem component with typed props (product, onEdit, onDelete, disabled)
// ==========================================
export function ProductItem({ product, onEdit, onDelete, disabled }: ProductItemProps) {
  return (
    <li className="group flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-neutral-800/80 hover:border-slate-200 dark:hover:border-neutral-700 bg-white dark:bg-zinc-900 transition-all duration-150">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">
          {product.product || "Unnamed Product"}
        </span>
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          ${parseFloat(product.price || "0").toFixed(2)}
        </span>
      </div>
      
      <div className="flex items-center gap-1.5">
        {/* Edit Button */}
        <button
          onClick={() => onEdit(product)}
          disabled={disabled}
          className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-zinc-950 disabled:opacity-50 cursor-pointer transition-all duration-150"
          title="Edit Product"
        >
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        
        {/* Delete Button */}
        <button
          onClick={() => onDelete(product.id)}
          disabled={disabled}
          className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-50 dark:hover:bg-zinc-950 disabled:opacity-50 cursor-pointer transition-all duration-150"
          title="Delete Product"
        >
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </li>
  );
}
