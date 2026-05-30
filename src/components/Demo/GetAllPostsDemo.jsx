"use client";

import { useState, useEffect } from "react";

/**
 * GetAllPostsDemo
 * Demonstrates the most basic usage of useEffect:
 * Fetching data from an API once when the component is first mounted.
 * Uses an empty dependency array [] to ensure the effect only runs once.
 */
export default function GetAllPostsDemo() {
  // ----------------------------------------------------
  // TODO useEffect 1: Initialize State Variables (posts, loading, error)
  // ----------------------------------------------------
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ----------------------------------------------------
  // TODO useEffect 2: Create Fetch Hook inside useEffect with Dependency Array []
  // ----------------------------------------------------
  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data from server");
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty dependency array [] ensures this runs only once on mount

  // ----------------------------------------------------
  // 3. UI / Component Render
  // ----------------------------------------------------
  return (
    <div className="p-5 border border-slate-200 dark:border-zinc-800 rounded-lg my-5 bg-transparent font-sans">
      <h3 className="m-0 text-base font-bold text-slate-800 dark:text-zinc-100 mb-1">
        Demo 3: Fetch All Posts (useEffect on Mount)
      </h3>
      <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4">
        This component demonstrates how to perform an API request using `useEffect` with an empty dependency array `[]`.
      </p>

      {/* TODO useEffect 3: Render Loading State and Error State Conditionally */}
      {loading ? (
        <p className="text-blue-500 dark:text-blue-400 font-bold text-sm">Loading posts...</p>
      ) : error ? (
        <p className="text-red-500 dark:text-red-400 text-sm">⚠ Error: {error}</p>
      ) : posts.length === 0 ? (
        <p className="text-slate-500 dark:text-zinc-400 text-sm">No posts found.</p>
      ) : (
        /* TODO useEffect 4: Render Posts List Dynamically using posts.map */
        <div className="max-h-[300px] overflow-y-auto pr-1">
          <ul className="space-y-3 m-0 p-0">
            {posts.map((post) => (
              <li key={post.id} className="pb-2 border-b border-slate-100 dark:border-zinc-850 list-none">
                <strong className="block text-slate-800 dark:text-zinc-200 text-sm font-semibold mb-1">
                  {post.id}. {post.title}
                </strong>
                <span className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed block">
                  {post.body.substring(0, 100)}...
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
