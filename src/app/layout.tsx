import type { Metadata } from "next";
import { Fascinate, Source_Sans_3, Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const fredoka = Fascinate({
  variable: "--font-fredoka",
  weight: "400",
});

export const metadata: Metadata = {
  title: "VisuWall - Wallpapers Incríveis",
  description: "Wallpaper Website",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${fredoka.variable} antialiased font-sans min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}