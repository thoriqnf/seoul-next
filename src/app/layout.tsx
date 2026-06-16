import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ==========================================
// TODO Context 8: Import NotifProvider and mount it in the root layout
// The Provider must sit above every component that needs to read from it
// Root layout = global scope → every page gets access to notification state
// ==========================================
import { NotifProvider } from "@/contexts/NotifContext";

// ==========================================
// TODO Context 9: Import ToastContainer and render it inside NotifProvider
// ToastContainer also uses useNotif(), so it must live inside the Provider
// Placing it in layout means it is always visible on every page
// ==========================================
import { ToastContainer } from "@/components/ToastContainer";

// ==========================================
// TODO Context 20: Import CartProvider and wrap alongside NotifProvider
// Two independent global states — they nest without interfering with each other
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
        {/* ==========================================
            TODO Context 8: Wrap children with NotifProvider
            TODO Context 20: Wrap children with CartProvider
            Order matters — CartProvider is inside NotifProvider
            both providers are independent and can be in any order
            ========================================== */}
        <NotifProvider>
          <CartProvider>
            {children}
            {/* ==========================================
                TODO Context 9: Mount ToastContainer here
                It lives inside NotifProvider so it can call useNotif()
                It renders outside {children} so it overlays every page
                ========================================== */}
            <ToastContainer />
          </CartProvider>
        </NotifProvider>
      </body>
    </html>
  );
}
