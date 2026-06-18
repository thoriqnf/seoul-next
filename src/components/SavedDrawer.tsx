"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSaved } from "@/contexts/SavedContext";
import { useNotif } from "@/contexts/NotifContext";

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SavedDrawer({ isOpen, onClose }: SavedDrawerProps) {
  const { savedRecipes, dispatch } = useSaved();
  const { dispatch: notifDispatch } = useNotif();

  const handleUnsave = (id: number, name: string) => {
    dispatch({ type: "UNSAVE", payload: { id } });
    notifDispatch({
      type: "ADD_NOTIF",
      payload: {
        id: `unsave-${id}-${Date.now()}`,
        message: `Removed: ${name}`,
        type: "info",
      },
    });
  };

  const handleClearAll = () => {
    dispatch({ type: "CLEAR" });
    notifDispatch({
      type: "ADD_NOTIF",
      payload: {
        id: `clear-${Date.now()}`,
        message: "Cleared all saved recipes",
        type: "info",
      },
    });
  };

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-ramen-surface border-l border-ramen-border z-50 flex flex-col transition-transform duration-300 font-sans shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Saved recipes drawer"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-ramen-border">
          <h2 className="text-lg font-black font-serif text-ramen-text flex items-center gap-2">
            🍜 Bookmarked Recipes
          </h2>
          <button
            onClick={onClose}
            className="text-ramen-muted hover:text-ramen-text transition-colors text-lg leading-none cursor-pointer"
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>

        {/* Drawer content / list */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {savedRecipes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <span className="text-5xl">🥣</span>
              <p className="text-sm font-bold text-ramen-muted">
                Your recipe book is empty!
              </p>
              <p className="text-xs text-ramen-muted/70 max-w-xs">
                Explore the menu and save recipes you want to try cooking.
              </p>
              <Link
                href="/recipes"
                onClick={onClose}
                className="btn-ramen-primary mt-2"
              >
                Browse Recipes
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {savedRecipes.map((recipe) => (
                <li
                  key={recipe.id}
                  className="flex gap-4 bg-ramen-card border border-ramen-border rounded-xl p-3 hover:border-ramen-gold/30 transition-all"
                >
                  {/* Recipe image preview */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-ramen-subtle shrink-0">
                    <Image
                      src={recipe.image}
                      alt={recipe.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Recipe info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <span className="text-[9px] font-bold text-ramen-gold uppercase tracking-widest">
                        {recipe.cuisine}
                      </span>
                      <h4 className="text-xs font-bold text-ramen-text truncate font-serif">
                        {recipe.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/recipes/${recipe.id}`}
                        onClick={onClose}
                        className="text-[10px] font-bold text-ramen-gold hover:underline"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleUnsave(recipe.id, recipe.name)}
                        className="text-[10px] font-bold text-ramen-crimson hover:text-ramen-crimson-hover cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Drawer footer actions */}
        {savedRecipes.length > 0 && (
          <div className="border-t border-ramen-border px-6 py-5 bg-ramen-card space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ramen-muted">Total Saved</span>
              <span className="text-sm font-black font-serif text-ramen-text">
                {savedRecipes.length} recipes
              </span>
            </div>

            <Link
              href="/saved"
              onClick={onClose}
              className="btn-ramen-primary w-full text-center"
            >
              Go to Saved Recipe Board 📝
            </Link>

            <button
              onClick={handleClearAll}
              className="w-full text-center text-xs font-bold text-ramen-muted hover:text-ramen-crimson transition-colors cursor-pointer"
            >
              Clear All Saved
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
