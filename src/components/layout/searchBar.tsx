import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function SearchBar() {
  return (
    <div className="relative group select-none max-w-2xl mx-auto">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#03e3b8]"
        size={20}
      />
      <Input
        id="wallpaper-query"
        name="wallpaper-query"
        type="text"
        className="pl-12 h-12 bg-[#181818]/75 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus:border-[#03e3b8] flex"
        placeholder="Buscar Wallpapers..."
      />
    </div>
  );
}

// ({ value, onChange }: { value: string; onChange: (value: string) => void })
