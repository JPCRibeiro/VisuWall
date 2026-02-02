import { createClient } from "@/lib/supabase/server";
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

export async function UserNav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Button asChild>
        <Link href="/login">Entrar</Link>
      </Button>
    );
  }

  const username = user.user_metadata?.username;
  const initial = username && username[0].toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 px-3 bg-zinc-900 hover:bg-zinc-800 rounded-xl ring-0 outline-none"
        >
          <div className="w-7 h-7 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-1">
            <span className="text-white text-xs font-medium">{initial}</span>
          </div>
          <span className="text-white text-sm max-w-25 truncate">
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
          <button type="submit" className="w-full">
            <DropdownMenuItem className="text-red-400 focus:bg-zinc-800 focus:text-red-400">
              <LogOut className="w-4 h-4 mr-2 text-red-400" />
              Sign Out
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
