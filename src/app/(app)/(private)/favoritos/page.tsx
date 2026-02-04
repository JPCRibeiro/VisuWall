import { Heart, Star } from "lucide-react";

export default function FavoritosPage() {
  return (
    <div>
      <div className="bg-[radial-gradient(500px_80px_at_0px_top,rgba(96,240,209,0.3),transparent)] py-3.5 px-7 pl-7 pt-3.5 pr-5">
        <h3 className="text-white text-[30px] font-bold [text-shadow:1px_2px_4px_#000] flex items-center gap-3 mb-2">
          <Star className="filter-[drop-shadow(0_4px_2px_#141414)]" size={40} color="#03e3b8"/>
          Favoritos
        </h3>
        <p className="text-white font-semibold text-[16px]">
          Wallpapers curtidos por você
        </p>
      </div>
    </div>
  )
}