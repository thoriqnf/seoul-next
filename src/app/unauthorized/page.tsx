import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export default function UnauthorizedPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-rose-50/20 flex flex-col justify-center font-sans pb-24">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-white border border-rose-100 rounded-2xl p-8 shadow-sm text-center">
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h1 className="text-xl font-black text-rose-950 mb-2">
              Sid's Yard!
            </h1>
            
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Oh no! You've wandered into Sid's yard, and he's looking for toys to customize! Only Andy and approved toys are allowed in Andy's room.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="w-full inline-flex items-center justify-center h-10 rounded-full bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-black transition-colors shadow-sm cursor-pointer"
              >
                Sign In as Approved Toy / Andy
              </Link>
              
              <Link
                href="/"
                className="text-xs text-indigo-700 font-bold hover:underline transition-colors mt-2"
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
