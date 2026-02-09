"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, KeyRound, Eye, EyeOff, Loader2 } from "lucide-react";
import { LoginData, loginSchema } from "@/lib/schemas/auth";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: LoginData) => {
    setServerError(null);
    try {
      const response = await signIn(data);
      if (response && !response.success) setServerError(response.message);
    } catch (error: any) {
    // Ignora o erro causado pelo redirect
    if (!error?.digest?.includes("NEXT_REDIRECT")) {
      setServerError("Ocorreu um erro inesperado.");
    }
  }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 p-8 bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800/50 shadow-md"
    >
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-zinc-300">
          Email
        </Label>
        <div className="relative group">
          <Mail
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            size={20}
          />
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="pl-12 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus:border-[#03e3b8] h-12"
            placeholder="seu@email.com"
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-400 pl-1 pt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-zinc-300">
          Senha
        </Label>
        <div className="relative group">
          <KeyRound
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            size={20}
          />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="pl-12 bg-zinc-800/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-500 focus:border-[#03e3b8] h-12"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-400 pl-1 pt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {serverError && (
        <p className="text-red-400 text-md">{serverError}</p>
      )}

      <Button disabled={isSubmitting} className="w-full min-h-9 h-full flex justify-center items-center" variant="primary">
        {isSubmitting ? <Loader2 className="animate-spin" /> : "Entrar"}
      </Button>
    </form>
  );
}
