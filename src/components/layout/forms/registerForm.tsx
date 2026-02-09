"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, KeyRound, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { RegisterData, registerSchema } from "@/lib/schemas/auth";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema), 
    defaultValues: { username: "", email: "", password: "", confirmPassword: "" },
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  const onSubmit = async (data: RegisterData) => {
    setServerError(null);
    try {
      const response = await signUp(data);
      if (response && !response.success) setServerError(response.message);
    } catch {
      setServerError("Ocorreu um erro inesperado.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-8 bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800/50 shadow-md">
      {serverError && (
        <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md text-center">{serverError}</div>
      )}

      <div className="space-y-2">
        <Label htmlFor="username" className="text-zinc-300">Usuário</Label>
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
          <Input id="username" {...register("username")} className="pl-12 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus:border-[#03e3b8] h-12" placeholder="Usuário" />
        </div>
        {errors.username && (
          <p className="text-md text-red-400 pl-1 pt-1">
            {errors.username.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-zinc-300">Email</Label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
          <Input id="email" type="email" {...register("email")} className="pl-12 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus:border-[#03e3b8] h-12" placeholder="seu@email.com" />
        </div>
        {errors.email && (
          <p className="text-sm text-red-400 pl-1 pt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-zinc-300">Senha</Label>
        <div className="relative group">
          <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
          <Input id="password" type={showPassword ? "text" : "password"} {...register("password")} className="pl-12 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus:border-[#03e3b8] h-12" placeholder="••••••••" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-400 pl-1 pt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-zinc-300">Confirmar Senha</Label>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
          <Input id="confirmPassword" type={showConfirm ? "text" : "password"} {...register("confirmPassword")} className="pl-12 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus:border-[#03e3b8] h-12" placeholder="••••••••" />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
             {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-400 pl-1 pt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {serverError && <p className="text-red-400 text-sm">{serverError}</p>}

      <Button disabled={isSubmitting} className="w-full min-h-9 h-full flex justify-center items-center" variant="primary">
        {isSubmitting ? <Loader2 className="animate-spin" /> : "Entrar"}
      </Button>
    </form>
  );
}