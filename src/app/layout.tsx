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
          TODO Context 9:  Wrap with <NotifProvider>
          TODO Context 20: Wrap with <CartProvider>

          The notification bell panel lives inside Navigation — no separate
          ToastContainer needed. Just wrap children with both providers.
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
