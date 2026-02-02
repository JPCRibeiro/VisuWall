import type { Metadata } from "next";
import { Geist, Geist_Mono, Fascinate_Inline } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VisuWall | Todo  os Tipo de Wallpapers",
  description: "Wallpaper Website",
};

const fascinate = Fascinate_Inline({
  variable: "--font-fascinate-inline",
  weight: "400",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${fascinate.variable} ${geistMono.variable} antialiased font-sans`}>
       
          <Header/>
        <main className="pt-32 sm:pt-16">{children}</main>
      </body>
    </html>
  );
}
