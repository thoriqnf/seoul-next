"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { useSaved } from "@/contexts/SavedContext";
import { useNotif } from "@/contexts/NotifContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function SavedRecipesPage() {
  const { savedRecipes, dispatch } = useSaved();
  const { dispatch: notifDispatch } = useNotif();

  // TODO Recap Final 23: useLocalStorage to persist saved recipe IDs across hard refresh
  const [savedIds, setSavedIds] = useLocalStorage<number[]>("ramen-discovery-saved", []);

  // Sync Context saves to localStorage
  useEffect(() => {
    setSavedIds(savedRecipes.map((r) => r.id));
  }, [savedRecipes, setSavedIds]);

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

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-ramen-bg text-ramen-text py-12">
        <div className="ramen-container">
          <div className="flex items-center justify-between mb-8 border-b border-ramen-border pb-4">
            <div>
              <h1 className="text-3xl font-black font-serif text-ramen-text">Saved Recipe Board</h1>
              <p className="text-sm text-ramen-muted">Your customized selection of cooking projects</p>
            </div>
            <Link href="/recipes" className="btn-ramen-ghost text-xs">
              + Add More Recipes
            </Link>
          </div>

          {savedRecipes.length === 0 ? (
            <div className="text-center py-24 bg-ramen-card border border-ramen-border rounded-2xl">
              <span className="text-5xl block mb-4">🥣</span>
              <h2 className="text-lg font-bold text-ramen-text font-serif mb-2">No Saved Recipes</h2>
              <p className="text-sm text-ramen-muted max-w-sm mx-auto mb-6">
                You haven't bookmarked any recipes yet. Explore the menu to start building your board.
              </p>
              <Link href="/recipes" className="btn-ramen-gold font-bold">
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="ramen-card bg-ramen-card border border-ramen-border rounded-2xl overflow-hidden hover:border-ramen-gold/40 transition-all duration-200 flex flex-col"
                >
                  <div className="relative w-full h-48 bg-ramen-subtle">
                    <Image
                      src={recipe.image}
                      alt={recipe.name}
                      width={400}
                      height={300}
                      className="object-cover w-full h-48"
                    />
                    <span className="absolute top-3 left-3 bg-ramen-bg/80 border border-ramen-border text-ramen-gold text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {recipe.cuisine}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-base font-black font-serif text-ramen-text mb-4">
                      {recipe.name}
                    </h3>

                    <div className="flex items-center gap-3 mt-auto">
                      <Link
                        href={`/recipes/${recipe.id}`}
                        className="flex-1 text-center py-2 bg-ramen-subtle hover:bg-ramen-border text-xs font-bold text-ramen-text hover:text-ramen-gold border border-ramen-border rounded-xl transition-all"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => handleUnsave(recipe.id, recipe.name)}
                        className="px-4 py-2 border border-ramen-border hover:border-ramen-crimson hover:text-ramen-crimson text-xs font-bold text-ramen-muted rounded-xl transition-all cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
