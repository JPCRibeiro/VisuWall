"use server"

import { createClient } from "@/lib/supabase/server"; 
import { revalidatePath } from "next/cache";

export async function getWallpapers() {
  const supabase = await createClient(); 

  const { data, error } = await supabase
    .from("wallpapers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;  
}

export async function getWallpaper(key: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("wallpapers")
    .select("*")
    .eq("key", key)
    .maybeSingle(); 

  if (error) throw error;
  return data;  
}

export async function toggleFavoriteAction(wallpaperId: string, pathname: string) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Você precisa estar logado para favoritar." };
  }

  const { data: existingFavorite } = await supabase
    .from("favorites")
    .select("created_at") 
    .eq("user_id", user.id)
    .eq("wallpaper_id", wallpaperId)
    .maybeSingle();

  if (existingFavorite) {
    const { error: deleteError } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("wallpaper_id", wallpaperId);

    if (deleteError) return { error: "Erro ao remover favorito" };

    await supabase.rpc('decrement_favorites', { wallpaper_id: wallpaperId });
  } else {
    const { error: insertError } = await supabase
      .from("favorites")
      .insert({
        user_id: user.id,
        wallpaper_id: wallpaperId
      });

    if (insertError) return { error: "Erro ao adicionar favorito" };

    await supabase.rpc('increment_favorites', { wallpaper_id: wallpaperId });
  }

  revalidatePath(pathname);
  
  return { success: true };
}

export async function getFavoriteWallpapers() {
  const supabase = await createClient(); 

  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("favorites")
    .select(`
      created_at,
      wallpaper_id,
      wallpapers (
        id,
        key,
        image_url
      )
    `)
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  console.log(data);

  if (error) throw error;
  return data;  
}

export async function incrementViewAction(wallpaperId: string) {
  const supabase = await createClient();
  
  await supabase.rpc('increment_views', { wallpaper_id: wallpaperId });
}

export async function incrementDownloadAction(wallpaperId: string) {
  const supabase = await createClient();
  
  return await supabase.rpc('increment_downloads', { wallpaper_id: wallpaperId });
}