import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-20 flex flex-col items-center justify-center font-sans text-center">
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm w-full">
          <span className="text-4xl">🔍</span>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Page Not Found
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white rounded-lg transition-colors inline-block"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
