
import { incrementDownloadAction } from "@/http/actions";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { wallpaperId } = await req.json();

    if (!wallpaperId) {
      return NextResponse.json({ error: "wallpaperId é obrigatório" }, { status: 400 });
    }

    const result = await incrementDownloadAction(wallpaperId);

    if ("error" in result) {
      return NextResponse.json(result, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro na rota increment-download:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}