import { Navigation } from "@/components/Navigation";
import Link from "next/link";

const Cloud = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 80"
    fill="white"
    className={`absolute select-none pointer-events-none drop-shadow-[0_4px_8px_rgba(186,230,253,0.6)] opacity-95 animate-pulse duration-10000 ${className}`}
  >
    <path d="M20 50 C20 40, 30 35, 40 35 C45 25, 65 20, 80 30 C90 25, 105 30, 105 45 C115 45, 120 55, 110 65 C110 70, 100 75, 90 75 L30 75 C15 75, 10 65, 20 50 Z" />
  </svg>
);

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-white flex flex-col items-center justify-center font-sans text-center relative overflow-hidden pb-24">
        {/* Playful Vector Cloud decorations */}
        <Cloud className="top-8 left-6 w-36 md:w-48 h-auto" />
        <Cloud className="top-20 right-8 w-44 md:w-56 h-auto" />
        <Cloud className="bottom-24 left-10 w-40 md:w-52 h-auto" />
        <Cloud className="bottom-12 right-16 w-32 md:w-44 h-auto" />

        <div className="mx-auto max-w-4xl px-6 md:px-8 py-16 flex flex-col items-center relative z-10 w-full">
          {/* Sheriff Star Badge */}
          <span className="text-[10px] font-black tracking-widest text-amber-950 bg-amber-400 border-2 border-amber-500 border-b-4 border-b-amber-600 px-5 py-2 rounded-full uppercase mb-8 flex items-center gap-1.5 shadow-md font-toy hover:scale-[1.03] transition-transform select-none">
            ⭐ Sheriff's Office & Space Ranger HQ ⭐
          </span>

          {/* Toy Story Title */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-indigo-950 leading-tight max-w-3xl font-toy drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
            Welcome to Andy's Toy Chest!
          </h1>
          
          {/* Subtitle */}
          <p className="mt-6 text-sm md:text-base text-slate-700 max-w-2xl font-medium leading-relaxed">
            Welcome to the playroom! Log in as Woody or Buzz to manage the Room Console, or check out Andy's secret Toy Chest settings. Don't let Sid into the yard!
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link href="/dashboard" className="btn-toy-blue">
              Enter Andy's Room
            </Link>
            <Link href="/login" className="btn-toy-white">
              Sign In Panel
            </Link>
          </div>

          {/* Playroom Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left w-full">
            {/* Card 1: Woody */}
            <div className="p-6 bg-white border-2 border-amber-200 border-b-4 border-b-amber-300 rounded-3xl shadow-sm hover:border-amber-450 hover:scale-[1.02] hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-650 flex items-center justify-center font-bold mb-5 text-2xl border border-amber-100 group-hover:scale-110 transition-transform">
                🤠
              </div>
              <h3 className="text-sm font-black text-indigo-950 uppercase tracking-wider mb-2 font-toy">
                Woody's Round-Up
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                "Reach for the sky!" Join the Sheriff to secure Andy's room. Managing resources here requires at least a Store Assistant / Toy role.
              </p>
            </div>

            {/* Card 2: Buzz */}
            <div className="p-6 bg-white border-2 border-emerald-200 border-b-4 border-b-emerald-300 rounded-3xl shadow-sm hover:border-emerald-450 hover:scale-[1.02] hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-5 text-2xl border border-emerald-100 group-hover:scale-110 transition-transform">
                🚀
              </div>
              <h3 className="text-sm font-black text-indigo-950 uppercase tracking-wider mb-2 font-toy">
                Star Command
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                "To infinity and beyond!" Buzz helps log all cosmic API calls and secure local HttpOnly cookie payloads against browser alien hacks.
              </p>
            </div>

            {/* Card 3: Sid's Warning */}
            <div className="p-6 bg-white border-2 border-rose-200 border-b-4 border-b-rose-300 rounded-3xl shadow-sm hover:border-rose-450 hover:scale-[1.02] hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center font-bold mb-5 text-2xl border border-rose-100 group-hover:scale-110 transition-transform">
                💀
              </div>
              <h3 className="text-sm font-black text-indigo-950 uppercase tracking-wider mb-2 font-toy">
                Sid's Yard Warning
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Danger ahead! Sid wants to disassemble our toys. Sid's account role is classified as a "Customer / User" and will be locked out of the room.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
