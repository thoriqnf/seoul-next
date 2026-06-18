import { Navigation } from "@/components/Navigation";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-ramen-bg flex flex-col items-center justify-start text-center relative overflow-hidden pb-24 font-sans">
        {/* Hero Image Section */}
        <div className="relative w-full h-[500px]">
          {/* TODO Recap Final 13: next/image with fill and priority */}

          <Image
            src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1600"
            alt="Ramen Discovery Hero"
            fill
            priority
            className="object-cover brightness-40"
          />

          {/* <img
            src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1600"
            alt="Ramen Discovery Hero"
            className="absolute inset-0 w-full h-full object-cover brightness-40"
          /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-ramen-bg via-transparent to-black/50" />

          <div className="absolute inset-0 flex flex-col items-center justify-center max-w-4xl mx-auto px-6 z-10">
            {/* Gold Badge */}
            <span className="text-[10px] font-black tracking-widest text-ramen-bg bg-ramen-gold border border-ramen-gold-light px-5 py-2 rounded-full uppercase mb-6 shadow-lg select-none">
              🍜 THE ART OF FLAVOR 🍜
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-ramen-text leading-tight max-w-3xl font-serif drop-shadow-2xl">
              Discover Authentic Ramen Recipes
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-sm md:text-base text-ramen-text/80 max-w-2xl font-medium leading-relaxed drop-shadow">
              Welcome to the ultimate culinary sanctuary. Explore curated ramen recipes compiled from master curators. Log in to save your personal favorites to the board.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link href="/recipes" className="btn-ramen-gold font-bold">
                Explore the Menu 🍜
              </Link>
              <Link href="/saved" className="btn-ramen-ghost font-bold">
                Saved Recipe Board
              </Link>
            </div>
          </div>
        </div>

        {/* Info / Detail Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 w-full text-left">
          <h2 className="text-2xl font-black font-serif text-ramen-text mb-8 text-center">
            How We Curate the Perfect Bowl
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-ramen-card border border-ramen-border rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-ramen-subtle text-ramen-gold flex items-center justify-center font-bold mb-4 text-xl">
                🍜
              </div>
              <h3 className="text-sm font-black text-ramen-text uppercase tracking-wider mb-2 font-serif">
                Authentic Heritage
              </h3>
              <p className="text-xs text-ramen-muted leading-relaxed font-medium">
                Recipes directly inspired by traditional ramen houses in Tokyo, Fukuoka, and beyond. Explore different broths (Shoyu, Tonkotsu, Miso, Shio) with exact details.
              </p>
            </div>

            <div className="p-6 bg-ramen-card border border-ramen-border rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-ramen-subtle text-ramen-gold flex items-center justify-center font-bold mb-4 text-xl">
                ⚖️
              </div>
              <h3 className="text-sm font-black text-ramen-text uppercase tracking-wider mb-2 font-serif">
                Master Curation
              </h3>
              <p className="text-xs text-ramen-muted leading-relaxed font-medium">
                Every recipe is meticulously reviewed by our Master Curators. Check the difficulty rating and preparation time to match your kitchen skills.
              </p>
            </div>

            <div className="p-6 bg-ramen-card border border-ramen-border rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-ramen-subtle text-ramen-gold flex items-center justify-center font-bold mb-4 text-xl">
                ❤️
              </div>
              <h3 className="text-sm font-black text-ramen-text uppercase tracking-wider mb-2 font-serif">
                Saved Boards
              </h3>
              <p className="text-xs text-ramen-muted leading-relaxed font-medium">
                Create a customized selection of your next cooking projects. Keep ingredients and steps easily accessible at any time.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
