"use client";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState, useTransition } from "react"; 
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { toggleFavoriteAction } from "@/http/actions";

interface FavoriteButtonProps {
  wallpaperId: string;
  isFavorited: boolean;
  userId?: string;
}

export default function FavoriteButton({ 
  wallpaperId, 
  isFavorited: initialIsFavorited,
  userId,
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const handleToggle = async () => {
    if (!userId) {
      router.push("/login");
      return;
    }

    const previousState = isFavorited;
    setIsFavorited(!isFavorited);

    startTransition(async () => {
      const result = await toggleFavoriteAction(wallpaperId, pathname);

      if (result?.error) {
        setIsFavorited(previousState);
        alert(result.error);
      }
    });
  };

  return (
    <Button
      variant="secondary"
      size="lg"
      className={cn(
        "w-full gap-2 transition-all duration-300 border-2 border-white hover:bg-zinc-800 flex justify-center items-center",
        isFavorited && " hover:bg-red-500/20 text-[#fb7185] bg-[#f43f5d5a]! shadow-[#f43f5d30]"
      )}
      onClick={handleToggle}
      disabled={isPending}
    >
      <Star
        className={cn(
          "w-4! h-4! transition-transform duration-300",
          isFavorited ? "fill-current" : ""
        )}
      />
      {isFavorited ? "Favoritado" : "Favoritar"}
    </Button>
  );
}