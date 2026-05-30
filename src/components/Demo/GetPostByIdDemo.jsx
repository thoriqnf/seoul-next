"use client";

import { useState, useEffect } from "react";

/**
 * GetPostByIdDemo
 * Demonstrates useEffect usage with a dependency array:
 * Fetches post details based on the selected ID.
 * The dependency array contains [postId], meaning the effect will re-run
 * every time the value of `postId` changes.
 */
export default function GetPostByIdDemo() {
  // ----------------------------------------------------
  // TODO useEffect 5: Initialize State Variables (postId, post, loading, error)
  // ----------------------------------------------------
  const [postId, setPostId] = useState(1);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ----------------------------------------------------
  // TODO useEffect 6: Create Navigation Handlers (handleNext, handlePrev)
  // ----------------------------------------------------
  const handleNext = () => {
    setPostId((prev) => prev + 1);
  };

  const handlePrev = () => {
    setPostId((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // ----------------------------------------------------
  // TODO useEffect 7: Create Fetch Hook inside useEffect with Dependency Array [postId]
  // ----------------------------------------------------
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://dummyjson.com/posts/${postId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Post with ID ${postId} not found`);
        }
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [postId]); // Dependency [postId] triggers re-fetching whenever postId state changes

  // ----------------------------------------------------
  // 4. UI / Component Render
  // ----------------------------------------------------
  return (
    <div className="p-5 border border-slate-200 dark:border-zinc-800 rounded-lg my-5 bg-transparent font-sans">
      <h3 className="m-0 text-base font-bold text-slate-800 dark:text-zinc-100 mb-1">
        Demo 4: Fetch Post By ID (useEffect with Dependency)
      </h3>
      <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4">
        This component demonstrates how `useEffect` responds to changes in the `postId` state by including it in the dependency array `[postId]`.
      </p>

      {/* Post ID Navigation */}
      <div className="flex gap-3 items-center mb-5">
        <button
          onClick={handlePrev}
          disabled={postId <= 1}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-lg disabled:bg-slate-100 disabled:text-slate-400 dark:disabled:bg-zinc-800/40 dark:disabled:text-zinc-650 disabled:cursor-not-allowed transition"
        >
          Previous
        </button>

        <span className="text-base font-bold text-slate-700 dark:text-zinc-300">
          Post ID: {postId}
        </span>

        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-lg transition"
        >
          Next
        </button>
      </div>

      {/* TODO useEffect 8: Render Post Detail Content Conditionally */}
      <div className="min-h-[120px] p-4 border border-dashed border-slate-200 dark:border-zinc-800 rounded-lg bg-slate-50/50 dark:bg-zinc-900/30">
        {loading ? (
          <p className="text-blue-500 dark:text-blue-450 font-bold text-sm m-0">Loading post details...</p>
        ) : error ? (
          <p className="text-red-500 dark:text-red-400 text-sm m-0">⚠ Error: {error}</p>
        ) : post ? (
          <div className="m-0">
            <h4 className="m-0 text-slate-800 dark:text-zinc-200 text-base font-bold mb-2">
              {post.title}
            </h4>
            <p className="m-0 text-slate-600 dark:text-zinc-400 text-sm leading-relaxed">
              {post.body}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
