import React from "react";
import { Recipe } from "@/types";
import { Navigation } from "@/components/Navigation";
import { RecipesListClient } from "./RecipesListClient";
import axios from "axios";

// Force Next.js to do dynamic rendering (no caching) - pure SSR
export const revalidate = 0;

export default async function RecipesPage() {
  // TODO Recap Final 1: Fetch recipes server-side (from both DummyJSON and local json-server if available) and pass as props

  // const dummyRes = await fetch(
  //   "https://dummyjson.com/recipes?limit=30&select=id,name,image,cuisine,rating,caloriesPerServing,tags,difficulty",
  //   { cache: "no-store" }
  // );
  const dummyRes = await axios.get("https://dummyjson.com/recipes?limit=30&select=id,name,image,cuisine,rating,caloriesPerServing,tags,difficulty")

  // console.log("dummyRes", dummyRes);

  if (dummyRes.status !== 200) {
    throw new Error("Failed to fetch recipes from DummyJSON");
  }

  const { recipes: dummyRecipes }: { recipes: Recipe[] } = dummyRes.data;

  // Fetch from local JSON server (port 4000)
  let featuredRecipes: Recipe[] = [];
  try {
    const featuredRes = await fetch("http://localhost:4000/recipes", {
      cache: "no-store",
      next: { revalidate: 60 },
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

  // console.log('featuredRecipes', featuredRecipes)
  const combinedRecipes = [...featuredRecipes, ...dummyRecipes];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-ramen-bg text-ramen-text">
        <RecipesListClient recipes={combinedRecipes} />
      </main>
    </>
  );
}
