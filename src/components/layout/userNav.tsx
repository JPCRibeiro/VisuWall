'use client'

import { User } from '@supabase/supabase-js'
import { LogOut, User as UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { signOut } from "@/app/(auth)/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileData {
  username: string | null;
}

interface UserNavProps {
  user: User | null;
  profile: ProfileData | null;
}

export function UserNav({ user, profile }: UserNavProps) {
  if (!user) {
    return (
      <Button variant={"primary"} asChild>
        <Link href="/login" className="flex">Entrar</Link>
      </Button>
    );
  }

  const username = profile?.username || user.user_metadata.username;;
  const initial = username && username[0].toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="px-3 bg-[#18181B]! border! border-zinc-900! hover:bg-zinc-900 ring-0 rounded-xl flex gap-2 items-center"
        >
          <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#03e3b8] to-[#3AEDE3] flex items-center justify-center mr-1">
            <span className="text-background text-sm font-semibold">{initial}</span>
          </div>
          <span className="text-white text-sm max-w-25 truncate font-semibold">
            {username}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-zinc-900 border-zinc-800"
      >
        <DropdownMenuItem className="text-zinc-400 focus:bg-zinc-800 focus:text-white">
          <UserIcon className="w-4 h-4 mr-2" />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <form action={signOut}>
  <DropdownMenuItem asChild>
    <button 
      type="submit" 
      className="w-full flex items-center text-red-400 focus:bg-zinc-800 focus:text-red-400 cursor-pointer cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors"
    >
      <LogOut className="w-4 h-4 mr-2 text-red-400" />
      Sair
    </button>
  </DropdownMenuItem>
</form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
