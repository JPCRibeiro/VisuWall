"use client";

import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import Link from "next/link";
import NavItems from "../navItems";
import SearchBar from "../searchBar";
import Sidebar from "../sidebar";
import { cn } from "@/lib/utils";

interface HeaderShellProps {
  userNavSlot: React.ReactNode;
}

export default function HeaderShell({ userNavSlot }: HeaderShellProps) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const isHome = pathname === "/";

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeaderStyle = () => {
      if (!isHome) {
        header.classList.add("is-scrolled");
      } else {
        if (window.scrollY > 20) {
          header.classList.add("is-scrolled");
        } else {
          header.classList.remove("is-scrolled");
        }
      }
    };

    updateHeaderStyle();

    window.addEventListener("scroll", updateHeaderStyle, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderStyle);
  }, [isHome]);

  const baseClasses = "fixed w-full top-0 z-50 transition-all duration-300 border-b border-transparent";

  return (
    <header ref={headerRef} className={`${baseClasses} ${!isHome ? "is-scrolled" : ""}`}>
      <div className={cn(
        "mx-auto px-4",
        isHome ? "container" : ""
      )} >
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[28px] text-white select-none font-extrabold font-fredoka">
                VisuWall
              </span>
            </Link>

            {!isHome && (
              <>
                <div className="hidden md:flex items-center gap-1">
                  <NavItems/>
                </div>
                <div className="sm:block hidden">
                  <SearchBar/>
                </div>
              </>
            )}
          </div>

          <div className="gap-3 flex items-center">
            <div>
              <Suspense>
                {userNavSlot}
              </Suspense>
            </div>

            {!isHome && (
              <Sidebar/>
            )}
          </div>
        </div>
      </div>

      {!isHome && (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-4 sm:hidden">
          <SearchBar/>
        </div>
      )}
    </header>
  );
}
