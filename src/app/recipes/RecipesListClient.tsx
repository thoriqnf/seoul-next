"use client";

import React, { useState, useMemo, useCallback, useRef } from "react";
import { Recipe } from "@/types";
import { RecipeCard } from "@/components/RecipeCard";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// ==========================================
// TODO Recap Final 22: FilterBar child component memoized with React.memo
// ==========================================
interface FilterBarProps {
  cuisineFilter: string;
  difficultyFilter: string;
  onCuisineChange: (val: string) => void;
  onDifficultyChange: (val: string) => void;
  renderCount: React.MutableRefObject<number>;
  cuisines: string[];
}

const FilterBar = React.memo(function FilterBar({
  cuisineFilter,
  difficultyFilter,
  onCuisineChange,
  onDifficultyChange,
  renderCount,
  cuisines,
}: FilterBarProps) {
  renderCount.current += 1;

  return (
    <div className="p-5 bg-ramen-card border border-ramen-border rounded-2xl mb-8 flex flex-wrap gap-4 items-center justify-between">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Cuisine Select */}
        <div>
          <label className="ramen-label">Cuisine</label>
          <select
            value={cuisineFilter}
            onChange={(e) => onCuisineChange(e.target.value)}
            className="ramen-input min-w-[150px]"
          >
            <option value="">All Cuisines</option>
            {cuisines.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Select */}
        <div>
          <label className="ramen-label">Difficulty</label>
          <select
            value={difficultyFilter}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="ramen-input min-w-[150px]"
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="text-right text-xs text-ramen-muted">
        <p>FilterBar Renders: <span className="text-ramen-gold font-bold">{renderCount.current}</span></p>
      </div>
    </div>
  );
});

interface RecipesListClientProps {
  recipes: Recipe[];
}

export function RecipesListClient({ recipes }: RecipesListClientProps) {
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");

  const filterRunCount = useRef(0);
  const filterBarRenderCount = useRef(0);

  // Extract unique cuisines for selection
  const cuisines = useMemo(() => {
    const set = new Set(recipes.map((r) => r.cuisine));
    return Array.from(set).sort();
  }, [recipes]);

  // TODO Recap Final 21: useMemo to memoize the filtered recipes list
  const filteredRecipes = useMemo(() => {
    filterRunCount.current += 1;
    return recipes.filter((recipe) => {
      const matchesCuisine = !cuisineFilter || recipe.cuisine === cuisineFilter;
      const matchesDifficulty = !difficultyFilter || recipe.difficulty === difficultyFilter;
      return matchesCuisine && matchesDifficulty;
    });
  }, [recipes, cuisineFilter, difficultyFilter]);

  // TODO Recap Final 22: useCallback to stabilize filter state changes
  const handleCuisineChange = useCallback((value: string) => {
    setCuisineFilter(value);
  }, []);

  const handleDifficultyChange = useCallback((value: string) => {
    setDifficultyFilter(value);
  }, []);

  // TODO Recap Final 24: useMediaQuery to pick grid column count dynamically
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const gridColsClass = isMobile
    ? "grid-cols-1"
    : isTablet
    ? "grid-cols-2"
    : "grid-cols-3";

  return (
    <div className="ramen-container py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black font-serif text-ramen-text">Ramen Recipe Menu</h1>
          <p className="text-sm text-ramen-muted">Browse authentic recipes curated globally</p>
        </div>
        <div className="bg-ramen-subtle px-4 py-2 rounded-xl text-xs text-ramen-muted border border-ramen-border">
          Filter recalculations: <span className="text-ramen-gold font-bold">{filterRunCount.current}</span>
        </div>
      </div>

      <FilterBar
        cuisineFilter={cuisineFilter}
        difficultyFilter={difficultyFilter}
        onCuisineChange={handleCuisineChange}
        onDifficultyChange={handleDifficultyChange}
        renderCount={filterBarRenderCount}
        cuisines={cuisines}
      />

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-24 bg-ramen-card border border-ramen-border rounded-2xl">
          <span className="text-4xl block mb-2">🥣</span>
          <p className="text-sm font-bold text-ramen-muted">No recipes match your criteria.</p>
        </div>
      ) : (
        <div className={`grid ${gridColsClass} gap-6`}>
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
