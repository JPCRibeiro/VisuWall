"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

function generateShortId(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function uploadWallpaper(formData: FormData) {
  const supabase = await createClient();

  const category = formData.get("category") as string;
  const tagsJson = formData.get("tags") as string;
  const tags = tagsJson ? JSON.parse(tagsJson) : [];
  const file = formData.get("file") as File;
  const width = Number(formData.get("width"));
  const height = Number(formData.get("height"));

  const shortId = generateShortId();
  const ext = file.name.split(".").pop();
  const displayName = `visuwall-${shortId}.${ext}`;

  const { data: storageData, error: storageError } = await supabase.storage
    .from('wallpapers')
    .upload(displayName, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (storageError) throw storageError;
    
  const { data: publicData } = supabase.storage
    .from("wallpapers")
    .getPublicUrl(storageData.path);

  const image_url = publicData.publicUrl;
  const user = (await supabase.auth.getUser()).data.user;

  const { error: insertError } = await supabase.from("wallpapers").insert({
    key: shortId,
    image_url,
    width,
    height,
    thumbnail_url: null,
    category,
    colors: [],
    tags, 
    user_id: user?.id,
  });

  if (insertError) throw insertError;

  revalidatePath("/");
  redirect("/");
}