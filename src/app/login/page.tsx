"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/Navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // TODO ROUTING 4: Initialize useRouter hook for programmatic redirect
  // ==========================================
  const router: ReturnType<typeof useRouter> = {
    push: (url: string) => {
      console.log("Mock redirect to:", url);
    },
  } as ReturnType<typeof useRouter>; // Replace with useRouter() hook

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      if (email.trim() === "admin@example.com" && password === "password123") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email.trim());
        // TODO ROUTING 4: Redirect programmatically to /dashboard
        console.log("Login successful! Redirecting...");
      } else {
        setError("Invalid email or password. Use admin@example.com / password123");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <>
      <Navigation />
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-16 flex flex-col justify-center font-sans">
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-xl p-8">
          <header className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-50">
              Sign In
            </h1>
          </header>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/60 text-xs text-red-600 dark:text-red-400 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2 rounded-lg font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/60 cursor-pointer transition-all duration-200"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <footer className="mt-6 border-t border-slate-100 dark:border-neutral-800/80 pt-4 text-center">
            <p className="text-[10px] text-slate-400">
              Demo Credentials:<br />
              <span className="font-semibold">admin@example.com</span> / <span className="font-semibold">password123</span>
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
