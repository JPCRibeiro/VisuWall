"use client";

import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { incrementDownloadAction } from "@/http/actions";

export default function DownloadCounter({ wallpaperId, wallpaperIMGUrl }: { wallpaperId: string, wallpaperIMGUrl: string }) {
  return (
    <Button 
      variant={"primary"}
      className="w-full bg-white text-black hover:bg-zinc-200 flex justify-center items-center"
      asChild
    >
      <a
        href={wallpaperIMGUrl}
        target="_blank"
        rel="noopener noreferrer"
        download 
        onClick={() => (incrementDownloadAction(wallpaperId))}
      >
        <Download className="w-4 h-4 mr-2" />
        Baixar Original
      </a>
    </Button>
  )
}