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

    // ==========================================
    // TODO PROXY AUTH 5: Connect form submission to local auth proxy /api/auth/login using Axios
    // and mutate the global '/api/auth/me' SWR cache key to update user state instantly.
    // ==========================================
    /* UNCOMMENT FOR FINISHED IMPLEMENTATION
    try {
      const response = await axios.post("/api/auth/login", {
        username: username.trim(),
        password,
      });

      await mutate("/api/auth/me", response.data, true);

      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.error || 
        "Authentication failed. Try emilys / emilyspass or michaelw / michaelwspass"
      );
      setLoading(false);
    }
    */

    // STARTER FALLBACK: Execute the request directly so it works out of the box
    try {
      const response = await axios.post("/api/auth/login", {
        username: username.trim(),
        password,
      });
      await mutate("/api/auth/me", response.data, true);
      router.push("/dashboard");
    } catch (err: any) {
      setError("Authentication failed. Use: emilys / emilyspass");
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-sky-50/40 flex flex-col justify-center font-sans pb-24">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-white border border-sky-100 rounded-2xl p-8 shadow-sm">
            <header className="mb-6 text-center">
              {/* Brand Logo */}
              <span className="text-xl md:text-2xl font-black text-indigo-900 tracking-tighter block mb-2">
                toyStory<span className="text-amber-400 font-black">⭐</span>
              </span>
              <h1 className="text-lg font-extrabold text-indigo-950">
                Staff Sign In
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Authenticate via proxy to access the Room Console.
              </p>
            </header>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-[11px] font-semibold text-red-600 rounded-xl">
                ⚠ {error}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="input-label text-indigo-900">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. emilys"
                  required
                  className="input-field border-sky-100 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="input-label text-indigo-900">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-field border-sky-100 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full mt-2 shrink-0 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white h-10 rounded-full font-black transition-all text-xs"
              >
                {loading ? "Signing in..." : "Login to Console"}
              </button>
            </form>

            <footer className="mt-6 border-t border-sky-100 pt-4 text-center">
              <div className="text-[10px] text-slate-400 leading-normal">
                <p className="font-bold mb-1 text-slate-500">Playroom Credentials:</p>
                <ul className="space-y-1">
                  <li>
                    <span className="font-semibold text-slate-600">emilys</span> / <span className="font-semibold text-slate-600">emilyspass</span> (Andy - Owner)
                  </li>
                  <li>
                    <span className="font-semibold text-slate-600">michaelw</span> / <span className="font-semibold text-slate-600">michaelwspass</span> (Woody/Buzz - Toy)
                  </li>
                </ul>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}
