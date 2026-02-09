"use client"

import { createPageUrl } from "@/lib/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItems() {
  const pathname = usePathname();
  
    const navItems = [
      { name: "Wallpapers", href: "wallpapers" },
      { name: "Favoritos", href: "favoritos" },
      { name: "Upload", href: "upload" },
    ];
  
    const isActive = (href: string) => {
      return pathname.includes(href) || (href === "/" && pathname === "/");
    };

  return (
    <>
      {navItems.map((item) => {
              return (
                <Link
                  key={item.name}
                  href={createPageUrl(item.href)}
                  className={clsx(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                    isActive(item.href)
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900",
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
    </>
  )
}