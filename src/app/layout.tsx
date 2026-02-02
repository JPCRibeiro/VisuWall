import type { Metadata } from "next";
import { Geist, Fascinate_Inline } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VisuWall - Wallpapers",
  description: "Wallpaper Website",
};

const fascinate = Fascinate_Inline({
  variable: "--font-fascinate-inline",
  weight: "400",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${fascinate.variable} antialiased font-sans`}>
       
          <Header/>
        <main className="pt-32 sm:pt-16">{children}</main>
      </body>
    </html>
  );
}
