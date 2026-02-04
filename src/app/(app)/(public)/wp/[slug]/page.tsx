import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getWallpaper } from "@/http/actions";
import { ArrowLeft, Download, Eye, Heart, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

async function WallpaperDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const wallpaper = await getWallpaper(slug);

  if (!wallpaper) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
        <p className="text-lg">Wallpaper não encontrado.</p>
        <Link href="/" className="text-blue-500 hover:underline mt-2">
          Voltar para o início
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
          <Image
            src={wallpaper.image_url}
            alt={`Wallpaper ${wallpaper.category}`}
            width={wallpaper.width}
            height={wallpaper.height}
            quality={100}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-white mb-2 capitalize">
            {wallpaper.category} Wallpaper
          </h1>
          <div className="flex items-center gap-4 text-sm text-zinc-400 mb-6">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" /> {wallpaper.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" /> {wallpaper.favorites_count}
            </span>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full bg-white text-black hover:bg-zinc-200"
              asChild
            >
              <a
                href={wallpaper.image_url}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Download className="w-4 h-4 mr-2" />
                Baixar Original ({wallpaper.width}x{wallpaper.height})
              </a>
            </Button>

            <Button
              variant="outline"
              className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              <Heart className="w-4 h-4 mr-2" />
              Favoritar
            </Button>

            <Button
              variant="ghost"
              className="w-full text-zinc-400 hover:text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>

        {/* Tags / Info Adicional */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
            Detalhes
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-zinc-500">Resolução</div>
            <div className="text-zinc-300 text-right">
              {wallpaper.width} x {wallpaper.height}
            </div>

            <div className="text-zinc-500">Categoria</div>
            <div className="text-zinc-300 text-right capitalize">
              {wallpaper.category}
            </div>

            <div className="text-zinc-500">Upload</div>
            <div className="text-zinc-300 text-right">
              {new Date(wallpaper.created_at).toLocaleDateString("pt-BR")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function WallpaperPage({ params }: PageProps) {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/"
          className="flex items-center text-zinc-400 hover:text-white w-fit"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Suspense fallback={<WallpaperDetailsSkeleton />}>
          <WallpaperDetails params={params} />
        </Suspense>
      </div>
    </div>
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
