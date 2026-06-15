import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export default function UnauthorizedPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-24 flex flex-col justify-center font-sans">
        <div className="bg-white dark:bg-zinc-950/40 border border-slate-200/65 dark:border-neutral-800/85 rounded-2xl p-8 shadow-sm text-center">
          <div className="w-12 h-12 bg-red-50 dark:bg-red-950/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h1 className="text-xl font-extrabold text-slate-800 dark:text-zinc-100 mb-2">
            Access Denied
          </h1>
          
          <p className="text-xs text-slate-500 dark:text-zinc-400 mb-6 leading-relaxed">
            You do not have the required permissions (Role-Based Access Control) to access this administrative resource. 
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              className="btn-primary w-full inline-flex items-center justify-center h-10 rounded-full bg-[#00828A] hover:bg-[#006e75] text-white text-xs font-bold transition-colors shadow-sm"
            >
              Sign In with Another Account
            </Link>
            
            <Link
              href="/"
              className="text-xs text-[#00828A] dark:text-teal-400 font-bold hover:underline transition-colors mt-2"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
