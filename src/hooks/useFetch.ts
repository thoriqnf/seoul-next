"use client";

import { useState, useEffect } from "react";

interface UseFetchResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  loading: boolean;
  error: string | null;
}

/**
 * useFetch — Custom Hook
 *
 * A lightweight data-fetching hook built with useState + useEffect.
 * Uses AbortController to cancel in-flight requests when the component
 * unmounts or the URL changes — preventing stale state updates.
 *
 * Educational note: Compare this with useSWR to see what you get for free
 * with a dedicated library (caching, deduplication, revalidation).
 *
 * @param url - The URL to fetch from
 */
export function useFetch(url: string): UseFetchResult {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // TODO Hook 10: Implement fetch with useEffect + AbortController
  // Create the controller before fetching, abort it in the cleanup function.
  // Update data/error/loading based on the response outcome.
  // ==========================================
  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((err: Error) => {
        // AbortError is expected when we navigate away — not a real error
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    // Cleanup: abort the fetch if the component unmounts or url changes
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}
