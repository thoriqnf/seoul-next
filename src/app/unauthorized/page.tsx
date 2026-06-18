import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export default function UnauthorizedPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-ramen-bg flex flex-col justify-center font-sans pb-24">
        <div className="w-full max-w-md mx-auto px-6">
          <div className="bg-ramen-card border border-ramen-border rounded-2xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 bg-red-950/40 text-ramen-crimson rounded-2xl flex items-center justify-center mx-auto mb-5 border border-ramen-crimson/30 shadow-inner">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-black text-ramen-text mb-3 font-serif uppercase tracking-wider">
              Access Restricted
            </h1>
            
            <p className="text-xs text-ramen-muted mb-8 leading-relaxed font-semibold">
              Only Master Curators and Recipe Editors are authorized to view the Saved Recipe Board. Explore the menu to check out public recipes!
            </p>

            <div className="flex flex-col gap-4">
              <Link
                href="/login"
                className="btn-ramen-primary w-full text-center"
              >
                Sign In as Curator
              </Link>
              
              <Link
                href="/recipes"
                className="text-xs text-ramen-gold font-bold hover:text-ramen-gold-light hover:underline transition-colors mt-2"
              >
                Back to Menu
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
