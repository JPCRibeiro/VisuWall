"use client";

import { signIn, signUp } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname } from "next/navigation";
import { Mail, Lock, User, Eye, EyeOff, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AuthForm() {
  const [showPassword, setShowPassword] = useState(false);
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(() => pathname.includes("/login"));

  useEffect(() => {
    setIsLogin(pathname.includes("/login"));
  }, [pathname]);

  return (
    <>
      <form
        action={isLogin ? signIn : signUp}
        className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/50 border border-slate-700/50 overflow-hidden"
      >
        <div className="px-8 pt-10 pb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/30">
            <Sparkles className="w-8 h-8 text-white"/>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight text-center">
            {isLogin ? "Bem-vindo de volta" : "Criar conta"}
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            {isLogin
              ? "Entre na sua conta para continuar"
              : "Preencha os dados para começar"}
          </p>
        </div>
        <div className="px-8 pb-10">
          <div className="space-y-5">
            {!isLogin && (
              <div>
                <Label>
                  Nome de usuário
                </Label>
                <div className="relative mt-2">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    name="username"
                    placeholder="Seu usuário"
                    required
                    className="pl-12 h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <Label className="text-slate-300 text-sm font-medium">
                Email
              </Label>
              <div className="relative mt-2">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  className="pl-12 h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div>
              <Label className="text-slate-300 text-sm font-medium">
                Senha
              </Label>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="pl-12 h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button>
              {isLogin ? "Entrar" : "Criar conta"}
            </Button>
          </div>
        </div>
      </form>

      <p className="text-center text-sm text-slate-400 mt-8">
        {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
        <Link
          href={isLogin ? "/cadastro" : "/login"}
          className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          {isLogin ? "Cadastre-se" : "Entrar"}
        </Link>
      </p>
    </>
  );
}
