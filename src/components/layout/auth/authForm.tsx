"use client";

import { signIn, signUp } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Eye, EyeOff, KeyRound } from "lucide-react";
import { useState } from "react";

export default function AuthForm({ isLogin }: { isLogin: boolean }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form
      action={isLogin ? signIn : signUp}
      className="p-8 bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800/50 shadow-md shadow-black/20 overflow-hidden"
    >
      <div className="space-y-5">
        {!isLogin && (
          <div className="space-y-2">
            <Label
              htmlFor="username"
              className="font-medium text-zinc-300"
            >
              Nome de Usuário
            </Label>
            <div className="relative group select-none">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#03e3b8]"
                size={20}
              />
              <Input 
                id="username"
                name="username"
                type="text"
                className="pl-12 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus:border-[#03e3b8] h-12" 
                placeholder="Usuário"
                required
                autoComplete="username"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="font-medium text-zinc-300">
            Email
          </Label>
          <div className="relative group select-none">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#03e3b8]"
              size={20}
            />
            <Input
              id="email"
              name="email"
              type="email"
              className="pl-12 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus:border-[#03e3b8] h-12"
              placeholder="seu@email.com"
              required
              autoComplete="email"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="font-medium text-zinc-300"
          >
            Senha
          </Label>
          <div className="relative group select-none">
            <KeyRound
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#03e3b8]"
              size={20}
            />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="pl-12 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus:border-[#03e3b8] h-12"
              placeholder="••••••••"
              required
              minLength={6}
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-zinc-300">
              Confirmar Senha
            </Label>
            <div className="relative group select-none">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#03e3b8]"
                size={20}
              />
              <Input
                id="confirm-password"
                name="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                className="pl-12 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus:border-[#03e3b8] h-12"
                placeholder="••••••••"
                required
                minLength={6}
                autoComplete="confirm-new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        )}

        <Button variant={"primary"} className="w-full rounded-md">
          {isLogin ? "Entrar" : "Criar conta"}
        </Button>
      </div>
    </form>
  );
}
