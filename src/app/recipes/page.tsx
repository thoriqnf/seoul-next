import React from "react";
import { Recipe } from "@/types";
import { Navigation } from "@/components/Navigation";
import { RecipesListClient } from "./RecipesListClient";

// Force Next.js to do dynamic rendering (no caching) - pure SSR
export const revalidate = 0;

export default async function RecipesPage() {
  // TODO Recap Final 1: Fetch recipes server-side (from both DummyJSON and local json-server if available)
  /*
  // Fetch from DummyJSON
  const dummyRes = await fetch(
    "https://dummyjson.com/recipes?limit=30&select=id,name,image,cuisine,rating,caloriesPerServing,tags,difficulty",
    { cache: "no-store" }
  );

  if (!dummyRes.ok) {
    throw new Error("Failed to fetch recipes from DummyJSON");
  }

  const { recipes: dummyRecipes }: { recipes: Recipe[] } = await dummyRes.json();

  // Fetch from local JSON server (port 4000)
  let featuredRecipes: Recipe[] = [];
  try {
    const featuredRes = await fetch("http://localhost:4000/recipes", {
      cache: "no-store",
      next: { revalidate: 0 },
    });
    if (featuredRes.ok) {
      const data = await featuredRes.json();
      featuredRecipes = Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.warn(
      "Local JSON server (port 4000) is offline or failed. Proceeding with DummyJSON recipes only.",
      error
    );
  }

  const combinedRecipes = [...featuredRecipes, ...dummyRecipes];
  */
  const combinedRecipes: Recipe[] = [];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-ramen-bg text-ramen-text">
        {/* TODO Recap Final 2: Pass server-fetched data as props to RecipesListClient */}
        <RecipesListClient recipes={combinedRecipes} />
      </main>
    </>
  );
}
