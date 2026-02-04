import Link from "next/link";
import Image from "next/image";
import { getWallpapers } from "@/http/actions";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SearchBar from "@/components/layout/searchBar";
import { Clock, Star, Upload, Wallpaper } from "lucide-react";
import Header from "@/components/layout/header/header";

export async function WallpaperList({ limit }: { limit?: number }) {
  const wallpapers = await getWallpapers();

  if (!wallpapers) {
    return;
  }

  const visibleWallpapers = limit ? wallpapers.slice(0, limit) : wallpapers;

  return (
    <>
      {visibleWallpapers.map((wp) => (
        <Link key={wp.id} href={`/wp/${wp.key}`}>
          <div className="relative aspect-16/10 rounded-[6px] overflow-hidden">
            <Image
              src={wp.image_url}
              alt="Wallpaper"
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 select-none"
            />
          </div>
        </Link>
      ))}
    </>
  );
}

export function WallpaperGridSkeleton() {
  return Array.from({ length: 8 }).map((_, i) => (
    <Skeleton key={i} className="aspect-16/10 rounded-[6px] bg-zinc-800" />
  ));
}

export default function Home() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(3_227_184/.2),transparent,transparent)] from-[#03e3b8]/20 via-transparent to-transparent" />
      <Header/>
      <main>
        <div className="relative overflow-hidden mb-10">
          <div className="relative container mx-auto px-4 pt-12">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Descubra
                <span className="bg-linear-to-r from-[#03e3b8] to-[#3AEDE3] bg-clip-text text-transparent">
                  {" "}
                  Wallpapers{" "}
                </span>
                Incríveis
              </h1>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Explore wallpapers de alta qualidade para seu computador e
                celular
              </p>
            </div>
            <div className="flex justify-center gap-5 mb-10 flex-wrap">
              <Link href={"/wallpapers"} className="w-30 h-30 bg-[#181818]/70 p-4 rounded-[6px] border border-[#2a2a2a] shadow-md shadow-black/20 flex flex-col justify-center items-center gap-2 text-[#B4B4B4] hover:text-[#03e3b8] transition-colors duration-200 font-medium">
                <Wallpaper size={26}/>
                Wallpapers
              </Link>
              <Link href={"/favoritos"} className="w-30 h-30 bg-[#181818]/75 p-4 rounded-[6px] border border-[#2a2a2a] shadow-md shadow-black/20 flex flex-col justify-center items-center gap-2 text-[#B4B4B4] hover:text-[#03e3b8] transition-colors duration-200 font-medium">
                <Star size={26}/>
                Favoritos
              </Link>
              <Link href={"/upload"} className="w-30 h-30 bg-[#181818]/75 p-4 rounded-[6px] border border-[#2a2a2a] shadow-md shadow-black/20 flex flex-col justify-center items-center gap-2 text-[#B4B4B4] hover:text-[#03e3b8] transition-colors duration-200 font-medium">
                <Upload size={26}/>
                Upload
              </Link>
            </div>
            <SearchBar/>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex flex-wrap gap-6 mb-8 text-sm text-zinc-400 font-medium">
            <span className="flex items-center gap-2">
              <Clock className="text-[#03e3b8]" size={16}/>
              Atualizado diariamente
            </span>
            <span className="flex items-center gap-2">
              <Upload className="text-[#03e3b8]" size={16}/>
              Download grátis
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <Suspense fallback={<WallpaperGridSkeleton />}>
              <WallpaperList limit={8}/>
            </Suspense>
          </div>             
        </div>
        
      </main>
    </>
  );
}
