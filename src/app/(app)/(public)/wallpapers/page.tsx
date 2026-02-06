import { WallpaperGridSkeleton, WallpaperList } from "@/app/page";
import { Wallpaper } from "lucide-react";
import { Suspense } from "react";

export default function WallpapersPage() {
  return (
    <div>
      <div className="bg-[radial-gradient(500px_80px_at_0px_top,rgba(96,240,209,0.3),transparent)] py-3.5 px-7 pl-7 pt-3.5 pr-5">
        <h3 className="text-white text-[30px] font-bold [text-shadow:1px_2px_4px_#000] flex items-center gap-3 mb-2">
          <Wallpaper className="filter-[drop-shadow(0_4px_2px_#141414)]" size={40} color="#03e3b8"/>
          Wallpapers
        </h3>
        <p className="text-white font-semibold text-[16px]">
          Todos os wallpapers enviados pela comunidade
        </p>
      </div>
      <div className="relative mx-auto py-5 px-5">
          <div className="grid grid-cols-[repeat(auto-fit,350px)] justify-center gap-4">
            <Suspense fallback={<WallpaperGridSkeleton />}>
              <WallpaperList />
            </Suspense>
          </div>             
        </div>
    </div>
  )
}