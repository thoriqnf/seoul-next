import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Font Declarations: Import and configure Google Fonts Geist and Geist Mono.
// These variables expose the local fonts as CSS properties (--font-geist-sans / --font-geist-mono).
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. Metadata API: Set site titles and descriptions used for SEO and browser tab tags.
export const metadata: Metadata = {
  title: "Next.js TypeScript Demo - Week 2 Day 1",
  description: "Next.js with TypeScript Demo for Week 2 Day 1: interfaces, types, useState, and useEffect",
};

// 3. Root Layout Wrapper: Acts as the base HTML shell injected on every page render.
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
      {/* 
        4. Global Body Container:
           - "min-h-full flex flex-col": Extends the height to cover the full viewport screen and allows structural content flow.
           - "bg-sky-50 text-sky-950": Sets the solid, playroom light sky-blue background color and dark text color palette, ensuring consistency across browsers.
      */}
      <body className="min-h-full bg-sky-50 text-sky-950 flex flex-col">
        {children}
      </body>
    </html>
  );
}
