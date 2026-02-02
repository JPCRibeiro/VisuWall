import { createClient } from "@/lib/supabase/server"; 

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