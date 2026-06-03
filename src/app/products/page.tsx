"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Product, ProductFormInput } from "@/types";
import { Navigation } from "@/components/Navigation";
import { ProductItem } from "@/components/ProductItem";

export default function ProductsPage() {
  // State for products list
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Edit states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  // ==========================================
  // TODO CRUD 4: Initialize react-hook-form with default values
  // ==========================================
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<any>({
    // Configure default values here
  });

  // ==========================================
  // TODO CRUD 3: Fetch products from mock API on mount using Axios
  // ==========================================
  useEffect(() => {
    // Implement fetch logic here
    setLoading(false);
  }, []);

  // ==========================================
  // TODO CRUD 6 & 9: Form Submission handler (Create vs Update)
  // ==========================================
  const onSubmit = async (data: any) => {
    // Implement submission logic (POST for new products, PUT for editing products)
    console.log("Form submitted with data:", data);
  };

  // ==========================================
  // TODO CRUD 8: Implement product DELETE handler using Axios
  // ==========================================
  const handleDelete = async (id: string) => {
    // Implement delete logic here
  };

  // ==========================================
  // TODO CRUD 9 (Edit Mode helpers): Populate form values for editing and Cancel edit handler
  // ==========================================
  const startEdit = (product: Product) => {
    // Set edit mode states and populate form fields
  };

  const cancelEdit = () => {
    // Reset editing state and form fields
  };

  return (
    <>
      <Navigation />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12 md:py-20 font-sans">
        {/* Header Panel */}
        <header className="mb-10 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 rounded-full">
            Week 2 • Day 3
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
            Products Dashboard
          </h1>
          <p className="mt-2 text-slate-500 dark:text-zinc-400 max-w-2xl text-base leading-relaxed">
            Manage your store items using a live Mock API. Learn standard HTTP verbs: GET to read, POST to create, PUT to update, and DELETE to remove.
          </p>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Side: Create/Edit Form */}
          <div className="flex flex-col gap-6 md:col-span-1">
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-6 transition-all duration-300">
              <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-100 mb-4">
                {editingId ? "Edit Product" : "Add New Product"}
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Product Name Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                    Product Name
                  </label>
                  {/* ========================================== */}
                  {/* TODO CRUD 5: Register product field with validation */}
                  {/* ========================================== */}
                  <input
                    type="text"
                    placeholder="e.g. Mechanical Keyboard"
                    {...register("product")}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                  {/* Render error feedback here */}
                </div>

                {/* Product Price Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                    Price (USD)
                  </label>
                  {/* ========================================== */}
                  {/* TODO CRUD 5: Register price field with validation */}
                  {/* ========================================== */}
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 99.99"
                    {...register("price")}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                  {/* Render error feedback here */}
                </div>

                {/* Submit & Cancel Buttons */}
                <div className="flex flex-col gap-2 mt-2">
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="w-full py-2.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-zinc-800 disabled:text-slate-400 dark:disabled:text-zinc-600 hover:shadow-indigo-500/10 cursor-pointer disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {actionLoading
                      ? "Saving..."
                      : editingId
                      ? "Update Product"
                      : "Add Product"}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      disabled={actionLoading}
                      className="w-full py-2.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-zinc-950 cursor-pointer disabled:cursor-not-allowed transition-all"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right Side: Products List */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-6 min-h-[350px] flex flex-col">
              <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-100 mb-6">
                All Products ({products.length})
              </h2>

              {/* Error View */}
              {error && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-red-500">
                  <svg className="w-12 h-12 mb-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h3 className="font-bold text-slate-800 dark:text-zinc-200">Failed to Load Products</h3>
                  <p className="text-sm mt-1 text-slate-500 dark:text-zinc-400">{error}</p>
                </div>
              )}

              {/* Loading Skeleton */}
              {loading && (
                <div className="flex-1 flex flex-col gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 animate-pulse p-4 border border-slate-100 dark:border-neutral-800/80 rounded-xl">
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="w-1/3 h-5 bg-slate-200 dark:bg-zinc-800 rounded-md" />
                        <div className="w-1/4 h-4 bg-slate-100 dark:bg-zinc-800/65 rounded-md" />
                      </div>
                      <div className="w-8 h-8 bg-slate-100 dark:bg-zinc-800 rounded-md" />
                      <div className="w-8 h-8 bg-slate-100 dark:bg-zinc-800 rounded-md" />
                    </div>
                  ))}
                </div>
              )}

              {/* Empty View */}
              {!loading && !error && products.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <svg className="w-14 h-14 mb-3 text-slate-300 dark:text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <h3 className="font-bold text-slate-800 dark:text-zinc-200">No Products Available</h3>
                  <p className="text-sm mt-1 text-slate-400 dark:text-zinc-500">
                    Add some products using the form on the left.
                  </p>
                </div>
              )}

              {/* Products List */}
              {!loading && !error && products.length > 0 && (
                <ul className="flex flex-col gap-3">
                  {products.map((prod) => (
                    // TODO CRUD 7: Render <ProductItem /> component and pass props
                    null
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
