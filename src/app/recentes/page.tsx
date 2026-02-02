import { Clock } from "lucide-react";
import Link from "next/link";

export default function RecentesPage() {
  return (
    <div className=" bg-[#0a0a0a]">
      <div className="bg-[radial-gradient(800px_80px_at_0px_top,#0068ff63,transparent)] pl-10 pt-5 pr-5">
        <h3 className="text-white text-[30px] font-bold [text-shadow:1px_2px_4px_#000] flex items-center gap-3 mb-2">
          <Clock className="text-blue-500" size={40} />
          Mais Recentes
        </h3>
        <p className="text-white font-semibold text-[18px]">
          Últimos wallpapers postados por nossos usuários!
        </p>
      </div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-7.5">
          <div className="group relative rounded-[4px] overflow-hidden bg-zinc-900">
            <Link href="/recentes/1">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src="https://kqlvxwxfsvznkeobbowz.supabase.co/storage/v1/object/public/wallpapers/wallhaven-xeeomd.jpg"
                  className="w-full h-full object-cover transition-transform duration-500 select-none"
                />
              </div>
            </Link>
          </div>
          <div className="group relative rounded-[4px] overflow-hidden bg-zinc-900">
            <Link href="/recentes/2">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src="https://kqlvxwxfsvznkeobbowz.supabase.co/storage/v1/object/public/wallpapers/imagem.jpg"
                  className="w-full h-full object-cover transition-transform duration-500 select-none"
                />
              </div>
            </Link>
          </div>
          <div className="group relative rounded-[4px] overflow-hidden bg-zinc-900">
            <Link href="/recentes/3">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src="https://kqlvxwxfsvznkeobbowz.supabase.co/storage/v1/object/public/wallpapers/wallhaven-xeeomd.jpg"
                  className="w-full h-full object-cover transition-transform duration-500 select-none"
                />
              </div>
            </Link>
          </div>
          <div className="group relative rounded-[4px] overflow-hidden bg-zinc-900">
            <Link href="/recentes/4">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src="https://kqlvxwxfsvznkeobbowz.supabase.co/storage/v1/object/public/wallpapers/wallhaven-xeeomd.jpg"
                  className="w-full h-full object-cover transition-transform duration-500 select-none"
                />
              </div>
            </Link>
          </div>
          <div className="group relative rounded-[4px] overflow-hidden bg-zinc-900">
            <Link href="/recentes/4">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src="https://kqlvxwxfsvznkeobbowz.supabase.co/storage/v1/object/public/wallpapers/wallhaven-xeeomd.jpg"
                  className="w-full h-full object-cover transition-transform duration-500 select-none"
                />
              </div>
            </Link>
          </div>
          <div className="group relative rounded-[4px] overflow-hidden bg-zinc-900">
            <Link href="/recentes/4">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src="https://kqlvxwxfsvznkeobbowz.supabase.co/storage/v1/object/public/wallpapers/wallhaven-xeeomd.jpg"
                  className="w-full h-full object-cover transition-transform duration-500 select-none"
                />
              </div>
            </Link>
          </div>
          <div className="group relative rounded-[4px] overflow-hidden bg-zinc-900">
            <Link href="/recentes/4">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src="https://kqlvxwxfsvznkeobbowz.supabase.co/storage/v1/object/public/wallpapers/wallhaven-xeeomd.jpg"
                  className="w-full h-full object-cover transition-transform duration-500 select-none"
                />
              </div>
            </Link>
          </div>
          <div className="group relative rounded-[4px] overflow-hidden bg-zinc-900">
            <Link href="/recentes/4">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src="https://kqlvxwxfsvznkeobbowz.supabase.co/storage/v1/object/public/wallpapers/wallhaven-xeeomd.jpg"
                  className="w-full h-full object-cover transition-transform duration-500 select-none"
                />
              </div>
            </Link>
          </div>
          <div className="group relative rounded-[4px] overflow-hidden bg-zinc-900">
            <Link href="/recentes/4">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src="https://kqlvxwxfsvznkeobbowz.supabase.co/storage/v1/object/public/wallpapers/wallhaven-xeeomd.jpg"
                  className="w-full h-full object-cover transition-transform duration-500 select-none"
                />
              </div>
            </Link>
          </div>
          <div className="group relative rounded-[4px] overflow-hidden bg-zinc-900">
            <Link href="/recentes/4">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src="https://kqlvxwxfsvznkeobbowz.supabase.co/storage/v1/object/public/wallpapers/wallhaven-xeeomd.jpg"
                  className="w-full h-full object-cover transition-transform duration-500 select-none"
                />
              </div>
            </Link>
          </div>
          <div className="group relative rounded-[4px] overflow-hidden bg-zinc-900">
            <Link href="/recentes/4">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src="https://kqlvxwxfsvznkeobbowz.supabase.co/storage/v1/object/public/wallpapers/wallhaven-xeeomd.jpg"
                  className="w-full h-full object-cover transition-transform duration-500 select-none"
                />
              </div>
            </Link>
          </div>
          <div className="group relative rounded-[4px] overflow-hidden bg-zinc-900">
            <Link href="/recentes/4">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src="https://kqlvxwxfsvznkeobbowz.supabase.co/storage/v1/object/public/wallpapers/wallhaven-xeeomd.jpg"
                  className="w-full h-full object-cover transition-transform duration-500 select-none"
                />
              </div>
            </Link>
          </div>
          <div className="group relative rounded-[4px] overflow-hidden bg-zinc-900">
            <Link href="/recentes/4">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src="https://kqlvxwxfsvznkeobbowz.supabase.co/storage/v1/object/public/wallpapers/wallhaven-xeeomd.jpg"
                  className="w-full h-full object-cover transition-transform duration-500 select-none"
                />
              </div>
            </Link>
          </div>
          <div className="group relative rounded-[4px] overflow-hidden bg-zinc-900">
            <Link href="/recentes/4">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src="https://kqlvxwxfsvznkeobbowz.supabase.co/storage/v1/object/public/wallpapers/wallhaven-xeeomd.jpg"
                  className="w-full h-full object-cover transition-transform duration-500 select-none"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
