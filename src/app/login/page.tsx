"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/Navigation";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Mock authentication check with 600ms latency
    setTimeout(() => {
      if (email.trim() === "admin@example.com" && password === "password123") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email.trim());
        // Sync header state across windows/components
        window.dispatchEvent(new Event("storage"));
        router.push("/dashboard");
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
        <div className="bg-white dark:bg-zinc-950/40 border border-slate-200/65 dark:border-neutral-800/85 rounded-2xl p-8 shadow-sm">
          <header className="mb-6 text-center">
            {/* Kumparin Logo Style */}
            <span className="text-xl md:text-2xl font-extrabold text-[#00828A] tracking-tighter block mb-2">
              kumparin<span className="text-teal-400">.</span>
            </span>
            <h1 className="text-lg font-extrabold text-slate-800 dark:text-zinc-100">
              Sign In to Admin Panel
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Authenticate to manage news broadcasts and configurations.
            </p>
          </header>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200/50 text-[11px] font-semibold text-red-600 dark:text-red-400 rounded-xl">
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input-field"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-2 shrink-0 cursor-pointer"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <footer className="mt-6 border-t border-slate-100 dark:border-neutral-900 pt-4 text-center">
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
