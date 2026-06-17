"use client";

import { useState } from "react";

/**
 * useLocalStorage — Custom Hook
 *
 * A hook that keeps a piece of state synchronized with localStorage.
 * Reads the initial value from localStorage on mount (SSR-safe) and writes
 * back every time the value is updated.
 *
 * @param key - The localStorage key to read/write
 * @param initialValue - The fallback value if nothing is stored yet
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useLocalStorage(key: string, initialValue: any): [any, (value: any) => void] {
  // ==========================================
  // TODO Hook 5: Initialize state from localStorage
  // Use a lazy initializer so the read only happens once (not every render).
  // Guard against SSR with typeof window check.
  // ------------------------------------------
  // const [storedValue, setStoredValue] = useState(() => {
  //   if (typeof window === "undefined") return initialValue;
  //   try {
  //     const item = window.localStorage.getItem(key);
  //     return item ? JSON.parse(item) : initialValue;
  //   } catch {
  //     return initialValue;
  //   }
  // });
  // ==========================================
  // Starter fallback — keeps the hook runnable before implementing TODO Hook 5
  const [storedValue, setStoredValue] = useState(initialValue);

  // ==========================================
  // TODO Hook 6: Create a setter that updates both React state and localStorage
  // Write to localStorage synchronously inside the setter so both stay in sync.
  // ------------------------------------------
  // const setValue = (value: any) => {
  //   try {
  //     setStoredValue(value);
  //     if (typeof window !== "undefined") {
  //       window.localStorage.setItem(key, JSON.stringify(value));
  //     }
  //   } catch (error) {
  //     console.error("useLocalStorage write error:", error);
  //   }
  // };
  // ==========================================
  // Starter fallback — keeps the hook runnable before implementing TODO Hook 6
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setValue = (value: any) => {
    setStoredValue(value);
  };

  return [storedValue, setValue];
}
