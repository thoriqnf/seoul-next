import React from "react";
import { Recipe } from "@/types";
import { Navigation } from "@/components/Navigation";
import { RecipesListClient } from "./RecipesListClient";

// Force Next.js to do dynamic rendering (no caching) - pure SSR
export const revalidate = 0;

export default async function RecipesPage() {
  // TODO Recap Final 1: Fetch recipes server-side (from both DummyJSON and local json-server if available)
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
