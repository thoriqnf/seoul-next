import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Recipe } from "@/types";
import { Navigation } from "@/components/Navigation";

// TODO Recap Final 2: SSG + ISR dynamic parameter pre-rendering and background regeneration
export const revalidate = 60;

export async function generateStaticParams() {
  const params: { id: string }[] = [];
  try {
    const response = await fetch("https://dummyjson.com/recipes?limit=10&select=id");
    if (response.ok) {
      const { recipes } = await response.json();
      recipes.forEach((recipe: { id: number }) => {
        params.push({ id: String(recipe.id) });
      });
    }
  } catch (error) {
    console.error("Failed to generate static params from DummyJSON:", error);
  }

  try {
    const response = await fetch("http://localhost:4000/recipes");
    if (response.ok) {
      const recipes = await response.json();
      if (Array.isArray(recipes)) {
        recipes.forEach((recipe: { id: number }) => {
          params.push({ id: String(recipe.id) });
        });
      }
    }
  } catch (error) {
    console.warn("Failed to generate static params from local JSON server:", error);
  }

  return params;
}

interface RecipeDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const { id } = await params;

  let recipe: Recipe | null = null;

  // 1. Try local JSON server
  try {
    const response = await fetch(`http://localhost:4000/recipes/${id}`, {
      cache: "no-store",
    });
    if (response.ok) {
      recipe = await response.json();
    }
  } catch (error) {
    console.warn(`Local fetch failed for recipe ID ${id}:`, error);
  }

  // 2. Try DummyJSON if not found locally
  if (!recipe) {
    try {
      const response = await fetch(`https://dummyjson.com/recipes/${id}`);
      if (response.ok) {
        recipe = await response.json();
      }
    } catch (error) {
      console.error(`DummyJSON fetch failed for recipe ID ${id}:`, error);
    }
  }

  if (!recipe) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-ramen-bg text-ramen-text py-12">
        <div className="ramen-container max-w-4xl">
          {/* Back button */}
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 text-xs font-bold text-ramen-gold hover:text-ramen-gold-light mb-6 transition-colors"
          >
            ← Back to Menu
          </Link>

          {/* Recipe Layout */}
          <div className="ramen-surface bg-ramen-surface border border-ramen-border rounded-2xl overflow-hidden shadow-2xl">
            {/* Header Image banner */}
            <div className="relative w-full h-80 md:h-[400px] bg-ramen-subtle">
              <Image
                src={recipe.image}
                alt={recipe.name}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ramen-surface via-transparent to-transparent" />
              <span className="absolute bottom-6 left-6 bg-ramen-crimson text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {recipe.cuisine}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-black font-serif text-ramen-text mb-4">
                {recipe.name}
              </h1>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-ramen-card border border-ramen-border rounded-xl mb-8 text-center">
                <div>
                  <span className="block text-[10px] font-bold text-ramen-muted uppercase tracking-wider mb-1">
                    Difficulty
                  </span>
                  <span className="text-sm font-black text-ramen-text">
                    {recipe.difficulty}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-ramen-muted uppercase tracking-wider mb-1">
                    Prep Time
                  </span>
                  <span className="text-sm font-black text-ramen-text">
                    {recipe.prepTimeMinutes || 15} mins
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-ramen-muted uppercase tracking-wider mb-1">
                    Cook Time
                  </span>
                  <span className="text-sm font-black text-ramen-text">
                    {recipe.cookTimeMinutes || 20} mins
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-ramen-muted uppercase tracking-wider mb-1">
                    Calories
                  </span>
                  <span className="text-sm font-black text-ramen-text text-ramen-gold">
                    {recipe.caloriesPerServing} kcal
                  </span>
                </div>
              </div>

              {/* Recipe Body */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left col: Ingredients */}
                <div className="md:col-span-1">
                  <h3 className="text-lg font-black font-serif text-ramen-text mb-4 border-b border-ramen-border pb-2">
                    Ingredients
                  </h3>
                  <ul className="space-y-2 text-sm text-ramen-text/90">
                    {recipe.ingredients?.map((ing, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-ramen-gold mt-0.5">•</span>
                        <span>{ing}</span>
                      </li>
                    )) || <li>Details coming soon.</li>}
                  </ul>
                </div>

                {/* Right col: Instructions */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-black font-serif text-ramen-text mb-4 border-b border-ramen-border pb-2">
                    Cooking Steps
                  </h3>
                  <ol className="space-y-4 text-sm text-ramen-text/90">
                    {recipe.instructions?.map((step, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span className="w-5 h-5 rounded-full bg-ramen-subtle text-ramen-gold text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="flex-1 leading-relaxed">{step}</p>
                      </li>
                    )) || <li>Details coming soon.</li>}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
