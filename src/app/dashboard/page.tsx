"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Flower, FlowerFormInput, FlowerCategory } from "@/types";
import { Navigation } from "@/components/Navigation";
import { FlowerItem } from "@/components/FlowerItem";

const API_URL = "https://64ca45bd700d50e3c7049e2f.mockapi.io/flowers";
const CATEGORIES: Exclude<FlowerCategory, "all">[] = ["Roses", "Lilies", "Tulips", "Sunflowers"];

export default function DashboardPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // CRUD States
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // ==========================================
  // TODO RECAP 9: Protect route inside client-side useEffect mount check
  // ==========================================
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const email = localStorage.getItem("userEmail");

    if (isLoggedIn !== "true") {
      router.push("/login");
    } else {
      setUserEmail(email);
      setIsChecking(false);
    }
  }, [router]);

  // ==========================================
  // Fetch flowers for the dashboard listings
  // ==========================================
  useEffect(() => {
    if (isChecking) return;

    const abortController = new AbortController();
    const fetchFlowers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<Flower[]>(API_URL, {
          signal: abortController.signal,
        });
        setFlowers(response.data);
      } catch (err: any) {
        if (err.name !== "CanceledError" && err.message !== "canceled") {
          setError(err.message || "Failed to load flowers.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFlowers();

    return () => {
      abortController.abort();
    };
  }, [isChecking]);

  // ==========================================
  // TODO RECAP 10: Initialize useForm with types and defaults
  // ==========================================
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FlowerFormInput>({
    defaultValues: {
      name: "",
      price: 0,
      category: "Roses",
      description: "",
      image: "",
    },
  });

  // ==========================================
  // Form submission handler: handles both POST (Create) and PUT (Edit)
  // TODO RECAP 12: Implement Axios POST submit logic
  // TODO RECAP 13: Implement Axios PUT submit & Edit Mode populate/cancel logic
  // ==========================================
  const onSubmit = async (data: FlowerFormInput) => {
    try {
      setActionLoading(true);
      // Enforce numeric conversion for float pricing
      const payload = {
        ...data,
        price: Number(data.price),
      };

      if (editingId) {
        // PUT (Update) operation
        const response = await axios.put<Flower>(`${API_URL}/${editingId}`, payload);
        setFlowers((prev) =>
          prev.map((flower) => (flower.id === editingId ? response.data : flower))
        );
        setEditingId(null);
      } else {
        // POST (Create) operation
        const response = await axios.post<Flower>(API_URL, payload);
        setFlowers((prev) => [response.data, ...prev]);
      }
      reset();
    } catch (err: any) {
      alert(err.message || "Failed to save flower arrangement.");
    } finally {
      setActionLoading(false);
    }
  };

  // Populate form with item details to trigger Edit Mode
  const startEdit = (flower: Flower) => {
    setEditingId(flower.id);
    setValue("name", flower.name);
    setValue("price", flower.price);
    setValue("category", flower.category);
    setValue("description", flower.description);
    setValue("image", flower.image);
  };

  // Cancel edit mode and reset form inputs
  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  // ==========================================
  // TODO RECAP 14: Implement Axios DELETE logic with browser confirm alert
  // ==========================================
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this flower product?")) return;

    try {
      setActionLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      setFlowers((prev) => prev.filter((flower) => flower.id !== id));
      
      // If currently editing the deleted flower, exit edit mode
      if (editingId === id) {
        cancelEdit();
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete flower arrangement.");
    } finally {
      setActionLoading(false);
    }
  };

  if (isChecking) {
    return (
      <>
        <Navigation />
        <main className="shop-container text-center py-24">
          <p className="text-sm text-slate-500 dark:text-zinc-400 animate-pulse font-semibold">
            Checking credentials session...
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="shop-container">
        {/* Header Dashboard Info */}
        <header className="mb-10 border-b border-slate-200 dark:border-neutral-800 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
            Admin Panel
          </h1>
          <p className="mt-2 text-slate-500 dark:text-zinc-400 text-sm">
            Authenticated as: <span className="font-bold text-slate-800 dark:text-zinc-200">{userEmail}</span>
          </p>
        </header>

        {/* Form and Table Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Left Side: Create / Update Form Card */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs lg:col-span-1">
            <h2 className="text-lg font-extrabold text-slate-800 dark:text-zinc-100 mb-5">
              {editingId ? "Edit Flower Details" : "Add Flower Arrangement"}
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {/* Product Name Input */}
              <div>
                <label className="input-label">Flower Name</label>
                {/* ========================================== */}
                {/* TODO RECAP 11: Register form fields with constraints and output errors */}
                {/* ========================================== */}
                <input
                  type="text"
                  placeholder="e.g. Red Rose Bouquet"
                  {...register("name", {
                    required: "Flower name is required",
                    minLength: { value: 3, message: "Name must be at least 3 characters" },
                  })}
                  className="input-field"
                />
                {errors.name && (
                  <p className="input-error">⚠ {errors.name.message}</p>
                )}
              </div>

              {/* Product Category dropdown */}
              <div>
                <label className="input-label">Category</label>
                <select
                  {...register("category", { required: "Category is required" })}
                  className="input-field"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="input-error">⚠ {errors.category.message}</p>
                )}
              </div>

              {/* Product Price Input */}
              <div>
                <label className="input-label">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="29.99"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be at least $1.00" },
                  })}
                  className="input-field"
                />
                {errors.price && (
                  <p className="input-error">⚠ {errors.price.message}</p>
                )}
              </div>

              {/* Product Image URL input */}
              <div>
                <label className="input-label">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  {...register("image", { required: "Image URL is required" })}
                  className="input-field"
                />
                {errors.image && (
                  <p className="input-error">⚠ {errors.image.message}</p>
                )}
              </div>

              {/* Product Description Textarea */}
              <div>
                <label className="input-label">Description</label>
                <textarea
                  placeholder="Provide floral arrangement descriptions..."
                  {...register("description", {
                    required: "Description is required",
                    minLength: { value: 10, message: "Description must be at least 10 characters" },
                  })}
                  className="textarea-field"
                />
                {errors.description && (
                  <p className="input-error">⚠ {errors.description.message}</p>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col gap-2 mt-2">
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="btn-primary"
                >
                  {actionLoading ? "Saving..." : editingId ? "Update Product" : "Create Product"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    disabled={actionLoading}
                    className="btn-secondary"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Side: Listings CRUD Table */}
          <div className="lg:col-span-2 flex flex-col gap-6 w-full">
            <h2 className="text-lg font-extrabold text-slate-800 dark:text-zinc-100">
              Arrangement Inventory
            </h2>

            {/* Error Feedback Component */}
            {error && (
              <div className="flex flex-col items-center justify-center p-10 text-center text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl">
                <span className="text-2xl mb-1">⚠</span>
                <h3 className="font-bold text-slate-800 dark:text-zinc-200 text-sm">Failed to Load Listings</h3>
                <p className="text-xs mt-1 text-slate-500 dark:text-zinc-400">{error}</p>
              </div>
            )}

            {/* Loading Spinner table row */}
            {loading && !error && (
              <div className="admin-table-container animate-pulse">
                <div className="h-48 bg-white dark:bg-zinc-900" />
              </div>
            )}

            {/* Empty inventory listing message */}
            {!loading && !error && flowers.length === 0 && (
              <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl">
                <span className="text-3xl mb-2">🌸</span>
                <h3 className="font-bold text-slate-850 dark:text-zinc-200 text-sm">Inventory is Empty</h3>
                <p className="text-xs mt-1 text-slate-400 dark:text-zinc-550">
                  Use the entry form to add your first flower arrangement.
                </p>
              </div>
            )}

            {/* Inventory CRUD Table Grid */}
            {!loading && !error && flowers.length > 0 && (
              <div className="admin-table-container shadow-xs">
                <table className="admin-table">
                  <thead className="admin-thead">
                    <tr>
                      <th className="admin-th">Flower Details</th>
                      <th className="admin-th">Category</th>
                      <th className="admin-th">Price</th>
                      <th className="admin-th text-right px-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flowers.map((flower) => (
                      <FlowerItem
                        key={flower.id}
                        flower={flower}
                        onEdit={startEdit}
                        onDelete={handleDelete}
                        disabled={actionLoading}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
