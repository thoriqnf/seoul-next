import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export default function UnauthorizedPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-sky-50 flex flex-col justify-center font-sans pb-24">
        <div className="w-full max-w-md mx-auto px-6">
          <div className="bg-white border-2 border-rose-200 border-b-4 border-b-rose-300 rounded-3xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-5 border-2 border-rose-100 shadow-inner">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-black text-rose-950 mb-3 font-toy uppercase tracking-wider">
              Sid's Yard!
            </h1>
            
            <p className="text-xs text-slate-700 mb-8 leading-relaxed font-semibold">
              Oh no! You've wandered into Sid's yard, and he's looking for toys to customize! Only Andy and approved toys are allowed in Andy's room.
            </p>

            <div className="flex flex-col gap-4">
              <Link
                href="/login"
                className="btn-toy-red w-full text-center uppercase tracking-wider"
              >
                Sign In as Approved Toy / Andy
              </Link>
              
              <Link
                href="/"
                className="text-xs text-indigo-700 font-extrabold hover:text-indigo-900 hover:underline transition-colors mt-2 font-toy"
              >
                Back to Toy Room Entrance
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
