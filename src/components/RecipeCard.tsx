"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Recipe } from "@/types";
import { useSaved } from "@/contexts/SavedContext";
import { useNotif } from "@/contexts/NotifContext";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const { savedRecipes, dispatch } = useSaved();
  const { dispatch: notifDispatch } = useNotif();

  const isSaved = savedRecipes.some((r) => r.id === recipe.id);

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSaved) {
      dispatch({ type: "UNSAVE", payload: { id: recipe.id } });
      notifDispatch({
        type: "ADD_NOTIF",
        payload: {
          id: `unsave-${recipe.id}-${Date.now()}`,
          message: `Unsaved: ${recipe.name}`,
          type: "info",
        },
      });
    } else {
      dispatch({ type: "SAVE", payload: recipe });
      notifDispatch({
        type: "ADD_NOTIF",
        payload: {
          id: `save-${recipe.id}-${Date.now()}`,
          message: `🍜 ${recipe.name} saved!`,
          type: "success",
        },
      });
    }
  };

  return (
    <div className="ramen-card group relative flex flex-col h-full bg-ramen-card border border-ramen-border rounded-2xl overflow-hidden hover:border-ramen-gold/40 transition-all duration-200">
      {/* Recipe Image container with aspect ratio and next/image */}
      <div className="relative w-full h-48 bg-ramen-subtle">
        <Image
          src={recipe.image}
          alt={recipe.name}
          width={400}
          height={300}
          className="object-cover w-full h-48 rounded-t-xl group-hover:scale-105 transition-transform duration-300"
        />
        {/* Cuisine Badge */}
        <span className="absolute top-3 left-3 bg-ramen-bg/80 border border-ramen-border text-ramen-gold text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          {recipe.cuisine}
        </span>

        {/* Save Toggle Button */}
        <button
          onClick={handleToggleSave}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-150 cursor-pointer ${
            isSaved
              ? "bg-ramen-crimson border-ramen-crimson text-white scale-110"
              : "bg-ramen-bg/80 border-ramen-border text-ramen-text hover:border-ramen-gold hover:text-ramen-gold"
          }`}
          aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
        >
          {isSaved ? "❤️" : "♡"}
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs text-ramen-muted mb-2 font-medium">
          <span>🔥 {recipe.caloriesPerServing} kcal</span>
          <span>•</span>
          <span
            className={`font-semibold ${
              recipe.difficulty === "Easy"
                ? "text-emerald-400"
                : recipe.difficulty === "Medium"
                ? "text-ramen-gold"
                : "text-ramen-crimson-hover"
            }`}
          >
            {recipe.difficulty}
          </span>
        </div>

        <h3 className="text-base font-black font-serif text-ramen-text group-hover:text-ramen-gold transition-colors line-clamp-1 mb-2">
          {recipe.name}
        </h3>

        <div className="flex items-center gap-1 text-xs text-ramen-gold mb-4 mt-auto">
          <span>⭐</span>
          <span className="font-bold text-ramen-text">{recipe.rating}</span>
          <span className="text-ramen-muted">/ 5.0</span>
        </div>

        <Link
          href={`/recipes/${recipe.id}`}
          className="w-full text-center py-2 bg-ramen-subtle hover:bg-ramen-border text-xs font-bold text-ramen-text hover:text-ramen-gold border border-ramen-border hover:border-ramen-gold/30 rounded-xl transition-all"
        >
          View Recipe 🍜
        </Link>
      </div>
    </div>
  );
}
