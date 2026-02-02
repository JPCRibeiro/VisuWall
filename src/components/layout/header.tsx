import Link from "next/link";
import { Sparkles } from "lucide-react";
import NavItems from "./navItems";
import { UserNav } from "./userNav";
import { Suspense } from "react";
import Sidebar from "./sidebar";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0ae0] backdrop-blur-[6px] border-b border-zinc-900 shadow-[inset_0_0_0_0px_rgba(31,31,31,.66),0_0_0px_rgba(0,0,0,.75),0_0_2px_rgba(0,0,0,.75)]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-[28px] text-white hidden sm:block select-none font-fascinate">
              VisuWall
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            
            <NavItems />
          </div>
          <div> 
            <Suspense fallback={<div className="w-10 h-10 rounded-full bg-zinc-800 animate-pulse" />}>
              <UserNav />
            </Suspense>
          </div>
          <Sidebar/>
        </div>
      </div>
    </header>
  );
}