import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ==========================================
// TODO Context 9: Import NotifProvider and mount it in the root layout
// ==========================================
import { NotifProvider } from "@/contexts/NotifContext";

// ==========================================
// TODO Context 20: Import CartProvider and wrap alongside NotifProvider
// ==========================================
import { CartProvider } from "@/contexts/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andy's Playroom Registry - State Management",
  description:
    "Next.js State Management demo with React Context, useReducer, and Zustand in Andy's Playroom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-sky-50 text-sky-950 flex flex-col">
        {/*
          🚨 BOTTLENECK — WHY DO THE PROVIDERS LIVE HERE?
          ───────────────────────────────────────────────────
          A Context Provider only shares state with components INSIDE it.
          The Provider must wrap the "highest common ancestor" of every
          component that needs to read from it.

          In this app, both <Navigation> and <StorePage> need cart + notif state.
          <Navigation> renders on every page. So the Provider must wrap
          the entire app — which is exactly what root layout is for.

          If we put <CartProvider> only inside /store/page.tsx:
            → <Navigation> (outside /store) would see a different, empty cart.
            → The badge would always show 0. The drawer would always be empty.

          Root layout = global scope. Wrap here = every page gets access.
          ───────────────────────────────────────────────────

          TODO Context 9:  Wrap with <NotifProvider>
          TODO Context 20: Wrap with <CartProvider>
        */}
        <NotifProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </NotifProvider>
      </body>
    </html>
  );
}
