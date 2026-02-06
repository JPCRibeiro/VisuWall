import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Star } from "lucide-react";
import { getFavoriteWallpapers } from "@/http/actions";

interface FavoriteItem {
  wallpaper_id: string;
  wallpapers: {
    key: string;
    image_url: string;
  } | null;
}

export async function WallpaperList() {
  const favorites = await getFavoriteWallpapers();

  // @ts-ignore (Caso o typescript reclame da tipagem do join do supabase)
  const safeFavorites: FavoriteItem[] = favorites;

  if (!safeFavorites || safeFavorites.length === 0) {
    return (
      <div className="col-span-full text-center py-20 text-zinc-500">
        <p>Você ainda não favoritou nenhum wallpaper.</p>
      </div>
    );
  }

  return (
    <>
      {safeFavorites.map((item) => {
        const wallpaper = item.wallpapers; 
        if (!wallpaper) return null; 

        return (
          <Link key={item.wallpaper_id} href={`/wp/${wallpaper.key}`} className="block group">
            <div className="relative aspect-16/10 rounded-[6px] overflow-hidden bg-zinc-800 border border-zinc-800 transition-colors">
              <Image
                src={wallpaper.image_url}
                alt="Wallpaper Favorito"
                fill
                quality={75} 
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 select-none group-hover:scale-105"
              />
              
              <div className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full backdrop-blur-sm">
                <Star size={12} className="fill-[#03e3b8] text-[#03e3b8]" />
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default function FavoritosPage() {
  return (
    <div>
      <div className="bg-[radial-gradient(500px_80px_at_0px_top,rgba(96,240,209,0.3),transparent)] py-3.5 px-7 pl-7 pt-3.5 pr-5 mb-8">
        <h3 className="text-white text-[30px] font-bold [text-shadow:1px_2px_4px_#000] flex items-center gap-3 mb-2">
          <Star className="filter-[drop-shadow(0_4px_2px_#141414)]" size={40} color="#03e3b8"/>
          Favoritos
        </h3>
        <p className="text-white font-semibold text-[16px]">
          Wallpapers curtidos por você
        </p>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Suspense fallback={<p className="text-zinc-500">Carregando favoritos...</p>}>
            <WallpaperList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}