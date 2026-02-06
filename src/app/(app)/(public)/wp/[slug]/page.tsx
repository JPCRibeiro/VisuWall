import DownloadCounter from "@/components/layout/downloadCounter";
import FavoriteButton from "@/components/layout/favoriteButton";
import { ViewCounter } from "@/components/layout/viewCounter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getWallpaper, incrementDownloadAction } from "@/http/actions";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, Calendar, Download, Eye, Layers, Star, Tag, TvMinimal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function WallpaperDetails({ params }: PageProps) {
  const { slug } = await params;
  const wallpaper = await getWallpaper(slug);
  const supabase = await createClient();

  if (!wallpaper) {
    return notFound();
  }

  console.log(wallpaper);

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  let isFavorited = false;

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", wallpaper.user_id)
    .maybeSingle();

  const username = profile?.username;
  const initial = username && username[0].toUpperCase();

  if (currentUser) {
    const { data: existing } = await supabase
      .from("favorites")
      .select("user_id")
      .eq("user_id", currentUser.id)
      .eq("wallpaper_id", wallpaper.id)
      .maybeSingle();

    isFavorited = !!existing;
  }

  return (
    <>
      <aside className="fixed left-0 top-16 w-75 h-[calc(100vh-4rem)] bg-backgorund border-r border-zinc-900 shadow-[0_0_10px_rgba(0,0,0,0.4)] overflow-y-auto z-40">
        <div className="px-6 py-5 border-b border-zinc-800">
          <Link
            href="/"
            className="flex items-center text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Link>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <DownloadCounter wallpaperId={wallpaper.id} wallpaperIMGUrl={wallpaper.image_url}/>
            <FavoriteButton
              wallpaperId={wallpaper.id}
              userId={currentUser?.id}
              isFavorited={isFavorited}
            />
          <div>
            <h3 className="text-sm text-zinc-400 mb-1 uppercase tracking-wide font-semibold">
              <Layers size={18} className="text-[#03e3b8] inline mr-1" />
              Categoria
            </h3>
            <p className="text-white font-medium capitalize flex items-center gap-2">
              {wallpaper.category || "Não definida"}
            </p>
          </div>

          <div>
            <h3 className="text-sm text-zinc-400 mb-2 uppercase tracking-wide font-semibold">
              <Tag className="inline mr-1 text-[#03e3b8]" size={18} />
              Tags
            </h3>
            {wallpaper.tags?.length ? (
              <div className="flex flex-wrap gap-2">
                {wallpaper.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-md border border-zinc-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-zinc-400 text-sm">Sem tags</p>
            )}
          </div>

          <div>
            <h3 className="text-sm text-zinc-400 mb-2 uppercase tracking-wide font-semibold flex items-center gap-2">
              <TvMinimal size={18} color="#03e3b8" />
              Resolução
            </h3>
            <p className="text-white font-medium">
              {wallpaper.width} × {wallpaper.height}
            </p>
          </div>

          <div>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li className="flex items-center gap-2">
                <Eye size={15} className="text-[#03e3b8]" />{" "}
                {wallpaper.views ?? 0} visualizações
                <ViewCounter wallpaperId={wallpaper.id}/>
              </li>
              <li className="flex items-center gap-2">
                <Download size={15} className="text-[#03e3b8]" />{" "}
                {wallpaper.downloads ?? 0} downloads
              </li>
              <li className="flex items-center gap-2">
                <Star size={15} className="text-[#03e3b8]" />{" "}
                {wallpaper.favorites_count ?? 0} favoritos
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm text-zinc-400 mb-2 uppercase tracking-wide font-semibold flex items-center">
              <Calendar size={15} className="text-[#03e3b8] inline mr-1 " />
              Enviado em
            </h3>
            <p className="text-white font-medium flex items-center gap-2">
              {new Date(wallpaper.created_at).toLocaleDateString("pt-BR")}
            </p>
          </div>

          <div className="text-zinc-400 flex gap-2 items-center">
            Enviado por:{" "}
            <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#03e3b8] to-[#3AEDE3] flex items-center justify-center mr-1">
              <span className="text-background text-sm font-semibold">
                {initial}
              </span>
            </div>
            <span className="text-white font-semibold">
              {profile?.username || "Usuário desconhecido"}
            </span>
          </div>
        </div>
      </aside>
      <div className="relative min-h-full ml-75">
        <section className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={wallpaper.image_url}
              alt={`Wallpaper ${wallpaper.category}`}
              width={wallpaper.width}
              height={wallpaper.height}
              quality={100}
              loading="eager"
              className="max-w-[95%] max-h-[95%] m-auto absolute inset-0 block object-contain"
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default function WallpaperPage({ params }: PageProps) {
  return (
    <>
      <Suspense fallback={<WallpaperDetailsSkeleton />}>
        <WallpaperDetails params={params} />
      </Suspense>
    </>
  );
}

function WallpaperDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
      <Skeleton className="lg:col-span-2 aspect-2/3 md:aspect-16/10 rounded-xl bg-zinc-800" />
      <div className="space-y-6">
        <Skeleton className="h-40 w-full rounded-xl bg-zinc-800" />
        <Skeleton className="h-20 w-full rounded-xl bg-zinc-800" />
      </div>
    </div>
  );
}
