"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AuthForm from "./authForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(() => pathname.includes("/login"));

  useEffect(() => {
    setIsLogin(pathname.includes("/login"));
  }, [pathname]);

  return (
    <div className="min-h-svh flex flex-col bg-background overflow-hidden relative bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#03e3b8]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#3AEDE3]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-linear-to-r from-[#3AEDE3]/5 to-[#03e3b8]/5 rounded-full blur-3xl" />
      </div>
      <header className="sticky top-0 flex items-center justify-between">
        <div className="container mx-auto px-4 sm:px-4 lg:px-4 flex items-center justify-between h-16">
          <Link href="/" className="flex text-[22px] md:text-[28px] text-white select-none font-extrabold font-fredoka">
            VisuWall
          </Link>
          <Button asChild variant={"primary"}>
            <Link href={isLogin ? "/cadastro" : "/login"}>
              {isLogin ? "Criar conta" : "Entrar"}
            </Link>
          </Button>
        </div>
      </header>
      <div className="max-w-md relative z-10 flex flex-col flex-1 justify-center w-full m-auto">
        <div className="pb-6">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          {isLogin ? "Fazer Login" : "Criar conta"}
        </h1>
        <p className="text-slate-400 mt-2 text-lg">
          {isLogin
            ? "Entre na sua conta para continuar"
            : "Cadastre-se para começar"}
        </p>
      </div>
        <AuthForm isLogin={isLogin} />
        <p className="text-center text-md text-slate-400 mt-8">
          {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
          <Link href={isLogin ? "/cadastro" : "/login"} className="text-[#03e3b8] hover:text-[#02b191] transition-colors">
            {isLogin ? "Cadastre-se" : "Entrar"}
          </Link>
        </p>
      </div>
    </div>
  );
}
