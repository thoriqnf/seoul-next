"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { mutate } from "swr";
import { Navigation } from "@/components/Navigation";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Connect form submission to the local auth proxy
      const response = await axios.post("/api/auth/login", {
        username: username.trim(),
        password,
      });

      // Mutate the global SWR cache key to fetch fresh session details immediately
      await mutate("/api/auth/me", response.data, true);

      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.error || 
        "Authentication failed. Try emilys / emilyspass or michaelw / michaelwspass"
      );
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-16 flex flex-col justify-center font-sans">
        <div className="bg-white dark:bg-zinc-950/40 border border-slate-200/65 dark:border-neutral-800/85 rounded-2xl p-8 shadow-sm">
          <header className="mb-6 text-center">
            {/* Brand Logo */}
            <span className="text-xl md:text-2xl font-black text-indigo-600 dark:text-indigo-455 tracking-tighter block mb-2">
              toyStore<span className="text-amber-400 font-black">.</span>
            </span>
            <h1 className="text-lg font-extrabold text-slate-800 dark:text-zinc-100">
              Staff Sign In
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Authenticate via proxy to access the Inventory Dashboard.
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
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. emilys"
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
              className="btn-primary w-full mt-2 shrink-0 cursor-pointer bg-indigo-650 hover:bg-indigo-705 text-white h-10 rounded-full font-bold transition-all text-xs"
            >
              {loading ? "Signing in..." : "Login to Console"}
            </button>
          </form>

          <footer className="mt-6 border-t border-slate-100 dark:border-neutral-900 pt-4 text-center">
            <div className="text-[10px] text-slate-400 leading-normal">
              <p className="font-bold mb-1">Store Staff Credentials:</p>
              <ul className="space-y-1">
                <li>
                  <span className="font-semibold text-slate-650 dark:text-zinc-300">emilys</span> / <span className="font-semibold text-slate-650 dark:text-zinc-300">emilyspass</span> (Store Owner)
                </li>
                <li>
                  <span className="font-semibold text-slate-650 dark:text-zinc-300">michaelw</span> / <span className="font-semibold text-slate-650 dark:text-zinc-300">michaelwspass</span> (Store Assistant)
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
