"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Flower, FlowerFormInput } from "@/types";
import { Navigation } from "@/components/Navigation";
import { FlowerItem } from "@/components/FlowerItem";

const API_URL = "https://64ca45bd700d50e3c7049e2f.mockapi.io/flowers";

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
  // TODO RECAP 6: Protect route inside client-side useEffect mount check
  // ==========================================
  useEffect(() => {
    // Verify session credentials from localStorage. If not authenticated, redirect to /login
    setIsChecking(false);
  }, [router]);

  // ==========================================
  // Fetch flowers for the dashboard listings
  // ==========================================
  useEffect(() => {
    if (isChecking) return;

    const fetchFlowers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<Flower[]>(API_URL);
        setFlowers(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to load flowers.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlowers();
  }, [isChecking]);

  // ==========================================
  // TODO RECAP 7: Initialize useForm with types and defaults
  // ==========================================
  // Replace this mock hook with real useForm<FlowerFormInput> initialization:
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  }: any = {
    register: () => ({}),
    handleSubmit: (fn: any) => (e: any) => { e?.preventDefault(); fn({}); },
    setValue: () => {},
    reset: () => {},
    formState: { errors: {} },
  };

  // ==========================================
  // Form submission handler: handles both POST (Create) and PUT (Edit)
  // TODO RECAP 9: Implement Axios POST submit logic
  // TODO RECAP 10: Implement Axios PUT submit & Edit Mode populate/cancel logic
  // ==========================================
  const onSubmit = async (data: FlowerFormInput) => {
    // Implement POST (create) and PUT (update) Axios operations based on editingId.
    // Sync local flowers array state, reset form, and manage action loading.
  };

  // Populate form with item details to trigger Edit Mode
  const startEdit = (flower: Flower) => {
    // TODO RECAP 10: Set editingId state and populate form fields using setValue helper
  };

  // Cancel edit mode and reset form inputs
  const cancelEdit = () => {
    // TODO RECAP 10: Exit editing mode and reset input values
  };

  // ==========================================
  // TODO RECAP 11: Implement Axios DELETE logic with browser confirm alert
  // ==========================================
  const handleDelete = async (id: string) => {
    // Ask for user confirmation, trigger DELETE request, update state list, and exit edit mode if active on target ID
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
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
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
              {/* Flower Name Input */}
              <div>
                <label className="input-label">Flower Name</label>
                {/* ========================================== */}
                {/* TODO RECAP 8: Register form fields with constraints and output errors */}
                {/* ========================================== */}
                <input
                  type="text"
                  placeholder="e.g. Red Rose Bouquet"
                  // TODO RECAP 8: Register the "name" field with required and minLength: 3 constraints
                  className="input-field"
                />
                {errors.name && (
                  <p className="input-error">⚠ {errors.name.message}</p>
                )}
              </div>

              {/* Flower Price Input */}
              <div>
                <label className="input-label">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="29.99"
                  // TODO RECAP 8: Register the "price" field with required and min: 1 constraints
                  className="input-field"
                />
                {errors.price && (
                  <p className="input-error">⚠ {errors.price.message}</p>
                )}
              </div>

              {/* Flower Image URL input */}
              <div>
                <label className="input-label">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  // TODO RECAP 8: Register the "image" field with required constraint
                  className="input-field"
                />
                {errors.image && (
                  <p className="input-error">⚠ {errors.image.message}</p>
                )}
              </div>

              {/* Flower Description Textarea */}
              <div>
                <label className="input-label">Description</label>
                <textarea
                  placeholder="Provide floral arrangement descriptions..."
                  // TODO RECAP 8: Register the "description" field with required and minLength: 10 constraints
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
                  {actionLoading ? "Saving..." : editingId ? "Update Flower" : "Create Flower"}
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
                <p className="text-xs mt-1 text-slate-400 dark:text-zinc-500">
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
