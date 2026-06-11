"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Navigation } from "@/components/Navigation";
import { BreakingNews } from "@/types";

interface FormInput {
  title: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentHeadline, setCurrentHeadline] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // ==========================================
  // TODO RECAP RENDER 8: Protect admin page by verifying user credentials in localStorage, programmatically redirecting unauthorized sessions to login page
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

  // Fetch current breaking news from json-server on load to display in dashboard
  useEffect(() => {
    if (isChecking) return;

    const fetchCurrentHeadline = async () => {
      try {
        const response = await axios.get<BreakingNews>("http://localhost:4000/breaking-news");
        setCurrentHeadline(response.data.title);
      } catch (err) {
        console.warn("Local API server is offline. Using offline default display.");
        setCurrentHeadline("Warning: Local json-server offline.");
      }
    };

    fetchCurrentHeadline();
  }, [isChecking]);

  // ==========================================
  // TODO RECAP 9: Initialize react-hook-form with validation constraints
  // ==========================================
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      title: "",
    },
  });

  // ==========================================
  // TODO RECAP RENDER 10: Implement Axios PUT handler to update the local database with form values to trigger ISR revalidation cycles
  // ==========================================
  const onSubmit = async (data: FormInput) => {
    try {
      setIsSaving(true);
      const payload: BreakingNews = {
        title: data.title,
        timestamp: new Date().toLocaleTimeString(),
      };

      const response = await axios.put<BreakingNews>(
        "http://localhost:4000/breaking-news",
        payload
      );

      setCurrentHeadline(response.data.title);
      setValue("title", "");
      alert("Breaking News headline successfully updated! You can now test the 10-second revalidation at /news/breaking.");
    } catch (err: any) {
      alert("Failed to update Breaking News. Ensure that 'npm run api' (json-server) is running on port 4000.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isChecking) {
    return (
      <>
        <Navigation />
        <main className="mx-auto max-w-xl px-4 py-24 text-center">
          <p className="text-xs text-slate-400 dark:text-zinc-500 animate-pulse font-semibold">
            Verifying administrator session...
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-3xl px-4 py-8">
        {/* Dashboard Header */}
        <header className="mb-8 border-b border-slate-100 dark:border-neutral-900 pb-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
              Admin Panel
            </h1>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-zinc-400">
              Authenticated as: <span className="font-extrabold text-[#00828A] dark:text-teal-400">{userEmail}</span>
            </p>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Form Card (Left/60%) */}
          <div className="md:col-span-3 bg-white dark:bg-zinc-950/40 border border-slate-200/60 dark:border-neutral-800/80 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-1.5 h-4 bg-[#00828A] rounded"></span>
              <h2 className="text-sm font-extrabold text-slate-800 dark:text-zinc-200">
                Update Breaking News Headline
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Headline Text Input */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5">
                  New Headline Title
                </label>
                {/* ========================================== */}
                {/* TODO RECAP RENDER 9: Bind input field state and register validation limits (required and minimum string length of 10) via react-hook-form */}
                {/* ========================================== */}
                <input
                  type="text"
                  placeholder="e.g. Presidential Summit officially opens in Jakarta"
                  {...register("title", {
                    required: "News headline is required",
                    minLength: {
                      value: 10,
                      message: "Headline must be at least 10 characters",
                    },
                  })}
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-neutral-800 text-xs bg-slate-50 dark:bg-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#00828A]"
                />
                {errors.title && (
                  <p className="text-[10px] text-red-500 font-semibold mt-1">
                    ⚠ {errors.title.message}
                  </p>
                )}
              </div>

              {/* Submit Buttons */}
              <button
                type="submit"
                disabled={isSaving}
                className="w-full h-10 rounded-full bg-[#00828A] hover:bg-[#006e75] text-white text-xs font-bold transition-colors shadow-sm disabled:bg-slate-300 dark:disabled:bg-zinc-800 shrink-0 cursor-pointer"
              >
                {isSaving ? "Saving changes..." : "Update News Headline"}
              </button>
            </form>
          </div>

          {/* Current Live Headline Card (Right/40%) */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-slate-50 dark:bg-zinc-900/30 border border-slate-200/40 dark:border-neutral-800/60 rounded-2xl p-5">
              <h3 className="text-[10px] font-extrabold text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
                CURRENT HEADLINE
              </h3>
              <div className="p-3 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-neutral-800/80 rounded-xl text-xs text-slate-800 dark:text-zinc-200 font-bold leading-snug">
                {currentHeadline || "Loading headline..."}
              </div>
              <p className="text-[9px] text-slate-400 dark:text-zinc-500 mt-3 leading-relaxed">
                The text above is fetched directly from the local json-server database (port 4000). Updating it modifies the local file database.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
