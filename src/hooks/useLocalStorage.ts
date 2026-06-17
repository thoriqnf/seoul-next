"use client";

import { useState } from "react";

/**
 * useLocalStorage — Custom Hook
 *
 * A generic hook that keeps a piece of state synchronized with localStorage.
 * Reads the initial value from localStorage on mount (SSR-safe) and writes
 * back every time the value is updated.
 *
 * @param key - The localStorage key to read/write
 * @param initialValue - The fallback value if nothing is stored yet
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // ==========================================
  // TODO Hook 5: Initialize state from localStorage
  // Use a lazy initializer so the read only happens once (not every render).
  // Guard against SSR with typeof window check.
  // ==========================================
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // ==========================================
  // TODO Hook 6: Create a setter that updates both React state and localStorage
  // Write to localStorage synchronously inside the setter so both stay in sync.
  // ==========================================
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("useLocalStorage write error:", error);
    }
  };

  return [storedValue, setValue];
}
