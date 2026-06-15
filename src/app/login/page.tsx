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
      setError("Authentication failed. Use: emilys / emilyspass or michaelw / michaelwspass");
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-sky-50 flex flex-col justify-center font-sans pb-24">
        <div className="w-full max-w-md mx-auto px-6">
          <div className="bg-white border-2 border-sky-200 border-b-4 border-b-sky-300 rounded-3xl p-8 shadow-sm">
            <header className="mb-6 text-center">
              {/* Brand Logo */}
              <span className="text-2xl font-black text-indigo-950 tracking-tighter block mb-2 font-toy select-none">
                toy<span className="text-amber-500">Story</span><span className="text-amber-400 ml-0.5">⭐</span>
              </span>
              <h1 className="text-lg font-black text-indigo-950 font-toy uppercase tracking-wider">
                Staff Sign In
              </h1>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Authenticate via proxy to access the Room Console.
              </p>
            </header>

            {error && (
              <div className="mb-5 p-3.5 bg-rose-50 border-2 border-rose-200 text-xs font-semibold text-rose-600 rounded-2xl flex items-center gap-1.5 font-toy">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="input-label text-indigo-950 font-toy text-xs font-black uppercase tracking-wider mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. emilys"
                  required
                  className="w-full px-4 py-3 text-xs font-semibold rounded-2xl border-2 border-sky-100 bg-sky-50/50 text-indigo-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans"
                />
              </div>

              <div className="flex flex-col">
                <label className="input-label text-indigo-950 font-toy text-xs font-black uppercase tracking-wider mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 text-xs font-semibold rounded-2xl border-2 border-sky-100 bg-sky-50/50 text-indigo-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-toy-blue w-full mt-2 h-11 text-center font-toy uppercase tracking-wider"
              >
                {loading ? "Signing in..." : "Login to Console"}
              </button>
            </form>

            <footer className="mt-8 border-t-2 border-sky-50 pt-5 text-center">
              <div className="text-[10px] text-slate-400 leading-normal font-sans">
                <p className="font-black mb-2 text-indigo-400 uppercase tracking-widest font-toy text-[9px]">Playroom Credentials</p>
                <ul className="space-y-1.5 bg-sky-50 p-3 rounded-2xl border border-sky-100 font-semibold text-slate-600">
                  <li>
                    <span className="font-bold text-indigo-600">emilys</span> / <span className="font-bold text-indigo-600">emilyspass</span> (Andy - Owner)
                  </li>
                  <li>
                    <span className="font-bold text-indigo-600">michaelw</span> / <span className="font-bold text-indigo-600">michaelwspass</span> (Woody/Buzz)
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
