import { Navigation } from "@/components/Navigation";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-sky-100/50 flex flex-col items-center justify-center font-sans text-center relative overflow-hidden pb-24">
        {/* Background Clouds decoration */}
        <div className="absolute top-10 left-10 w-32 h-16 bg-white rounded-full opacity-60 filter blur-xs animate-pulse"></div>
        <div className="absolute top-24 right-16 w-40 h-20 bg-white rounded-full opacity-60 filter blur-xs"></div>
        <div className="absolute bottom-20 left-16 w-36 h-16 bg-white rounded-full opacity-50 filter blur-xs"></div>

        <div className="mx-auto max-w-4xl px-4 py-16 flex flex-col items-center relative z-10">
          {/* Sheriff Star Badge */}
          <span className="text-[10px] font-black tracking-widest text-amber-800 bg-amber-100 border border-amber-200 px-4 py-2 rounded-full uppercase mb-6 flex items-center gap-1.5 shadow-sm">
            ⭐ Sheriff's Office & Space Ranger HQ ⭐
          </span>

          {/* Toy Story Title */}
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-indigo-950 leading-tight max-w-3xl drop-shadow-sm">
            Welcome to Andy's Toy Chest!
          </h1>
          
          {/* Subtitle */}
          <p className="mt-4 text-sm md:text-base text-slate-600 max-w-2xl leading-relaxed">
            Welcome to the playroom! Log in as Woody or Buzz to manage the Room Console, or check out Andy's secret Toy Chest settings. Don't let Sid into the yard!
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <Link
              href="/dashboard"
              className="h-11 px-6 rounded-full bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-black transition-all shadow-md shadow-indigo-200 flex items-center justify-center cursor-pointer hover:scale-[1.02]"
            >
              Enter Andy's Room
            </Link>
            <Link
              href="/login"
              className="h-11 px-6 rounded-full border border-indigo-250 bg-white text-indigo-750 text-xs font-black hover:bg-indigo-50 transition-all flex items-center justify-center cursor-pointer"
            >
              Sign In Panel
            </Link>
          </div>

          {/* Playroom Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left w-full">
            {/* Card 1: Woody */}
            <div className="p-6 bg-white/80 backdrop-blur-md border border-sky-200/60 rounded-2xl shadow-sm hover:border-amber-400 hover:scale-[1.01] transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-4 text-base border border-amber-100">
                🤠
              </div>
              <h3 className="text-xs font-black text-indigo-950 uppercase tracking-wider mb-2">
                Woody's Round-Up
              </h3>
              <p className="text-[11px] text-slate-550 leading-relaxed">
                "Reach for the sky!" Join the Sheriff to secure Andy's room. Managing resources here requires at least a Store Assistant / Toy role.
              </p>
            </div>

            {/* Card 2: Buzz */}
            <div className="p-6 bg-white/80 backdrop-blur-md border border-sky-200/60 rounded-2xl shadow-sm hover:border-green-400 hover:scale-[1.01] transition-all">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center font-bold mb-4 text-base border border-green-100">
                🚀
              </div>
              <h3 className="text-xs font-black text-indigo-950 uppercase tracking-wider mb-2">
                Star Command
              </h3>
              <p className="text-[11px] text-slate-550 leading-relaxed">
                "To infinity and beyond!" Buzz helps log all cosmic API calls and secure local HttpOnly cookie payloads against browser alien hacks.
              </p>
            </div>

            {/* Card 3: Sid's Warning */}
            <div className="p-6 bg-white/80 backdrop-blur-md border border-sky-200/60 rounded-2xl shadow-sm hover:border-red-400 hover:scale-[1.01] transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center font-bold mb-4 text-base border border-red-100">
                💀
              </div>
              <h3 className="text-xs font-black text-indigo-950 uppercase tracking-wider mb-2">
                Sid's Yard Warning
              </h3>
              <p className="text-[11px] text-slate-550 leading-relaxed">
                Danger ahead! Sid wants to disassemble our toys. Sid's account role is classified as a "Customer / User" and will be locked out of the room.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
