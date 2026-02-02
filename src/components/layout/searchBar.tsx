import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
      <Input
        type="text"
        placeholder="Buscar Wallpapers..."
        className="pl-12 pr-4 h-12 bg-zinc-900/80 border-zinc-800 text-white placeholder:text-zinc-500 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
      />
    </div>
  );
}

// ({ value, onChange, placeholder = "Search wallpapers..." }: { value: string; onChange: (value: string) => void; placeholder?: string })