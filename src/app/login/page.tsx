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
      const response = await axios.post("/api/auth/login", {
        username: username.trim(),
        password,
      });

      await mutate("/api/auth/me", response.data, true);
      router.push("/saved"); // redirect to Saved board after auth
    } catch (err: any) {
      setError(
        err.response?.data?.error || 
        "Authentication failed. Try emilys / emilyspass or michaelw / michaelwpass"
      );
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-ramen-bg flex flex-col justify-center font-sans pb-24">
        <div className="w-full max-w-md mx-auto px-6">
          <div className="bg-ramen-card border border-ramen-border rounded-2xl p-8 shadow-2xl">
            <header className="mb-6 text-center">
              <span className="text-2xl block mb-2">🍜</span>
              <h1 className="text-lg font-black font-serif text-ramen-text uppercase tracking-wider">
                Curator Sign In
              </h1>
              <p className="text-xs text-ramen-muted mt-1 font-medium">
                Authenticate via proxy to access your Saved Board and features.
              </p>
            </header>

            {error && (
              <div className="mb-5 p-3.5 bg-red-950/40 border border-ramen-crimson text-xs font-semibold text-ramen-crimson-hover rounded-xl flex items-center gap-1.5 font-serif">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="ramen-label">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. emilys"
                  required
                  className="ramen-input"
                />
              </div>

              <div className="flex flex-col">
                <label className="ramen-label">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="ramen-input"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-ramen-primary w-full mt-2 h-11 text-center font-bold"
              >
                {loading ? "Signing in..." : "Login to Board"}
              </button>
            </form>

            <footer className="mt-8 border-t border-ramen-border pt-5 text-center">
              <div className="text-[10px] text-ramen-muted leading-normal font-sans">
                <p className="font-black mb-2 text-ramen-gold uppercase tracking-widest font-serif text-[9px]">Curator Credentials</p>
                <ul className="space-y-1.5 bg-ramen-surface p-3 rounded-xl border border-ramen-border font-semibold text-ramen-text/80">
                  <li>
                    <span className="font-bold text-ramen-crimson-hover">emilys</span> / <span className="font-bold text-ramen-crimson-hover">emilyspass</span> (Master Curator)
                  </li>
                  <li>
                    <span className="font-bold text-ramen-crimson-hover">michaelw</span> / <span className="font-bold text-ramen-crimson-hover">michaelwpass</span> (Recipe Editor)
                  </li>
                  <li>
                    <span className="font-bold text-ramen-crimson-hover">atuny0</span> / <span className="font-bold text-ramen-crimson-hover">9uQFF1Lh</span> (Food Explorer)
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
