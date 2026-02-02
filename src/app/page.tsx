import Link from "next/link";
import Image from "next/image";
import { getWallpapers } from "@/http/actions";
import { Suspense } from "react";
import { CarouselSize } from "@/components/layout/categoryCarousel";
import { Skeleton } from "@/components/ui/skeleton";

async function WallpaperList() {
  const wallpapers = await getWallpapers();

  return (
    <>
      {wallpapers.map((wp) => (
        <Link key={wp.id} href={`/wp/${wp.key}`}>
          <div className="relative aspect-16/10 rounded-[6px] overflow-hidden">
            <Image
              src={wp.image_url}
              alt="Wallpaper"
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500"
            />
          </div>
        </Link>
      ))}
    </>
  );
}

function WallpaperGridSkeleton() {
  return Array.from({ length: 8 }).map((_, i) => (
    <Skeleton key={i} className="aspect-16/10 rounded-[6px] bg-zinc-800" />
  ));
}

export default function Home() {
  return (
    <>
      <div className="relative overflow-hidden before:z-20 before:absolute before:w-full before:h-full before:inset-0 before:bg-linear-to-br before:via-transparent before:to-[#0a0a0a] before:select-none before:pointer-events-none">
        <div className="absolute z-10 inset-0 bg-linear-to-br from-blue-500/10 via-transparent to-indigo-500/10 select-none pointer-events-none" />
        <div className="absolute z-10 inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920')] bg-cover bg-center opacity-6 select-none pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 z-30">
          <div className="text-center mb-8">
            <h1 className="font-fascinate mb-4 text-4xl md:text-5xl">
              VisuWall
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Melhores{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-600">
                Wallpapers!
              </span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Descubra e baixe papéis de parede de alta qualidade para você
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-316.5 px-6 pt-6 pb-8 mx-auto relative w-full">
        <CarouselSize/>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-7.5 mt-4">
          <Suspense fallback={<WallpaperGridSkeleton />}>
            <WallpaperList />
          </Suspense>
        </div>
      </div>
      
    </>
  );
}
