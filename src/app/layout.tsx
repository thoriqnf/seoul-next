import type { Metadata } from "next";
import { Noto_Serif_JP, DM_Sans } from "next/font/google";
import "./globals.css";
import { NotifProvider } from "@/contexts/NotifContext";
import { SavedProvider } from "@/contexts/SavedContext";
import { ToastContainer } from "@/components/ToastContainer";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-noto-serif-jp",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Ramen Discovery - Taste and Share Authentic Recipes",
  description: "Explore the culinary art of premium ramen recipes. Curated globally, loved locally.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSerifJP.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ramen-bg text-ramen-text flex flex-col font-sans">
        <NotifProvider>
          <SavedProvider>
            {children}
            <ToastContainer />
          </SavedProvider>
        </NotifProvider>
      </body>
    </html>
  );
}
