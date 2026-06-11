"use client";

import { useEffect, useState } from "react";

export function ReadHistoryTracker({ postId }: { postId: string }) {
  const [readCount, setReadCount] = useState<number>(0);
  const [isRead, setIsRead] = useState<boolean>(false);

  useEffect(() => {
    // ==========================================
    // TODO RECAP RENDER 6: Implement safety checks inside useEffect to read/write localStorage without causing SSR global object or hydration mismatch crashes
    // ==========================================
    // Safely interact with client-only window/localStorage inside useEffect after mounting
    if (typeof window !== "undefined") {
      // 1. Sync reading status for the post
      const statusKey = `post_read_${postId}`;
      const status = localStorage.getItem(statusKey);
      if (status === "true") {
        setIsRead(true);
      } else {
        localStorage.setItem(statusKey, "true");
      }

      // 2. Track total articles read in current session
      const totalKey = "total_articles_read";
      const currentTotal = parseInt(localStorage.getItem(totalKey) || "0", 10);
      const newTotal = currentTotal + (status === "true" ? 0 : 1);
      localStorage.setItem(totalKey, String(newTotal));
      setReadCount(newTotal);
    }
  }, [postId]);

  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-teal-50/50 dark:bg-teal-950/10 border border-teal-100/50 dark:border-teal-900/30 text-xs text-[#00828A] dark:text-teal-300">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
        </span>
        <span className="font-semibold">
          {isRead ? "You are re-reading this article" : "You are currently reading this article"}
        </span>
      </div>
      <div>
        Total articles read this session: <span className="font-mono font-bold bg-teal-500/10 px-2 py-0.5 rounded-full">{readCount}</span>
      </div>
    </div>
  );
}
