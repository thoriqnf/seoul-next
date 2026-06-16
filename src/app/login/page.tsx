"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { mutate } from "swr";
import { Navigation } from "@/components/Navigation";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
    /* UNCOMMENT FOR FINISHED IMPLEMENTATION     */
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


    // STARTER FALLBACK: Execute the request directly so it works out of the box
    // try {
    //   const response = await axios.post("/api/auth/login", {
    //     username: username.trim(),
    //     password,
    //   });
    //   console.log('response', response)
    //   await mutate("/api/auth/me", response.data, true);
    //   router.push("/dashboard");
    // } catch (err: any) {
    //   setError("Authentication failed. Use: emilys / emilyspass or michaelw / michaelwspass");
    //   setLoading(false);
    // }
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
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-4 pr-11 py-3 text-xs font-semibold rounded-2xl border-2 border-sky-100 bg-sky-50/50 text-indigo-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors p-1 cursor-pointer select-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
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
