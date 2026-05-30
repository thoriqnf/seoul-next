"use client";

import { useState, useEffect } from "react";

/**
 * GetAllPostsDemo (Starter Template)
 * Follow the steps in `docs/demo-guide-week-1-day-4.md` to complete:
 *
 * TODO useEffect 1: Initialize State Variables (posts, loading, error)
 * TODO useEffect 2: Create Fetch Hook inside useEffect with Dependency Array []
 * TODO useEffect 3: Render Loading State and Error State Conditionally
 * TODO useEffect 4: Render Posts List Dynamically using posts.map
 */
export default function GetAllPostsDemo() {
  // ----------------------------------------------------
  // TODO useEffect 1: Initialize State Variables (posts default [], loading default false, error default null)
  // ----------------------------------------------------
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ----------------------------------------------------
  // TODO useEffect 2: Create Fetch Hook inside useEffect with Dependency Array []
  // ----------------------------------------------------
  useEffect(() => {
    // Write your fetch logic here
  }, []);

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
      {/* (e.g. Render loading tag if loading is true, render error tag if error is not null) */}

      {/* TODO useEffect 4: Render Posts List Dynamically using posts.map */}
      {/* (e.g. Render list items containing post.id, post.title, and post.body excerpt) */}
      
    </div>
  );
}
