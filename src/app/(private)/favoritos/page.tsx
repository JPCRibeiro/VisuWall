import { Heart } from "lucide-react";

export default function FavoritosPage() {
  return (
    <div>
      <div className="bg-[radial-gradient(800px_80px_at_0px_top,#0068ff63,transparent)] pl-10 pt-5 pr-5">
        <h3 className="text-white text-[30px] font-bold [text-shadow:1px_2px_4px_#000] flex items-center gap-3 mb-2">
          <Heart className="text-blue-500 w-10 h-10"/>
          Favoritos
        </h3>
        <p className="text-white font-semibold text-[18px]">
          Wallpapers curtidos por você
        </p>
      </div>
    </div>
  )
}