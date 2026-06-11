"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Navigation() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    router.push("/login");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/news/feed?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="w-full border-b border-slate-100 bg-white dark:border-neutral-800/80 dark:bg-zinc-950 sticky top-0 z-40 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      {/* Top Navbar Row */}
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        {/* Kumparan Style Logo */}
        <Link href="/" className="flex flex-col shrink-0">
          <span className="text-[9px] font-medium tracking-tight text-slate-400 dark:text-zinc-500 uppercase leading-none">
            Truth and Facts in News
          </span>
          <span className="text-xl md:text-2xl font-extrabold text-[#00828A] tracking-tighter leading-tight flex items-center">
            kumparan<span className="text-teal-400 font-black">.</span>
          </span>
        </Link>

        {/* Center Search Pill Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-4 pr-10 rounded-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#00828A] focus:border-[#00828A] dark:text-zinc-200"
          />
          <button type="submit" className="absolute right-3.5 top-2.5 text-slate-400 hover:text-[#00828A] cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3.5 md:gap-5">
          {/* Dark Mode Icon */}
          <button className="text-slate-500 hover:text-[#00828A] dark:text-zinc-400 dark:hover:text-teal-400 cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          </button>

          {/* Bell Icon */}
          <button className="text-slate-500 hover:text-[#00828A] dark:text-zinc-400 dark:hover:text-teal-400 relative cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Login / Logout */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-xs font-bold text-slate-600 dark:text-zinc-300 hover:text-[#00828A] dark:hover:text-teal-400 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer bg-transparent border-none p-0"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-xs font-bold text-[#00828A] dark:text-teal-400 hover:underline transition-colors"
            >
              Login
            </Link>
          )}

          {/* Write Article Teal Button */}
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex items-center justify-center h-9 px-4 rounded-full bg-[#00828A] hover:bg-[#006e75] text-white text-xs font-bold transition-colors shadow-sm"
          >
            Write Article
          </Link>
        </div>
      </div>

      {/* Secondary Category Navigation Row */}
      <div className="border-t border-slate-100 dark:border-neutral-900 bg-white dark:bg-zinc-950 overflow-x-auto scrollbar-none">
        <div className="mx-auto max-w-6xl px-4 h-10 flex items-center gap-6 text-xs font-bold text-slate-500 dark:text-zinc-400 whitespace-nowrap">
          <Link href="/" className="hover:text-[#00828A] dark:hover:text-teal-400 transition-colors text-slate-800 dark:text-zinc-100">
            News
          </Link>
          <Link href="/news/breaking" className="hover:text-[#00828A] dark:hover:text-teal-400 transition-colors">
            Breaking News (ISR)
          </Link>
          <Link href="/news/feed" className="hover:text-[#00828A] dark:hover:text-teal-400 transition-colors">
            SWR Feed
          </Link>
          <Link href="/dashboard" className="hover:text-[#00828A] dark:hover:text-teal-400 transition-colors">
            Admin Panel
          </Link>
          <span className="text-slate-200 dark:text-neutral-800">|</span>
          <span className="hover:text-[#00828A] transition-colors cursor-pointer">Business</span>
          <span className="hover:text-[#00828A] transition-colors cursor-pointer">Tech & Science</span>
          <span className="hover:text-[#00828A] transition-colors cursor-pointer">Sports & Soccer</span>
          <span className="hover:text-[#00828A] transition-colors cursor-pointer">Entertainment</span>
        </div>
      </div>

      {/* Tertiary Hot Topic Pills Row */}
      <div className="bg-slate-50 dark:bg-zinc-900/40 border-t border-b border-slate-100 dark:border-neutral-900 overflow-x-auto scrollbar-none py-2">
        <div className="mx-auto max-w-6xl px-4 flex items-center gap-2 text-[10px] whitespace-nowrap">
          <span className="font-bold text-slate-400 dark:text-zinc-500 shrink-0 uppercase tracking-wider mr-1">
            Hot Topics:
          </span>
          <Link href="/news/feed?search=IKN" className="h-6 px-3 rounded-full bg-teal-50 dark:bg-teal-950/30 text-[#00828A] dark:text-teal-300 font-bold border border-teal-100 dark:border-teal-900/50 hover:bg-teal-100/50 transition-colors flex items-center">
            IKN Authority
          </Link>
          <Link href="/news/feed?search=Prabowo" className="h-6 px-3 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-300 font-bold border border-blue-100 dark:border-blue-900/50 hover:bg-blue-100/50 transition-colors flex items-center">
            HIPMI Congress
          </Link>
          <Link href="/news/feed?search=Sragen" className="h-6 px-3 rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-300 font-bold border border-red-100 dark:border-red-900/50 hover:bg-red-100/50 transition-colors flex items-center">
            Sragen Update
          </Link>
          <Link href="/news/feed?search=KAI" className="h-6 px-3 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 font-bold hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors flex items-center">
            KAI Logistics
          </Link>
        </div>
      </div>
    </header>
  );
}
