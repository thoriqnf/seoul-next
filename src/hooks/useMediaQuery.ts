"use client";

import { useState, useEffect } from "react";

/**
 * useMediaQuery — Custom Hook
 *
 * Subscribes to a CSS media query string and returns a boolean that reflects
 * whether the query currently matches. Automatically updates when the window
 * is resized or the environment changes.
 *
 * @param query - A valid CSS media query string, e.g. "(max-width: 767px)"
 * @returns boolean — true if the media query currently matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  // ==========================================
  // TODO Hook 8: Subscribe to the media query using window.matchMedia
  // Set initial value on mount, then listen for changes.
  // Clean up the listener on unmount to prevent memory leaks.
  // ------------------------------------------
  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //
  //   const mediaQueryList = window.matchMedia(query);
  //
  //   const handleChange = (event: MediaQueryListEvent) => {
  //     setMatches(event.matches);
  //   };
  //
  //   // Set the initial value
  //   setMatches(mediaQueryList.matches);
  //
  //   // Subscribe to future changes
  //   mediaQueryList.addEventListener("change", handleChange);
  //
  //   // Cleanup: remove listener when component unmounts or query changes
  //   return () => {
  //     mediaQueryList.removeEventListener("change", handleChange);
  //   };
  // }, [query]);
  // ==========================================
  // Starter fallback — always returns false before implementing TODO Hook 8
  useEffect(() => {
    // placeholder — implement TODO Hook 8 above
    setMatches(false);
  }, [query]);

  return matches;
}
