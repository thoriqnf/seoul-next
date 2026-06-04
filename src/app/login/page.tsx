"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/Navigation";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // TODO RECAP 6: Initialize useRouter hook for programmatic redirect
  // ==========================================
  const router: any = { push: (url: string) => console.log(`Redirecting to ${url}`) };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Mock authentication check
    setTimeout(() => {
      if (email.trim() === "admin@example.com" && password === "password123") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email.trim());
        // Sync header state across windows/components
        window.dispatchEvent(new Event("storage"));
        // TODO RECAP 6: Use router.push to programmatically redirect to "/dashboard"
      } else {
        setError("Invalid email or password. Hint: admin@example.com / password123");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <>
      <Navigation />
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-16 flex flex-col justify-center font-sans">
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-8 shadow-xs">
          <header className="mb-6 text-center">
            <h1 className="text-2xl font-extrabold text-slate-800 dark:text-zinc-50">
              Sign In
            </h1>
            <p className="text-xs text-slate-500 mt-1.5">
              Access the administrative dashboard panel.
            </p>
          </header>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-xs font-semibold text-red-655 dark:text-red-400 rounded-xl">
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="input-label">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="input-field"
              />
            </div>

            <div className="flex flex-col">
              <label className="input-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input-field"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-2"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <footer className="mt-6 border-t border-slate-100 dark:border-neutral-800/80 pt-4 text-center">
            <p className="text-[10px] text-slate-400 leading-normal">
              Demo Credentials:<br />
              <span className="font-semibold text-slate-550 dark:text-zinc-400">admin@example.com</span> / <span className="font-semibold text-slate-550 dark:text-zinc-400">password123</span>
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
