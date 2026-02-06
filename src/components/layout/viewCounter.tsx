'use client'

import { incrementViewAction } from "@/http/actions";
import { useEffect, useRef } from "react"

export function ViewCounter({ wallpaperId }: { wallpaperId: string }) {
  // O useRef garante que a action não dispare duas vezes em React Strict Mode (desenvolvimento)
  const hasViewed = useRef(false);

  useEffect(() => {
    if (!hasViewed.current) {
      incrementViewAction(wallpaperId);
      hasViewed.current = true;
    }
  }, [wallpaperId]);

  return null; // Este componente não renderiza nada visualmente
}